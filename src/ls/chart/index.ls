angular.module \plotDB
  ..service \chartService,
  <[$rootScope $http plConfig sampleChart IOService baseService dataService]> ++
  ($rootScope, $http, plConfig, sampleChart, IOService, baseService, dataService) ->
    service = do
      sample: sampleChart
      #link: (chart) -> "/chart/?k=#{chart._type.location}|#{chart._type.name}|#{chart.key}"
      link: (chart) -> "/chart/?k=#{chart._type.location.charAt(0)}#{chart.key}"
      thumblink: (chart) -> "#{@sharelink chart}/thumb"
      #TODO better mechanism for switching domain ( dev, staging and production )
      #sharelink: (chart) -> "https://plotdb.com/v/chart/#{chart.key}"
      sharelink: (chart) -> "#{plConfig.urlschema}#{plConfig.domain}/v/chart/#{chart.key}"
    object = (src) ->
      @ <<< do
        name: \untitled
        owner: null
        theme: null
        parent: null
        description: null
        basetype: []
        visualencoding: []
        category: []
        tags: []
        likes: 0
        searchable: false
        doc: {name: 'document', type: 'html', content: service.sample.0.doc.content}
        style: {name: 'stylesheet', type: 'css', content: service.sample.0.style.content}
        code: {name: 'code', type: 'javascript', content: service.sample.0.code.content}
        assets: []
        config: {}
        dimension: {}
        _type: {location: \server, name: \chart}
      @ <<< src
      for k,v of (@dimension or {}) => v.fields = (v.fields or []).map ->
        field = new dataService.Field it
        field.update!
        field
      @

    object.prototype = do
      save: ->
        # we need to track used fields but not keep data.
        payload = JSON.parse(angular.toJson(@))
        for k,v of payload.dimension => (v.fields or []).forEach -> delete it.data
        chart-service.save payload .then (ret) ~> @key = ret.key

      like: (v) -> new Promise (res, rej) ~>
        @likes = @likes + (if v => 1 else -1) >? 0
        $http {url: "/d/chart/#{@key}/like", method: \PUT}
          .success -> res!
          .error (d, status) ~>
            @likes = @likes - (if v => 1 else -1) >? 0
            rej!

      add-file: (name, type, content = null) ->
        file = {name, type, content}
        @assets.push file
        file
      remove-file: (file) ->
        idx = @assets.indexOf(file)
        if idx < 0 => return
        @assets.splice idx, 1
      update-data: ->
        @data = []
        #TODO fields data load by demand
        len = Math.max.apply null,
          [v for k,v of @dimension]
            .reduce(((a,b) -> (a) ++ (b.fields or [])),[])
            .filter(->it.data)
            .map(->it.data.length) ++ [0]
        for i from 0 til len
          ret = {}
          for k,v of @dimension
            if v.multiple =>
              ret[k] = if v.[]fields.length => v.[]fields.map(->it.[]data[i]) else []
              v.field-name = v.[]fields.map -> it.name
            else
              ret[k] = if v.[]fields.0 => that.[]data[i] else null
              v.field-name = if v.[]fields.0 => that.name else null
            #TODO need correct type matching
            if v.type.filter(->it.name == \Number).length =>
              if Array.isArray(ret[k]) => ret[k] = ret[k].map(->parseFloat(it))
              else ret[k] = parseFloat(ret[k])
          @data.push ret
    chartService = baseService.derive \chart ,service, object
    chartService

  ..controller \userChartList,
  <[$scope $http dataService chartService]> ++
  ($scope, $http, data-service, chart-service) ->
    owner = if /^\/user\/([^/]+)/.exec(window.location.pathname) => that.1
    else => (if $scope.user.data => $scope.user.data.key else null)
    $scope.q = {owner}
    console.log $scope.q
  ..controller \chartList,
  <[$scope $http IOService dataService chartService plNotify]> ++
  ($scope, $http, IO-service, data-service, chart-service, plNotify) ->
    $scope.loading = true
    $scope.charts = []
    $scope.q = do
      type: null
      enc: null
      cat: null
      dim: null
      order: \Latest
    
    if $scope.$parent.q => $scope.q <<< $scope.$parent.q
    $scope.qmap = do
      type: [
        "Other" "Bar Chart" "Line Chart" "Pie Chart"
        "Area Chart" "Bubble Chart" "Radial Chart" "Calendar"
        "Treemap" "Choropleth" "Cartogram" "Heatmap" "Sankey"
        "Venn Diagram" "Word Cloud" "Timeline" "Mixed"
      ]
      enc: [
        "Other" "Position" "Position ( Non-aligned )" "Length" "Direction" "Angle"
        "Area" "Volume" "Curvature" "Shade" "Saturation"
      ]
      cat: [
        "Other" "Infographics" "Geographics" "Interactive" "Journalism" "Statistics"
      ]
      dim: [
        0 1 2 3 4 5 "> 5"
      ]
    $scope.link = -> chart-service.link it
    $scope.load-list = ->
      $scope.loading = true
      (ret) <- IO-service.list-remotely {name: \chart}, $scope.q .then
      <~ $scope.$apply
      $scope.charts = ( ret ).map -> new chartService.chart(it)
      $scope.loading = false
      hit = false
      for i from 0 til $scope.charts.length =>
        d = $scope.charts[i]
        width = 320
        if Math.random! > 0.6 and !hit =>
          width = (if Math.random! > 0.8 => 960 else 640)
          hit = true
        if i % 3 == 2 =>
          if !hit => width = 640
          hit = false
        d.width = width #if Math.random() > 0.8 => 640 else 320

    $scope.$watch 'q', (-> $scope.load-list!), true
    $scope.like = (chart) ->
      if !chart => return
      mylikes = $scope.user.data.{}likes.{}chart
      v = mylikes[chart.key] = !mylikes[chart.key]
      chart.like v .catch ->
        plNotify.error "Can't do favorite. try again later?"
        mylikes[chart.key] = !v

    if window.location.search =>
      map = d3.nest!key(->it.0).map(window.location.search.replace(\?,'').split(\&).map(->it.split \=))
      for k,v of $scope.q => if map[k] => $scope.q[k] = map[k].0.1
