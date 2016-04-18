function import$(e,t){var n={}.hasOwnProperty;for(var r in t)n.call(t,r)&&(e[r]=t[r]);return e}function in$(e,t){for(var n=-1,r=t.length>>>0;++n<r;)if(e===t[n])return!0;return!1}var x$;x$=angular.module("plotDB"),x$.controller("plEditor",["$scope","$http","$timeout","$interval","$sce","plConfig","IOService","dataService","chartService","paletteService","themeService","plNotify"].concat(function(t,n,r,i,o,a,s,c,l,u,d,h){return import$(t,{plConfig:a,theme:new d.theme,chart:new l.chart,showsrc:!0,vis:"preview",lastvis:null,plotdbDomain:"http://localhost",plotdbRenderer:a.urlschema+""+a.domain+"/render.html",error:{msg:null,lineno:0},codemirror:{code:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"javascript"},style:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"css"},doc:{lineWrapping:!0,lineNumbers:!0,viewportMargin:1/0,mode:"xml"},objs:[]},canvas:{node:document.getElementById("chart-renderer"),window:document.getElementById("chart-renderer").contentWindow},type:null,service:null}),n({url:t.plotdbRenderer,method:"GET"}).success(function(e){var i;return i=/<meta name="script" content="([^"]+)">/.exec(e),i?n({url:i[1],method:"GET"}).success(function(n){var i,a;return i=URL.createObjectURL(new Blob([n],{type:"text/javascript"})),e=e.replace(/<meta name="script" content="([^"]+)">/,"<script type='text/javascript' src='"+i+"'></script>"),a=URL.createObjectURL(new Blob([e],{type:"text/html"})),t.plotdbDomain=a,r(function(){return t.plotdbRenderer=o.trustAsResourceUrl(a)},1e3)}):void 0}),import$(t,{target:function(){return this[this.type]},mode:{set:function(e){return import$(t,function(){switch(e){case"chart":return{value:e,type:"chart",service:l};case"theme":return{value:e,type:"theme",service:d}}}())}},_save:function(e){var t,n,i,o,a=this;return null==e&&(e=!1),this.target().owner!==this.user.data.key&&(t="server"===this.target()._type.location?this.target().key:null,n=this.target(),n.key=null,n.owner=null,n.permission={"switch":[],value:[]},t&&(this.target().parent=t)),i=this.target().key?!1:!0,this.target().dimension&&(this.target().dimlen=function(){var e=[];for(o in this.target().dimension||{})e.push(o);return e}.call(this).length),this.target().save().then(function(){return a.$apply(function(){var t;return e?h.send("warning",a.type+" saved, but thumbnail failed to update"):h.send("success",a.type+" saved"),t=a.service.link(a.target()),(i||!window.location.search)&&(window.location.href=t),a.save.handle&&r.cancel(a.save.handle),a.save.handle=null,a.backup.unguard(3e3)})})["catch"](function(e){return a.$apply(function(){return h.aux.error.io("save",a.type,e),console.error("[save "+name+"]",e),a.save.handle&&r.cancel(a.save.handle),a.save.handle=null})})},save:function(){var e=this;if(!t.user.authed())return t.auth.toggle(!0);if(!this.save.handle)return this.save.handle=r(function(){return e.save.handle=null,e._save(!0)},3e3),this.canvas.window.postMessage({type:"snapshot"},this.plotdbDomain)},clone:function(){var e,t;return this.target().name=this.target().name+" - Copy",e="server"===this.target()._type.location?this.target().key:null,t=this.target(),t.key=null,t.owner=null,t.parent=e,t.permission={"switch":[],value:[]},this.save()},load:function(e,n){var r=this;return this.service.load(e,n).then(function(e){return r[r.type]=new r.service[r.type](import$(r[r.type],e)),r.backup.check(),t.backup.unguard(3e3),t.countline()})["catch"](function(e){return console.error(e),h.send("error","failed to load chart. please try reloading"),"forbidden"===e[1]?window.location.href="/403.html":void 0})},"delete":function(){var e=this;if(this.target().key)return this["delete"].handle=!0,this.target()["delete"]().then(function(){return h.send("success",e.type+" deleted"),e[e.type]=new e.service[e.type],t.backup.unguard(1e4),setTimeout(function(){return window.location.href="/"+e.type+"/me/"},1e3),e["delete"].handle=!1})["catch"](function(){return h.send("error","failed to delete "+e.type),e["delete"].handle=!1})},resetConfig:function(){var e,t,n,r=[];if(this.chart){for(e in t=this.chart.config)n=t[e],r.push(n.value=n["default"]);return r}},dimension:{bind:function(e,n,r){return null==r&&(r={}),r.update().then(function(){return n.multiple?(n.fields||(n.fields=[])).push(r):n.fields=[r],t.render()})["catch"](function(e){return h.send("error","failed to bind field. try again later."),console.error("chart.ls / dimension field binding failed due to : ",e)})},unbind:function(e,n,r){var i;return null==r&&(r={}),i=n.fields.indexOf(r),0>i?void 0:(n.fields.splice(i,1),t.render())}},reset:function(){return this.render()},render:function(e){var n,r;return null==e&&(e=!0),this.chart?(this.chart.updateData(),n=JSON.parse(angular.toJson({theme:this.theme,chart:this.chart})),r=t.render,r.payload=n,r.rebind=e,e?this.canvas.window.postMessage({type:"reload"},this.plotdbDomain):this.canvas.window.postMessage({type:"render",payload:n,rebind:e},this.plotdbDomain)):void 0},renderAsync:function(e){var t=this;return null==e&&(e=!0),this.chart?(this.renderAsync.handler&&r.cancel(this.renderAsync.handler),this.renderAsync.handler=r(function(){return t.renderAsync.handler=null,t.render(e)},500)):void 0},parse:{send:function(e){return t[e]?(this[e].pending=!0,t.canvas.window.postMessage({type:"parse-"+e,payload:t[e].code.content},t.plotdbDomain)):void 0},chart:function(){return this.send("chart")},theme:function(){return this.send("theme")}},countline:function(){var e=this;return["code","style","doc"].map(function(t){return e.target()[t].lines=e.target()[t].content.split("\n").length,e.target()[t].size=e.target()[t].content.length})},download:{prepare:function(){var e=this;return["svg","png","plotdb"].map(function(n){return setTimeout(function(){return t.$apply(function(){return[e[n].url="",e[n]()]})},300)})},svg:function(){return t.canvas.window.postMessage({type:"getsvg"},t.plotdbDomain)},png:function(){return t.canvas.window.postMessage({type:"getpng"},t.plotdbDomain)},plotdb:function(){var e;return e=angular.toJson(t.target()),this.plotdb.url=URL.createObjectURL(new Blob([e],{type:"application/json"})),this.plotdb.size=e.length}},colorblind:{val:"normal",vals:["normal","protanopia","protanomaly","deuteranopia","deuteranomaly","tritanopia","tritanomaly","achromatopsia","achromatomaly"],set:function(e){return in$(e,this.vals)?(this.val=e,t.canvas.window.postMessage({type:"colorblind-emu",payload:e},t.plotdbDomain)):void 0}},applyTheme:function(){var e,t,n,r;if(this.chart&&this.theme){for(e in t=this.chart.config)n=t[e],n._bytheme&&delete this.chart.config[e];for(e in t=this.chart.config)n=t[e],this.chart.config[e].hint&&(r=this.theme.typedef[this.chart.config[e].type[0].name],r&&null!=r[this.chart.config[e].hint]&&(this.chart.config[e].value=r[this.chart.config[e].hint]));for(e in t=this.theme.config)if(n=t[e],this.chart.config[e]){if(this.chart.config[e].type[0].name!==n.type[0].name)continue;this.chart.config[e].value=n["default"]}else this.chart.config[e]=import$({_bytheme:!0},n)}return this.theme?this.paledit.fromTheme(this.theme):void 0}}),import$(t,{backup:{enabled:!1,guard:!1,unguard:function(e){var n=this;return null==e&&(e=1e3),this.guard=!1,r(function(){var e;return n.guard=!0,e=t.unsaved,delete t.unsaved,e},e)},init:function(){var e=this;return t.$watch(t.type,function(){return t.unsaved=!0,e.enabled?(e.handle&&r.cancel(e.handle),e.handle=r(function(){return e.handle=null,t.target().backup().then(function(){})},2e3)):void 0},!0),this.unguard(3e3),window.onbeforeunload=function(){return e.guard&&t.unsaved?"You have unsaved changes. Still wanna leave?":null}},recover:function(){var e=this;if(this.last&&this.last.object)return t.target().recover(this.last.object),this.enabled=!1,t.target().cleanBackups().then(function(){return t.$apply(function(){return e.check()})})},check:function(){var e=this;return t.target().backups().then(function(n){return t.$apply(function(){return e.list=n,e.last=n[0],r(function(){return e.enabled=!0},4e3)})["catch"](function(e){return console.error("fecth backup failed: #",e)})})}},charts:{list:l.sample.map(function(e){return new l.chart(e)}),set:function(e){return t.chart=e,e?"sample"===e._type.location?(t.chart=new l.chart(e),t.chart.theme=t.theme,t.resetConfig(),t.render(),void t.parse.theme()):l.load(e._type,e.key).then(function(e){return t.chart=new l.chart(e),t.chart.theme=t.theme,t.resetConfig(),t.render(),t.parse.theme()})["catch"](function(e){return console.error(e),h.send("error","failed to load chart. please try reloading")}):void 0},init:function(){var n=this;return s.listRemotely({name:"chart"},{owner:t.user.data?t.user.data.key:-1}).then(function(e){return t.$apply(function(){return n.list=l.sample.concat(e).map(function(e){return new l.chart(e)})})})["catch"](function(){return console.error(e),h.send("error","failed to load chart list. use sample chart instead")})}},themes:{list:d.sample,set:function(e){return t.theme=e},init:function(){var e=this;return d.list().then(function(n){return t.$apply(function(){return e.list=n})})}},editor:{"class":"",focus:function(){return setTimeout(function(){return t.codemirror.objs.map(function(e){var n,r,i;return n=function(){var e,n=[];for(r in e=t.codemirror)i=e[r],n.push([r,i]);return n}().filter(function(t){return t[1].mode===e.options.mode})[0],n&&t.vis.startsWith(n[0])&&(setTimeout(function(){return e.focus()},10),!n[1].refreshed)?(e.refresh(),n[1].refreshed=!0,setTimeout(function(){return e.refresh(),t.error.lineno?$("#code-editor-code .CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error"):void 0},0)):void 0})},0)},update:function(){return this["class"]=[this.fullscreen.toggled?"fullscreen":"","preview"!==this.vis?"active":"",this.color.modes[this.color.idx]].join(" ")},fullscreen:{toggle:function(){return this.toggled=!this.toggled,t.editor.update(),t.editor.focus()},toggled:!1},color:{modes:["normal","dark"],idx:0,toggle:function(){return this.idx=(this.idx+1)%this.modes.length,t.editor.update()}}},settingPanel:{toggle:function(){return this.toggled=!this.toggled},toggled:!1},sharePanel:{social:{facebook:null},isForkable:function(){var e,n,r;return e=(n=t.target().permission).value||(n.value=[]),r=!!e.filter(function(e){return"fork"===e.perm&&"public"===e["switch"]}).length},init:function(){var e=this;return["#edit-sharelink","#edit-embedcode"].map(function(n){var r;return r=new Clipboard(n),r.on("success",function(){return $(n).tooltip({title:"copied",trigger:"click"}).tooltip("show"),setTimeout(function(){return $(n).tooltip("hide")},1e3)}),r.on("error",function(){return $(n).tooltip({title:"Press Ctrl+C to Copy",trigger:"click"}).tooltip("show"),setTimeout(function(){return $(n).tooltip("hide")},1e3)}),t.$watch("sharePanel.link",function(n){var r,i,o,a,s,c,l;return e.embedcode='<iframe src="'+n+'"><iframe>',e.thumblink=t.service.thumblink(t.chart),r={app_id:"1546734828988373",display:"popup",caption:t.target().name,picture:e.thumblink,link:e.link,name:t.target().name,redirect_uri:"http://plotdb.com/",description:t.target().description||""},e.social.facebook=["https://www.facebook.com/dialog/feed?"].concat(function(){var e,t=[];for(i in e=r)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),a={url:e.link,media:e.thumblink,description:t.target().description||""},e.social.pinterest=["https://www.pinterest.com/pin/create/button/?"].concat(function(){var e,t=[];for(i in e=a)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),s={subject:"plotdb: "+t.target().name,body:t.target().description+" : "+e.link},e.social.email=["mailto:?"].concat(function(){var e,t=[];for(i in e=s)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),c={mini:!0,url:e.link,title:t.target().name+" on PlotDB",summary:t.target().description,source:"plotdb.com"},e.social.linkedin=["http://www.linkedin.com/shareArticle?"].concat(function(){var e,t=[];for(i in e=c)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&"),l={url:e.link,text:t.target().name+" - "+(t.target().description||""),hashtags:"dataviz,chart,visualization",via:"plotdb"},e.social.twitter=["http://twitter.com/intent/tweet?"].concat(function(){var e,t=[];for(i in e=l)o=e[i],t.push(i+"="+encodeURIComponent(o));return t}()).join("&")}),t.$watch("sharePanel.forkable",function(n){var r;return r=e.isForkable(),r!==e.forkable&&null!=e.forkable?(t.target().permission.value=n?[{"switch":"public",perm:"fork"}]:[],t.target().searchable=n,e.saveHint=!0):void 0}),t.$watch(t.type+".permission.value",function(){var t;return t=e.isForkable(),e.forkable!==t&&null!=e.forkable&&(e.saveHint=!0),e.forkable=t},!0)})},saveHint:!1,embedcode:"",link:"",toggle:function(){return this.init&&this.init(),this.init=null,this.toggled=!this.toggled,this.saveHint=!1},toggled:!1,isPublic:function(){return in$("public",t.target().permission["switch"])},setPrivate:function(){var e;return((e=t.target()).permission||(e.permission={}))["switch"]=["private"],this.saveHint=!0},setPublic:function(){var e;return((e=t.target()).permission||(e.permission={}))["switch"]=["public"],this.saveHint=!0}},coloredit:{config:function(e,t){return{"class":"no-palette text-input",context:"context"+t,exclusive:!0,palette:[e.value]}}},paledit:{convert:function(e){return e.map(function(e){return{id:e.key||Math.random()+"",text:e.name,data:e.colors}})},ldcp:null,item:null,fromTheme:function(e){var t,n,r;return e&&e.config&&e.config.palette?(t=this.list.filter(function(e){return"Theme"===e.text})[0],t||(t={text:"Theme",id:"456",children:null},this.list=[t].concat(this.list)),t.children=this.convert(function(){var t,i=[];for(n in t=e.config.palette)r=t[n],i.push((r.name=n,r));return i}()),$("#pal-select option").remove(),$("#pal-select optgroup").remove(),$("#pal-select").select2({allowedMethods:["updateResults"],templateResult:function(e){var t,n;return e.data?(t=function(){var t,r,i,o=[];for(t=0,i=(r=e.data).length;i>t;++t)n=r[t],o.push("<div class='color' "+("style='background:"+n.hex+";width:"+100/e.data.length+"%'")+"></div>");return o}().join(""),$("<div class='palette select'><div class='name'>"+e.text+"</div>"+("<div class='palette-color'>"+t+"</div></div>"))):e.text},data:this.list})):this.list=this.list.filter(function(e){return"Theme"!==e.text})},init:function(){var e,n,r=this;return this.ldcp=new ldColorPicker(null,{},$("#palette-editor .editor .ldColorPicker")[0]),this.ldcp.on("change-palette",function(){return setTimeout(function(){return t.$apply(function(){return r.update()})},0)}),this.list=[{text:"Default",id:"default",children:this.convert(u.sample)}],e=$("#pal-select"),e.select2(n={allowedMethods:["updateResults"],templateResult:function(e){var t,n;return e.data?(t=function(){var t,r,i,o=[];for(t=0,i=(r=e.data).length;i>t;++t)n=r[t],o.push("<div class='color' "+("style='background:"+n.hex+";width:"+100/e.data.length+"%'")+"></div>");return o}().join(""),$("<div class='palette select'><div class='name'>"+e.text+"</div>"+("<div class='palette-color'>"+t+"</div></div>"))):e.text},data:this.list}),e.on("select2:closing",function(e){function n(t){return t.id===$(e.target).val()}var i,o,a,s,c;for(i=0,a=(o=r.list).length;a>i&&(s=o[i],!(c=s.children.filter(n)[0]));++i);if(c)return t.$apply(function(){return r.item.value=JSON.parse(JSON.stringify({colors:c.data}))}),r.ldcp.setPalette(r.item.value)}),e},update:function(){var e,t,n,r,i,o,a,s,c,l,u,d,h,p,f;if(this.item){for(e=[this.item.value,this.ldcp.getPalette(),[]],t=e[0],n=e[1],r=e[2],i=0,o=n.colors.length;o>i;++i)for(a=i,s=n.colors[a],c=0,l=t.colors.length;l>c;++c)u=c,d=t.colors[u],d.hex===s.hex&&r.push([d,s,Math.abs(a-u)]);for(r.sort(function(e,t){return e[2]-t[2]}),i=0,h=r.length;h>i;++i)p=r[i],p[0].pair||p[1].pair||(p[0].pair=p[1],p[1].pair=p[0]);for(f=[t.colors.filter(function(e){return!e.pair}),n.colors.filter(function(e){return!e.pair})],i=0,o=Math.min(f[0].length,f[1].length);o>i;++i)a=i,f[1][a].pair=f[0][a];return t.colors=n.colors.map(function(e){var t;return e.pair?(t=e.pair,t.hex=e.hex,t):e}),t.colors.forEach(function(e){var t;return t=e.pair,delete e.pair,t})}},toggled:!1,toggle:function(){return this.toggled=!this.toggled,this.toggled?void 0:this.update()},edit:function(e){return this.item=e,this.ldcp.setPalette(e.value),this.toggled=!0}},switchPanel:function(){var e=this;return setTimeout(function(){return t.$apply(function(){var n;return n=e.vis,e.vis="preview"!==e.vis||e.lastvis&&"preview"!==e.lastvis?"preview"===e.vis?e.lastvis:"preview":"code",e.lastvis=n,t.codemirror.objs.forEach("preview"===e.vis?function(e){return e.getInputField().blur()}:function(e){return e.refresh()})})},0)},hidHandler:function(){var e=this;return t.codemirrored=function(e){return t.codemirror.objs.push(e)},document.body.addEventListener("keydown",function(n){return!n.metaKey&&!n.altKey||13!==n.keyCode&&13!==n.which?void 0:t.$apply(function(){return e.switchPanel()})})},checkParam:function(){var e,n,r,i;if(window.location.search){if("?demo"===window.location.search)return t.target().doc.content=t.service.sample[1].doc.content,t.target().style.content=t.service.sample[1].style.content,void(t.target().code.content=t.service.sample[1].code.content);if(e=/[?&]k=([sl])([^&#|?]+)/.exec(window.location.search))return n=e[2],r=["s"===e[1]?"server":"local",e[2]],i=r[0],n=r[1],t.load({name:t.type,location:i},n)}},assets:{measure:function(){var e;return((e=t.target()).assets||(e.assets=[])).size=t.target().assets.map(function(e){return e.content.length}).reduce(function(e,t){return e+t},0)},preview:function(e){var t,n;return this.preview.toggled=!0,t=["data:",e.type,";charset=utf-8;base64,",e.content].join(""),n=document.createElement("iframe"),$("#assets-preview .iframe")[0].innerHTML="<iframe></iframe>",$("#assets-preview .iframe iframe")[0].src=t},read:function(e){return new Promise(function(n){var r,i,o,a,s;return r=(i=/([^/]+\.?[^/.]*)$/.exec(e.name))?i[1]:"unnamed",o="unknown",a=t.target().addFile(r,o,null),s=new FileReader,s.onload=function(){var e,r,i,o,c,l;return e=s.result,r=e.indexOf(";"),i=e.substring(5,r),o=e.substring(r+8),c=((l=t.target()).assets||(l.assets=[])).map(function(e){return(e.content||"").length}).reduce(function(e,t){return e+t},0)+o.length,c>3e6&&t.$apply(function(){h.alert("Assets size limit (3MB) exceeded. won't upload."),t.target().removeFile(a)}),a.type=i,a.content=o,t.$applyAsync(function(){return a.type=i,a.content=o,a}),n(a)},s.readAsDataURL(e)})},handle:function(e){var t,n,r,i=[];for(t=0,n=e.length;n>t;++t)r=e[t],i.push(this.read(r));return i},node:null,init:function(){var e,t=this;return e=this.node=$("#code-editor-assets input"),e.on("change",function(){return t.handle(t.node[0].files)}),e}},monitor:function(){var e=this;return this.assets.init(),this.$watch("vis",function(){return t.editor.focus()}),this.$watch(t.type+".assets",function(){return e.assets.measure()},!0),this.$watch(t.type+".doc.content",function(){return e.countline()}),this.$watch(t.type+".style.content",function(){return e.countline()}),this.$watch(t.type+".code.content",function(){return e.countline()}),this.$watch(t.type+".doc.content",function(){return e.renderAsync()}),this.$watch(t.type+".style.content",function(){return e.renderAsync()}),this.$watch("theme",function(t){return e.renderAsync(),e.chart?e.chart.theme=t?t.key:null:void 0}),this.$watch("chart",function(t){return e.renderAsync(),e.theme?e.theme.chart=t?t.key:null:void 0}),this.$watch("chart.theme",function(t){return"chart"===e.type?e.theme=e.themes.list.filter(function(e){return e.key===t})[0]:void 0}),this.$watch("theme.chart",function(t){return"theme"===e.type?e.charts.set(e.charts.list.filter(function(e){return e.key===t})[0]):void 0}),this.$watch("chart.code.content",function(){return e.communicate.parseHandler&&r.cancel(e.communicate.parseHandler),e.communicate.parseHandler=r(function(){return e.communicate.parseHandler=null,t.parse.chart()},500)}),this.$watch("theme.code.content",function(){return e.theme?(e.communicate.parseThemeHandler&&r.cancel(e.communicate.parseThemeHandler),e.communicate.parseThemeHandler=r(function(){return e.communicate.parseThemeHandler=null,t.parse.theme()},500)):void 0}),this.$watch("chart.config",function(t,n){var r,i,o;return null==n&&(n={}),r=!!function(){var e,n=[];for(i in e=t)o=e[i],n.push([i,o]);return n}().filter(function(e){var t,r;return t=e[0],r=e[1],!n[t]||r.value!==n[t].value}).map(function(e){return(e[1]||{}).rebindOnChange}).filter(function(e){return e}).length,e.renderAsync(r)},!0),this.$watch(this.type+".key",function(){return e.sharePanel.link=l.sharelink(e.target())}),$("#data-fields")[0]&&t.limitscroll,t.limitscroll($("#chart-configs")[0])},communicate:function(){var e=this;return window.addEventListener("message",function(n){var r;return r=n.data,t.$apply(function(){var n,i,o,a,s,c,l,u,d,h,p,f,m,v,g;if(r&&"object"==typeof r)if("error"===r.type){if($("#code-editor-code .CodeMirror-code > .error").removeClass("error"),t.error.msg=(r.payload||(r.payload={})).msg||"",t.error.lineno=(r.payload||(r.payload={})).lineno||0,t.error.lineno)return $("#code-editor-code .CodeMirror-code > div:nth-of-type("+t.error.lineno+")").addClass("error")}else{if("alt-enter"===r.type)return t.switchPanel();if("snapshot"===r.type)return r.payload&&(e.target().thumbnail=r.payload),e._save();if("parse-chart"===r.type){t.parse.chart.pending=!1,n=JSON.parse(r.payload),i=n.config,o=n.dimension;for(a in n=e.chart.dimension)s=n[a],null!=o[a]&&(o[a].fields=s.fields);for(a in n=e.chart.config)s=n[a],null!=i[a]&&(i[a].value=s.value);for(a in i)s=i[a],null==s.value&&(s.value=s["default"]);return n=e.chart,n.config=i,n.dimension=o,t.render()}if("parse-theme"===r.type)return t.parse.theme.pending=!1,n=JSON.parse(r.payload),i=n.config,c=n.typedef,n=e.theme,n.config=i,n.typedef=c,e.applyTheme(),t.render();if("loaded"===r.type){if(!e.chart)return;if(t.render.payload&&(e.canvas.window.postMessage((l={type:"render"},l.payload=(n=t.render).payload,l.rebind=n.rebind,l),e.plotdbDomain),t.render.payload=null),t.parse.chart.pending&&(e.chart&&e.canvas.window.postMessage({type:"parse-chart",payload:e.chart.code.content},e.plotdbDomain),t.parse.chart.pending=null),t.parse.theme.pending)return e.theme&&e.canvas.window.postMessage({type:"parse-theme",payload:e.theme.code.content},e.plotdbDomain),t.parse.theme.pending=null}else{if("click"===r.type)return document.dispatchEvent?(u=document.createEvent("MouseEvents"),u.initEvent("click",!0,!0),u.synthetic=!0,document.dispatchEvent(u)):(u=document.createEventObject(),u.synthetic=!0,document.fireEvent("onclick",u));if("getsvg"===r.type)return r.payload?(t.download.svg.url=URL.createObjectURL(new Blob([r.payload],{type:"image/svg+xml"})),t.download.svg.size=r.payload.length):t.download.svg.url="#";if("getpng"===r.type){if(!r.payload)return t.download.png.url="#";if(d=atob(r.payload.split(",")[1]),h=r.payload.split(",")[0].split(":")[1].split(";")[0],"image/png"!==h)return t.download.png.url="#";for(p=new ArrayBuffer(d.length),f=new Uint8Array(p),m=0,v=d.length;v>m;++m)g=m,f[g]=d.charCodeAt(g);return t.download.png.url=URL.createObjectURL(new Blob([p],{type:"image/png"})),t.download.png.size=d.length}}}})},!1)},fieldAgent:{init:function(){var e=this;return $("#field-agent").on("mousewheel",function(){return e.setPosition()})},data:null,drag:{ging:!1,start:function(){return this.ging=!0},end:function(){return this.ging=!1}},setPosition:function(){var e,t,n;if(this.node)return e=this.node.getBoundingClientRect(),t=this.node.parentNode.parentNode.getBoundingClientRect(),n={left:$("#data-fields").scrollLeft(),top:$("#data-fields").scrollTop()},$("#field-agent").css({top:e.top-t.top+55-n.top+"px",left:e.left-t.left-n.left+"px",width:e.width+"px",height:e.height+"px"})},setProxy:function(e,t){var n,r,i=this;if(!this.drag.ging){for(n=[t,e.target],this.data=n[0],r=n[1];!(r.getAttribute("class").indexOf("data-field")>=0);)if(r=r.parentNode,"body"===r.nodeName.toLowerCase())return;return setTimeout(function(){return i.node=r,i.setPosition()},0)}}},init:function(){return this.communicate(),this.hidHandler(),this.monitor(),this.checkParam(),this.paledit.init(),this.backup.init(),this.fieldAgent.init(),"theme"===this.type&&this.charts.init(),"chart"===this.type?this.themes.init():void 0}}),t.mode.set(/^\/chart\//.exec(window.location.pathname)?"chart":"theme"),t.init()}));