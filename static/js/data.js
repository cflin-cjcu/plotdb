function import$(o,t){var n={}.hasOwnProperty;for(var a in t)n.call(t,a)&&(o[a]=t[a]);return o}var x$;x$=angular.module("plotDB"),x$.service("sampleData",["$rootScope"].concat(function(){return[{id:"/dataset/sample/:goldprice2000",name:"Gold Price(2000)",size:"481",rows:12,color:"#f99",type:{name:"sample"},fields:[{name:"date",type:"Date",dataset:"/dataset/sample/:goldprice2000"},{name:"price",type:"Number",dataset:"/dataset/sample/:goldprice2000"}],data:[{date:"2000-01-01",price:"284.590"},{date:"2000-02-01",price:"300.855"},{date:"2000-03-01",price:"286.704"},{date:"2000-04-01",price:"279.961"},{date:"2000-05-01",price:"275.293"},{date:"2000-06-01",price:"285.368"},{date:"2000-07-01",price:"282.152"},{date:"2000-08-01",price:"274.523"},{date:"2000-09-01",price:"273.676"},{date:"2000-10-01",price:"270.405"},{date:"2000-11-01",price:"265.989"},{date:"2000-12-01",price:"271.892"}]},{id:"/dataset/sample/:population2000",name:"World Population(2000)",size:12355,rows:287,color:"#f99",type:{name:"sample"},fields:[{name:"Country Name",type:"String",dataset:"/dataset/sample/:population2000"},{name:"Population",type:"Number",dataset:"/dataset/sample/:population2000"}],data:[{Country:"Arab World",Population:"277550423"},{Country:"Caribbean small states",Population:"6431380"},{Country:"Central Europe and the Baltics",Population:"108405522"},{Country:"East Asia & Pacific (all income levels)",Population:"2043352556"},{Country:"East Asia & Pacific (developing only)",Population:"1812175348"},{Country:"Euro area",Population:"321107647"},{Country:"Europe & Central Asia (all income levels)",Population:"862087806"},{Country:"Europe & Central Asia (developing only)",Population:"246067877"},{Country:"European Union",Population:"487975692"},{Country:"Fragile and conflict affected situations",Population:"334545176"},{Country:"Heavily indebted poor countries (HIPC)",Population:"472726491"},{Country:"High income",Population:"1282297798"},{Country:"High income: nonOECD",Population:"293059239"},{Country:"High income: OECD",Population:"989238559"},{Country:"Latin America & Caribbean (all income levels)",Population:"525299778"},{Country:"Latin America & Caribbean (developing only)",Population:"438994368"},{Country:"Least developed countries: UN classification",Population:"663076857"},{Country:"Low & middle income",Population:"4819659593"},{Country:"Low income",Population:"425003913"},{Country:"Lower middle income",Population:"2293345046"},{Country:"Middle East & North Africa (all income levels)",Population:"311780217"},{Country:"Middle East & North Africa (developing only)",Population:"276578220"},{Country:"Middle income",Population:"4394655680"},{Country:"North America",Population:"312993944"},{Country:"OECD members",Population:"1156286649"},{Country:"Other small states",Population:"16215836"},{Country:"Pacific island small states",Population:"1952589"},{Country:"Small states",Population:"24599805"},{Country:"South Asia",Population:"1382195669"},{Country:"Sub-Saharan Africa (all income levels)",Population:"664247421"},{Country:"Sub-Saharan Africa (developing only)",Population:"663648111"},{Country:"Upper middle income",Population:"2101310634"},{Country:"World",Population:"6101957391"},{Country:"Afghanistan",Population:"20595360"},{Country:"Albania",Population:"3089027"},{Country:"Algeria",Population:"31719449"},{Country:"American Samoa",Population:"57522"},{Country:"Andorra",Population:"65399"},{Country:"Angola",Population:"13924930"},{Country:"Antigua and Barbuda",Population:"77648"},{Country:"Argentina",Population:"36903067"},{Country:"Armenia",Population:"3076098"},{Country:"Aruba",Population:"90858"},{Country:"Australia",Population:"19153000"},{Country:"Austria",Population:"8011566"},{Country:"Azerbaijan",Population:"8048600"},{Country:"Bahamas, The",Population:"297759"},{Country:"Bahrain",Population:"668239"},{Country:"Bangladesh",Population:"132383265"},{Country:"Barbados",Population:"267190"},{Country:"Belarus",Population:"10005000"},{Country:"Belgium",Population:"10251250"},{Country:"Belize",Population:"238586"},{Country:"Benin",Population:"6949366"},{Country:"Bermuda",Population:"61833"},{Country:"Bhutan",Population:"564350"},{Country:"Bolivia",Population:"8495271"},{Country:"Bosnia and Herzegovina",Population:"3834364"},{Country:"Botswana",Population:"1755375"},{Country:"Brazil",Population:"174504898"},{Country:"Brunei Darussalam",Population:"331801"},{Country:"Bulgaria",Population:"8170172"},{Country:"Burkina Faso",Population:"11607944"},{Country:"Burundi",Population:"6674286"},{Country:"Cabo Verde",Population:"442426"},{Country:"Cambodia",Population:"12222871"},{Country:"Cameroon",Population:"15927713"},{Country:"Canada",Population:"30769700"},{Country:"Cayman Islands",Population:"41685"},{Country:"Central African Republic",Population:"3638316"},{Country:"Chad",Population:"8301151"},{Country:"Channel Islands",Population:"148725"},{Country:"Chile",Population:"15454402"},{Country:"China",Population:"1262645000"},{Country:"Colombia",Population:"39897984"},{Country:"Comoros",Population:"528312"},{Country:"Congo, Dem. Rep.",Population:"46949244"},{Country:"Congo, Rep.",Population:"3126204"},{Country:"Costa Rica",Population:"3929588"},{Country:"Cote d'Ivoire",Population:"16131332"},{Country:"Croatia",Population:"4426000"},{Country:"Cuba",Population:"11138416"},{Country:"Curacao",Population:"133860"},{Country:"Cyprus",Population:"943287"},{Country:"Czech Republic",Population:"10255063"},{Country:"Denmark",Population:"5339616"},{Country:"Djibouti",Population:"722887"},{Country:"Dominica",Population:"69679"},{Country:"Dominican Republic",Population:"8663421"},{Country:"Ecuador",Population:"12533087"},{Country:"Egypt, Arab Rep.",Population:"66136590"},{Country:"El Salvador",Population:"5958794"},{Country:"Equatorial Guinea",Population:"518179"},{Country:"Eritrea",Population:"3939348"},{Country:"Estonia",Population:"1396985"},{Country:"Ethiopia",Population:"66024199"},{Country:"Faeroe Islands",Population:"46491"},{Country:"Fiji",Population:"811647"},{Country:"Finland",Population:"5176209"},{Country:"France",Population:"60911057"},{Country:"French Polynesia",Population:"237267"},{Country:"Gabon",Population:"1225527"},{Country:"Gambia, The",Population:"1228863"},{Country:"Georgia",Population:"4418300"},{Country:"Germany",Population:"82211508"},{Country:"Ghana",Population:"18825034"},{Country:"Greece",Population:"10917482"},{Country:"Greenland",Population:"56200"},{Country:"Grenada",Population:"101620"},{Country:"Guam",Population:"155328"},{Country:"Guatemala",Population:"11204183"},{Country:"Guinea",Population:"8746128"},{Country:"Guinea-Bissau",Population:"1273312"},{Country:"Guyana",Population:"744471"},{Country:"Haiti",Population:"8578234"},{Country:"Honduras",Population:"6235561"},{Country:"Hong Kong SAR, China",Population:"6665000"},{Country:"Hungary",Population:"10210971"},{Country:"Iceland",Population:"281205"},{Country:"India",Population:"1042261758"},{Country:"Indonesia",Population:"208938698"},{Country:"Iran, Islamic Rep.",Population:"65911052"},{Country:"Iraq",Population:"23801156"},{Country:"Ireland",Population:"3805174"},{Country:"Isle of Man",Population:"76806"},{Country:"Israel",Population:"6289000"},{Country:"Italy",Population:"56942108"},{Country:"Jamaica",Population:"2589389"},{Country:"Japan",Population:"126843000"},{Country:"Jordan",Population:"4797000"},{Country:"Kazakhstan",Population:"14883626"},{Country:"Kenya",Population:"31285050"},{Country:"Kiribati",Population:"82788"},{Country:"Korea, Dem. Rep.",Population:"22840225"},{Country:"Korea, Rep.",Population:"47008111"},{Country:"Kosovo",Population:"1700000"},{Country:"Kuwait",Population:"1906231"},{Country:"Kyrgyz Republic",Population:"4898400"},{Country:"Lao PDR",Population:"5388281"},{Country:"Latvia",Population:"2367550"},{Country:"Lebanon",Population:"3235380"},{Country:"Lesotho",Population:"1856225"},{Country:"Liberia",Population:"2891968"},{Country:"Libya",Population:"5176185"},{Country:"Liechtenstein",Population:"33093"},{Country:"Lithuania",Population:"3499536"},{Country:"Luxembourg",Population:"436300"},{Country:"Macao SAR, China",Population:"431907"},{Country:"Macedonia, FYR",Population:"2052129"},{Country:"Madagascar",Population:"15744811"},{Country:"Malawi",Population:"11321496"},{Country:"Malaysia",Population:"23420751"},{Country:"Maldives",Population:"272745"},{Country:"Mali",Population:"10260577"},{Country:"Malta",Population:"381363"},{Country:"Marshall Islands",Population:"52161"},{Country:"Mauritania",Population:"2708095"},{Country:"Mauritius",Population:"1186873"},{Country:"Mexico",Population:"103873607"},{Country:"Micronesia, Fed. Sts.",Population:"107430"},{Country:"Moldova",Population:"3639592"},{Country:"Monaco",Population:"32081"},{Country:"Mongolia",Population:"2397473"},{Country:"Montenegro",Population:"604950"},{Country:"Morocco",Population:"28710123"},{Country:"Mozambique",Population:"18275618"},{Country:"Myanmar",Population:"48453000"},{Country:"Namibia",Population:"1897953"},{Country:"Nepal",Population:"23184177"},{Country:"Netherlands",Population:"15925513"},{Country:"New Caledonia",Population:"213230"},{Country:"New Zealand",Population:"3857700"},{Country:"Nicaragua",Population:"5100920"},{Country:"Niger",Population:"10989815"},{Country:"Nigeria",Population:"122876727"},{Country:"Northern Mariana Islands",Population:"68434"},{Country:"Norway",Population:"4490967"},{Country:"Oman",Population:"2192535"},{Country:"Pakistan",Population:"143832014"},{Country:"Palau",Population:"19174"},{Country:"Panama",Population:"3054812"},{Country:"Papua New Guinea",Population:"5379226"},{Country:"Paraguay",Population:"5350253"},{Country:"Peru",Population:"26000080"},{Country:"Philippines",Population:"77651848"},{Country:"Poland",Population:"38258629"},{Country:"Portugal",Population:"10289898"},{Country:"Puerto Rico",Population:"3810605"},{Country:"Qatar",Population:"593693"},{Country:"Romania",Population:"22442971"},{Country:"Russian Federation",Population:"146596557"},{Country:"Rwanda",Population:"8395577"},{Country:"Samoa",Population:"174614"},{Country:"San Marino",Population:"26969"},{Country:"Sao Tome and Principe",Population:"139428"},{Country:"Saudi Arabia",Population:"20144584"},{Country:"Senegal",Population:"9861679"},{Country:"Serbia",Population:"7516346"},{Country:"Seychelles",Population:"81131"},{Country:"Sierra Leone",Population:"4139757"},{Country:"Singapore",Population:"4027900"},{Country:"Sint Maarten (Dutch part)",Population:"30519"},{Country:"Slovak Republic",Population:"5388720"},{Country:"Slovenia",Population:"1988925"},{Country:"Solomon Islands",Population:"412336"},{Country:"Somalia",Population:"7385416"},{Country:"South Africa",Population:"44000000"},{Country:"South Sudan",Population:"6652984"},{Country:"Spain",Population:"40263216"},{Country:"Sri Lanka",Population:"19102000"},{Country:"St. Kitts and Nevis",Population:"45544"},{Country:"St. Lucia",Population:"156949"},{Country:"St. Martin (French part)",Population:"28384"},{Country:"St. Vincent and the Grenadines",Population:"107897"},{Country:"Sudan",Population:"27729798"},{Country:"Suriname",Population:"466668"},{Country:"Swaziland",Population:"1063715"},{Country:"Sweden",Population:"8872109"},{Country:"Switzerland",Population:"7184250"},{Country:"Syrian Arab Republic",Population:"16371208"},{Country:"Tajikistan",Population:"6186152"},{Country:"Tanzania",Population:"34020512"},{Country:"Thailand",Population:"62343379"},{Country:"Timor-Leste",Population:"853585"},{Country:"Togo",Population:"4864753"},{Country:"Tonga",Population:"97962"},{Country:"Trinidad and Tobago",Population:"1267980"},{Country:"Tunisia",Population:"9552500"},{Country:"Turkey",Population:"63174483"},{Country:"Turkmenistan",Population:"4501419"},{Country:"Turks and Caicos Islands",Population:"18876"},{Country:"Tuvalu",Population:"9419"},{Country:"Uganda",Population:"24275641"},{Country:"Ukraine",Population:"49175848"},{Country:"United Arab Emirates",Population:"3026352"},{Country:"United Kingdom",Population:"58892514"},{Country:"United States",Population:"282162411"},{Country:"Uruguay",Population:"3320841"},{Country:"Uzbekistan",Population:"24650400"},{Country:"Vanuatu",Population:"185058"},{Country:"Venezuela, RB",Population:"24407553"},{Country:"Vietnam",Population:"77630900"},{Country:"Virgin Islands (U.S.)",Population:"108639"},{Country:"West Bank and Gaza",Population:"2922153"},{Country:"Yemen, Rep.",Population:"17522537"},{Country:"Zambia",Population:"10100981"},{Country:"Zimbabwe",Population:"12503652"}]}]})),x$.filter("size",function(){return function(o){return 1e3>o?o+"bytes":1048576>o?parseInt(o/102.4)/10+"KB":parseInt(o/104857.6)/10+"MB"}}),x$.service("plUtil",["$rootScope"].concat(function(){var o;return o={format:{size:function(o){return 1e3>o?o+"bytes":1048576>o?parseInt(o/102.4)/10+"KB":parseInt(o/104857.6)/10+"MB"}}}})),x$.service("dataService",["$rootScope","sampleData","plUtil"].concat(function(o,t){var n,a;return n=function(o){return import$(this,o),this.size=angular.toJson(o.data).length,this.rows=o.data.length,this},n.prototype={id:0,name:null,owner:null,size:0,rows:0,type:{},fields:{},permission:{"switch":[],list:[]},save:function(){return this.id=a.save(this)},clone:function(){var o;return o=new n(this),o.id=null},"delete":function(){},update:function(){},sync:function(){return import$(this,JSON.parse(localStorage.getItem(this.id)))}},a={Dataset:n,datasets:[].concat(t.map(function(o){return new n(o)})),name:function(o){return"/datasets/"+o},local:{rows:0,size:0},localSize:function(){var o,t,n,a,u=[];for(o=0,n=(t=this.datasets).length;n>o;++o)a=t[o],"local"===a.type.name&&(this.local.rows+=a.rows,u.push(this.local.size+=a.size));return u},init:function(){var o,t,a,u,i,r,e;o=this.local,o.rows=0,o.size=0;try{for(t=JSON.parse(localStorage.getItem("/list/datasets")||null)||[],a=0,u=t.length;u>a;++a)i=t[a],r=JSON.parse(localStorage.getItem(i)||null),this.datasets.push(new n(r));return this.localSize()}catch(l){return e=l,console.log(e.toString())}},field:{update:function(o){var t;return t=this.findDataset(o),t.sync(),o.data=(t.data||(t.data=[])).map(function(t){return t[o.name]})},findDataset:function(o){var t;return t=a.find(o)},settype:function(o,t){function n(o){return plotdb[e].test(o)}function a(o){return!o}var u,i,r,e,l=[];for(o=o.map(function(o){return o[t.name]}),u=["Date","Boolean","Percent","Number"],i=0,r=u.length;r>i;++i)if(e=u[i],!o.map(n).filter(a).length){t.type=e;break}return l}},find:function(o){var t;return t=o.dataset?o.dataset:o,this.datasets.filter(function(o){return o.id===t})[0]},genId:function(o){var t,n,a;for(t=0;1e3>t;++t)if(n=t,a="/dataset/"+o.type.name+"/"+Math.random().toString(36).substring(2),!this.find(a))return a;return null},save:function(o){var t,n,a,u,i,r;if(o.id||"local"!==o.type.name||(o.id=this.genId(o)),!o.id)return console.log("failed to gen id");for(t=0,a=(n=o.fields).length;a>t;++t)u=n[t],u.dataset=o.id;return i=this.datasets.map(function(o){return o.id}).indexOf(o.id),i>=0&&this.datasets.splice(i,1),"local"===o.type.name&&(localStorage.setItem(o.id,angular.toJson(o)),r=JSON.parse(localStorage.getItem("/list/datasets")||null)||[],r.indexOf(o.id)<0&&r.push(o.id),localStorage.setItem("/list/datasets",angular.toJson(r))),this.datasets.push(o),o.id},"delete":function(o){var t,n;return t=this.datasets.map(function(o){return o.id}).indexOf(o.id),0>t||(this.datasets.splice(t,1),n=JSON.parse(localStorage.getItem("/list/datasets")),!n||(t=n.indexOf(o.id),0>t))?void 0:(n.splice(t,1),localStorage.setItem("/list/datasets",JSON.stringify(n)),localStorage.setItem(o.id,null))}},a.init(),a})),x$.controller("dataEditCtrl",["$scope","$timeout","$http","dataService","plUtil"].concat(function(o,t,n,a){return o.name=null,o.dataset=null,o.save=function(t){var n,u,i,r,e,l,p;for(null==t&&(t=!1),n={name:o.name,type:{name:"local"},owner:null,permission:{"switch":["public"],list:[]},data:o.data.parsed,fields:function(){var t,n=[];for(u in t=o.data.parsed[0])i=t[u],n.push([u,i]);return n}().map(function(o){return{name:o[0],type:"String"}})},r=0,l=(e=n.fields).length;l>r;++r)p=e[r],a.field.settype(o.data.parsed,p);return o.dataset=new a.Dataset(n),o.dataset.save()},o.data={init:function(){return o.$watch("data.raw",function(){return o.data.parse()})},raw:"",rows:0,size:0,parsed:null,parse:function(){var o=this;return this.handler&&t.cancel(this.handler),this.handler=t(function(){return o.handler=null,o.parsed=Papa.parse(o.raw,{header:!0}).data,o.rows=o.parsed.length,o.size=o.raw.length},1e3)}},o.data.init(),o.parser={encoding:"UTF-8",csv:{toggle:function(){return setTimeout(function(){return $("#data-edit-csv-modal").modal("show")},0)},read:function(){var t,n;return t=$("#data-edit-csv-file")[0].files[0],n=new FileReader,n.onload=function(t){return o.$apply(function(){return o.data.raw=t.target.result.trim()}),$("#data-edit-csv-modal").modal("hide")},n.onerror=function(){},n.readAsText(t,o.parser.encoding)}},gsheet:{url:null,toggle:function(){return setTimeout(function(){return $("#data-edit-gsheet-modal").modal("show")},0)},read:function(){var t,a,u;return(t=/\/d\/([^\/]+)/.exec(o.parser.gsheet.url))?(a=t[1],u="https://spreadsheets.google.com/feeds/list/"+a+"/1/public/values?alt=json",n({url:u,method:"GET"}).success(function(t){var n,a,u,i;n={},t.feed.entry.map(function(o){var t,a,u=[];for(t in o)(a=/^gsx\$(.+)$/.exec(t))&&u.push(n[a[1]]=1);return u}),a=[];for(u in n)a.push(u);return n=a,i=[n.join(",")].concat(t.feed.entry.map(function(o){var t;return function(){var a,u,i,r=[];for(a=0,i=(u=n).length;i>a;++a)t=u[a],r.push((o["gsx$"+t]||{$t:""}).$t);return r}().join(",")})),o.data.raw=i.join("\n"),setTimeout(function(){return $("#data-edit-gsheet-modal").modal("hide")},0)})):void 0}},link:{url:null,toggle:function(){return setTimeout(function(){return $("#data-edit-link-modal").modal("show")},0)},read:function(){return n({url:"http://crossorigin.me/"+o.parser.link.url,method:"GET"}).success(function(t){return o.data.raw=t.trim(),$("#data-edit-link-modal").modal("hide")})}}}})),x$.controller("dataFiles",["$scope","dataService"].concat(function(o,t){return o.datasets=t.datasets,o.removedata=function(o){return t["delete"](o)}}));