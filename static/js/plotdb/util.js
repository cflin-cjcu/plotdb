// Generated by LiveScript 1.3.1
plotdb.util = {};
plotdb.util.trackResizeEvent = function(root, callback){
  var style, nodes, ref$, largeNumber, reset, ow, oh, nw, nh, rafid, onResize, onScroll;
  style = {
    basic: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    hide: {
      "z-index": -1,
      overflow: 'hidden',
      visibility: 'hidden'
    },
    child: {
      position: 'absolute',
      left: 0,
      top: 0,
      transition: '0s'
    }
  };
  import$(style.basic, style.hide);
  nodes = [0, 0, 0, 0, 0, 0].map(function(){
    return document.createElement('div');
  });
  ref$ = nodes[0].style;
  ref$.position = 'absolute';
  ref$.top = 0;
  ref$.left = 0;
  ref$.width = '100%';
  ref$.height = '100%';
  ref$["z-index"] = import$(-1, style.hide);
  import$(nodes[1].style, style.basic);
  import$(nodes[2].style, style.basic);
  import$(nodes[3].style, style.basic);
  import$(nodes[4].style, style.child);
  ref$ = import$(nodes[5].style, style.child);
  ref$.width = '200%';
  ref$.height = '200%';
  nodes[0].appendChild(nodes[1]);
  nodes[1].appendChild(nodes[2]);
  nodes[1].appendChild(nodes[3]);
  nodes[2].appendChild(nodes[4]);
  nodes[3].appendChild(nodes[5]);
  root.appendChild(nodes[0]);
  largeNumber = 1000000000;
  reset = function(){
    var ref$;
    ref$ = nodes[4].style;
    ref$.width = largeNumber + "px";
    ref$.height = largeNumber + "px";
    ref$ = nodes[2];
    ref$.scrollLeft = largeNumber;
    ref$.scrollTop = largeNumber;
    return ref$ = nodes[3], ref$.scrollLeft = largeNumber, ref$.scrollTop = largeNumber, ref$;
  };
  reset();
  ref$ = [0, 0, 0, 0, 0], ow = ref$[0], oh = ref$[1], nw = ref$[2], nh = ref$[3], rafid = ref$[4];
  onResize = function(){
    rafid = 0;
    ow = nw;
    oh = nh;
    return callback();
  };
  onScroll = function(){
    var dirty;
    nw = nodes[0].offsetWidth;
    nh = nodes[0].offsetHeight;
    dirty = nw !== ow || nh !== oh;
    if (dirty && !rafid) {
      rafid = requestAnimationFrame(onResize);
    }
    return reset();
  };
  nodes[2].addEventListener('scroll', onScroll);
  return nodes[3].addEventListener('scroll', onScroll);
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}