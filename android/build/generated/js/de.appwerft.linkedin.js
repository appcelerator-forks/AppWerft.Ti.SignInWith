var ACCESSTOKEN_URL="https://www.linkedin.com/oauth/v2/accessToken",REQUEST_AUTHORIZATION_URL="https://www.linkedin.com/oauth/v2/authorization",RESTAPI_URL="https://api.linkedin.com/v1/",BLANK_DUMMY_WEBPAGE="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",FAKE_USERAGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0",_opt,_prop,_initialized=!1;
function encodeQueryData(a){return Object.getOwnPropertyNames(a).map(function(b){return encodeURIComponent(b)+"="+encodeURIComponent(a[b])}).join("&")}
var init=function(a){console.log("Info: init of LinkedIn started");o=a||{};a=o.scope||[];_opt={clientId:o.clientId?o.clientId:Ti.App.Properties.getString("linkedin_id"),clientSecret:o.clientSecret?o.clientSecret:Ti.App.Properties.getString("linkedin_secret"),propertyName:"LinkedInToken",scope:a};_prop={accessToken:null,expiresIn:0};a={accessToken:Ti.App.Properties.getString(_opt.propertyName+".accessToken"),expiresIn:Ti.App.Properties.getString(_opt.propertyName+".expiresIn")};a.expiresIn>=(new Date).getTime()&&
(_prop=a);console.log(_opt);_initialized=!0};
function _getToken(a,b){b=b?b:function(){};console.log("Try to get access token:");var c=Ti.Network.createHTTPClient({onload:function(){try{var a=JSON.parse(this.responseText);a.expires_in=parseFloat(a.expires_in,10)*1E3+(new Date).getTime();console.log(a.expires_in);Ti.App.Properties.setString(_opt.propertyName+".accessToken",a.access_token);Ti.App.Properties.setString(_opt.propertyName+".expiresIn",a.expires_in);_prop.accessToken=a.access_token;_prop.expiresIn=a.expires_in}catch(c){console.log("Error: by parsing JSON answer from server"),
console.log(c)}win.close();b()},onerror:function(){}}),e={grant_type:"authorization_code",code:a,redirect_uri:BLANK_DUMMY_WEBPAGE,client_id:_opt.clientId,client_secret:_opt.clientSecret};c.open("POST",ACCESSTOKEN_URL);c.setRequestHeader("Content-Type","application/x-www-form-urlencoded");c.setRequestHeader("User-Agent",FAKE_USERAGENT);c.send(e)}
function _authorize(a){callback=a?a:function(){};win=Ti.UI.createWindow({backgroundImage:"/karo.png",modal:!0,theme:"Theme.AppCompat.NoTitleBar"});var b=Ti.UI.createActivityIndicator({zIndex:99,style:Ti.UI.ActivityIndicatorStyle.BIG_DARK});win.add(b);a=[REQUEST_AUTHORIZATION_URL,encodeQueryData({approval_prompt:"force",scope:_opt.scope.join(" "),redirect_uri:BLANK_DUMMY_WEBPAGE,response_type:"code",client_id:_opt.clientId,btmpl:"mobile"})].join("?");console.log("\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260Start Authorization against LinkedIn\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\u2260\n"+
a);var c=Ti.UI.createWebView({borderWidth:3,borderColor:"#1D87BD",borderRadius:5,userAgent:FAKE_USERAGENT,transform:Ti.UI.create2DMatrix({scale:0.92})}),e=0,d=null;c.addEventListener("load",function(a){var f=null;e++;a=a.source.url;f=/code=(.*)/gm;if(f=f.exec(a))d=f[1],win.close(),d!=null&&(c.hide(),b.show(),_getToken(d,callback));f=/error=(.*)/gm;if(f=f.exec(a))d=f[1],win.close(),d!=null&&console.log("Error: "+d)});c.setUrl(a);win.add(c);win.open()}
var _doGet=function(a,b){function c(){e++;var a=RESTAPI_URL+query+"?format=json",b=Ti.App.Properties.getString(_opt.propertyName+".accessToken",null);if(b==null)_authorize(c);else{console.log("Info: doGet try this request: "+a);console.log("Info: doGet try this bearer: "+b);var h=Ti.Network.createHTTPClient({onload:function(){if(this.status==401)console.log("Warning: 401 => open login dialog"),_authorize(c);else if(this.status==200)try{var a=JSON.parse(this.responseText);d({ok:!0,data:a})}catch(b){console.log(b),
d({ok:!1,error:b})}},onerror:function(){try{var a=JSON.parse(this.responseText);console.log(a);_authorize(c)}catch(b){d({ok:!1,data:b})}}});h.open("GET",a);h.setRequestHeader("Content-Type","application/json");h.setRequestHeader("x-li-format","json");h.setRequestHeader("Connection","keep-alive");h.setRequestHeader("Authorization","Bearer "+b);h.send()}}_initialized||init();console.log(a);var e=0;query=a;var d=b;c()},_doPost=function(a,b,c){function e(){d++;var a=RESTAPI_URL+query+"?format=json",c=
Ti.App.Properties.getString(_opt.propertyName+".accessToken",null);if(c==null)_authorize(mGet);else{console.log("Info: doGet try this request: "+a);console.log("Info: doGet try this bearer: "+c);var g=Ti.Network.createHTTPClient({onload:function(){if(this.status==401)console.log("Warning: 401 => open login dialog"),_authorize(e);else if(this.status==200)try{var a=JSON.parse(this.responseText);i({ok:!0,data:a})}catch(b){console.log(b),i({ok:!1,error:b})}},onerror:function(){try{var a=JSON.parse(this.responseText);
console.log(a);_authorize(e)}catch(b){i({ok:!1,data:b})}}});g.open("POST",a);g.setRequestHeader("Content-Type","application/json");g.setRequestHeader("x-li-format","json");g.setRequestHeader("Connection","keep-alive");g.setRequestHeader("Authorization","Bearer "+c);g.send(JSON.stringify(b))}}_initialized||init();console.log(a);var d=0;query=a;var i=c;e()};
function getProfileWithContacts(a,b){_doGet("people/~:(id,first-name,last-name,num-connections,picture-url,maiden-name,headline,location,summary,email-address,positions,phone-numbers,bound-account-types,im-accounts,main-address,twitter-accounts,primary-twitter-account)",b)}function getPositionById(a,b){_doGet("position/~:(id,title,summary,start-date,end-date,is-current,company)",b)}function getCompanyById(a,b){_doGet("company/~:(id,name,type,industry)",b)}
function postShare(a,b){_doPost("people/~/shares?format=json",{comment:a,visibility:"everyone"},b)}function getProfile(a,b){_doGet("people/~:(id,first-name,last-name,num-connections,picture-url,maiden-name,headline,location,summary,email-address,positions)",b)}module.exports={get:_doGet,getProfile:getProfile,getProfileWithContacts:getProfileWithContacts,getPositionById:getPositionById,getCompanyById:getCompanyById,postShare:postShare};
