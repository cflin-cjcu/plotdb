plotdb = {}
plotdb <<< do
  Number: name: \Number, test: -> !isNaN(+it)
  String: name: \String, test: -> true
  Date: name: \Date, test: -> 
    d = new Date(it)
    return if !(d instanceof Date) or isNaN(d.getTime!) => false else true
  Choice: (v) -> 
    return do
      name: \Choice
      test: -> v and v.length and (it in v)
      values: v
  Percent: name: \Percent, test: -> !!/[0-9.]+%/.exec(it)
  Color: name: \Color, test: -> !!!/(rgba?|hsla?)\([0-9.,]+\)|#[0-9a-f]{3,6}|[a-z0-9]+/.exec(it.trim!)
  Palette: do
    name: \Palette
    test: -> 
      return if it and typeof(it) == typeof([]) and it.length and 
      it.filter(->!!!/(rgba?|hsla?)\([0-9.,]+\)|#[0-9a-f]{3,6}|[a-z0-9]+/.exec it).length == 0 => true else false
    default: <[#1d3263 #226c87 #f8d672 #e48e11 #e03215 #ab2321]>
  Boolean: name: \boolean, test: -> !!/^(true|false|1|0|yes|no)$/.exec(it)

plotdb.chart = do
  corelib: {}
  create: (config) ->
    {} <<< @base <<< config
  base: do
    name: \base
    title: 'chart template'
    desc: null
    mapping: do
      value: {type: [], require: false}
    config: do
      padding: {type: [plotdb.Number], default: 10}
    init: (root, data, config) ->
    bind: (root, data, config) ->
    resize: (root, data, config) ->
    render: (root, data, config) ->
