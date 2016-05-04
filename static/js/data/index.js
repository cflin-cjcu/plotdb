// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.service('dataService', ['$rootScope', '$http', 'IOService', 'sampleData', 'baseService', 'plNotify', 'eventBus', 'plConfig'].concat(function($rootScope, $http, IOService, sampleData, baseService, plNotify, eventBus, plConfig){
  var name, service, Field, Dataset, dataService;
  name = 'dataset';
  service = {
    sample: sampleData,
    link: function(dataset){
      if (dataset._type.location === 'server') {
        return "/dataset/" + dataset.key + "/";
      }
      return "/dataset/?k=c" + dataset.key;
    },
    cache: {},
    cachedLoad: function(_type, key){
      if (_type.location === 'local') {
        return this.load(_type, key);
      }
      if (this.cache[key]) {
        Promise.resolve(this.cache[key]);
      }
      return this.load(_type, key);
    },
    list: function(){
      return IOService.listRemotely({
        name: 'dataset',
        location: 'server'
      }).then(function(r){
        return r.map(function(it){
          return new Dataset(it);
        });
      });
    },
    init: function(){},
    localinfo: {
      rows: 0,
      size: 0,
      update: function(){
        var i$, ref$, len$, item, results$ = [];
        this.rows = 0;
        this.size = 0;
        for (i$ = 0, len$ = (ref$ = service.items).length; i$ < len$; ++i$) {
          item = ref$[i$];
          if (item._type.location === 'local') {
            this.rows += item.rows;
            results$.push(this.size += item.size);
          }
        }
        return results$;
      }
    }
  };
  Field = function(config){
    import$((this.dataset = null, this.location = 'server', this.name = null, this.datatype = null, this.data = [], this), config);
    return this;
  };
  Field.prototype = {
    update: function(){
      var this$ = this;
      return dataService.cachedLoad({
        location: this.location,
        name: 'dataset'
      }, this.dataset).then(function(dataset){
        var matched;
        matched = dataset.fields.filter(function(it){
          return it.name === this$.name;
        })[0];
        if (!matched) {
          return console.error("failed to update field data");
        }
        return import$(this$, matched);
      });
    }
    /*
    #toJson: -> angular.toJson(@{name, type} <<< {dataset: @dataset{type, key}})
    #TODO this might be called individually. should propagate to dataset?
    update: ->
      # failed only if remote dataset fetching failed
      (dataset) <~ @get-dataset!then
      if !dataset => return # standalone field won't need to update
      @data = dataset.[]data.map(~>it[@name])
      @settype!
    set-dataset: (dataset = null) -> # set null to clear dataset
      #if !dataset.type or !dataset.key => return Promise.reject(null)
      #(ret) <~ dataService.load dataset.type, dataset.key .then
      @_.dataset = dataset
      if dataset and dataset._type and dataset.key =>
        @dataset <<< dataset{_type, key} <<< {name: dataset.name}
      else @dataset._type <<< {_type: {}, key: null, name: null}
      Promise.resolve(dataset)
    get-dataset: -> # provide dataset or null for standalone field
      if @_.dataset => return Promise.resolve(that)
      if !@dataset._type or !@dataset.key => return Promise.resolve(null)
      (ret) <~ dataService.load @dataset._type, @dataset.key .then
      @_.dataset = ret
      @dataset <<< ret{_type, key} <<< {name: ret.name}
      @_.dataset
    settype: ->
      types = <[Boolean Percent Number Date String]> ++ [null]
      for type in types =>
        if !type => return @type = \String
        if !@data.map(-> plotdb[type]test it).filter(->!it).length =>
          @type = type
          break
    */
  };
  Dataset = function(config){
    import$(this, {
      name: "",
      description: "",
      type: "static",
      format: "csv",
      owner: null,
      createdtime: new Date(),
      modifiedtime: new Date(),
      permission: {
        'switch': [],
        value: []
      },
      fields: [],
      _type: {
        location: 'server',
        name: 'dataset'
      }
    });
    import$(this, config);
    this.setFields(this.fields);
    return this;
  };
  Dataset.prototype = {
    setFields: function(fields){
      var res$, k, v, i$, ref$, len$, f1, j$, len1$, f2, this$ = this, results$ = [];
      fields == null && (fields = null);
      if (!fields || typeof fields !== 'object') {
        return;
      }
      if (!Array.isArray(fields)) {
        res$ = [];
        for (k in fields) {
          v = fields[k];
          res$.push({
            name: k,
            data: v
          });
        }
        fields = res$;
      }
      fields = fields.map(function(it){
        return new Field((it.dataset = this$.key, it.datasetname = this$.name, it.location = this$._type.location, it));
      });
      for (i$ = 0, len$ = (ref$ = this.fields).length; i$ < len$; ++i$) {
        f1 = ref$[i$];
        for (j$ = 0, len1$ = fields.length; j$ < len1$; ++j$) {
          f2 = fields[j$];
          if (f1.name !== f2.name) {
            continue;
          }
          f2.key = f1.key;
        }
      }
      this.fields = fields;
      this.rows = this.rows || ((ref$ = this.fields[0] || {}).data || (ref$.data = [])).length;
      this.size = 0;
      for (i$ = 0, len$ = (ref$ = this.fields).length; i$ < len$; ++i$) {
        f1 = ref$[i$];
        results$.push(this.size += (f1.data || "").length + ((f1.name || "").length + 1));
      }
      return results$;
    },
    update: function(){}
  };
  service.Field = Field;
  dataService = baseService.derive(name, service, Dataset);
  return dataService;
}));
x$.controller('dataEditCtrl', ['$scope', '$timeout', '$http', 'dataService', 'eventBus', 'plNotify'].concat(function($scope, $timeout, $http, dataService, eventBus, plNotify){
  import$($scope, {
    rawdata: "",
    dataset: null,
    worker: new Worker("/js/data/worker.js"),
    loading: true,
    inited: false
  });
  $scope.name = null;
  $scope.save = function(locally){
    var columnLength, k;
    locally == null && (locally = false);
    if (!$scope.dataset || !$scope.dataset.name) {
      return;
    }
    if (!$scope.user.authed()) {
      return $scope.auth.toggle(true);
    }
    columnLength = (function(){
      var ref$, results$ = [];
      for (k in (ref$ = $scope.parse).result || (ref$.result = {})) {
        results$.push(k);
      }
      return results$;
    }()).length;
    if (columnLength >= 30) {
      return plNotify.send('danger', "maximal 30 columns is allowed. you have " + columnLength);
    }
    return $scope.parse.run(true).then(function(){
      var isCreate;
      $scope.dataset._type.location = locally ? 'local' : 'server';
      $scope.dataset.setFields($scope.parse.result);
      isCreate = !$scope.dataset.key ? true : false;
      $scope.loading = true;
      return $scope.dataset.save().then(function(){
        $scope.$apply(function(){
          return plNotify.send('success', "dataset saved");
        });
        if (isCreate) {
          if ($scope.$parent && $scope.$parent.inlineCreate) {
            return $scope.$parent.inlineCreate($scope.dataset);
          } else {
            return setTimeout(function(){
              return window.location.href = dataService.link($scope.dataset);
            }, 1000);
          }
        } else {
          return $scope.loading = false;
        }
      })['catch'](function(e){
        console.log(e.stack);
        $scope.loading = false;
        return $scope.$apply(function(){
          return plNotify.aux.error.io('save', 'data', e);
        });
      });
    });
  };
  $scope.load = function(_type, key){
    var this$ = this;
    return dataService.load(_type, key).then(function(ret){
      $scope.dataset = new dataService.dataset(ret);
      $scope.parse.revert($scope.dataset);
      return $scope.inited = true;
    })['catch'](function(ret){
      console.error(ret);
      plNotify.send('error', "failed to load dataset. please try reloading");
      if (ret[1] === 'forbidden') {
        window.location.href = '/403.html';
      }
      return $scope.inited = true;
    });
  };
  $scope['delete'] = function(dataset){
    return dataset['delete']().then(function(){
      plNotify.send('success', "dataset deleted");
      return $timeout(function(){
        return window.location.href = "/dataset/";
      }, 1300);
    })['catch'](function(ret){
      console.error(ret);
      return plNotify.send('error', "failed to delete dataset. please try later.");
    });
  };
  $scope.loadDataset = function(dataset){
    var fields;
    $scope.dataset = dataset;
    $scope.name = dataset.name;
    fields = dataset.fields.map(function(it){
      return it.name;
    });
    return $scope.rawdata = ([fields.join(",")].concat(dataset.data.map(function(obj){
      return fields.map(function(it){
        return obj[it];
      }).join(',');
    }))).join('\n');
  };
  import$($scope, {
    communicate: function(){
      return $scope.worker.onmessage = function(arg$){
        var payload;
        payload = arg$.data;
        if (typeof payload !== 'object') {
          return;
        }
        switch (payload.type) {
        case "parse.revert":
          $scope.rawdata = payload.data;
          return $scope.loading = false;
        }
      };
    },
    reset: function(rawdata){
      var dataset;
      dataset = new dataService.dataset(window.dataset || {});
      if ($scope.dataset && $scope.dataset.name) {
        dataset.name = $scope.dataset.name;
      }
      return $scope.dataset = dataset, $scope.rawdata = rawdata, $scope;
    },
    init: function(){
      var ret1, ret2, that, ret, offset;
      this.reset("");
      ret1 = /\/dataset\//.exec(window.location.pathname) ? /[?&]k=([sc])([^&?#]+)/.exec(window.location.search || "") : null;
      ret2 = /^\/data(s)et\/([0-9]+)\/?/.exec(window.location.pathname || "");
      if (that = ret1 || ret2) {
        ret = that;
        $scope.dataset.key = ret[2];
        $scope.load({
          location: ret[1] === 's' ? 'server' : 'local',
          name: 'dataset'
        }, ret[2]);
      } else {
        $scope.inited = true;
      }
      $scope.$watch('rawdata', function(){
        return $scope.parse.run();
      });
      offset = $('#dataset-editbox textarea').offset();
      $('#dataset-editbox textarea').css({
        height: (window.innerHeight - offset.top - 140) + "px"
      });
      $('.float-dataedit textarea').css({
        height: (window.innerHeight - offset.top - 240) + "px"
      });
      $('[data-toggle="tooltip"]').tooltip();
      return this.communicate();
    }
  });
  $scope.parse = {
    rows: 0,
    fields: 0,
    size: 0,
    result: null,
    loading: false,
    handle: null,
    revert: function(dataset){
      $scope.loading = true;
      return $scope.worker.postMessage({
        type: "parse.revert",
        data: dataset
      });
    },
    run: function(force){
      var this$ = this;
      force == null && (force = false);
      return new Promise(function(res, rej){
        var _;
        $scope.loading = true;
        _ = function(){
          this$.handle = null;
          this$.result = {};
          this$.size = $scope.rawdata.length;
          return Papa.parse($scope.rawdata || "", {
            worker: true,
            header: true,
            step: function(arg$){
              var rows, i$, len$, row, lresult$, k, v, ref$, results$ = [];
              rows = arg$.data;
              for (i$ = 0, len$ = rows.length; i$ < len$; ++i$) {
                row = rows[i$];
                lresult$ = [];
                for (k in row) {
                  v = row[k];
                  lresult$.push(((ref$ = this$.result)[k] || (ref$[k] = [])).push(v));
                }
                results$.push(lresult$);
              }
              return results$;
            },
            complete: function(){
              var values, k, v;
              values = (function(){
                var ref$, results$ = [];
                for (k in ref$ = this.result) {
                  v = ref$[k];
                  results$.push(v);
                }
                return results$;
              }.call(this$)) || [];
              return $scope.$apply(function(){
                this$.fields = values.length;
                this$.rows = (values[0] || []).length;
                $scope.loading = false;
                if (this$.rows > 0 && !$scope.dataset.name) {
                  $('#dataset-editbox-meta .input-group input').tooltip('show');
                }
                return res(this$.result);
              });
            }
          });
        };
        if (this$.handle) {
          $timeout.cancel(this$.handle);
        }
        if (force) {
          return _();
        } else {
          return this$.handle = $timeout(function(){
            return _();
          }, force ? 0 : 1000);
        }
      });
    }
  };
  $scope.parser = {
    encoding: 'UTF-8',
    csv: {
      toggle: function(){
        return setTimeout(function(){
          return $('#data-edit-csv-modal').modal('show');
        }, 0);
      },
      read: function(){
        var file, reader;
        file = $('#data-edit-csv-file')[0].files[0];
        reader = new FileReader();
        reader.onload = function(e){
          $scope.$apply(function(){
            return $scope.reset(e.target.result.trim());
          });
          return $('#data-edit-csv-modal').modal('hide');
        };
        reader.onerror = function(e){};
        return reader.readAsText(file, $scope.parser.encoding);
      }
    },
    gsheet: {
      url: null,
      toggle: function(){
        return setTimeout(function(){
          return $('#data-edit-gsheet-modal').modal('show');
        }, 0);
      },
      read: function(){
        var ret, key, url;
        ret = /\/d\/([^\/]+)/.exec($scope.parser.gsheet.url);
        if (!ret) {
          return;
        }
        key = ret[1];
        url = "https://spreadsheets.google.com/feeds/list/" + key + "/1/public/values?alt=json";
        return $http({
          url: url,
          method: 'GET'
        }).success(function(data){
          var fields, res$, k, lines;
          fields = {};
          data.feed.entry.map(function(it){
            var key, that, results$ = [];
            for (key in it) {
              if (that = /^gsx\$(.+)$/.exec(key)) {
                results$.push(fields[that[1]] = 1);
              }
            }
            return results$;
          });
          res$ = [];
          for (k in fields) {
            res$.push(k);
          }
          fields = res$;
          lines = [fields.join(',')].concat(data.feed.entry.map(function(it){
            var key;
            return (function(){
              var i$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = fields).length; i$ < len$; ++i$) {
                key = ref$[i$];
                results$.push((it["gsx$" + key] || {
                  $t: ""
                }).$t);
              }
              return results$;
            }()).join(',');
          }));
          $scope.$apply(function(){
            return $scope.reset(lines.join('\n'));
          });
          return setTimeout(function(){
            return $('#data-edit-gsheet-modal').modal('hide');
          }, 0);
        });
      }
    },
    link: {
      url: null,
      toggle: function(){
        return setTimeout(function(){
          return $('#dataset-edit-link-modal').modal('show');
        }, 0);
      },
      read: function(){
        return $http({
          url: "http://crossorigin.me/" + $scope.parser.link.url,
          method: 'GET'
        }).success(function(d){
          $scope.$apply(function(){
            return $scope.reset(d.trim());
          });
          return $('#dataset-edit-link-modal').modal('hide');
        });
      }
    }
  };
  eventBus.listen('dataset.delete', function(key){
    if ($scope.dataset.key === key) {
      return $scope.dataset = null;
    }
  });
  eventBus.listen('dataset.edit', function(dataset){
    return $scope.load(dataset._type, dataset.key);
  });
  return $scope.init();
}));
x$.controller('dataFiles', ['$scope', 'dataService', 'plNotify', 'eventBus'].concat(function($scope, dataService, plNotify, eventBus){
  $scope.datasets = dataService.datasets;
  return dataService.list().then(function(ret){
    $scope.datasets = ret;
    $scope.edit = function(dataset){
      return eventBus.fire('dataset.edit', dataset);
    };
    $scope.chosen = {
      dataset: null,
      key: null
    };
    $scope.toggle = function(dataset){
      var ref$;
      if (!dataset || this.chosen.key === dataset.key) {
        return ref$ = this.chosen, ref$.dataset = null, ref$.key = null, ref$;
      }
      this.chosen.key = dataset.key;
      return this.chosen.dataset = dataset;
    };
    return $scope['delete'] = function(dataset){
      var this$ = this;
      return dataset['delete']().then(function(){
        return $scope.$apply(function(){
          return $scope.datasets = $scope.datasets.filter(function(it){
            return it.key !== dataset.key;
          });
        });
      });
    };
  });
}));
x$.controller('datasetList', ['$scope', 'dataService', 'plNotify', 'eventBus'].concat(function($scope, dataService, plNotify, eventBus){
  var that;
  $scope.filter = {
    search: ""
  };
  dataService.list().then(function(datasets){
    var samples, sample;
    samples = [
      {
        fields: [{
          data: [],
          name: "blah"
        }],
        name: "1234",
        rows: 5,
        owneravatar: 'sample',
        isSample: true
      }, {
        fields: [{
          data: [],
          name: "blah"
        }],
        name: "1234",
        rows: 5,
        owneravatar: 'sample',
        isSample: true
      }, {
        fields: [{
          data: [],
          name: "blah"
        }],
        name: "1234",
        rows: 5,
        owneravatar: 'sample',
        isSample: true
      }, {
        fields: [{
          data: [],
          name: "blah"
        }],
        name: "1234",
        rows: 5,
        owneravatar: 'sample',
        isSample: true
      }
    ];
    sample = [];
    return $scope.$apply(function(){
      $scope.datasets = datasets.concat(samples);
      return $scope.setcur($scope.datasets[0]);
    });
  });
  $scope.chosen = {
    dataset: null,
    key: null
  };
  $scope.toggle = function(dataset){
    var ref$;
    if (!dataset || this.chosen.key === dataset.key) {
      return ref$ = this.chosen, ref$.dataset = null, ref$.key = null, ref$;
    }
    this.chosen.key = dataset.key;
    return this.chosen.dataset = dataset;
  };
  $scope['delete'] = function(dataset){
    var this$ = this;
    return dataset['delete']().then(function(){
      return $scope.$apply(function(){
        $scope.datasets = $scope.datasets.filter(function(it){
          return it.key !== dataset.key;
        });
        return plNotify.send('success', "dataset deleted.");
      });
    })['catch'](function(){
      return plNotify.send('danger', "failed to delete dataset.");
    });
  };
  $scope.inlineCreate = function(it){
    return $scope.datasets.splice(0, 0, it);
  };
  $scope.cur = null;
  $scope.setcur = function(it){
    return $scope.cur = it;
  };
  if (that = document.querySelectorAll(".ds-list")[0]) {
    return $scope.limitscroll(that);
  }
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}