// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.controller('payment', ['$scope', '$http', '$timeout', 'plNotify', 'eventBus', 'i18n'].concat(function($scope, $http, $timeout, plNotify, eventBus, i18n){
  $scope.payinfo = {
    cvc: null,
    exp_month: null,
    exp_year: null,
    number: null
  };
  $scope.error = {
    all: true
  };
  $scope.prices = [[0, 20, 50], [0, 200, 500]];
  $scope.check = function(target, now){
    var _check;
    if ($scope.check.handler) {
      $timeout.cancel($scope.check.handler);
    }
    _check = function(){
      var year, d6, d4, k, v;
      if (!target || target === 'exp_month') {
        $scope.error.exp_month = !/^0[1-9]|1[0-2]$/.exec($scope.payinfo.exp_month);
      }
      if (!target || target === 'exp_year') {
        year = $scope.payinfo.exp_year || "";
        if (year.length < 4) {
          year = "20" + year;
        }
        $scope.error.exp_year = !/^2[01][0-9]{2}$/.exec(year) || new Date().getYear() + 1900 > +year;
      }
      if (!target || target === 'cvc') {
        $scope.error.cvc = !/^[0-9][0-9][0-9]$/.exec($scope.payinfo.cvc);
      }
      if (!target || target === 'number') {
        $scope.error.number = !/^[0-9]{16}$/.exec($scope.payinfo.number);
        d6 = +($scope.payinfo.number || "").substring(0, 6);
        d4 = +($scope.payinfo.number || "").substring(0, 4);
        if (/^4/.exec($scope.payinfo.number)) {
          $scope.cardtype = 'Visa';
        } else if (/^3[47]/.exec($scope.payinfo.number)) {
          $scope.cardtype = 'American Express';
        } else if (d4 >= 3528 && d4 <= 3589) {
          $scope.cardtype = 'JCB';
        } else if ((d6 >= 510000 && d6 <= 559999) || (d6 >= 222100 && d6 <= 272099)) {
          $scope.cardtype = 'MasterCard';
        } else {
          $scope.cardtype = '';
        }
      }
      $scope.error.all = false;
      return $scope.error.all = (function(){
        var ref$, results$ = [];
        for (k in ref$ = $scope.error) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }()).filter(function(it){
        return it;
      }).length || (function(){
        var ref$, results$ = [];
        for (k in ref$ = $scope.payinfo) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }()).filter(function(it){
        return !it;
      }).length;
    };
    if (!now) {
      return $scope.check.handler = $timeout(function(){
        return _check();
      }, 500);
    } else {
      return _check();
    }
  };
  $scope.settings = {
    choose: function(plan, period){
      var ref$;
      if ($scope.user.data && plan === ((ref$ = $scope.user.data).payment || (ref$.payment = {})).plan) {
        return;
      }
      if (plan != null) {
        $scope.scrollto($('#payment-your-choice'), 500);
        this.plan = plan;
      }
      if (typeof peroid != 'undefined' && peroid !== null) {
        return this.peroid = peroid;
      }
    },
    plan: 1,
    period: 0,
    init: function(){
      var ref$;
      return this.plan = ($scope.user.data ? ((ref$ = $scope.user.data).payment || (ref$.payment = {})).plan : null) || 0;
    }
  };
  $scope.settings.init();
  $scope.update = function(){
    eventBus.fire('loading.dimmer.on');
    return Stripe.card.createToken($scope.payinfo, function(state, token){
      return $scope.$apply(function(){
        if (state !== 200) {
          alert("We can't verify this card, please check if the information you provided is correct.");
          eventBus.fire('loading.dimmer.off');
          plNotify.send('danger', "update payment info failed.");
          return;
        }
        return $http({
          url: '/d/payment-method',
          method: 'POST',
          data: {
            token: token.id
          }
        }).success(function(d){
          plNotify.send('success', "payment info updated");
          return $timeout(function(){
            return window.location.reload();
          }, 500);
        }).error(function(d){
          plNotify.send('danger', "something wrong, try again later? ");
          return eventBus.fire('loading.dimmer.off');
        });
      });
    });
  };
  $scope.subscribe = function(){
    var _subscribe;
    $scope.check(null, true);
    if ($scope.settings.plan === $scope.settings.current) {
      return;
    }
    if ($scope.error.all) {
      return;
    }
    eventBus.fire('loading.dimmer.on');
    return _subscribe = function(token){
      token == null && (token = {});
      return $http({
        url: '/d/subscribe',
        method: 'POST',
        data: {
          settings: $scope.settings,
          token: token
        }
      }).success(function(d){
        import$($scope.user.data.payment, d.payment);
        if (!d.payment.plan) {
          plNotify.send('success', "you've switched to free plan.");
        } else {
          plNotify.send('success', "you've subscribed!");
        }
        return eventBus.fire('loading.dimmer.off');
      }).error(function(d){
        plNotify.send('danger', "something wrong, try again later? ");
        return eventBus.fire('loading.dimmer.off');
      });
    };
  };
  return $("[data-toggle='tooltip']").tooltip();
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}