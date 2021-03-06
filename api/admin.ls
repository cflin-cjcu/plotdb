require! <[bluebird crypto fs fs-extra read-chunk image-type crypto]>
require! <[../engine/aux ../engine/share/model/ ../engine/throttle]>
require! <[./entity ./avatar ./mail]>
(engine,io) <- (->module.exports = it)  _

entity := entity engine, io
usertype = model.type.user
auth-limit = {strategy: \hard, limit: 10, upper-delta: 1800, json: true}
edit-limit = {strategy: \hard, limit: 30, upper-delta: 120, json: true}

engine.app.get \/admin/dashboard, aux.authorized (req, res) ->
  payload = {}
  io.query [
    "select count(key) as count,date(createdtime) as date from users"
    "group by date(createdtime) order by date(createdtime) desc"
  ].join(" ")
    .then (r={}) ->
      ret = r.[]rows
      payload.signup = ret
      io.query [
        "select count(key) as count,date(createdtime) as date from charts"
        "group by date(createdtime) order by date desc"
      ].join(" ")
    .then (r={}) ->
      ret = r.[]rows
      payload.newchart = ret
      io.query [
        "select count(key) as count,owner as owner from charts"
        "group by owner order by count(key) desc"
      ].join(" ")
    .then (r={}) ->
      ret = r.[]rows
      payload.userrank = ret
      io.query [
        "select count(charts.key) as count,s.name as name from charts,charts as s"
        "where s.key=charts.parent group by s.name order by count(charts.key) desc"
      ].join(" ")
    .then (r={}) ->
      ret = r.[]rows
      payload.parents = ret
      io.query [
        "select key,name,owner,parent,createdtime from charts"
        "where createdtime > current_date - interval '7' day order by createdtime desc"
      ].join(" ")
    .then (r={}) ->
      ret = r.[]rows
      payload.recentchart = ret
      res.render \view/admin/dashboard.jade, payload
      return null
    .catch aux.error-handler res, true
