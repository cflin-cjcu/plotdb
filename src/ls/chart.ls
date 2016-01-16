angular.module \plotDB
  ..controller \chartEditor, <[$scope dataService sampleChart]> ++ ($scope, data-service, sampleChart) ->
    $scope.vis = \preview
    $scope.showsrc = true
    $scope.chart = do
      init: ->
        $scope.chart.code.content = sampleChart.code.content
      setdim: (field = {}, event, dim) ->
        dataset = data-service.datasets.filter(->it.key == field.file).0
        if !dataset => return
        field.data = dataset.[]data.map(->it[field.name])
        dim.fields = [field]
        @render!
      render: ->
        data = []
        console.log @dimensions
        for k,dim0 of @{}dimensions
          if dim0.fields and dim0.fields.length and dim0.fields.0.data and dim0.fields.0.data.length => break
          dim0 = null
        if dim0 =>
          for i from 0 til dim0.fields.0.data.length
            ret = {}
            for k,dim of @dimensions
              f = dim.[]fields.0
              ret[dim.name] = if f => f.[]data[i] else null
            data.push ret
        config = {}
        config <<< @configs
        #for  in @configs => config[item.name] = item.value
        payload = {data,config} <<< $scope.chart{doc,style,code}
        visualizer = document.getElementById(\visualizer)
        visualizer.contentWindow.postMessage payload, \http://localhost/
      doc: do
        option: do
          mode: \xml
          lineWrapping: true
          lineNumbers: true
        content: ""
      style: 
        option: do
          mode: \css
          lineWrapping: true
          lineNumbers: true
        content: ""
      code: 
        option: do
          mode: \javascript
          lineWrapping: true
          lineNumbers: true
        content: "function() {}"
    $scope.chart.init!
    setTimeout (->$scope.chart.render!), 1000
    $scope.$watch 'chart.code.content', (code) ->
      [lines,maps,confs] = [code.split(\\n),[],[]]
      [new-dim,new-conf] = [{},{}]
      start = 0
      for line in lines =>
        if /^\s*}\s*,\s*$/.exec(line) and start == 1 => break
        if start == 1 => maps.push line
        if /^\s*mapping\s*:\s*{\s*$/.exec(line) => start = 1
      start = 0
      for line in lines =>
        if /^\s*}\s*,\s*$/.exec(line) and start == 1 => break
        if start == 1 => confs.push line
        if /^\s*config\s*:\s*{\s*$/.exec(line) => start = 1
      for map in maps =>
        ret = /(\S+)\s*:\s*{/.exec(map)
        if !ret => continue
        name = ret.1
        ret = /type\s*:\s*\[([^\]]*)\]/.exec(map)
        if !ret => continue
        type = ret.1.split(\,).map(->it.replace(/plotdb\./,"").trim!).filter(->it)
        ret = /require: (true|false)/.exec(map)
        if !ret => continue
        require = if ret.1 == "true" => true else false
        new-dim[name] = {name, type, require}
      for conf in confs =>
        ret = /(\S+)\s*:\s*{/.exec(conf)
        if !ret => continue
        name = ret.1
        ret = /type\s*:\s*\[([^\]]*)\]/.exec(conf)
        if !ret => continue
        type = ret.1.split(\,).map(->it.replace(/plotdb\./,"").trim!).filter(->it)
        # TODO proper parse all possible values 
        ret = /default: ("[^"]+"|'[^']+'|null|\d+)/.exec(conf)
        if !ret => continue
        defval = ret.1
        new-conf[name] = {name, type, defval, value: defval}
      for k,v of new-dim =>
        if !($scope.chart.{}dimensions[k]?) => $scope.chart.{}dimensions[k] = v
      for k,v of $scope.chart.{}dimensions =>
        # TODO: if type mismatch -> remove fields
        if !(new-dim[k]?) => delete $scope.chart.dimensions[k]
        else $scope.chart.dimensions[k] <<< new-dim[k]
      for k,v of new-conf =>
        if !($scope.chart.{}configs[k]?) => $scope.chart.{}configs[k] = v
      for k,v of $scope.chart.{}configs =>
        if !(new-conf[k]?) => delete $scope.chart.configs[k]
        else 
          oldv = v.value
          v <<< new-conf[k]
          if v.value == v.defval => v.value = oldv
      $scope.chart.render!

    $scope.$watch 'chart.configs', (-> $scope.chart.render!), true
    $scope.save = ->
      c = $scope.chart

      #TODO assets
      dimension = {}
      for k,v of c.dimensions => 
        dimension[k] = {} <<< v
        for item in dimension[k].[]fields => delete item.data
      chart = do
        doc: c.doc.content
        style: c.style.content
        code: c.code.content
        config: c.configs
        dimension: dimension
      chart.name = $scope.name
      list = JSON.parse(localStorage.getItem("/list/charts")) or []
      if list.indexOf($scope.name) < 0 => 
        list.push $scope.name
        localStorage.setItem("/list/charts", JSON.stringify(list))
      localStorage.setItem("/charts/#{$scope.name}", JSON.stringify(chart))
      #TODO save
    $scope.load = (name) ->
      if !(name?) => name = $scope.name
      if !name => return
      chart = JSON.parse(localStorage.getItem("/charts/#name"))
      c = $scope.chart
      c.code.content = chart.code
      c.doc.content = chart.doc
      c.style.content = chart.style
      c.configs = chart.config
      c.dimensions = chart.dimension
      datasets = {}
      for item in data-service.datasets => 
        datasets[item.key] = item
        item.toggle = false
      for dim in chart.dimension =>
        for f in item.[]fields
          $scope.chart.setdim f, {}, dim
          if datasets[f.file] => datasets[f.file].toggle = true
      c.render!
    $scope.datacreate = -> 
      $scope.showDataCreateModal = !!!$scope.showDataCreateModal
  ..controller \mychart, <[$scope dataService]> ++ ($scope, data-service) ->
    # My Charts
    $scope.mycharts = []
    list = JSON.parse(localStorage.getItem("/list/charts")) or []
    $scope.mycharts = list.map ->
      chart = JSON.parse(localStorage.getItem("/charts/#it"))

