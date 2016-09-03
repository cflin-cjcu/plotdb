// Generated by LiveScript 1.3.1
var gridRender;
gridRender = function(e){
  var htmlCharMap, escape, data, types, ohlen, rlen, len, ref$, headers, res$, i$, to$, i, w, ths, j, trs;
  htmlCharMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  escape = function(text){
    text == null && (text = "");
    return (text + "").replace(/[&<>"']/g, function(m){
      return htmlCharMap[m];
    });
  };
  data = e.data;
  types = data.types || [];
  ohlen = data.headers.length;
  rlen = {
    head: data.headers.length,
    rows: (data.rows || (data.rows = [])).length
  };
  len = {
    head: data.headers.length < 10
      ? 10
      : data.headers.length + 1,
    rows: (data.rows || (data.rows = [])).length < 100
      ? 100
      : ((ref$ = data.rows).length || (ref$.length = [])) + 10
  };
  res$ = [];
  for (i$ = 0, to$ = len.head; i$ < to$; ++i$) {
    i = i$;
    res$.push(data.headers[i] || '');
  }
  headers = res$;
  w = 100 / len.head + "%";
  if (len.head > 10) {
    w = "10%";
  }
  ths = "<div>" + headers.map(function(d, i){
    var that;
    return ["<div style='width:" + w + "' col='" + i + "'>", "<div contenteditable='true' col='" + i + "' class='" + (i < ohlen ? 'in-use' : '') + "'>", d ? "&nbsp;" + escape(d) : "", "</div><small class='grayed' col='" + i + "'>&nbsp;", i < ohlen ? (that = types[i]) ? that : 'ANY' : '', "</small>", i < ohlen ? "<div class='closebtn inverse' col='" + i + "'></div>" : '', "</div>"].join("");
  }).join("") + "</div>";
  if (!data.rows) {
    return postMessage({
      ths: ths
    });
  }
  res$ = [];
  for (i$ = 0, to$ = rlen.rows; i$ < to$; ++i$) {
    i = i$;
    res$.push(data.rows[i] || (fn$()));
  }
  data.rows = res$;
  trs = [];
  for (i$ = 0, to$ = len.rows; i$ < to$; ++i$) {
    i = i$;
    trs.push("<div>" + headers.map(fn1$).join("") + "</div>");
  }
  return {
    trs: trs,
    ths: ths
  };
  function fn$(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = rlen.head; i$ < to$; ++i$) {
      j = i$;
      results$.push('');
    }
    return results$;
  }
  function fn1$(d, j){
    return ("<div contenteditable='true' row='" + i + "' col='" + j + "' style='width:" + w + "'>") + (escape((data.rows[i] || [])[j]) || '') + "</div>";
  }
};