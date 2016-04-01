angular.module \plotDB
  ..service \dataService,
  <[$rootScope $http IOService sampleData baseService plNotify eventBus]> ++
  ($rootScope, $http, IOService, sampleData, baseService, plNotify, eventBus) ->
    name = \dataset
    service = do
      sample: sampleData
      init: ->
        @list!then ~> @localinfo.update!
      localinfo: do
        rows: 0
        size: 0
        update: ->
          @ <<< {rows: 0, size: 0}
          for item in service.items => if item.type.location == \local =>
            @rows += item.rows
            @size += item.size
    # we can construct directly from a json(field), or from a dataset
    Field = (name, dataset = null, field = null) ->
      if !field and dataset => field = dataset.fields.filter(->it.name == name).0
      if field => @ <<< field
      # use _ as a little trick to prevent things to be stringify
      @ <<< {name, _: ->}
      if dataset => @set-dataset dataset
      @
    Field.prototype = do
      dataset: type: {}, key: null
      name: null, type: null
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
        if dataset and dataset.type and dataset.key =>
          @dataset <<< dataset{type, key} <<< {name: dataset.name}
        else @dataset.type <<< {type: {}, key: null, name: null}
        Promise.resolve(dataset)
      get-dataset: -> # provide dataset or null for standalone field
        if @_.dataset => return Promise.resolve(that)
        if !@dataset.type or !@dataset.key => return Promise.resolve(null)
        (ret) <~ dataService.load @dataset.type, @dataset.key .then
        @_.dataset = ret
        @dataset <<< ret{type, key} <<< {name: ret.name}
        @_.dataset
      settype: ->
        types = <[Boolean Percent Number Date String]> ++ [null]
        for type in types =>
          if !type => return @type = \String
          if !@data.map(-> plotdb[type]test it).filter(->!it).length =>
            @type = type
            break

    #TODO: Dataset: save: update field dataset type and key
    Dataset = ->
      @fields = [new Field(f.name, @, f) for f in @fields or []]
      @save = ->
        @fields.map(->delete it.data)
        <~ Dataset.prototype.save.call(@).then
        @fields.map ~> it.dataset <<< @{type,key}
        @update!
      @load = ->
        <~ Dataset.prototype.load.call(@).then
        Dataset.call @
      @update!
      @

    Dataset.prototype = do
      bind: (field) -> #TODO connect dataset and standalone field
      update: (data = null) ->
        if data => @data = data
        if !@data => @data = []
        #TODO support more type
        # CSV dataset use first row as field name
        names = [k for k of @data.0]
        promises = for i from 0 til names.length
          if @fields[i] => that else @fields.push new Field(names[i], @)
          @fields[i].name = names[i]
          @fields[i].update!
        <~ Promise.all promises .then
        #@fields = [[k,v] for k,v of @data.0].map(-> {name: it.0, type: \String})
        #for item in @fields => data-service.field.settype @data, item
        @size = angular.toJson(@data).length
        @rows = @data.length
        #if @key => for item in @fields => item.dataset = @key
    dataService = baseService.derive name, service, Dataset
    dataService

  ..controller \dataEditCtrl,
  <[$scope $timeout $http dataService eventBus plNotify]> ++
  ($scope, $timeout, $http, data-service, eventBus, plNotify) ->
    $scope <<< do
      rawdata: ""
      dataset: null

    $scope.name = null
    $scope.save = (locally = false) ->
      if !$scope.name => return
      if !$scope.user.data or !$scope.user.data.key => return $scope.auth.toggle true
      if $scope.dataset and $scope.dataset.type.location != (if locally => \local else \server) => return
      $scope.parse.run true
      if !$scope.dataset =>
        config = do
          name: $scope.name
          type: location: (if locally => \local else \server), name: \dataset
          owner: null
          permission: switch: <[public]>, value: []
          datatype: \csv #TODO support more types
        $scope.dataset = new dataService.dataset config
      $scope.dataset.name = $scope.name
      <~ $scope.dataset.update $scope.parse.result .then
      $scope.dataset.save!
        .then -> $scope.$apply -> plNotify.send \success, "dataset saved"
        .catch (e) -> $scope.$apply -> plNotify.aux.error.io \save, \data, e
    $scope.load-dataset = (dataset) ->
      $scope.dataset = dataset
      $scope.name = dataset.name
      fields = dataset.fields.map -> it.name
      $scope.rawdata = ([fields.join(",")] ++ dataset.data.map((obj)->fields.map(->obj[it]).join(\,))).join(\\n)

    # =============== Functions  ================
    $scope <<< do
      reset: (rawdata) ->
        $scope <<< {dataset:  new dataService.dataset!, rawdata}
      init: ->
        @reset ""
        $scope.$watch 'rawdata', -> $scope.parse.run!

    $scope.parse = do
      rows: 0, fields: 0, size: 0
      result: null
      loading: false
      handle: null
      run: (force = false) ->
        @loading = true
        _ = ~>
          @ <<< {handle: null, result: {}}
          Papa.parse ($scope.rawdata or ""), do
            worker: true, header: true
            step: ({data: rows}) ~> for row in rows => for k,v of row => @result[][k].push v
            complete: ~>
              values = [v for k,v of @result] or []
              <~ $scope.$apply
              @ <<< {loading: false, fields: values.length, rows: (values.0 or []).length}
        if @handle => $timeout.cancel @handle
        if force => return _!
        else @handle = $timeout (~> _! ), (if force => 0 else 1000)

    $scope.parser = do
      encoding: \UTF-8
      csv: do
        toggle: -> setTimeout((->$(\#data-edit-csv-modal).modal \show),0)
        read: ->
          file = $(\#data-edit-csv-file).0.files.0
          reader = new FileReader!
          reader.onload = (e) ->
            $scope.$apply -> $scope.reset e.target.result.trim!
            $(\#data-edit-csv-modal).modal \hide
          reader.onerror = (e) ->
          reader.readAsText(file, $scope.parser.encoding)

      gsheet: do
        url: null
        toggle: -> setTimeout((->$(\#data-edit-gsheet-modal).modal(\show)),0)
        read: ->
          ret = /\/d\/([^\/]+)/.exec($scope.parser.gsheet.url)
          if !ret => return
          key = ret.1
          url = "https://spreadsheets.google.com/feeds/list/#key/1/public/values?alt=json"
          $http url: url, method: \GET
          .success (data) ->
            fields = {}
            data.feed.entry.map (it) ->
              for key of it => if /^gsx\$(.+)$/.exec(key) => fields[that.1] = 1
            fields = [k for k of fields]
            lines = [fields.join(\,)] ++ data.feed.entry.map((it) ->
              [(it["gsx$#key"] or {$t:""}).$t for key in fields].join(\,)
            )
            $scope.$apply -> $scope.reset lines.join(\\n)
            setTimeout((->$(\#data-edit-gsheet-modal).modal(\hide)),0)
          #TODO error handling

      link: do
        url: null
        toggle: -> setTimeout((->$(\#data-edit-link-modal).modal(\show)),0)
        read: ->
          $http url: "http://crossorigin.me/#{$scope.parser.link.url}", method: \GET
          .success (d) ->
            $scope.$apply -> $scope.reset d.trim!
            $(\#data-edit-link-modal).modal \hide
          #TODO error handling
    eventBus.listen \dataset.delete, (key) -> if $scope.dataset.key == key => $scope.dataset = null
    eventBus.listen \dataset.edit, (dataset) ->
      #TODO: support more type ( currently CSV structure only )
      $scope.load-dataset dataset

    $scope.init!

  ..controller \dataFiles,
  <[$scope dataService plNotify eventBus]> ++
  ($scope, data-service, plNotify, eventBus) ->
    $scope.datasets = data-service.datasets
    (ret) <- data-service.list!then
    $scope.datasets = ret
    $scope.edit = (dataset) -> eventBus.fire \dataset.edit, dataset
    # separate dataset and key otherwise ng-show and euqality comparison will be slow when dataset is large
    $scope.chosen = do
      dataset: null
      key: null
    $scope.toggle = (dataset) ->
      if !dataset or @chosen.key == dataset.key =>
        return @chosen <<< {dataset: null, key: null}
      @chosen.key = dataset.key
      @chosen.dataset = dataset
    $scope.remove = (dataset) ->
      dataset.delete!then ~> $scope.$apply ~> $scope.datasets = $scope.datasets.filter(->it.key != dataset.key)
