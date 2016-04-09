require! <[fs]>
require! <[../engine/aux ../engine/share/model/]>
(engine,io) <- (->module.exports = it)  _

charttype = model.type.chart

engine.router.api.get "/chart/", (req, res) ->
  overlap = do
    basetype: (req.query.type or "").split(\,).filter(->it)
    visualencoding: (req.query.enc or "").split(\,).filter(->it)
    category: (req.query.cat or "").split(\,).filter(->it)
  equal = do
    dimlen: req.query.dim
    owner: req.query.owner
  if !equal.owner or !req.user or (req.query.owner != req.user.key) =>
    equal.searchable = true
  overlap = [[k,v] for k,v of overlap].filter(->it.1 and it.1.length)
  equal = [[k,v] for k,v of equal].filter(->it.1)
  conditions = (
    overlap.map((d,i) -> ["charts.#{d.0} && ",d.1]) ++
    equal.map((d,i) -> ["charts.#{d.0} = ",d.1])
  ).map((d,i) -> ["#{d.0} $#{i + 1}", d.1])

  io.query([
    'select users.displayname as "ownerName",charts.*'
    ["from charts,users where users.key = charts.owner","#{conditions.map(->it.0).join(" and ")}"]
      .filter(->it)
      .join(" and ")
  ].join(" "), conditions.map(->it.1))
    .then -> res.send it.rows
    .catch (e) ->
      console.log e.stack
      res.send []

engine.router.api.get "/chart/:id", (req, res) ->
  io.query([
    'select users.displayname as "ownerName", charts.*'
    'from users,charts where users.key = owner and'
    "charts.key=$1"
  ].join(" "), [req.params.id])
    .then (it={}) ->
      chart = it.[]rows.0
      if !chart => return aux.r404 res
      if (chart.{}permission.[]switch.indexOf(\public) < 0)
      and (!req.user or chart.owner != req.user.key) => return aux.r403 res, "forbidden"
      return res.json chart
    .catch ->
      console.error it.stack
      return aux.r403 res

dethumb = (chart) ->
  if !chart.thumbnail => return null
  thumb = chart.thumbnail.split('base64,')
  ret = /data:([^;]+);/.exec(thumb.0)
  if !ret => return null
  delete chart.thumbnail
  [type, thumb] = [ret.1, new Buffer(thumb.1, 'base64')]

#TODO save thumbnail
engine.router.api.post "/chart/", (req, res) ->
  if !req.user => return aux.r403 res
  if typeof(req.body) != \object => return aux.r400 res
  data = req.body <<< {owner: req.user.key, createdtime: new Date!, modifiedtime: new Date!}
  [type, thumb] = dethumb data
  if data.key => fs.write-file "static/s/chart/#{data.key}.png", thumb
  ret = charttype.lint data
  if ret.0 => return aux.r400 res, ret
  data = charttype.clean data
  pairs = io.aux.insert.format charttype, data
  delete pairs.key
  pairs = io.aux.insert.assemble pairs
  io.query "insert into charts #{pairs.0} values #{pairs.1} returning key", pairs.2
    .then (r={}) ->
      key = r.[]rows.0.key
      data.key = key
      res.send data
    .catch ->
      console.error it.stack
      aux.r403 res

#TODO save thumbnail
engine.router.api.put "/chart/:id", (req, res) ~>
  if !req.user => return aux.r403 res
  if typeof(req.body) != \object => return aux.r400 res
  data = req.body
  if !data.key == req.params.id => return aux.r400 res, [true, data.key, \key-mismatch]
  io.query "select * from charts where key = $1", [req.params.id]
    .then (r = {}) ->
      chart = r.rows.0
      if !chart => return aux.r404 res
      if chart.owner != req.user.key => return aux.r403 res
      data <<< do
        owner: req.user.key
        key: req.params.id
        modifiedtime: new Date!toUTCString!
      [type, thumb] = dethumb data
      if data.key => fs.write-file "static/s/chart/#{data.key}.png", thumb
      ret = charttype.lint(data)
      if ret.0 => return aux.r400 res, ret
      data := charttype.clean data
      pairs = io.aux.insert.format charttype, data
      <[key createdtime]>.map -> delete pairs[it]
      pairs = io.aux.insert.assemble pairs
      io.query(
        "update charts set #{pairs.0} = #{pairs.1} where key = $#{pairs.2.length + 1}",
        pairs.2 ++ [req.params.id]
      )
        .then (r={}) -> res.send data
        .catch ->
          console.error it.stack
          aux.r403 res
    .catch ->
      console.error it.stack
      return aux.r403 res

engine.router.api.delete "/chart/:id", (req, res) ~>
  if !req.user => return aux.r403 res
  io.query "select * from charts where key = $1", [req.params.id]
    .then (r = {}) ->
      chart = r.[]rows.0
      if !chart => return aux.r404 res
      if chart.owner != req.user.key => return aux.r403 res
      io.query "delete from charts where key = $1", [req.params.id]
        .then -> res.send []
    .catch ->
      console.error it.stack
      return aux.r403 res