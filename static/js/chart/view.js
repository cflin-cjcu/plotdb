// Generated by LiveScript 1.3.1
plotdb.view = {
  host: plConfig.urlschema + "" + plConfig.domain,
  loader: function(key, cb){
    var req;
    req = new XMLHttpRequest();
    req.onload = function(){
      var ret, e;
      try {
        ret = JSON.parse(this.responseText);
        if (Array.isArray(ret)) {
          return cb(ret.map(function(it){
            return new plotdb.view.chart(it, {});
          }));
        } else {
          return cb(new plotdb.view.chart(ret, {}));
        }
      } catch (e$) {
        e = e$;
        console.error("load chart " + key + " failed when parsing response: ");
        return console.error(e);
      }
    };
    if (typeof key === 'number') {
      req.open('get', this.host + "/d/chart/" + key, true);
    } else if (typeof key === 'string') {
      req.open('get', key, true);
    }
    return req.send();
  },
  chart: function(chart, arg$){
    var ref$, theme, fields, root, data, code, eventbus;
    ref$ = arg$ != null
      ? arg$
      : {}, theme = ref$.theme, fields = ref$.fields, root = ref$.root, data = ref$.data;
    this._ = {
      handler: {},
      _chart: JSON.stringify(chart),
      fields: fields,
      root: root,
      inited: false
    };
    if (chart) {
      code = chart.code.content;
      if (typeof code === 'string') {
        if (code[0] === '{') {
          code = "(function() { return " + code + "; })();";
        } else {
          code = "(function() { " + code + "; return module.exports; })();";
        }
        this._.chart = chart = import$(eval(code), chart);
      } else {
        this._.chart = chart = import$(code, chart);
      }
    }
    plotdb.chart.updateDimension(chart);
    plotdb.chart.updateConfig(chart, chart.config);
    plotdb.chart.updateAssets(chart, chart.assets);
    if (data) {
      this.data(data);
    }
    if (fields) {
      this.sync(fields);
    }
    if (!data && (fields == null || !fields.length)) {
      this.data(chart.sample);
    }
    if (theme != null) {
      this.theme(theme);
    }
    if (fields != null) {
      this.sync(fields);
    }
    if (root) {
      this.attach(root);
    }
    chart.saveLocal = function(chart, key){
      return function(cb){
        var req;
        req = new XMLHttpRequest();
        req.onload = function(){
          if (cb) {
            return cb();
          }
        };
        req.open('put', plConfig.urlschema + "" + plConfig.domain + "/e/chart/" + key + "/local", true);
        req.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
        return req.send(JSON.stringify(chart.local));
      };
    }(chart, chart.key);
    eventbus = {
      'in': {},
      out: {}
    };
    chart.fire = function(name, payload){
      var ref$;
      return ((ref$ = eventbus.out)[name] || (ref$[name] = [])).forEach(function(it){
        return it(payload);
      });
    };
    this.fire = function(name, payload){
      var ref$;
      return ((ref$ = eventbus['in'])[name] || (ref$[name] = [])).forEach(function(it){
        return it(payload);
      });
    };
    this.handle = function(name, cb){
      var ref$;
      return ((ref$ = eventbus.out)[name] || (ref$[name] = [])).push(cb);
    };
    chart.handle = function(name, cb){
      var ref$;
      return ((ref$ = eventbus['in'])[name] || (ref$[name] = [])).push(cb);
    };
    return this;
  }
};
import$(plotdb.view.chart.prototype, {
  update: function(){
    var this$ = this;
    return ['resize', 'bind', 'render'].map(function(it){
      if (this$._.chart[it]) {
        return this$._.chart[it]();
      }
    });
  },
  loadlib: function(root){
    var libs;
    return libs = this._.chart.library || [];
  },
  attach: function(root){
    var ref$, chart, theme, head, foot, iroot, iiroot, margin, marginVertical, resize, newClass, e;
    if (typeof root === 'string') {
      root = document.querySelector(root);
    }
    this._.root = root;
    ref$ = {
      chart: (ref$ = this._).chart,
      theme: ref$.theme
    }, chart = ref$.chart, theme = ref$.theme;
    root.setAttribute("class", ((root.getAttribute("class") || "").split(" ").filter(function(it){
      return it !== 'pdb-root';
    }).concat(['pdb-root'])).join(" "));
    if (chart.metashow) {
      ref$ = [0, 0, 0, 0].map(function(){
        return document.createElement("div");
      }), head = ref$[0], foot = ref$[1], iroot = ref$[2], iiroot = ref$[3];
      iroot.appendChild(iiroot);
      ref$ = iroot.style;
      ref$.position = "absolute";
      ref$.left = "0";
      ref$.right = "0";
      ref$ = iiroot.style;
      ref$.width = "100%";
      ref$.height = "100%";
      ref$ = foot.style;
      ref$.position = "absolute";
      ref$.bottom = "0";
      [head, iroot, foot].map(function(it){
        return root.appendChild(it);
      });
      margin = chart.config.margin || 10;
      marginVertical = margin - 10 > 10
        ? margin - 10
        : margin / 2;
      import$(head.style, {
        position: "relative",
        "z-index": 999,
        "text-align": 'center',
        margin: marginVertical + "px 0 0",
        "font-family": chart.config.fontFamily || "initial"
      });
      import$(foot.style, {
        left: margin + "px",
        bottom: marginVertical + "px"
      });
      head.innerHTML = ["<h2 style='margin:0'>" + chart.name + "</h2>", "<p style='margin:0'>" + chart.description + "</p>"].join("");
      if (chart.footer) {
        foot.innerHTML = "<small>" + chart.footer + "</small>";
      }
      import$(iroot.style, {
        top: head.getBoundingClientRect().height + "px",
        bottom: foot.getBoundingClientRect().height + "px"
      });
      root = iiroot;
    }
    root.innerHTML = [chart && chart.style ? "<style type='text/css'>/* <![CDATA[ */" + ((chart.style || (chart.style = {})).content || "") + "/* ]]> */</style>" : void 8, theme && theme.style ? "<style type='text/css'>/* <![CDATA[ */" + ((theme.style || (theme.style = {})).content || "") + "/* ]]> */</style>" : void 8, "<div style='position:relative;width:100%;height:100%;'><div style='height:0;'>&nbsp;</div>", (chart.doc || (chart.doc = {})).content || "", "</div>", theme && (theme.doc || (theme.doc = {})).content ? (theme.doc || (theme.doc = {})).content : void 8].join("");
    chart.root = root.querySelector("div:first-of-type");
    resize = function(){
      var this$ = this;
      if (resize.handle) {
        clearTimeout(resize.handle);
      }
      return resize.handle = setTimeout(function(){
        resize.handle = null;
        if (chart.resize) {
          chart.resize();
        }
        if (chart.render) {
          return chart.render();
        }
      }, 10);
    };
    plotdb.util.trackResizeEvent(root, function(){
      return resize();
    });
    newClass = (root.getAttribute('class') || "").split(' ').filter(function(it){
      return it !== 'loading';
    }).join(" ").trim();
    try {
      if (chart.init) {
        chart.init();
      }
      if (chart.parse) {
        chart.parse();
      }
      if (chart.resize) {
        chart.resize();
      }
      if (chart.bind) {
        chart.bind();
      }
      if (chart.render) {
        chart.render();
      }
    } catch (e$) {
      e = e$;
      newClass += ' error';
      console.error(e);
    }
    root.setAttribute('class', newClass);
    return this.inited = true;
  },
  config: function(config){
    return import$(this._.chart.config, config);
  },
  init: function(root){
    return this._.chart.init();
  },
  parse: function(){
    return this._.chart.parse();
  },
  resize: function(){
    return this._.chart.resize();
  },
  bind: function(){
    return this._.chart.bind();
  },
  render: function(){
    return this._.chart.render();
  },
  destroy: function(){
    if (this._.chart.destroy) {
      return this._.chart.destroy();
    }
  },
  clone: function(){
    var ref$;
    return new plotdb.view.chart(JSON.parse(this._._chart), {
      theme: (ref$ = this._).theme,
      fields: ref$.fields
    });
  },
  on: function(event, cb){
    var ref$;
    return ((ref$ = this._.handler)[event] || (ref$[event] = [])).push(cb);
  },
  theme: function(theme){
    return this._.theme = import$(eval(theme.code.content), theme);
  },
  refresh: function(){
    this._.chart.parse();
    this._.chart.resize();
    this._.chart.bind();
    return this._.chart.render();
  },
  data: function(data, refresh, mapping){
    if (data == null) {
      return this._.data;
    }
    if (mapping) {
      data = plotdb.chart.dataConvert.byMapping(data, mapping);
    }
    if (!Array.isArray(data) && typeof data === typeof {}) {
      data = plotdb.chart.dataConvert.fromDimension(data);
    }
    this._.data = data;
    this.sync();
    if (this.inited && refresh) {
      return this.refresh();
    }
  },
  sync: function(fields){
    var hash, i$, len$, item, k, ref$, v;
    fields == null && (fields = []);
    if (this._.data) {
      return this._.chart.data = plotdb.chart.dataFromHash(this._.chart.dimension, this._.data);
    }
    hash = {};
    for (i$ = 0, len$ = fields.length; i$ < len$; ++i$) {
      item = fields[i$];
      hash[item.key] = item;
    }
    for (k in ref$ = this._.chart.dimension) {
      v = ref$[k];
      v.fields = (v.fields || []).map(fn$).filter(fn1$);
    }
    plotdb.chart.updateData(this._.chart);
    if (this.inited && this._.chart.parse) {
      return this._.chart.parse();
    }
    function fn$(it){
      return hash[it.key];
    }
    function fn1$(it){
      return it;
    }
  }
});
plotdb.load = function(key, cb){
  return plotdb.view.loader(key, cb);
};
plotdb.render = function(config, cb){
  return plotdb.view.render(config, cb);
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}