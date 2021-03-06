angular.module \plotDB
  ..service \entityService,
  <[$rootScope $http plConfig IOService baseService]> ++
  ($rootScope, $http, plConfig, IOService, baseService) ->
    service = do
      config: plselect: do
        folder: do
          placeholder: "search by collection name or id ..."
          ajax: do
            url: \/d/entity/?type=8
            param: (keyword, limit, offset, scope) -> {keyword, limit, offset}
        chart: do
          placeholder: "search by chart name or id ..."
          ajax: do
            url: \/d/entity/?type=4
            param: (keyword, limit, offset, scope) -> {simple: true, keyword, limit, offset, scope}
        entity-chart: do
          placeholder: "search by user, chart, team name or email address..."
          ajax: do
            url: \/d/entity/?type=7
            param: (keyword, limit, offset) -> {keyword, limit, offset}
        entity: do
          placeholder: "search by user, team name or email address..."
          ajax: do
            url: \/d/entity/
            param: (keyword, limit, offset) -> {keyword, limit, offset}
        team: do
          placeholder: "search by team name or email address..."
          ajax: do
            url: \/d/team/
            param: (keyword, limit, offset) -> {keyword, limit, offset}
        user: do
          placeholder: "search by user name or email address..."
          ajax: do
            url: \/d/user/
            param: (keyword, limit, offset) -> {keyword, limit, offset}

    service
