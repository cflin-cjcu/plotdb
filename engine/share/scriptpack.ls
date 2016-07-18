(->
  config = do
    render: 
      <[
        /js/sched.js
        /assets/jquery/1.10.2/jquery.min.js
        /assets/bluebird/3.3.4/bluebird.min.js
        /assets/canvg/1.4.0/rgbcolor.js
        /assets/canvg/1.4.0/StackBlur.js
        /assets/canvg/1.4.0/canvg.js
        /assets/utf8js/2.0.0/utf8.js
        /assets/base64/0.1.0/base64.js
        /js/plotdb/main.js
        /js/plotdb/type.js
        /js/plotdb/chart.js
        /js/plotdb/theme.js
        /js/plotdb/data.js
        /js/plotdb/config.js
        /js/share/config.js
        /js/chart/render.js
      ]>
    view:
      <[
        /js/sched.js
        /assets/jquery/1.10.2/jquery.min.js
        /js/plotdb/main.js
        /js/plotdb/type.js
        /js/plotdb/chart.js
        /js/plotdb/theme.js
        /js/plotdb/data.js
        /js/plotdb/config.js
        /js/share/config.js
        /js/chart/view.js
      ]>
    loader:
      <[
        /js/plotdb/main.js
        /js/plotdb/type.js
        /js/plotdb/chart.js
        /js/plotdb/theme.js
        /js/plotdb/data.js
        /js/plotdb/config.js
        /js/share/config.js
        /js/chart/view.js
      ]>
    base:
      <[
        /assets/codemirror/5.10/lib/codemirror.min.js
        /assets/bluebird/3.3.4/bluebird.min.js
        /assets/ldcolorpicker/0.1.1/ldcp.min.js
        /assets/codemirror/5.10/mode/javascript/javascript.js
        /assets/codemirror/5.10/mode/xml/xml.js
        /assets/codemirror/5.10/mode/css/css.js
        /assets/ui-codemirror/0.3.0/ui-codemirror.min.js
        /assets/clipboard/1.3.1/clipboard.min.js
        /assets/ngDraggable/0.1.8/ngDraggable.js
        /assets/utf8js/2.0.0/utf8.js
        /assets/base64/0.1.0/base64.js
        /assets/select2/4.0.1/js/select2.full.min.js
        /js/plotdb.js
        /js/share/config.js
        /js/io.js
        /js/utility.js
        /js/editor.js
        /js/data/sample.js
        /js/data/index.js
        /js/plotdb/main.js
        /js/plotdb/type.js
        /js/plotdb/chart.js
        /js/plotdb/theme.js
        /js/plotdb/data.js
        /js/plotdb/config.js
        /js/chart/sample.js
        /js/chart/index.js
        /js/palette/sample.js
        /js/palette/index.js
        /js/theme/sample.js
        /js/theme/index.js
        /js/site.js
        /js/service.js
      ]>
    legacy: <[
        /js/chart/legacy.js
        /lib/topojson/1.6.24/index.min.js
        /lib/d3.geo.projection/0.2.16/index.min.js
        /lib/voronoijs/0.0.1/index.min.js
        /assets/d3js/3.5.12/d3.v3.min.js
        /js/chart/plotd3.js
      ]>

  if module? => module.exports = config
  else if angular? =>
    angular.module \plotDB
      ..service \plScriptPack <[]> ++ -> config
  else window.plConfig = config
)!

