// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.controller('plChartEditor', ['$scope', '$http', '$timeout', 'plConfig', 'chartService', 'paletteService', 'plNotify', 'eventBus', 'permService', 'initWrap', 'license'].concat(function($scope, $http, $timeout, plConfig, chartService, paletteService, plNotify, eventBus, permService, initWrap, license){
  var dispatcher, canvas;
  initWrap = initWrap();
  dispatcher = initWrap({
    handlers: {},
    register: function(name, handler){
      var ref$;
      return ((ref$ = this.handlers)[name] || (ref$[name] = [])).push(handler);
    },
    handle: function(evt){
      return (this.handlers[evt.data.type] || []).map(function(it){
        return it(evt.data);
      });
    },
    init: function(){
      var this$ = this;
      return window.addEventListener('message', function(e){
        return $scope.$apply(function(){
          return this$.handle(e);
        });
      }, false);
    }
  });
  dispatcher.register('click', function(){
    var event;
    if (document.dispatchEvent) {
      event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      event.synthetic = true;
      return document.dispatchEvent(event);
    } else {
      event = document.createEventObject();
      event.synthetic = true;
      return document.fireEvent("onclick", event);
    }
  });
  dispatcher.register('keydown', function(arg$){
    var e;
    e = arg$.event;
    if ((e.metaKey || e.altKey) && (e.keyCode === 13 || e.which === 13)) {
      return $scope.panel['switch']();
    }
  });
  $scope.chartModal = {
    name: {}
  };
  $scope.chartModal.assets = initWrap({
    init: function(){},
    measure: function(){
      var ref$;
      return ((ref$ = $scope.chart.obj).assets || (ref$.assets = [])).size = $scope.chart.obj.assets.map(function(it){
        return it.content.length;
      }).reduce(function(a, b){
        return a + b;
      }, 0);
    },
    download: {
      url: null,
      name: null
    },
    remove: function(f){
      var assets, idx;
      assets = $scope.chart.obj.assets || [];
      idx = assets.indexOf(f);
      assets.splice(idx, 1);
      return $scope.chart.reset();
    },
    add: function(f){
      var assets;
      assets = $scope.chart.obj.assets || [];
      return assets.push(f);
    },
    preview: function(file){
      var datauri;
      this.node = document.querySelector('#assets-preview iframe');
      this.download.url = URL.createObjectURL(new Blob([file.content], {
        type: file.type
      }));
      this.download.name = file.name;
      this.preview.toggled = true;
      datauri = ["data:", file.type, ";charset=utf-8;base64,", file.content].join("");
      return this.node.src = datauri;
    },
    read: function(list){
      var this$ = this;
      return new Promise(function(res, rej){
        var deny, i$, to$, i, item, name, that, type, result, idx, content, size, ref$;
        deny = [];
        for (i$ = 0, to$ = list.length; i$ < to$; ++i$) {
          i = i$;
          item = list[i];
          name = (that = /([^/]+\.?[^/.]*)$/.exec(item.file.name)) ? that[1] : 'unnamed';
          type = item.file.type;
          result = item.result;
          idx = result.indexOf(';');
          content = result.substring(idx + 8);
          size = ((ref$ = $scope.chart.obj).assets || (ref$.assets = [])).map(fn$).reduce(fn1$, 0) + content.length;
          if (size > 3000000) {
            deny.push(name);
            continue;
          }
          $scope.chartModal.assets.add({
            name: name,
            type: type,
            content: content
          });
        }
        if (deny.length) {
          return plNotify.alert("Following assets exceed the size limit 3MB, and won't be uploaded: " + deny.join(','));
        }
        function fn$(it){
          return (it.content || "").length;
        }
        function fn1$(a, b){
          return a + b;
        }
      });
    },
    handle: function(files){
      var file;
      return Promise.all((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = files).length; i$ < len$; ++i$) {
          file = ref$[i$];
          results$.push(this.read(file));
        }
        return results$;
      }.call(this))).then(function(){
        return $scope.renderAsync();
      })['catch'](function(it){
        return console.log(it);
      });
    },
    node: null
  });
  $scope.panel = initWrap({
    init: function(){
      var width, ref$, this$ = this;
      width = document.body.getBoundingClientRect().width;
      if (width < 881) {
        ref$ = this.size.value;
        ref$.dataset = 'full';
        ref$.editor = 'full';
        this.size.doc = 'sm';
      }
      $scope.$watch('panel.tab', function(n, o){
        if (n === o) {
          return;
        }
        if (n === 'download') {
          $scope.download.clear();
        }
        if (o === 'editor') {}
        return $scope.canvas.resize();
      });
      $scope.$watch('panel.size.value', function(){
        return $scope.canvas.resize();
      }, true);
      return document.body.addEventListener('keydown', function(e){
        return $scope.$apply(function(){
          if ((e.metaKey || e.altKey) && (e.keyCode === 13 || e.which === 13)) {
            return this$['switch']();
          }
        });
      });
    },
    'switch': function(){
      return this.set(this.tab !== 'editor' ? 'editor' : '', true);
    },
    tab: 'data',
    set: function(v, f){
      return this.tab = !f && this.tab === v ? '' : v;
    },
    size: {
      set: function(panel, size){
        return this.value[panel] = this.value[panel] === size ? '' : size;
      },
      value: {},
      doc: ''
    }
  });
  $scope.editor = initWrap({
    init: function(){},
    tab: {
      value: 'code',
      oldValue: 'code',
      choices: ['code', 'style', 'doc'],
      set: function(it){
        this.oldValue = this.value;
        this.value = it;
        if (this.oldValue !== this.value) {
          return $scope.editor.refresh();
        }
      }
    },
    change: function(it){
      if (this.tab.oldValue !== this.tab.value) {
        return;
      }
      if ($scope.chart.obj[this.tab.value].content === it) {
        return;
      }
      $scope.chart.obj[this.tab.value].content = it;
      return $scope.chart.reset();
    },
    refresh: function(){
      var node;
      node = $scope.chart.obj[this.tab.value];
      return this.update(node.content, node.type);
    }
  });
  $scope.canvas = canvas = initWrap({
    init: function(){
      var this$ = this;
      $scope.$watch('editor.size.value', function(){
        return this$.resize();
      });
      dispatcher.register('inited', function(payload){
        return this$.finish('load', payload);
      });
      return dispatcher.register('rendered', function(){
        return this$.finish('render');
      });
    },
    load: function(chart){
      var this$ = this;
      this.canvas.iframe.src = "/dev/editor/render.html";
      this.canvas.iframe.onload = function(){
        return $scope.chart.library.load(chart.library).then(function(library){
          return this$.msg({
            type: 'init',
            chart: JSON.stringify(chart),
            library: library
          });
        });
      };
      return this.block('load');
    },
    render: function(payload){
      var ref$;
      payload == null && (payload = {});
      this.msg((ref$ = {
        type: 'render'
      }, ref$.data = payload.data, ref$.config = payload.config, ref$));
      return this.block('render');
    },
    resize: function(){
      return $timeout(function(){
        var left;
        left = Math.max.apply(null, Array.from(document.querySelectorAll('.editor-func-detail')).map(function(it){
          if (it.getAttribute('class').split(' ').indexOf('full') >= 0) {
            return 0;
          }
          return it.getBoundingClientRect().width;
        })) + 100;
        document.querySelector('#viscanvas').style.left = left + "px";
        document.querySelector('.editor-ctrls').style.left = left + "px";
        return canvas.dimension.set();
      }, 0);
    }
  });
  $scope.chart = initWrap({
    src: null,
    obj: null,
    dimension: {},
    init: function(){
      var this$ = this;
      $scope.$watch('chart.config', function(n, o){
        return this$.config.parse(n.value, o.value);
      }, true);
      return dispatcher.register('data.sample', function(arg$){
        var data;
        data = arg$.data;
        return this$.finish('sample', data);
      });
    },
    sample: function(){
      canvas.msg({
        type: 'data.get(sample)'
      });
      return this.block('sample');
    },
    config: {
      value: null,
      group: {},
      categorize: function(n, o){
        var k, v, ref$, key$, results$ = [];
        this.group = {};
        for (k in n) {
          v = n[k];
          results$.push(((ref$ = this.group)[key$ = v.category || 'Other'] || (ref$[key$] = {}))[k] = v);
        }
        return results$;
      },
      parse: function(n, o){
        var rebind, k, v;
        if (!n) {
          return;
        }
        rebind = !!(function(){
          var ref$, results$ = [];
          for (k in ref$ = n) {
            v = ref$[k];
            results$.push([k, v]);
          }
          return results$;
        }()).filter(function(arg$){
          var k, v;
          k = arg$[0], v = arg$[1];
          return !o || !o[k] || v.value !== o[k].value;
        }).map(function(it){
          return (it[1] || {}).rebindOnChange;
        }).filter(function(it){
          return it;
        }).length;
        this.update(rebind);
        return this.categorize(n, o);
      },
      update: function(rebind){
        rebind == null && (rebind = false);
        if (rebind) {
          return $scope.chart.reset();
        } else {
          return canvas.msg({
            type: 'config.set',
            config: this.value || {},
            rebind: rebind
          });
        }
      },
      reset: function(){
        var k, ref$, v;
        for (k in ref$ = this.value) {
          v = ref$[k];
          v.value = v['default'] || v.value;
        }
        return $scope.chart.reset();
      }
    },
    data: {
      bindmap: function(dimension){
        var bindmap, k, v, this$ = this;
        bindmap = {};
        (function(){
          var ref$, results$ = [];
          for (k in ref$ = dimension) {
            v = ref$[k];
            results$.push([k, v]);
          }
          return results$;
        }()).map(function(d){
          return d[1].fields.map(function(it){
            if (it.key) {
              return bindmap[it.key] = d[0];
            }
          });
        });
        return bindmap;
      },
      adopt: function(data, bykey){
        var dimension, fields, bindmap, k, v, dimkeys, res$, this$ = this;
        bykey == null && (bykey = true);
        dimension = $scope.chart.dimension;
        fields = data.fields || data;
        bindmap = null;
        if (!bykey) {
          for (k in dimension) {
            v = dimension[k];
            v.fields = [];
            v.fieldName = [];
          }
          fields.map(function(it){
            if (it.bind && dimension[it.bind]) {
              return dimension[it.bind].fields.push(it);
            }
          });
          this.set(fields);
        } else {
          for (k in dimension) {
            v = dimension[k];
            v.fields = v.fields.map(fn$).filter(fn1$);
            v.fields.map(fn2$);
          }
          bindmap = this.bindmap(dimension);
        }
        for (k in dimension) {
          v = dimension[k];
          v.fieldName = v.fields.map(fn3$);
        }
        res$ = [];
        for (k in dimension) {
          v = dimension[k];
          res$.push({
            name: k,
            multiple: !!v.multiple
          });
        }
        dimkeys = res$;
        $scope.dataset.bind(dimkeys, null);
        return this.update(fields);
        function fn$(f){
          return fields.filter(function(it){
            return it.key === f.key;
          })[0];
        }
        function fn1$(it){
          return it;
        }
        function fn2$(it){
          return it.bind = k;
        }
        function fn3$(it){
          return it.name;
        }
      },
      clear: function(){
        return eventBus.fire('sheet.data.clear');
      },
      sample: function(){
        var this$ = this;
        return $scope.chart.sample().then(function(it){
          return this$.adopt(it, false);
        });
      },
      set: function(data){
        return eventBus.fire('sheet.data.set', data);
      },
      get: function(){
        return this.data;
      },
      autobind: function(data, dim){
        var search, md, df, i$, to$, i, lresult$, k, v, ret, that, results$ = [];
        search = function(type, target, d){
          var list, i$, to$, i, ret;
          d == null && (d = 0);
          if (!type) {
            return null;
          }
          if (in$(type, target)) {
            return type;
          }
          list = plotdb[type].basetype || [];
          for (i$ = 0, to$ = list.length; i$ < to$; ++i$) {
            i = i$;
            ret = search(list[i].name, target, d + 1);
            if (ret) {
              return ret;
            }
          }
        };
        md = function(type, list){
          var ret, i$, i;
          list == null && (list = []);
          list = list.map(function(it){
            return it.name || it;
          });
          if (!type) {
            return list[0];
          }
          type = type.name || type;
          if (!list.length) {
            return type;
          }
          ret = search(type, list);
          if (ret) {
            return ret;
          }
          for (i$ = 0; i$ < list; ++i$) {
            i = i$;
            ret = search(list[i], [type]);
            if (ret) {
              return ret;
            }
          }
          return null;
        };
        df = {};
        for (i$ = 0, to$ = data.length; i$ < to$; ++i$) {
          i = i$;
          lresult$ = [];
          for (k in dim) {
            v = dim[k];
            ret = md(data[i].datatype, v.type.map(fn$));
            if (ret && (v.multiple || !df[k])) {
              df[k] = (that = df[k]) ? that + 1 : 1;
              data[i].bind = k;
              break;
            }
          }
          results$.push(lresult$);
        }
        return results$;
        function fn$(it){
          return it.name;
        }
      },
      update: function(data){
        var dimension, k, v, i$, to$, i, ref$, key$;
        if (!data.filter(function(it){
          return it.bind;
        }).length) {
          this.autobind(data, $scope.chart.obj.dimension);
          if (data.filter(function(it){
            return it.bind;
          })) {
            this.adopt(data, false);
          }
          return;
        }
        this.data = data;
        dimension = $scope.chart.obj.dimension;
        (function(){
          var ref$, results$ = [];
          for (k in ref$ = dimension) {
            v = ref$[k];
            results$.push(v);
          }
          return results$;
        }()).map(function(it){
          return it.fields = [];
        });
        for (i$ = 0, to$ = data.length; i$ < to$; ++i$) {
          i = i$;
          if (!data[i].bind || !dimension[data[i].bind]) {
            continue;
          }
          ((ref$ = dimension[key$ = data[i].bind] || (dimension[key$] = {})).fields || (ref$.fields = [])).push(data[i]);
        }
        for (k in dimension) {
          v = dimension[k];
          v.fieldName = v.fields.map(fn$);
        }
        return canvas.msg({
          type: 'data.update',
          data: dimension
        });
        function fn$(it){
          return it.name;
        }
      }
    },
    reset: function(chart){
      var datasetKey, this$ = this;
      datasetKey = null;
      return Promise.resolve().then(function(){
        if (chart == null && !this$.obj) {
          return;
        }
        if (chart) {
          this$.src = JSON.stringify(chart);
          this$.obj = chart;
        }
        if (chart) {
          $scope.editor.refresh();
        }
        return canvas.load(this$.obj);
      }).then(function(payload){
        var newConfig, curConfig, k, v, ref$, ref1$, ref2$;
        newConfig = JSON.parse(payload.config);
        curConfig = this$.config.value || (chart || {}).config || this$.obj.config || {};
        (function(){
          var ref$, results$ = [];
          for (k in ref$ = newConfig) {
            v = ref$[k];
            results$.push([k, v]);
          }
          return results$;
        }()).map(function(it){
          if (curConfig[it[0]]) {
            return it[1].value = curConfig[it[0]].value;
          }
        });
        this$.config.value = newConfig;
        this$.config.categorize();
        this$.dimension = JSON.parse(payload.dimension);
        for (k in ref$ = this$.obj.dimension) {
          v = ref$[k];
          if (this$.dimension[k]) {
            ref2$ = this$.dimension[k];
            ref2$.fields = (ref1$ = this$.obj.dimension[k]).fields;
            ref2$.fieldName = ref1$.fieldName;
          }
        }
        this$.obj.dimension = this$.dimension;
        return $scope.dataset.grid.isClear();
      }).then(function(v){
        var k;
        if (v) {
          datasetKey = (function(){
            var ref$, results$ = [];
            for (k in ref$ = this.dimension) {
              v = ref$[k];
              results$.push({
                k: k,
                v: v
              });
            }
            return results$;
          }.call(this$)).map(function(arg$){
            var k, v;
            k = arg$.k, v = arg$.v;
            return (v.fields[0] || {}).dataset;
          })[0];
          if (datasetKey) {
            return $scope.dataset.parse(datasetKey, this$.data.bindmap(this$.obj.dimension));
          } else {
            return this$.sample();
          }
        } else {
          return $scope.dataset.grid.load();
        }
      }).then(function(data){
        data == null && (data = []);
        $scope.chart.data.adopt(data, !!datasetKey);
        return canvas.render({
          config: plotdb.chart.config.parse(this$.config.value)
        }, this$.obj.dimension);
      })['catch'](function(it){
        return console.error(it);
      });
    },
    library: {
      hash: {},
      load: function(list){
        var tasks, item, this$ = this;
        list == null && (list = []);
        tasks = list.map(function(it){
          return [it, it.split('/')];
        }).filter(function(it){
          return !this$.hash[it[0]];
        });
        return Promise.all((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = tasks).length; i$ < len$; ++i$) {
            item = ref$[i$];
            results$.push(fn$(item));
          }
          return results$;
          function fn$(item){
            return new Promise(function(res, rej){
              var url, that;
              url = item[1];
              url = "/lib/" + url[0] + "/" + url[1] + "/index." + ((that = url[2]) ? that + '.' : '') + "js";
              return $http({
                url: url,
                method: 'GET'
              }).success(function(js){
                var bloburl;
                bloburl = URL.createObjectURL(new Blob([js], {
                  type: 'text/javascript'
                }));
                this$.hash[item[0]] = bloburl;
                return res();
              });
            });
          }
        }())).then(function(){
          var ret;
          ret = {};
          list.map(function(it){
            return ret[it] = this$.hash[it];
          });
          return ret;
        });
      }
    }
  });
  $scope.dataset = initWrap({
    init: function(){
      var this$ = this;
      eventBus.listen('sheet.dataset.saved', function(it){
        return this$.finish('save', it);
      });
      eventBus.listen('sheet.dataset.save.failed', function(it){
        return this$.failed('save', it);
      });
      eventBus.listen('sheet.dataset.loaded', function(payload){
        return this$.finish('load', payload);
      });
      eventBus.listen('sheet.dataset.parsed', function(payload){
        return this$.finish('parse', payload);
      });
      return eventBus.listen('sheet.dataset.changed', function(v){
        return $scope.chart.data.update(v);
      });
    },
    load: function(key, bindmap, force){
      var ret;
      force == null && (force = false);
      ret = this.block('load');
      eventBus.fire('sheet.dataset.load', key, bindmap, force);
      return ret;
    },
    parse: function(key, bindmap, force){
      var ret;
      force == null && (force = false);
      ret = this.block('parse');
      eventBus.fire('sheet.dataset.parse', key, bindmap, force);
      return ret;
    },
    bind: function(dimkeys, bind){
      return eventBus.fire('sheet.bind', dimkeys, bind);
    },
    save: function(name){
      eventBus.fire('sheet.dataset.save', name);
      return this.block('save');
    },
    grid: initWrap({
      init: function(){
        var this$ = this;
        eventBus.listen('sheet.grid.isClear', function(v){
          return this$.finish('isClear', v);
        });
        return eventBus.listen('sheet.grid.loaded', function(data){
          return this$.finish('load', data);
        });
      },
      load: function(){
        var ret;
        ret = this.block('load');
        eventBus.fire('sheet.grid.load');
        return ret;
      },
      isClear: function(){
        var ret;
        ret = this.block('isClear');
        eventBus.fire('sheet.grid.isClear.get');
        return ret;
      }
    })
  });
  $scope.download = initWrap({
    loading: false,
    data: null,
    init: function(){
      var this$ = this;
      $scope.$watch('canvas.dimension.custom', function(n, o){
        if (this$.format && JSON.stringify(n) !== JSON.stringify(o)) {
          this$.loading = true;
          this$.data = null;
          this$.ready = false;
          return $timeout(function(){
            return this$.fetch(this$.format);
          }, 1000);
        }
      }, true);
      $scope.$watch('canvas.dimension.value', function(n, o){
        return this$.customSize = n === 'Custom';
      });
      $scope.$watch('download.customSize', function(n, o){
        if (n !== o) {
          return canvas.dimension.set(n ? 'Custom' : 'default');
        }
      });
      return dispatcher.register('snapshot', function(payload){
        var data, format, ext, size, url, bytes, mime, buf, ints, i$, to$, idx;
        data = payload.data, format = payload.format;
        ext = "png";
        if (data) {
          if (/svg/.exec(format)) {
            size = data.length;
            url = URL.createObjectURL(new Blob([data], {
              type: 'image/svg+xml'
            }));
            ext = "svg";
          } else if (/png/.exec(format)) {
            bytes = atob(data.split(',')[1]);
            mime = data.split(',')[0].split(':')[1].split(';')[0];
            buf = new ArrayBuffer(bytes.length);
            ints = new Uint8Array(buf);
            for (i$ = 0, to$ = bytes.length; i$ < to$; ++i$) {
              idx = i$;
              ints[idx] = bytes.charCodeAt(idx);
            }
            size = bytes.length;
            url = URL.createObjectURL(new Blob([buf], {
              type: 'image/png'
            }));
          }
        }
        return import$($scope.download, {
          loading: false,
          ready: data ? true : false,
          url: url,
          size: size,
          filename: $scope.chart.obj.name + "." + ext
        });
      });
    },
    clear: function(){
      return this.loading = false, this.data = null, this.ready = false, this.format = '', this;
    },
    fetch: function(format){
      var data, size, url;
      format == null && (format = 'svg');
      this.format = format;
      this.loading = true;
      this.data = null;
      this.ready = false;
      this.format = format;
      this.loading = true;
      if (format === 'plotdb') {
        data = JSON.stringify($scope.chart);
        size = data.length;
        url = URL.createObjectURL(new Blob([data], {
          type: 'application/json'
        }));
        return import$(this, {
          loading: false,
          ready: true,
          url: url,
          size: size,
          filename: $scope.chart.name + ".json"
        });
      } else {
        return canvas.msg({
          type: 'snapshot',
          format: format
        });
      }
    }
  });
  $scope.paledit = {
    edit: function(v){
      return eventBus.fire('paledit.edit', v);
    }
  };
  $scope.coloredit = {
    idx: 0,
    config: function(v){
      return {
        'class': "no-palette text-input top",
        context: "context-" + (this.idx++),
        exclusive: true,
        palette: [v.value]
      };
    }
  };
  $scope.settingPanel = initWrap({
    tab: 'publish',
    init: function(){
      var this$ = this;
      $scope.permtype = (window.permtype || (window.permtype = []))[1] || 'none';
      $scope.writable = permService.isEnough($scope.permtype, 'write');
      $scope.isAdmin = permService.isEnough($scope.permtype, 'admin');
      $scope.$watch('settingPanel.chart', function(cur, old){
        var k, v, results$ = [];
        if (!$scope.chart.obj) {
          return;
        }
        for (k in cur) {
          v = cur[k];
          if (!v && !old[k]) {
            continue;
          }
          results$.push($scope.chart.obj[k] = v);
        }
        return results$;
      }, true);
      $scope.$watch('chart.obj.inherit', function(it){
        return this$.chart.inherit = it;
      }, true);
      $scope.$watch('chart.obj.basetype', function(it){
        return this$.chart.basetype = it;
      });
      $scope.$watch('chart.obj.visualencoding', function(it){
        return this$.chart.visualencoding = it;
      });
      $scope.$watch('chart.obj.category', function(it){
        return this$.chart.category = it;
      });
      $scope.$watch('chart.obj.tags', function(it){
        return this$.chart.tags = it;
      });
      return $scope.$watch('chart.obj.library', function(it){
        return this$.chart.library = it;
      });
    },
    toggle: function(tab){
      if (tab) {
        this.tab = tab;
      }
      return this.toggled = !this.toggled;
    },
    toggled: false,
    chart: {
      basetype: null,
      visualencoding: null,
      category: null,
      tags: null,
      library: null,
      inherit: null
    }
  });
  $scope.sharePanel = initWrap({
    embed: {
      width: '100%',
      height: '600px',
      widthRate: 4,
      heightRate: 3
    },
    init: function(){
      var this$ = this;
      $scope.$watch('chart.obj.key', function(){
        if ($scope.chart) {
          return this$.link = chartService.sharelink($scope.chart.obj || {
            key: ''
          });
        }
      });
      return ['#edit-sharelink-btn', '#edit-sharelink', '#edit-embedcode-btn', '#edit-embedcode'].map(function(eventsrc){
        var clipboard, embedcodeGenerator;
        clipboard = new Clipboard(eventsrc);
        clipboard.on('success', function(){
          $(eventsrc).tooltip({
            title: 'copied',
            trigger: 'click'
          }).tooltip('show');
          return setTimeout(function(){
            return $(eventsrc).tooltip('hide');
          }, 1000);
        });
        clipboard.on('error', function(){
          $(eventsrc).tooltip({
            title: 'Press Ctrl+C to Copy',
            trigger: 'click'
          }).tooltip('show');
          return setTimeout(function(){
            return $(eventsrc).tooltip('hide');
          }, 1000);
        });
        embedcodeGenerator = function(){
          var link, ref$, w, h, wr, hr, ratio;
          link = this$.link;
          ref$ = [this$.embed.width, this$.embed.height], w = ref$[0], h = ref$[1];
          ref$ = [this$.embed.widthRate, this$.embed.heightRate], wr = ref$[0], hr = ref$[1];
          ratio = (hr / (wr || hr || 1)) * 100;
          if (/^\d+$/.exec(w)) {
            w = w + 'px';
          }
          if (/^\d+$/.exec(h)) {
            h = h + 'px';
          }
          if ($scope.sharePanel.aspectRatio) {
            return ["<div style=\"width:100%\"><div style=\"position:relative;height:0;overflow:hidden;", "padding-bottom:" + ratio + "%\"><iframe src=\"" + link + "\" frameborder=\"0\" allowfullscreen=\"true\" ", "style=\"position:absolute;top:0;left:0;width:100%;height:100%\"></iframe></div></div>"].join("");
          } else {
            return ["<iframe src=\"" + link + "\" width=\"" + w + "\" height=\"" + h + "\" ", "allowfullscreen=\"true\" frameborder=\"0\"></iframe>"].join("");
          }
        };
        $scope.$watch('sharePanel.embed', function(){
          return this$.embedcode = embedcodeGenerator();
        }, true);
        $scope.$watch('sharePanel.aspectRatio', function(){
          return this$.embedcode = embedcodeGenerator();
        });
        return $scope.$watch('sharePanel.link', function(){
          return this$.embedcode = embedcodeGenerator();
        });
      });
    }
  });
  $scope.local = {
    get: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        return res({});
      });
    }
  };
  $scope.bind = function(dimension, dataset){
    var k, v;
    (function(){
      var ref$, results$ = [];
      for (k in ref$ = dimension) {
        v = ref$[k];
        results$.push(v);
      }
      return results$;
    }()).map(function(it){
      return it.fieldName = [], it.fields = [], it;
    });
    dataset.fields.map(function(f){
      if (f.bind) {
        return dimension[f.bind].fields.push(f);
      }
    });
    return (function(){
      var ref$, results$ = [];
      for (k in ref$ = dimension) {
        v = ref$[k];
        results$.push(v);
      }
      return results$;
    }()).map(function(it){
      return it.fieldName = it.fields.map(function(it){
        return it.name;
      });
    });
  };
  $scope._save = function(){
    var chart, parentKey, refresh, data, this$ = this;
    if (this.save.pending) {
      return;
    }
    this.save.pending = true;
    chart = $scope.chart.obj;
    chart.config = $scope.chart.config.value;
    if (!$scope.writable && chart.owner !== $scope.user.data.key) {
      parentKey = chart.key || null;
      chart.key = null;
      chart.owner = null;
      chart.inherit = [];
      if (!chart.permission) {
        chart.permission = {
          'switch': 'publish',
          list: []
        };
      }
      if (parentKey) {
        chart.parent = parentKey;
      }
    }
    refresh = !chart.key ? true : false;
    data = null;
    return $scope.local.get().then(function(local){
      chart.local = local;
      data = chart.data;
      chart.data = null;
      return new chartService.chart(chart).save();
    })['finally'](function(){
      this$.save.pending = false;
      return eventBus.fire('loading.dimmer.off');
    }).then(function(ret){
      chart.data = data;
      return this$.$apply(function(){
        plNotify.send('success', "saved");
        if (refresh) {
          return window.location.href = chartService.link({
            key: ret
          }, 'v2');
        }
      });
    })['catch'](function(err){
      return this$.$apply(function(){
        if (err[2] === 402) {
          eventBus.fire('quota.widget.on');
          return plNotify.send('danger', "Failed: Quota exceeded");
        } else {
          plNotify.aux.error.io('save', 'chart', err);
          return console.error("[save " + name + "]", err);
        }
      });
    });
  };
  $scope.save = function(){
    var chart, promise, this$ = this;
    chart = $scope.chart.obj;
    if (!$scope.user.authed()) {
      $scope.auth.toggle(true);
      return Promise.reject();
    }
    if (this.save.pending) {
      return Promise.reject();
    }
    promise = chart.owner !== $scope.user.data.key || !chart.name || !chart.key
      ? $scope.chartModal.name.prompt()
      : Promise.resolve();
    return promise.then(function(name){
      if (name) {
        chart.name = name;
      }
      $scope.$apply(function(){
        return eventBus.fire('loading.dimmer.on');
      });
      return $scope.dataset.save(chart.name);
    }).then(function(dataset){
      $scope.bind(chart.dimension, dataset);
      return canvas.msg({
        type: 'save'
      });
    })['catch'](function(it){
      return console.log(it);
    });
  };
  dispatcher.register('save', function(payload){
    if (payload.payload) {
      $scope.chart.obj.thumbnail = payload.data;
    }
    return $scope._save();
  });
  initWrap.run();
  return $timeout(function(){
    var this$ = this;
    if (window.chart) {
      return $scope.$apply(function(){
        return $scope.chart.reset(window.chart);
      });
    } else {
      return plotdb.load(2251, function(chart){
        var this$ = this;
        return $scope.$apply(function(){
          return $scope.chart.reset(JSON.parse(chart._._chart));
        });
      });
    }
  }, 1000);
}));
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}