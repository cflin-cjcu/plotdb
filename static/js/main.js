function import$(e,a){var r={}.hasOwnProperty;for(var t in a)r.call(a,t)&&(e[t]=a[t]);return e}var x$;x$=angular.module("plotDB",["backend","ui.codemirror","ngDraggable"]),x$.service("plNotify",["$rootScope","$timeout"].concat(function(e,a){return import$(this,{queue:[],send:function(e,r){var t,i=this;return this.queue.push(t={type:e,message:r}),a(function(){return i.queue.splice(i.queue.indexOf(t),1)},2900)}})})),x$.controller("plMain",["$scope","$http","$interval","global","plNotify","dataService"].concat(function(e,a,r,t,i,n){var s;return e.trackEvent=function(e,a,r,t){return ga("send","event",e,a,r,t)},e.notifications=i.queue,e.nexturl=(s=/nexturl=([^&]+)/.exec(window.location.search||""))?s[1]:window.location.href,e.user={data:t.user},e.dataService=n,e.auth={email:"",passwd:"",show:!1,stick:!1,failed:"",keyHandler:function(e){return 13===e.keyCode?this.login():void 0},logout:function(){return console.log("logout.."),a({url:"/u/logout",method:"GET"}).success(function(){return console.log("logouted."),e.user.data=null,window.location.reload()}).error(function(){return i.send("danger","Failed to Logout. ")})},login:function(){var r=this;return a({url:"/u/login",method:"POST",data:$.param({email:this.email,passwd:this.passwd}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(a){return e.auth.failed="",e.user.data=a,"undefined"!=typeof ga&&null!==ga&&ga("set","&uid",a.key),r.show=!1,e.nexturl?window.location.href=e.nexturl:"/u/login"===window.location.pathname?window.location.href="/":window.location.reload()}).error(function(a,r){return e.auth.failed=403===r?(a.message||(a.message=[])).length?a.message[0]:"email or password incorrect":"system error, please try later"}),this.passwd=""}},e.$watch("auth.show",function(e){return setTimeout(function(){return $("#authpanel").modal(e?"show":"hide")},0)}),window.addEventListener("scroll",function(){var e;return e=$(window).scrollTop(),60>e?$("#nav-top").removeClass("dim"):$("#nav-top").addClass("dim")}),e.charts=[{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"},{name:"Bar Chart",desc:"Bar chart is best for unordered numeric data which ranges widely.",key:"bar"},{name:"Pie Chart",desc:"Pie chart sometimes considered bad but is still great in proportional data",key:"pie"}]}));