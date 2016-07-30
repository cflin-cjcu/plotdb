// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.controller('plSelectController', ['$scope'].concat(function($scope){
  $scope.portal = {
    data: [],
    options: [],
    type: ""
  };
  $scope.init = function(data, type){
    $scope.portal.data = data;
    return $scope.type = type;
  };
  $scope.remove = function(item, $event){
    var idx;
    idx = $scope.portal.data.indexOf(item);
    if (idx < 0) {
      return;
    }
    $scope.portal.data.splice(idx, 1);
    $event.stopPropagation();
    return $event.preventDefault();
  };
  return $scope.add = function(item, $event){
    if ($scope.portal.data.indexOf(item) >= 0 || $scope.portal.data.filter(function(it){
      return it.key === item.key;
    }).length) {
      return;
    }
    return $scope.portal.data.push(item);
  };
}));
x$.directive('plselect', ['$compile', '$timeout', 'entityService', '$http'].concat(function($compile, $timeout, entityService, $http){
  return {
    require: [],
    restrict: 'A',
    scope: {
      portal: '=ngPortal'
    },
    link: function(s, e, a, c){
      var dropdown, input, paging, fetch, repos, close;
      dropdown = e.find('.select-dropdown');
      input = e.find('input');
      paging = {
        limit: 20,
        offset: 0
      };
      fetch = function(keyword){
        s.portal.loading = true;
        return $timeout(function(){
          return $http({
            url: "/d/entity/?keyword=" + keyword + "&limit=" + paging.limit + "&offset=" + paging.offset,
            method: 'GET'
          }).success(function(d){
            if (paging.offset === 0) {
              s.portal.options = d;
            } else {
              s.portal.options = (s.portal.options || []).concat(d);
            }
            s.portal.loading = false;
            return paging.offset += paging.limit;
          });
        }, 1000);
      };
      repos = function(){
        var last, scrolltop, base, x, y, w;
        if (!e[0]) {
          return;
        }
        last = e.find('.select-input div.select-option:last-of-type')[0];
        scrolltop = e.find('.select-input')[0].scrollTop;
        base = e[0].getBoundingClientRect();
        if (last) {
          last = last.getBoundingClientRect();
        } else {
          last = {
            left: base.left,
            width: 0,
            top: base.top + 6,
            height: base.height
          };
        }
        x = last.left + last.width - base.left + 4;
        y = last.top - base.top - 1 + scrolltop;
        w = base.width - x - 10;
        repos.newline = false;
        if (w < last.width) {
          repos.newline = true;
          x = 6;
          y = last.bottom + 3 - base.top + scrolltop;
          w = base.width - 12;
        }
        input.css('left', x + "px");
        input.css('top', y + "px");
        input.css('width', w + "px");
        return input.css('position', 'absolute');
      };
      close = function(delay){
        if (close.closing) {
          $timeout.cancel(close.closing);
        }
        return close.closing = $timeout(function(){
          close.closing = 0;
          dropdown.hide();
          e.removeClass('open');
          if (repos.newline) {
            return input.hide();
          }
        }, delay);
      };
      close.closing = 0;
      close.cancel = function(){
        if (close.closing) {
          $timeout.cancel(close.closing);
        }
        return close.closing = 0;
      };
      s.$watch('portal.data', function(){
        return $timeout(function(){
          return repos();
        }, 10);
      }, true);
      e.find('.select-input').on('click', function(it){
        if (it.target.tagName === 'I' && it.target.className === "fa fa-close") {
          return;
        }
        input.show();
        input.focus();
        if (input.val()) {
          dropdown.show();
          e.addClass('open');
          return repos();
        }
      });
      dropdown.on('click', function(){
        close.cancel();
        input.show();
        input.focus();
        if (input.val()) {
          dropdown.show();
          e.addClass('open');
          return repos();
        }
      });
      input.on('blur', function(){
        return close(100);
      });
      input.on('keydown', function(ev){
        var keycode, lastValue;
        keycode = ev.keyCode;
        if (keycode === 27) {
          return input.blur();
        }
        dropdown.show();
        paging = {
          limit: 20,
          offset: 0
        };
        s.portal.options = [];
        lastValue = input.val();
        return $timeout(function(){
          s.portal.needchar = 3 - input.val().length;
          if (input.val().length >= 3) {
            fetch(input.val());
          }
          if (ev.keyCode === 8 && !input.val() && !lastValue) {
            return s.$apply(function(){
              s.portal.data.splice(s.portal.data.length - 1, 1);
              return repos();
            });
          }
        }, 0);
      });
      return dropdown.on('scroll', function(ev){
        var base, last, y;
        base = dropdown[0].getBoundingClientRect();
        last = dropdown.find('.select-option');
        if (!last.length) {
          return;
        }
        last = last[last.length - 1].getBoundingClientRect();
        y = last.top + last.height - base.top - base.height;
        if (y < 5 && !s.portal.loading) {
          return s.$apply(function(){
            return fetch(input.val());
          });
        }
      });
    }
  };
}));
x$.controller('selecttest', ['$scope'].concat(function($scope){
  $scope.blah = [
    {
      key: 2,
      displayname: "Kirby",
      avatar: "team-29"
    }, {
      key: 3,
      displayname: "PlotDB",
      avatar: "team-32"
    }, {
      key: 4,
      displayname: "twstat",
      avatar: "team-33"
    }, {
      key: 5,
      displayname: "CWB",
      avatar: "team-29"
    }
  ];
  $scope.$watch('blah', function(it){
    return console.log("watch changed: ", it);
  }, true);
  return $scope.gogo = function(){
    return $scope.blah = [{
      key: 123,
      displayname: '123',
      id: 123
    }];
  };
}));