function import$(e,t){var o={}.hasOwnProperty;for(var n in t)o.call(t,n)&&(e[n]=t[n]);return e}var x$;x$=angular.module("plotDB"),x$.controller("plSite",["$scope","$http","$interval","global","plNotify","dataService"].concat(function(e,t,o,n,r,a){var l,i,s,u,c,d,h;for(e.trackEvent=function(e,t,o,n){return ga("send","event",e,t,o,n)},e.notifications=r.queue,e.nexturl=(l=/nexturl=([^&]+)/.exec(window.location.search||""))?l[1]:window.location.href,e.user={data:n.user},e.dataService=a,e.auth={email:"",passwd:"",show:!1,stick:!1,failed:"",keyHandler:function(e){return 13===e.keyCode?this.login():void 0},logout:function(){return console.log("logout.."),t({url:"/u/logout",method:"GET"}).success(function(){return console.log("logouted."),e.user.data=null,window.location.reload()}).error(function(){return r.send("danger","Failed to Logout. ")})},login:function(){var o=this;return t({url:"/u/login",method:"POST",data:$.param({email:this.email,passwd:this.passwd}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(t){return e.auth.failed="",e.user.data=t,"undefined"!=typeof ga&&null!==ga&&ga("set","&uid",t.key),o.show=!1,e.nexturl?window.location.href=e.nexturl:"/u/login"===window.location.pathname?window.location.href="/":window.location.reload()}).error(function(t,o){return e.auth.failed=403===o?(t.message||(t.message=[])).length?t.message[0]:"email or password incorrect":"system error, please try later"}),this.passwd=""}},e.$watch("auth.show",function(e){return setTimeout(function(){return $("#authpanel").modal(e?"show":"hide")},0)}),window.addEventListener("scroll",function(){var e;return e=$(window).scrollTop(),60>e?$("#nav-top").removeClass("dim"):$("#nav-top").addClass("dim")}),e.charts=[],i=JSON.parse(localStorage.getItem("/list/charttype")),s=0,u=i.length;u>s;++s)c=i[s],d=JSON.parse(localStorage.getItem("/charttype/"+c)),e.charts.push(d);if(e.charts.length<10)for(s=0;100>s;++s)h=s,e.charts.push(import$({},d));return e.load=function(e){return window.location.href="/chart.html?name="+e.name}}));