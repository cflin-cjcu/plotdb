// Generated by LiveScript 1.3.1
var onmessage;
onmessage = function(e){
  var dataset, data, collen, rowlen, ref$, ret, i$, i, j, v, raw;
  dataset = e.data.dataset;
  data = {};
  data.headers = dataset.fields.map(function(it){
    return it.name;
  });
  data.rows = [];
  collen = (dataset.fields || (dataset.fields = [])).length;
  rowlen = ((ref$ = (dataset.fields || (dataset.fields = []))[0] || {}).data || (ref$.data = [])).length || 0;
  ret = [dataset.fields.map(function(it){
    return it.name;
  }).join(",")];
  for (i$ = 0; i$ < rowlen; ++i$) {
    i = i$;
    data.rows.push((fn$()));
    ret.push((fn1$()).join(","));
  }
  raw = ret.join('\n');
  return postMessage({
    data: data,
    raw: raw
  });
  function fn$(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = collen; i$ < to$; ++i$) {
      j = i$;
      results$.push(dataset.fields[j].data[i]);
    }
    return results$;
  }
  function fn1$(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = collen; i$ < to$; ++i$) {
      j = i$;
      v = dataset.fields[j].data[i] + "";
      if (v.indexOf(',')) {
        v = "\"" + v + "\"";
      }
      results$.push(v);
    }
    return results$;
  }
};