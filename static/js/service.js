// Generated by LiveScript 1.3.1
var x$, slice$ = [].slice;
x$ = angular.module('plotDB');
x$.service('Modal', ['$rootScope'].concat(function($rootScope){
  var Modal;
  Modal = {};
  Modal.control = function(){
    this.toggled = {};
    return this;
  };
  Modal.control.prototype = {
    toggle: function(v, type){
      var list, k, this$ = this;
      list = type != null
        ? [type]
        : (function(){
          var results$ = [];
          for (k in this.toggled) {
            results$.push(k);
          }
          return results$;
        }.call(this));
      return list.forEach(function(k){
        return this$.toggled[k] = !(v != null) ? !this$.toggled[k] : v;
      });
    }
  };
  return Modal;
}));
x$.service('Paging', ['$rootScope', '$timeout'].concat(function($rootScope, $timeout){
  var Paging;
  return Paging = {
    session: 0,
    offset: 0,
    limit: 30,
    end: false,
    loading: false,
    handle: null,
    loadOnScroll: function(cb, beacon, container){
      var that;
      return ((that = $(container)[0]) ? that : window).addEventListener('scroll', function(v){
        var c, b, scrolltop, that, height, top, ptop, this$ = this;
        if (container) {
          c = $(container)[0];
        }
        if (beacon) {
          b = $(beacon)[0];
        }
        if (!c || !b) {
          return;
        }
        scrolltop = c
          ? c.scrollTop
          : (that = document.body.scrollTop)
            ? that
            : document.querySelector('html').scrollTop;
        height = (c || document.body).getBoundingClientRect().height;
        top = b.getBoundingClientRect().top;
        ptop = c ? c.getBoundingClientRect().top : 0;
        if (height + 50 > top - ptop) {
          if (!this.loading && !this.end) {
            return $rootScope.$apply(function(){
              return cb();
            });
          }
        }
      });
    },
    load: function(load, lazy, reset, hashkey){
      var this$ = this;
      lazy == null && (lazy = 500);
      reset == null && (reset = false);
      hashkey == null && (hashkey = '');
      return new Promise(function(res, rej){
        if (this$.loading) {
          return res([]);
        }
        if (this$.handle) {
          $timeout.cancel(this$.handle);
        }
        this$.loading = true;
        return this$.handle = $timeout(function(){
          var session;
          if (reset) {
            this$.offset = 0;
            this$.end = false;
            this$.session = Math.random() + "";
          }
          session = this$.session;
          this$.handle = null;
          return load(this$).then(function(ret){
            return $rootScope.$apply(function(){
              if (session !== this$.session) {
                res([]);
              }
              if (!ret || (hashkey ? ret[hashkey] || (ret[hashkey] = []) : ret).length === 0) {
                this$.end = true;
              }
              this$.loading = false;
              this$.offset = this$.offset + ((hashkey ? ret[hashkey] || (ret[hashkey] = []) : ret).length || 0);
              return res(ret);
            });
          });
        }, lazy);
      });
    },
    flexWidth: function(list){
      var hit, i$, to$, i, d, width, results$ = [];
      hit = false;
      for (i$ = 0, to$ = list.length; i$ < to$; ++i$) {
        i = i$;
        d = list[i];
        width = 320;
        if (Math.random() > 0.6 && !hit) {
          width = Math.random() > 0.8 ? 640 : 480;
          hit = true;
        }
        if (i % 3 === 2) {
          if (!hit) {
            width = 640;
          }
          hit = false;
        }
        results$.push(d.width = width);
      }
      return results$;
    }
  };
}));
x$.service('baseService', ['$rootScope', 'IOService', 'eventBus'].concat(function($rootScope, IOService, eventBus){
  var serviceSkeleton, baseObject, baseService;
  serviceSkeleton = {
    type: null,
    items: null,
    sample: [],
    backup: function(item){
      return IOService.backup(item);
    },
    backups: function(item){
      return IOService.backups(item);
    },
    cleanBackups: function(item){
      return IOService.cleanBackups(item);
    },
    save: function(item, param){
      var this$ = this;
      return IOService.save(item, param).then(function(ret){
        return new Promise(function(res, rej){
          return $rootScope.$applyAsync(function(){
            var idx;
            item.key = ret.key;
            idx = (this$.items || (this$.items = [])).map(function(it){
              return it.key;
            }).indexOf(ret.key);
            if (idx < 0) {
              (this$.items || (this$.items = [])).push(item);
            } else {
              this$.items.splice(idx, 1, item);
            }
            return res(item);
          });
        });
      });
    },
    load: function(_type, key, refresh){
      var filter, this$ = this;
      refresh == null && (refresh = false);
      filter = function(it){
        return it._type.location === _type.location && it._type.name === _type.name && it.key === key;
      };
      return IOService.load(_type, key).then(function(ret){
        return new Promise(function(res, rej){
          return $rootScope.$applyAsync(function(){
            var item;
            item = (this$.items || []).filter(filter)[0];
            if (item) {
              import$(item, ret);
            } else if (this$.items) {
              this$.items.push(item = ret);
            } else {
              this$.items = [item = ret];
            }
            return res(item);
          });
        });
      });
    },
    'delete': function(item){
      var this$ = this;
      return IOService['delete'](item._type, item.key).then(function(ret){
        return new Promise(function(res, rej){
          return $rootScope.$applyAsync(function(){
            var idx;
            idx = (this$.items || (this$.items = [])).map(function(it){
              return it.key;
            }).indexOf(item.key);
            if (idx >= 0) {
              this$.items.splice(idx, 1);
            }
            return res(ret);
          });
        });
      });
    }
    /*
    list: (_type, filter = {}, force = false) ->
      if !_type => _type = {location: \any, name: @type}
      if @items and !force => return Promise.resolve(@items)
      if !@items => @items = []
      (ret) <~ IOService.list _type .then
      (res, rej) <~ new Promise _
      <~ $rootScope.$apply-async
      @items.splice 0, @items.length
      @items.concat(ret.map(~>new @Object(it))).concat((@sample or []).map(~> new @Object(it)))
      Array.prototype.splice.apply(
        @items
        [0, ret.length + @sample.length] ++ (ret ++ @sample).map(~>new @Object it)
      )
      res @items
    */
  };
  baseObject = function(name, config){
    import$(this, {
      _type: {
        location: 'server',
        name: name
      },
      owner: null,
      key: null,
      permission: {
        'switch': [],
        value: []
      }
    });
    return import$(this, config);
  };
  baseService = {
    wrapper: function(name, callee){
      return function(config){
        var list;
        list = slice$.call(arguments, 1);
        baseObject.apply(this, [name, config].concat(list));
        callee.apply(this, [config].concat(list));
        return this;
      };
    },
    derive: function(name, service, callee){
      service = import$(import$({}, serviceSkeleton), service);
      service.type = name;
      service[name] = service.Object = this.wrapper(name, callee);
      baseObject.prototype = {
        save: function(){
          var this$ = this;
          return service.save(this).then(function(ret){
            return this$.key = ret.key;
          });
        },
        load: function(){
          var this$ = this;
          return service.load(this._type, this.key).then(function(ret){
            return import$(this$, ret);
          });
        },
        'delete': function(){
          return service['delete'](this);
        },
        clone: function(){
          var ref$;
          return ref$ = new service.Object(JSON.parse(JSON.stringify(this))), ref$.key = null, ref$;
        },
        backup: function(){
          return service.backup(this);
        },
        backups: function(){
          return service.backups(this);
        },
        cleanBackups: function(){
          return service.cleanBackups(this);
        },
        recover: function(backup){
          return import$(this, backup);
        }
      };
      import$(import$(service.Object.prototype, baseObject.prototype), callee.prototype);
      callee.prototype = service.Object.prototype;
      return service;
    }
  };
  return baseService;
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}