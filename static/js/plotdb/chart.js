// Generated by LiveScript 1.3.1
plotdb.chart = {
  corelib: {},
  create: function(config){
    return import$(import$({}, this.base), config);
  },
  base: {
    dimension: {
      value: {
        type: [],
        require: false
      }
    },
    config: {
      padding: {}
    },
    init: function(){},
    bind: function(){},
    resize: function(){},
    render: function(){}
  },
  fieldsFromDimension: function(dimension){
    var k, v;
    return (function(){
      var ref$, results$ = [];
      for (k in ref$ = dimension) {
        v = ref$[k];
        results$.push([k, v]);
      }
      return results$;
    }()).map(function(d){
      var ref$;
      ((ref$ = d[1]).fields || (ref$.fields = [])).map(function(it){
        return it.bind = d[0];
      });
      return d[1].fields;
    }).reduce(function(a, b){
      return a.concat(b);
    }, []);
  },
  dataFromDimension: function(dimension){
    var ref$, parsers, data, len, k, v, that, i$, len$, field, defaultParser, key$, i, ret, j$, to$, j;
    ref$ = [{}, []], parsers = ref$[0], data = ref$[1];
    len = Math.max.apply(null, (function(){
      var ref$, results$ = [];
      for (k in ref$ = dimension) {
        v = ref$[k];
        results$.push(v);
      }
      return results$;
    }()).reduce(function(a, b){
      return a.concat(b.fields || []);
    }, []).filter(function(it){
      return it.data;
    }).map(function(it){
      return it.data.length;
    }).concat([0]));
    for (k in dimension) {
      v = dimension[k];
      if (v.multiple) {
        v.fieldName = (v.fields || (v.fields = [])).map(fn$);
      } else {
        v.fieldName = (that = (v.fields || (v.fields = []))[0]) ? that.name : null;
      }
      for (i$ = 0, len$ = (ref$ = v.fields || (v.fields = [])).length; i$ < len$; ++i$) {
        field = ref$[i$];
        if (!field.datatype) {
          field.datatype = plotdb.Types.resolve(field.data);
        }
      }
      defaultParser = (plotdb[key$ = ((v.type || (v.type = []))[0] || {}).name] || (plotdb[key$] = {})).parse || null;
      parsers[k] = v.fields.length
        ? v.fields.map(fn1$)
        : [defaultParser || fn2$];
    }
    for (i$ = 0; i$ < len; ++i$) {
      i = i$;
      ret = {};
      for (k in dimension) {
        v = dimension[k];
        if ((v.fields || (v.fields = [])).length) {
          ret[k] = (v.fields || (v.fields = [])).map(fn3$);
        } else {
          ret[k] = [[v.type[0] || plotdb.String]['default']];
          if (typeof ret[k] === 'function') {
            ret[k] = ret[k](k, v, i);
          }
        }
        for (j$ = 0, to$ = (ret[k] || []).length; j$ < to$; ++j$) {
          j = j$;
          ret[k][j] = parsers[k][j](ret[k][j]);
        }
        if (!v.multiple) {
          ret[k] = ret[k][0];
        }
      }
      data.push(ret);
    }
    return data;
    function fn$(it){
      return it.name;
    }
    function fn1$(it){
      var key$;
      return defaultParser || (plotdb[key$ = it.datatype] || (plotdb[key$] = {})).parse || function(it){
        return it;
      };
    }
    function fn2$(it){
      return it;
    }
    function fn3$(it){
      return (it.data || (it.data = []))[i];
    }
  },
  dataConvert: {
    fromDimension: function(dimension){
      var ret, k, v;
      ret = {};
      for (k in dimension) {
        v = dimension[k];
        ret[k] = v.fields;
      }
      return ret;
    },
    byMapping: function(data, mapping){
      var ret, k, v, res$, i$, len$, name;
      ret = {};
      for (k in mapping) {
        v = mapping[k];
        res$ = [];
        for (i$ = 0, len$ = v.length; i$ < len$; ++i$) {
          name = v[i$];
          res$.push({
            name: name,
            data: data.map(fn$)
          });
        }
        ret[k] = res$;
      }
      return ret;
      function fn$(it){
        return it[name];
      }
    }
  },
  dataFromHash: function(dimension, source){
    var k, v;
    if (!dimension || !source) {
      return [];
    }
    if (Array.isArray(source)) {
      return source;
    }
    if (typeof source === 'function') {
      source = source();
    }
    for (k in dimension) {
      v = dimension[k];
      v.fields = source[k] || [];
    }
    return plotdb.chart.dataFromDimension(dimension);
  },
  getSampleData: function(chart, dimension){
    dimension == null && (dimension = null);
    return plotdb.chart.dataFromHash(dimension || chart.dimension, chart.sample);
  },
  updateData: function(chart){
    return chart.data = plotdb.chart.dataFromDimension(chart.dimension);
  },
  updateDimension: function(chart){
    var k, ref$, v, results$ = [];
    for (k in ref$ = chart.dimension) {
      v = ref$[k];
      if (Array.isArray(v.type)) {
        results$.push(v.type = v.type.map(fn$));
      }
    }
    return results$;
    function fn$(it){
      if (typeof it === 'object') {
        return it;
      } else {
        return plotdb[it] || {};
      }
    }
  },
  updateAssets: function(chart, assets){
    var ret, i$, len$, file, raw, array, j$, to$, idx;
    assets == null && (assets = []);
    ret = {};
    for (i$ = 0, len$ = assets.length; i$ < len$; ++i$) {
      file = assets[i$];
      raw = atob(file.content);
      array = new Uint8Array(raw.length);
      for (j$ = 0, to$ = raw.length; j$ < to$; ++j$) {
        idx = j$;
        array[idx] = raw.charCodeAt(idx);
      }
      file.blob = new Blob([array], {
        type: file.type
      });
      file.url = URL.createObjectURL(file.blob);
      file.datauri = ["data:", file.type, ";charset=utf-8;base64,", file.content].join("");
      ret[file.name] = file;
    }
    return chart.assets = ret;
  },
  updateConfig: function(chart, config){
    var k, ref$, v, type, results$ = [];
    for (k in ref$ = chart.config) {
      v = ref$[k];
      type = (chart.config[k].type || []).map(fn$);
      if (!(config[k] != null)) {
        config[k] = v['default'];
      } else if (!(config[k].value != null)) {
        config[k] = (v || config[k])['default'];
      } else {
        config[k] = config[k].value;
      }
      if (type[0] && plotdb[type[0]].parse) {
        results$.push(config[k] = plotdb[type[0]].parse(config[k]));
      }
    }
    return results$;
    function fn$(it){
      return it.name;
    }
  },
  add: function(name, json){
    var ref$;
    return ((ref$ = plotdb.chart.add).list || (ref$.list = {}))[name] = json;
  },
  get: function(name){
    var chart, ref$, k, v, func, code;
    chart = ((ref$ = plotdb.chart.add).list || (ref$.list = {}))[name];
    if (!chart && typeof name === 'number') {
      chart = (function(){
        var ref$, ref1$, results$ = [];
        for (k in ref$ = (ref1$ = plotdb.chart.add).list || (ref1$.list = {})) {
          v = ref$[k];
          results$.push({
            k: k,
            v: v
          });
        }
        return results$;
      }()).filter(function(){
        return v.key === name;
      })[0];
    }
    if (!chart) {
      return null;
    }
    func = {};
    for (k in ref$ = chart.code.content) {
      v = ref$[k];
      if (typeof v === typeof fn$) {
        func[k] = v;
      }
    }
    code = JSON.parse(JSON.stringify(chart.code.content));
    for (k in func) {
      v = func[k];
      code[k] = v;
    }
    chart = JSON.parse(JSON.stringify(chart));
    return new plotdb.view.chart(chart, {
      code: code
    });
    function fn$(){}
  },
  list: function(){
    var k, results$ = [];
    for (k in plotdb.chart.add.list) {
      results$.push(k);
    }
    return results$;
  }
};
plotdb.chart.config = {
  update: function(config){
    var ret, k, v, results$ = [];
    ret = this.parse(this.preset(config));
    for (k in ret) {
      v = ret[k];
      results$.push(config[k] = v);
    }
    return results$;
  },
  preset: function(config){
    var k, ref$, v, p, f, val;
    for (k in ref$ = config || {}) {
      v = ref$[k];
      if (config[v.extend]) {
        p = config[v.extend];
      } else if (plotdb.config[v.extend]) {
        p = plotdb.config[v.extend];
      } else if (plotdb.config[k]) {
        p = plotdb.config[k];
      } else {
        continue;
      }
      for (f in p) {
        val = p[f];
        if (!(v[f] != null)) {
          v[f] = val;
        }
      }
    }
    return config;
  },
  parse: function(config){
    var ret, k, ref$, v, i$, ref1$, len$, type, e;
    ret = {};
    for (k in ref$ = config || {}) {
      v = ref$[k];
      if (!(v != null)) {
        config[k] = {};
      }
      if (!(v.value != null)) {
        v.value = v['default'] || 0;
      }
      for (i$ = 0, len$ = (ref1$ = v.type || []).length; i$ < len$; ++i$) {
        type = ref1$[i$];
        try {
          type = plotdb[type.name];
          if (type.test && type.parse && type.test(v.value)) {
            v.value = type.parse(v.value);
            break;
          }
        } catch (e$) {
          e = e$;
          console.log("chart config: type parsing exception ( " + k + " / " + type + " )");
          console.log(e.stack + "");
        }
      }
      ret[k] = config[k].value;
    }
    return ret;
  }
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}