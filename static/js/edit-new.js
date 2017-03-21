// Generated by LiveScript 1.3.1
var x$;
x$ = angular.module('plotDB');
x$.controller('plEditorNew', ['$scope', '$http', '$timeout', '$interval', '$sce', 'plConfig', 'IOService', 'dataService', 'chartService', 'paletteService', 'themeService', 'plNotify', 'eventBus', 'permService', 'license'].concat(function($scope, $http, $timeout, $interval, $sce, plConfig, IOService, dataService, chartService, paletteService, themeService, plNotify, eventBus, permService, license){
  return plotdb.load(1008, function(chart){
    chart.config({
      yAxisShowDomain: false
    });
    return chart.attach('#editor-canvas .inner');
  });
}));