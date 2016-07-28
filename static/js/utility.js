// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.filter('tags', function(){
  return function(it){
    if (Array.isArray(it)) {
      return it;
    } else {
      return (it || "").split(',');
    }
  };
});
x$.filter('date', function(){
  return function(it){
    return new Date(it);
  };
});
x$.filter('timestamp', function(){
  return function(it){
    return new Date(it).getTime();
  };
});
x$.filter('datelite', function(){
  return function(it){
    var d;
    d = new Date(it);
    return (d.getYear() + 1900) + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
  };
});
x$.filter('length', function(){
  return function(it){
    var k;
    return (function(){
      var results$ = [];
      for (k in it) {
        results$.push(k);
      }
      return results$;
    }()).length;
  };
});
x$.filter('size', function(){
  return function(it){
    if (!it || isNaN(it)) {
      return '0B';
    }
    if (it < 1000) {
      return it + "B";
    } else if (it < 1048576) {
      return parseInt(it / 102.4) / 10 + "KB";
    } else {
      return parseInt(it / 104857.6) / 10 + "MB";
    }
  };
});
x$.directive('ngfile', ['$compile'].concat(function($compile){
  return {
    require: [],
    restrict: 'A',
    scope: {
      model: '=ngData'
    },
    link: function(s, e, a, c){
      var this$ = this;
      return e.on('change', function(){
        return s.$apply(function(){
          return s.model = e[0].files;
        });
      });
    }
  };
}));
x$.directive('ngselect2', ['$compile', 'teamService'].concat(function($compile, teamService){
  return {
    require: [],
    restrict: 'A',
    scope: {
      model: '=ngData',
      istag: '@istag',
      type: '@type'
    },
    link: function(s, e, a, c){
      var changed, config, this$ = this;
      changed = function(){
        var ref$, cval, nval;
        ref$ = [s.model, $(e).val()], cval = ref$[0], nval = ref$[1];
        if (!Array.isArray(cval)) {
          return cval !== nval;
        }
        ref$ = [cval, nval].map(function(it){
          return (it || []).join(",");
        }), cval = ref$[0], nval = ref$[1];
        return cval !== nval;
      };
      if (s.type) {
        config = teamService.config.select2[s.type];
      } else {
        config = {};
      }
      if (s.istag) {
        config.tags = true;
        config.tokenSeparators = [',', ' '];
      }
      $(e).select2(config);
      $(e).select2(config).on('change', function(){
        if (changed()) {
          return setTimeout(function(){
            return s.$apply(function(){
              return s.model = $(e).val();
            });
          }, 0);
        }
      });
      return s.$watch('model', function(vals){
        var html, i$, ref$, len$, val;
        if (config.tags) {
          html = "";
          for (i$ = 0, len$ = (ref$ = vals || []).length; i$ < len$; ++i$) {
            val = ref$[i$];
            html += $("<option></option>").val(val).text(val)[0].outerHTML;
          }
          $(e).html(html);
        }
        if (changed()) {
          return setTimeout(function(){
            return $(e).val(vals).trigger('change');
          }, 0);
        }
      });
    }
  };
}));