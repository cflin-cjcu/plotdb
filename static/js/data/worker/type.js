// Generated by LiveScript 1.3.1
var onmessage;
importScript('/js/plotdb/type.js');
onmessage = function(e){
  var types;
  types = plotdb.Types.resolve({
    rows: e.data.rows,
    headers: e.data.headers
  });
  return postMessage(types);
};