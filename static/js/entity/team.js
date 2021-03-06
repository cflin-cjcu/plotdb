// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.service('teamService', ['$rootScope', '$http', 'plConfig', 'IOService', 'baseService'].concat(function($rootScope, $http, plConfig, IOService, baseService){
  var service, object, teamService;
  service = {};
  object = function(config){
    import$(this, {
      name: 'untitled',
      description: null,
      owner: null,
      createdtime: new Date(),
      modifiedtime: new Date(),
      _type: {
        location: 'server',
        name: 'team'
      },
      permission: {
        'switch': [],
        value: []
      }
    });
    import$(this, config);
    return this;
  };
  teamService = baseService.derive('team', service, object);
  return teamService;
}));
x$.controller('teamChooser', ['$scope', '$http', 'folderService', 'plNotify', 'eventBus'].concat(function($scope, $http, folderService, plNotify, eventBus){
  $scope.show = false;
  $scope.target = null;
  $scope.mteam = [];
  $scope.add = function(){
    if (!($scope.mteam || ($scope.mteam = []))[0] || !$scope.mteam[0].key || !($scope.target || ($scope.target = {})).key) {
      $scope.hint = true;
      return;
    }
    eventBus.fire('loading.dimmer.on');
    return $http({
      url: "/d/team/" + $scope.mteam[0].key + "/chart/",
      method: 'post',
      data: [($scope.target || ($scope.target = {})).key]
    }).success(function(d){
      eventBus.fire('loading.dimmer.off');
      $scope.show = false;
      return plNotify.send('success', "added");
    }).error(function(d){
      eventBus.fire('loading.dimmer.off');
      if (d === 'existed') {
        $scope.show = false;
        return plNotify.send('warning', "already in this collection");
      } else {
        return plNotify.send('error', "failed to add; try later?");
      }
    });
  };
  return eventBus.listen('add-to-team', function(item){
    $scope.target = item;
    return $scope.show = true;
  });
}));
x$.controller('teamEdit', ['$scope', '$http', '$timeout', 'plNotify', 'teamService', 'chartService', 'eventBus'].concat(function($scope, $http, $timeout, plNotify, teamService, chartService, eventBus){
  $scope.team = new teamService.team(window.team || {});
  $scope.members = window.members || [];
  $scope.newMembers = [];
  $scope.charts = window.charts || [];
  $scope.newCharts = [];
  $scope.teamtab = 'chart';
  $scope.link = {
    chart: function(it){
      return chartService.link(it);
    }
  };
  $scope.newChart = function(tid){
    var chart;
    eventBus.fire('loading.dimmer.on');
    chart = new chartService.chart({}, true);
    return chart.save({
      team: tid
    }).then(function(data){
      return $scope.$apply(function(){
        plNotify.send('success', "chart created");
        $scope.charts = [chart].concat($scope.charts);
        return $timeout(function(){
          return window.location.href = $scope.link.chart(chart);
        }, 1000);
      });
    })['catch'](function(e){
      return $scope.$apply(function(){
        console.log(e);
        eventBus.fire('loading.dimmer.off');
        return plNotify.send('danger', e[1]);
      });
    });
  };
  $scope.removeChart = function(tid, cid){
    return $http({
      url: "/d/team/" + tid + "/chart/" + cid,
      method: 'DELETE'
    }).success(function(d){
      var idx;
      idx = $scope.charts.map(function(it){
        return it.key;
      }).indexOf(cid);
      if (idx < 0) {
        return;
      }
      $scope.charts.splice(idx, 1);
      return plNotify.send('success', "chart removed");
    }).error(function(d){
      return plNotify.send('error', "failed to remove chart, try again later?");
    });
  };
  $scope.removeMember = function(tid, owner, mid){
    if (mid === owner) {
      plNotify.send('error', "can't remove owner");
      return;
    }
    return $http({
      url: "/d/team/" + tid + "/member/" + mid,
      method: 'DELETE'
    }).success(function(d){
      var idx;
      idx = $scope.members.map(function(it){
        return it.key;
      }).indexOf(mid);
      if (idx < 0) {
        return;
      }
      $scope.members.splice(idx, 1);
      return plNotify.send('success', "member removed");
    }).error(function(d){
      return plNotify.send('error', "failed to remove member, try again later?");
    });
  };
  $scope.addCharts = function(tid){
    var keys, ckeys;
    if (!$scope.user.data) {
      return plNotify.send('error', "permission denied");
    }
    if (!$scope.newCharts || !$scope.newCharts.length) {
      return;
    }
    keys = $scope.newCharts.filter(function(it){
      return it.owner === $scope.user.data.key;
    }).map(function(it){
      return it.key;
    });
    ckeys = $scope.charts.map(function(it){
      return it.key;
    });
    keys = keys.filter(function(it){
      return ckeys.indexOf(it) < 0;
    });
    if (keys.length < $scope.newCharts.length) {
      plNotify.send('warning', "some charts are already in this team");
    }
    if (keys.length === 0) {
      return;
    }
    return $http({
      url: "/d/team/" + tid + "/chart/",
      method: 'post',
      data: $scope.newCharts.filter(function(it){
        return it.owner === $scope.user.data.key;
      }).map(function(it){
        return it.key;
      })
    }).success(function(d){
      $scope.charts = $scope.charts.concat($scope.newCharts.filter(function(it){
        return ckeys.indexOf(it.key) < 0;
      }));
      $scope.newCharts.splice(0);
      return plNotify.send('success', "charts added");
    }).error(function(d){
      return plNotify.send('error', "failed to add charts. try again later?");
    });
  };
  $scope.addMembers = function(tid){
    var ckey, nkey;
    if (!$scope.newMembers || !$scope.newMembers.length) {
      return;
    }
    ckey = $scope.members.map(function(it){
      return it.key;
    });
    nkey = $scope.newMembers.map(function(it){
      return it.key;
    });
    nkey = nkey.filter(function(it){
      return ckey.indexOf(it) < 0;
    });
    if (nkey.length < $scope.newMembers.length) {
      plNotify.send('warning', "some users are already in this team");
    }
    if (nkey.length === 0) {
      return;
    }
    return $http({
      url: "/d/team/" + tid + "/member/",
      method: 'POST',
      data: nkey
    }).success(function(d){
      $scope.members = $scope.members.concat($scope.newMembers.filter(function(it){
        return ckey.indexOf(it.key) < 0;
      }));
      $scope.newMembers.splice(0);
      return plNotify.send('success', "members added");
    }).error(function(d){
      return plNotify.send('error', "failed to add members. try again later?");
    });
  };
  $scope.avatar = {
    files: [],
    raw: null,
    preview: null,
    init: function(){
      var this$ = this;
      return $scope.$watch('avatar.files', function(){
        return this$.parse().then(function(payload){
          return $scope.$apply(function(){
            this$.raw = payload;
            this$.preview = null;
            if (this$.raw) {
              return this$.preview = URL.createObjectURL(new Blob([this$.raw], {
                type: this$.files[0].type
              }));
            }
          });
        })['catch'](function(e){
          return $scope.$apply(function(){
            this$.preview = null;
            return plNotify.send('danger', e);
          });
        });
      });
    },
    parse: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        var file, x$, fr;
        file = this$.files[0];
        if (!file) {
          res();
        }
        if (!/image\//.exec(file.type)) {
          return rej("Avatar is not an image, use image instead.");
        }
        if (file.size >= 1048576) {
          return rej("Avatar is too large. let's try another (<1MB).");
        }
        x$ = fr = new FileReader();
        x$.onabort = function(){
          return rej("Failed reading avatar. Try other image?");
        };
        x$.onerror = function(){
          return rej("Failed reading avatar. Try other image?");
        };
        x$.onload = function(){
          return res(new Uint8Array(fr.result));
        };
        x$.readAsArrayBuffer(file);
        return x$;
      });
    },
    upload: function(team){
      var this$ = this;
      return new Promise(function(res, rej){
        var fd;
        if (!team || !team.key) {
          return rej("Can't upload avatar if there is no team.");
        }
        if (!this$.raw) {
          return rej("No avatar to upload. Select a file first!");
        }
        fd = new FormData();
        fd.append('image', new Blob([this$.raw], {
          type: "application/octet-stream"
        }));
        return $http({
          url: "/d/team/" + team.key + "/avatar/",
          method: 'POST',
          data: fd,
          transformRequest: angular.identity,
          headers: {
            "Content-Type": undefined
          }
        }).success(function(d){
          return res();
        }).error(function(d){
          return rej("Failed uploading avatar. Try other image later?");
        });
      });
    }
  };
  $scope.avatar.init();
  $scope.error = {};
  $scope.dismiss = function(){
    return eventBus.fire('team-panel.create.dismiss');
  };
  $scope.redirect = function(delay){
    delay == null && (delay = 0);
    if ($scope.team && $scope.team.key) {
      return setTimeout(function(){
        return window.location.href = "/team/" + $scope.team.key;
      }, delay);
    }
  };
  return $scope.save = function(){
    var isUpdate;
    isUpdate = !!$scope.team.key;
    $scope.error = {};
    if (!$scope.team.name) {
      $scope.error.name = true;
      return plNotify.send('danger', "Team name is required.");
    }
    eventBus.fire('loading.dimmer.on');
    return $http({
      url: "/d/team/" + (isUpdate ? $scope.team.key : ''),
      method: isUpdate ? 'PUT' : 'POST',
      data: isUpdate
        ? $scope.team
        : {
          team: $scope.team,
          members: $scope.newMembers.map(function(it){
            return it.key;
          })
        }
    }).success(function(d){
      var promise;
      if (!isUpdate) {
        $scope.team.key = d.key;
      }
      if ($scope.avatar.files[0] && $scope.avatar.raw) {
        promise = $scope.avatar.upload($scope.team);
      } else {
        promise = Promise.resolve();
      }
      return promise.then(function(){
        return $scope.$apply(function(){
          plNotify.send('success', "team " + (isUpdate ? 'updated' : 'created') + ".");
          if (!isUpdate) {
            return $scope.redirect(1000);
          } else {
            $scope.redirect(1000);
            return $timeout(function(){
              eventBus.fire('loading.dimmer.off');
              return eventBus.fire('team-panel.create.dismiss');
            }, 1000);
          }
        });
      })['catch'](function(err){
        return $scope.$apply(function(){
          plNotify.send('warning', "team " + (isUpdate ? 'updated' : 'created') + ", but... ");
          plNotify.send('danger', err);
          return $scope.redirect(2000);
        });
      });
    }).error(function(d){
      eventBus.fire('loading.dimmer.off');
      return plNotify.send('error', "failed " + (isUpdate ? 'updating' : 'creating') + " team. try again later?");
    });
  };
}));
x$.controller('teamList', ['$scope', 'IOService', 'teamService', 'Paging', 'plNotify', 'eventBus'].concat(function($scope, IOService, teamService, Paging, plNotify, eventBus){
  $scope.teams = [];
  $scope.paging = Paging;
  $scope.paging.limit = 50;
  $scope.$watch('qLazy', function(){
    return $scope.loadList(1000, true);
  }, true);
  $scope.loadList = function(delay, reset){
    delay == null && (delay = 1000);
    reset == null && (reset = false);
    return Paging.load(function(){
      var payload, ref$;
      payload = import$(import$((ref$ = {}, ref$.offset = Paging.offset, ref$.limit = Paging.limit, ref$), $scope.q), $scope.qLazy);
      payload.detail = true;
      return IOService.listRemotely({
        name: 'team'
      }, payload);
    }, delay, reset, 'teams').then(function(ret){
      var this$ = this;
      return $scope.$apply(function(){
        var data;
        data = (ret.teams || []).map(function(it){
          return new teamService.team(it);
        });
        data.map(function(t){
          t.members = ret.members.filter(function(m){
            return m.team === t.key;
          });
          return t.count = +t.count;
        });
        Paging.flexWidth(data);
        return $scope.teams = (reset
          ? []
          : $scope.teams).concat(data);
      });
    });
  };
  if ($('#list-end')) {
    Paging.loadOnScroll(function(){
      return $scope.loadList();
    }, $('#list-end'));
  }
  return $scope.loadList();
}));
x$.controller('teamBase', ['$scope', 'IOService', 'teamService', 'Paging', 'plNotify', 'eventBus'].concat(function($scope, IOService, teamService, Paging, plNotify, eventBus){
  $scope.teamPanel = {
    create: {
      toggle: function(){
        if (!$scope.user.authed()) {
          return $scope.auth.toggle(true);
        }
        return this.toggled = !this.toggled;
      }
    }
  };
  return eventBus.listen('team-panel.create.dismiss', function(){
    return $scope.teamPanel.create.toggled = false;
  });
}));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}