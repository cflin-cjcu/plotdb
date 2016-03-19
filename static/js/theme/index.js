function import$(e,t){var n={}.hasOwnProperty;for(var r in t)n.call(t,r)&&(e[r]=t[r]);return e}function in$(e,t){for(var n=-1,r=t.length>>>0;++n<r;)if(e===t[n])return!0;return!1}var x$;x$=angular.module("plotDB"),x$.service("sampleTheme",["$rootScope"].concat(function(){return plotdb.theme.sample})),x$.service("themeService",["$rootScope","$http","IOService","sampleTheme","baseService","plUtil","plNotify","eventBus"].concat(function(e,t,n,r,i){var o,a,c,s;return o={sample:r,link:function(e){return"/theme/?k="+e.type.location.charAt(0)+e.key},thumblink:function(e){return"/theme/thumb/?k="+e.type.location.charAt(0)+e.key},sharelink:function(e){return"https://plotdb.com"+this.link(e)}},a=function(){},a.prototype={name:"untitled",desc:null,tags:null,theme:null,doc:{name:"document",type:"html",content:((c=o.sample[0]).doc||(c.doc={})).content||""},style:{name:"stylesheet",type:"css",content:((c=o.sample[0]).style||(c.style={})).content||""},code:{name:"code",type:"javascript",content:((c=o.sample[0]).code||(c.code={})).content||""},config:{},dimension:{},assets:[],thumbnail:null,isType:!1,addFile:function(e,t,n){var r;return null==n&&(n=null),r={name:e,type:t,content:n},this.assets.push(r),r},removeFile:function(e){var t;return t=this.assets.indexOf(e),0>t?void 0:this.assets.splice(t,1)}},s=i.derive("theme",o,a)})),x$.controller("themeEditor",["$scope","$http","$timeout","$interval","dataService","chartService","paletteService","themeService","plNotify"].concat(function(t,n,r,i,o,a,c,s,l){return import$(t,{theme:new s.theme,showsrc:!0,vis:"preview",lastvis:null,plotdomain:"http://localhost/",error:{msg:null,lineno:0},codemirror:{code:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"javascript"},style:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"css"},doc:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"xml"},objs:[]},chart:null,canvas:{node:document.getElementById("chart-renderer"),window:document.getElementById("chart-renderer").contentWindow}}),import$(t,{_save:function(n){var i,o;return null==n&&(n=!1),this.theme.owner!==t.user.data.key&&(i=this.theme,i.key=null,i.owner=null,i.permission=s.theme.prototype.permission),o=this.theme.key?!1:!0,this.theme.save().then(function(){return t.$apply(function(){var e;return n?l.send("warning","theme saved, but thumbnail failed to update"):l.send("success","theme saved"),e=s.link(t.theme),(o||!window.location.search)&&(window.location.href=e),t.save.handle&&r.cancel(t.save.handle),t.save.handle=null})})["catch"](function(n){return t.$apply(function(){return l.aux.error.io("save","theme",e),console.error("[save theme]",n),t.save.handle&&r.cancel(t.save.handle),t.save.handle=null})})},save:function(){var e=this;if(!t.user.data||!t.user.data.key)return t.auth.toggle(!0);if(!this.save.handle)return this.save.handle=r(function(){return e.save.handle=null,e._save(!0)},3e3),this.canvas.window.postMessage({type:"snapshot"},this.plotdomain)},clone:function(){var e;return this.theme.name=this.theme.name+" - Copy",e=this.theme,e.key=null,e.owner=null,e.permission=a.chart.prototype.permission,this.save()},load:function(e,t){var n=this;return s.load(e,t).then(function(e){return import$(n.theme,e),n.backup.check()})["catch"](function(){return window.location.href=window.location.pathname})},"delete":function(){var e=this;if(this.theme.key)return this["delete"].handle=!0,this.theme["delete"]().then(function(){return l.send("success","theme deleted"),e.theme=new s.theme,setTimeout(function(){return window.location.href="/theme/me.html"},1e3),e["delete"].handle=!1})["catch"](function(){return l.send("error","failed to delete theme"),e["delete"].handle=!1})},resetConfig:function(){var e,t,n,r=[];if(this.chart){for(e in t=this.chart.config)n=t[e],r.push(n.value=n["default"]);return r}},migrate:function(){var e,n=this;if(this.theme.key)return e=this.theme.clone(),e.type.location="local"===this.theme.type.location?"server":"local",e.save().then(function(){return n.theme["delete"]().then(function(){return t.theme=e,window.location.href=s.link(t.theme)})})},reset:function(){return this.render()},render:function(e){var n,r,i,o;if(null==e&&(e=!0),this.chart){this.chart.updateData();for(n in r=this.chart)i=r[n],"function"!=typeof i&&(this.chart[n]=i);for(n in r=this.theme)i=r[n],"function"!=typeof i&&(this.theme[n]=i);return o=JSON.parse(angular.toJson({theme:this.theme,chart:this.chart})),r=t.render,r.payload=o,r.rebind=e,e?this.canvas.window.postMessage({type:"reload"},this.plotdomain):this.canvas.window.postMessage({type:"render",payload:o,rebind:e},this.plotdomain)}},renderAsync:function(e){var t=this;return null==e&&(e=!0),this.chart?(this.renderAsync.handler&&r.cancel(this.renderAsync.handler),this.renderAsync.handler=r(function(){return t.renderAsync.handler=null,t.render(e)},500)):void 0},countline:function(){var e=this;return["code","style","doc"].map(function(t){return e.theme[t].lines=e.theme[t].content.split("\n").length,e.theme[t].size=e.theme[t].content.length})},download:{prepare:function(){var e=this;return["plotdb"].map(function(n){return setTimeout(function(){return t.$apply(function(){return[e[n].url="",e[n]()]})},300)})},plotdb:function(){var e;return e=angular.toJson(t.theme),this.plotdb.url=URL.createObjectURL(new Blob([e],{type:"application/json"})),this.plotdb.size=e.length}},colorblind:function(e){var n;return n=["normal","protanopia","protanomaly","deuteranopia","deuteranomaly","tritanopia","tritanomaly","achromatopsia","achromatomaly"],in$(e,n)?this.canvas.window.postMessage({type:"colorblind-emu",payload:e},t.plotdomain):void 0}}),import$(t,{backup:{enabled:!1,init:function(){var e=this;return t.$watch("theme",function(){return e.enabled?(e.handle&&r.cancel(e.handle),e.handle=r(function(){return e.handle=null,t.theme.backup().then(function(){})},2e3)):void 0},!0)},recover:function(){var e=this;if(this.last&&this.last.object)return t.theme.recover(this.last.object),this.enabled=!1,t.theme.cleanBackups().then(function(){return t.$apply(function(){return e.check()})})},check:function(){var e=this;return t.theme.backups().then(function(n){return t.$apply(function(){return e.list=n,e.last=n[0],r(function(){return e.enabled=!0},4e3)})["catch"](function(e){return console.error("fecth backup failed: #",e)})})}},charts:{list:a.sample.map(function(e){return new a.chart(e)}),set:function(e){return t.chart=e,e?(t.chart.theme=t.theme,t.resetConfig(),t.render(),t.canvas.window.postMessage({type:"parse-theme",payload:t.theme.code.content},t.plotdomain)):void 0},init:function(){var e=this;return a.list().then(function(n){return t.$apply(function(){return e.list=a.sample.map(function(e){return new a.chart(e)}).concat(n)})})}},editor:{"class":"",focus:function(){return setTimeout(function(){return t.codemirror.objs.map(function(e){var n,r,i;return n=function(){var e,n=[];for(r in e=t.codemirror)i=e[r],n.push([r,i]);return n}().filter(function(t){return t[1].mode===e.options.mode})[0],n&&t.vis.startsWith(n[0])&&(setTimeout(function(){return e.focus()},10),!n[1].refreshed)?(e.refresh(),n[1].refreshed=!0,setTimeout(function(){return e.refresh(),t.error.lineno?$("#code-editor-code .CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error"):void 0},0)):void 0})},0)},update:function(){return this["class"]=[this.fullscreen.toggled?"fullscreen":"","preview"!==this.vis?"active":"",this.color.modes[this.color.idx]].join(" ")},fullscreen:{toggle:function(){return this.toggled=!this.toggled,t.editor.update(),t.editor.focus()},toggled:!1},color:{modes:["normal","dark"],idx:0,toggle:function(){return this.idx=(this.idx+1)%this.modes.length,t.editor.update()}}},settingPanel:{toggle:function(){return this.toggled=!this.toggled},toggled:!1},sharePanel:{social:{facebook:null},isForkable:function(){var e,n,r;return e=(n=t.theme.permission).value||(n.value=[]),r=!!e.filter(function(e){return"fork"===e.perm&&"public"===e["switch"]}).length},init:function(){var e=this;return["#themeedit-sharelink","#themeedit-embedcode"].map(function(n){var r;return r=new Clipboard(n),r.on("success",function(){return $(n).tooltip({title:"copied",trigger:"click"}).tooltip("show"),setTimeout(function(){return $(n).tooltip("hide")},1e3)}),r.on("error",function(){return $(n).tooltip({title:"Press Ctrl+C to Copy",trigger:"click"}).tooltip("show"),setTimeout(function(){return $(n).tooltip("hide")},1e3)}),t.$watch("sharePanel.link",function(n){var r,i,o,a,c,l,u;return e.embedcode='<iframe src="'+n+'"><iframe>',e.thumblink=s.thumblink(t.theme),r={app_id:"1546734828988373",display:"popup",caption:t.theme.name,picture:e.thumblink,link:e.link,name:t.theme.name,redirect_uri:"http://plotdb.com/",description:t.theme.desc||""},e.social.facebook=["https://www.facebook.com/dialog/feed?"].concat(function(){var e,t=[];for(i in e=r)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),a={url:e.link,media:e.thumblink,description:t.theme.desc||""},e.social.pinterest=["https://www.pinterest.com/pin/create/button/?"].concat(function(){var e,t=[];for(i in e=a)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),c={subject:"plotdb: "+t.theme.name,body:t.theme.desc+" : "+e.link},e.social.email=["mailto:?"].concat(function(){var e,t=[];for(i in e=c)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),l={mini:!0,url:e.link,title:t.theme.name+" on PlotDB",summary:t.theme.desc,source:"plotdb.com"},e.social.linkedin=["http://www.linkedin.com/shareArticle?"].concat(function(){var e,t=[];for(i in e=l)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),u={url:e.link,text:t.theme.name+" - "+(t.theme.desc||""),hashtags:"dataviz,chart,visualization",via:"plotdb"},e.social.twitter=["http://twitter.com/intent/tweet?"].concat(function(){var e,t=[];for(i in e=u)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&")}),t.$watch("sharePanel.forkable",function(n){var r;return r=e.isForkable(),r!==e.forkable&&null!=e.forkable?(t.theme.permission.value=n?[{"switch":"public",perm:"fork"}]:[],e.saveHint=!0):void 0}),t.$watch("theme.permission.value",function(){var t;return t=e.isForkable(),e.forkable!==t&&null!=e.forkable&&(e.saveHint=!0),e.forkable=t},!0)})},saveHint:!1,embedcode:"",link:"",toggle:function(){return this.init&&this.init(),this.init=null,this.toggled=!this.toggled,this.saveHint=!1},toggled:!1,isPublic:function(){return in$("public",t.theme.permission["switch"])},setPrivate:function(){var e;return((e=t.theme).permission||(e.permission={}))["switch"]=["private"],this.saveHint=!0},setPublic:function(){var e;return((e=t.theme).permission||(e.permission={}))["switch"]=["public"],this.saveHint=!0}},coloredit:{config:function(e,t){return{"class":"no-palette",context:"context"+t,exclusive:!0,palette:[e.value]}}},paledit:{convert:function(e){return e.map(function(e){return{id:e.key||Math.random()+"",text:e.name,data:e.colors}})},ldcp:null,item:null,fromTheme:function(e){var t,n,r;return e&&e.config&&e.config.palette?(t=this.list.filter(function(e){return"Theme"===e.text})[0],t||(t={text:"Theme",id:"456",children:null},this.list=[t].concat(this.list)),t.children=this.convert(function(){var t,i=[];for(n in t=e.config.palette)r=t[n],i.push((r.name=n,r));return i}()),$("#pal-select option").remove(),$("#pal-select optgroup").remove(),$("#pal-select").select2({allowedMethods:["updateResults"],templateResult:function(e){var t,n;return e.data?(t=function(){var t,r,i,o=[];for(t=0,i=(r=e.data).length;i>t;++t)n=r[t],o.push("<div class='color' "+("style='background:"+n.hex+";width:"+100/e.data.length+"%'")+"></div>");return o}().join(""),$("<div class='palette select'><div class='name'>"+e.text+"</div>"+("<div class='palette-color'>"+t+"</div></div>"))):e.text},data:this.list})):this.list=this.list.filter(function(e){return"Theme"!==e.text})},init:function(){var e,n,r=this;return this.ldcp=new ldColorPicker(null,{},$("#palette-editor .editor .ldColorPicker")[0]),this.ldcp.on("change-palette",function(){return setTimeout(function(){return t.$apply(function(){return r.update()})},0)}),this.list=[{text:"Default",id:"default",children:this.convert(c.sample)}],e=$("#pal-select"),e.select2(n={allowedMethods:["updateResults"],templateResult:function(e){var t,n;return e.data?(t=function(){var t,r,i,o=[];for(t=0,i=(r=e.data).length;i>t;++t)n=r[t],o.push("<div class='color' "+("style='background:"+n.hex+";width:"+100/e.data.length+"%'")+"></div>");return o}().join(""),$("<div class='palette select'><div class='name'>"+e.text+"</div>"+("<div class='palette-color'>"+t+"</div></div>"))):e.text},data:this.list}),e.on("select2:closing",function(e){function n(t){return t.id===$(e.target).val()}var i,o,a,c,s;for(i=0,a=(o=r.list).length;a>i&&(c=o[i],!(s=c.children.filter(n)[0]));++i);if(s)return t.$apply(function(){return r.item.value=JSON.parse(JSON.stringify({colors:s.data}))}),r.ldcp.setPalette(r.item.value)}),e},update:function(){var e,t,n,r,i,o,a,c,s,l,u,h,d,p,f;if(this.item){for(e=[this.item.value,this.ldcp.getPalette(),[]],t=e[0],n=e[1],r=e[2],i=0,o=n.colors.length;o>i;++i)for(a=i,c=n.colors[a],s=0,l=t.colors.length;l>s;++s)u=s,h=t.colors[u],h.hex===c.hex&&r.push([h,c,Math.abs(a-u)]);for(r.sort(function(e,t){return e[2]-t[2]}),i=0,d=r.length;d>i;++i)p=r[i],p[0].pair||p[1].pair||(p[0].pair=p[1],p[1].pair=p[0]);for(f=[t.colors.filter(function(e){return!e.pair}),n.colors.filter(function(e){return!e.pair})],i=0,o=Math.min(f[0].length,f[1].length);o>i;++i)a=i,f[1][a].pair=f[0][a];return t.colors=n.colors.map(function(e){var t;return e.pair?(t=e.pair,t.hex=e.hex,t):e}),t.colors.forEach(function(e){var t;return t=e.pair,delete e.pair,t})}},toggled:!1,toggle:function(){return this.toggled=!this.toggled,this.toggled?void 0:this.update()},edit:function(e){return this.item=e,this.ldcp.setPalette(e.value),this.toggled=!0}},switchPanel:function(){var e=this;return setTimeout(function(){return t.$apply(function(){var t;return t=e.vis,e.vis="preview"!==e.vis||e.lastvis&&"preview"!==e.lastvis?"preview"===e.vis?e.lastvis:"preview":"code",e.lastvis=t})},0)},hidHandler:function(){var e=this;return t.codemirrored=function(e){return t.codemirror.objs.push(e)},document.body.addEventListener("keydown",function(n){return!n.metaKey&&!n.altKey||13!==n.keyCode&&13!==n.which?void 0:t.$apply(function(){return e.switchPanel()})})},checkParam:function(){var e,n,r,i;if(window.location.search){if("?demo"===window.location.search)return t.theme.doc.content=s.sample[1].doc.content,t.theme.style.content=s.sample[1].style.content,void(t.theme.code.content=s.sample[1].code.content);if(e=/[?&]k=([sl])([^&#|?]+)/.exec(window.location.search))return n=e[2],r=["s"===e[1]?"server":"local",e[2]],i=r[0],n=r[1],t.load({name:"theme",location:i},n)}},assets:{measure:function(){return t.theme.assets.size=t.theme.assets.map(function(e){return e.content.length}).reduce(function(e,t){return e+t},0)},preview:function(e){var t,n;return this.preview.toggled=!0,t=["data:",e.type,";charset=utf-8;base64,",e.content].join(""),n=document.createElement("iframe"),$("#assets-preview .iframe")[0].innerHTML="<iframe></iframe>",$("#assets-preview .iframe iframe")[0].src=t},read:function(e){return new Promise(function(n){var r,i,o,a,c;return r=(i=/([^/]+\.?[^/.]*)$/.exec(e.name))?i[1]:"unnamed",o="unknown",a=t.theme.addFile(r,o,null),c=new FileReader,c.onload=function(){var e,r,i,o,s;return e=c.result,r=e.indexOf(";"),i=e.substring(5,r),o=e.substring(r+8),s=t.theme.assets.map(function(e){return(e.content||"").length}).reduce(function(e,t){return e+t},0)+o.length,s>3e6&&t.$apply(function(){l.alert("Assets size limit (3MB) exceeded. won't upload."),t.theme.removeFile(a)}),a.type=i,a.content=o,t.$applyAsync(function(){return a.type=i,a.content=o,a}),n(a)},c.readAsDataURL(e)})},handle:function(e){var t,n,r,i=[];for(t=0,n=e.length;n>t;++t)r=e[t],i.push(this.read(r));return i},node:null,init:function(){var e,t=this;return e=this.node=$("#code-editor-assets input"),e.on("change",function(){return t.handle(t.node[0].files)}),e}},monitor:function(){var e=this;return this.assets.init(),this.$watch("vis",function(){return t.editor.focus()}),this.$watch("theme.assets",function(){return e.assets.measure()},!0),this.$watch("theme.doc.content",function(){return e.countline()}),this.$watch("theme.style.content",function(){return e.countline()}),this.$watch("theme.code.content",function(){return e.countline()}),this.$watch("theme.doc.content",function(){return e.renderAsync()}),this.$watch("theme.style.content",function(){return e.renderAsync()}),this.$watch("theme",function(){return e.renderAsync()}),this.$watch("chart",function(t){return e.renderAsync(),e.theme.chart=t?t.key:null}),this.$watch("theme.chart",function(t){return e.charts.set(e.charts.list.filter(function(e){return e.key===t})[0])}),this.$watch("theme.code.content",function(t){return e.theme?(e.communicate.parseThemeHandler&&r.cancel(e.communicate.parseThemeHandler),e.communicate.parseThemeHandler=r(function(){return e.communicate.parseThemeHandler=null,e.canvas.window.postMessage({type:"parse-theme",payload:t},e.plotdomain)},500)):void 0}),this.$watch("chart.config",function(t,n){var r,i,o;return null==n&&(n={}),r=!!function(){var e,n=[];for(i in e=t)o=e[i],n.push([i,o]);return n}().filter(function(e){var t,r;return t=e[0],r=e[1],!n[t]||r.value!==n[t].value}).map(function(){return o.rebindOnChange}).filter(function(e){return e}).length,e.renderAsync(r)},!0),this.$watch("theme.key",function(){return e.sharePanel.link=s.sharelink(e.theme)}),t.limitscroll($("#chart-configs")[0])},communicate:function(){var e=this;return window.addEventListener("message",function(n){var r;return r=n.data,t.$apply(function(){var n,i,o,a,c,s,l,u,h,d,p,f,m,v,g,y,w;if(r&&"object"==typeof r)if("error"===r.type){if($("#code-editor-code .CodeMirror-code > .error").removeClass("error"),t.error.msg=(r.payload||(r.payload={})).msg||"",t.error.lineno=(r.payload||(r.payload={})).lineno||0,t.error.lineno)return $("#code-editor-code .CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error")}else{if("alt-enter"===r.type)return t.switchPanel();if("snapshot"===r.type)return r.payload&&(e.theme.thumbnail=r.payload),e._save();if("parse"===r.type){n=JSON.parse(r.payload),i=n.config,o=n.dimension;for(a in n=e.chart.dimension)c=n[a],null!=o[a]&&(o[a].fields=c.fields);for(a in n=e.chart.config)c=n[a],null!=i[a]&&(i[a].value=c.value);for(a in i)c=i[a],null==c.value&&(c.value=c["default"]);return n=e.chart,n.config=i,n.dimension=o,t.render()}if("parse-theme"===r.type){if(i=JSON.parse(r.payload).config,e.theme.config=i,e.chart){for(a in n=e.chart.config)c=n[a],c._bytheme&&delete e.chart.config[a];for(a in n=e.theme.config)c=n[a],s=e.chart.config[a]?e.chart.config[a].hint:"default",l=null!=e.theme.config[a][s]?e.theme.config[a][s]:null!=e.theme.config[a]["default"]?e.theme.config[a]["default"]:"object"!=typeof e.theme.config[a]?e.theme.config[a]:void 0,e.chart.config[a]&&e.chart.config[a].value?e.chart.config[a].value=l:e.chart.config[a]={value:l,type:[],_bytheme:!0}}return e.paledit.fromTheme(e.theme),t.render()}if("loaded"===r.type){if(!e.chart)return;return t.render.payload?(u=t.render.payload,h=t.render.rebind,e.canvas.window.postMessage({type:"render",payload:u,rebind:h},e.plotdomain),t.render.payload=null):(e.canvas.window.postMessage({type:"parse",payload:e.chart.code.content},e.plotdomain),e.canvas.window.postMessage({type:"parse-theme",payload:e.theme.code.content},e.plotdomain))}if("click"===r.type)return document.dispatchEvent?(d=document.createEvent("MouseEvents"),d.initEvent("click",!0,!0),d.synthetic=!0,document.dispatchEvent(d)):(d=document.createEventObject(),d.synthetic=!0,document.fireEvent("onclick",d));if("getsvg"===r.type)return r.payload?(t.download.svg.url=URL.createObjectURL(new Blob([r.payload],{type:"image/svg+xml"})),t.download.svg.size=r.payload.length):t.download.svg.url="#";if("getpng"===r.type){if(!r.payload)return t.download.png.url="#";if(p=atob(r.payload.split(",")[1]),f=r.payload.split(",")[0].split(":")[1].split(";")[0],"image/png"!==f)return t.download.png.url="#";for(m=new ArrayBuffer(p.length),v=new Uint8Array(m),g=0,y=p.length;y>g;++g)w=g,v[w]=p.charCodeAt(w);return t.download.png.url=URL.createObjectURL(new Blob([m],{type:"image/png"})),t.download.png.size=p.length}}})},!1)},fieldAgent:{init:function(){var e=this;return $("#field-agent").on("mousewheel",function(){return e.setPosition()})},data:null,drag:{ging:!1,start:function(){return this.ging=!0},end:function(){return this.ging=!1}},setPosition:function(){var e,t,n;if(this.node)return e=this.node.getBoundingClientRect(),t=this.node.parentNode.parentNode.getBoundingClientRect(),n={left:$("#data-fields").scrollLeft(),top:$("#data-fields").scrollTop()},$("#field-agent").css({top:e.top-t.top+55-n.top+"px",left:e.left-t.left-n.left+"px",width:e.width+"px",height:e.height+"px"})},setProxy:function(e,t){var n,r,i=this;if(!this.drag.ging){for(n=[t,e.target],this.data=n[0],r=n[1];!(r.getAttribute("class").indexOf("data-field")>=0);)if(r=r.parentNode,"body"===r.nodeName.toLowerCase())return;return setTimeout(function(){return i.node=r,i.setPosition()},0)}}},init:function(){return this.communicate(),this.hidHandler(),this.monitor(),this.checkParam(),this.paledit.init(),this.backup.init(),this.fieldAgent.init(),this.charts.init()}}),t.init()})),x$.controller("themeList",["$scope","$http","IOService","dataService","themeService"].concat(function(e,t,n,r,i){return e.themes=[],Promise.all([new Promise(function(e,t){return n.aux.listLocally({name:"theme"},e,t)}),new Promise(function(e,t){return n.aux.listRemotely({name:"theme"},e,t,"q=all")})]).then(function(t){return e.$apply(function(){return e.themes=t[0].concat(t[1]),e.themes.forEach(function(e){return e.width=Math.random()>.8?640:320}),e.load=function(e){return window.location.href=i.link(e)}})})}));