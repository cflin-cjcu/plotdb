var plotdomain,sched;plotdomain="http://localhost/",sched={timeout:{list:[],func:window.setTimeout,set:function(e,t){return this.func.call(null,e,t)}},interval:{list:[],func:window.setInterval,set:function(e,t){return this.func.call(null,e,t)}},clear:function(){var e,t,n,o,r=[];for(e=0,n=(t=this.timeout.list).length;n>e;++e)o=t[e],clearTimeout(o);for(e=0,n=(t=this.interval.list).length;n>e;++e)o=t[e],r.push(clearInterval(o));return r}},window.setTimeout=function(e,t){var n;return n=sched.timeout.set(e,t),sched.timeout.list.push(n),n},window.setInterval=function(e,t){var n;return n=sched.interval.set(e,t),sched.interval.list.push(n),n},window.addEventListener("click",function(){return window.parent.postMessage({type:"click",payload:""},plotdomain)}),$(document).ready(function(){var e,t,n,o,r,a;return e=function(e){return"snapshot"===e.data.type?r():"render"===e.data.type?a(e.data.payload,e.data.rebind):"parse"===e.data.type?o(e.data.payload):void 0},window.addEventListener("error",function(e){var t,o;return t=e.error.stack,t.indexOf(window.codeURL)&&(t=t.split(window.codeURL).join("line "),o=e.message+" at line "+(e.lineno-1)+".",e.message.indexOf(t)<0&&(o+=" Callstack: \n"+t)),n(window.errorMessage=o)}),t=function(e,t){return null==t&&(t=!0),new Promise(function(n){var o,r,a;return window.errorMessage="",o=t?"module":"moduleLocal",e="(function() { "+e+"; window."+o+" = module; })();",window.codeURL=r=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),a=document.createElement("script"),a.onload=function(){var e;URL.revokeObjectURL(r),n(window[o]);try{return document.body.removeChild(a)}catch(t){return e=t}},a.src=r,document.body.appendChild(a)})},n=function(e){var t,n;return t=e?typeof e!=typeof{}?e+"":e.stack?e.stack:e.toString():"plot failed with unknown error",t.length>1024&&(t=t.substring(0,1024)+"..."),n=t.split("\n"),n.length>4&&(t=n.splice(0,4).join("\n")),window.parent.postMessage({type:"error",payload:t},plotdomain)},o=function(e){var o;try{return t(e,!1).then(function(e){var t,n,o;return t=e.exports,n=JSON.stringify((o={},o.dimension=t.dimension,o.config=t.config,o)),window.parent.postMessage({type:"parse",payload:n},plotdomain)})}catch(r){return o=r,n(o)}},r=function(){var e,t,n;return e=document.createElement("canvas"),document.body.appendChild(e),t=document.getElementById("container").innerHTML,canvg(e,t),n=e.toDataURL(),window.parent.postMessage({type:"snapshot",payload:n},plotdomain)},a=function(e,o){var r,a,i,d,s,l,c;null==o&&(o=!0),r=e.code.content,a=e.style.content,i=e.doc.content,d=e.data,s=e.config||{},sched.clear();try{return o?($(document.body).html("<style type='text/css'>"+a+"</style><div id='container'>"+i+"</div>"),l=t(r)):l=Promise.resolve(),l.then(function(){var e,t,n,r,a,i,l,c,u,p;e=document.getElementById("container"),t=window.module.exports;for(n in r=s)for(a=r[n],i=0,c=(l=a.type).length;c>i;++i){u=l[i],u=plotdb[u.name];try{if(u.test&&u.parse&&u.test(a.value)){a.value=u.parse(a.value);break}}catch(w){p=w,console.log("plotdb type parsing error: "+u.name),console.log(p.stack+"")}}for(n in r=t.config)a=r[n],s[n]=null==s[n]||null==s[n].value?a["default"]:s[n].value;return o&&(t.init&&t.init(e,d,s),t.bind(e,d,s)),t.resize(e,d,s),t.render(e,d,s),window.parent.postMessage({type:"error",payload:window.errorMessage||""},plotdomain)})["catch"](function(e){return n(e)})}catch(u){return c=u,n(c)}},window.addEventListener("message",e,!1),window.addEventListener("keydown",function(e){return!e.metaKey&&!e.altKey||13!==e.keyCode&&13!==e.which?void 0:window.parent.postMessage({type:"alt-enter"},plotdomain)}),window.parent.postMessage({type:"loaded"},plotdomain)});