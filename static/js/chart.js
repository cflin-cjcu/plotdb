var x$;x$=angular.module("plotDB"),x$.controller("chartEditor",["$scope"].concat(function(e){return e.chart={init:function(){return e.chart.code.content='module.exports = plotdb.chart.create({\n  name: "New Chart",\n  title: "New Chart",\n  desc: "No Description",\n  author: "Your Name",\n  mapping: {\n    value: { type: [plotdb.Number], require: true },\n    name: { type: [], require: false }\n  },\n  config: {\n    padding: { type: [plotdb.Number], default: 10 },\n    margin: { type: [plotdb.Number], default: 10 }\n  },\n  bind: function(root, data, config) {\n  },\n  resize: function(root, data, config) {\n  },\n  render: function(root, data, config) {\n    root.style.background = \'red\';\n    root.style.height = \'100px\';\n  }\n});'},render:function(){var n,t,r,o;return r={},r.doc=(t=e.chart).doc,r.style=t.style,r.code=t.code,n=r,o=document.getElementById("visualizer"),o.contentWindow.postMessage(n,"http://localhost/")},doc:{option:{mode:"xml",lineWrapping:!0,lineNumbers:!0},content:""},style:{option:{mode:"css",lineWrapping:!0,lineNumbers:!0},content:""},code:{option:{mode:"javascript",lineWrapping:!0,lineNumbers:!0},content:"function() {}"}},e.chart.init(),setTimeout(function(){return e.chart.render()},1e3),e.$watch("chart.code.content",function(n){function t(e){return e.replace(/plotdb\./,"").trim()}function r(e){return e}var o,i,c,a,u,s,p,l,d,m,h,f=[];for(o=n.split("\n"),i=0,c=[],a=0,u=o.length;u>a&&(s=o[a],!/^\s*}\s*,\s*$/.exec(s));++a)1===i&&c.push(s),/^\s*mapping\s*:\s*{\s*$/.exec(s)&&(i=1);for(e.chart.dimensions=[],a=0,u=c.length;u>a;++a)p=c[a],l=/(\S+)\s*:\s*{/.exec(p),l&&(d=l[1],l=/type\s*:\s*\[([^\]]*)\]/.exec(p),l&&(m=l[1].split(",").map(t).filter(r),l=/require: (true|false)/.exec(p),l&&(h=l[1],f.push(e.chart.dimensions.push({name:d,type:m,require:h})))));return f})}));