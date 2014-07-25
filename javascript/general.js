//fgnass.github.com/spin.js#v1.2.7
!function(e,t,n){function o(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function u(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function f(e,t,n,r){var o=["opacity",t,~~(e*100),n,r].join("-"),u=.01+n/r*100,f=Math.max(1-(1-e)/t*(100-u),e),l=s.substring(0,s.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return i[o]||(a.insertRule("@"+c+"keyframes "+o+"{"+"0%{opacity:"+f+"}"+u+"%{opacity:"+e+"}"+(u+.01)+"%{opacity:1}"+(u+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",a.cssRules.length),i[o]=1),o}function l(e,t){var i=e.style,s,o;if(i[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(o=0;o<r.length;o++){s=r[o]+t;if(i[s]!==n)return s}}function c(e,t){for(var n in t)e.style[l(e,n)||n]=t[n];return e}function h(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function p(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var r=["webkit","Moz","ms","O"],i={},s,a=function(){var e=o("style",{type:"text/css"});return u(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"},v=function m(e){if(!this.spin)return new m(e);this.opts=h(e||{},m.defaults,d)};v.defaults={},h(v.prototype,{spin:function(e){this.stop();var t=this,n=t.opts,r=t.el=c(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),i=n.radius+n.length+n.width,u,a;e&&(e.insertBefore(r,e.firstChild||null),a=p(e),u=p(r),c(r,{left:(n.left=="auto"?a.x-u.x+(e.offsetWidth>>1):parseInt(n.left,10)+i)+"px",top:(n.top=="auto"?a.y-u.y+(e.offsetHeight>>1):parseInt(n.top,10)+i)+"px"})),r.setAttribute("aria-role","progressbar"),t.lines(r,t.opts);if(!s){var f=0,l=n.fps,h=l/n.speed,d=(1-n.opacity)/(h*n.trail/100),v=h/n.lines;(function m(){f++;for(var e=n.lines;e;e--){var i=Math.max(1-(f+e*v)%h*d,n.opacity);t.opacity(r,n.lines-e,i,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/l))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function i(e,r){return c(o(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:r,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*n+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var n=0,r;for(;n<t.lines;n++)r=c(o(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:s&&f(t.opacity,t.trail,n,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&u(r,c(i("#000","0 0 4px #000"),{top:"2px"})),u(e,u(r,i(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),function(){function e(e,t){return o("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}var t=c(o("group"),{behavior:"url(#default#VML)"});!l(t,"transform")&&t.adj?(a.addRule(".spin-vml","behavior:url(#default#VML)"),v.prototype.lines=function(t,n){function s(){return c(e("group",{coordsize:i+" "+i,coordorigin:-r+" "+ -r}),{width:i,height:i})}function l(t,i,o){u(a,u(c(s(),{rotation:360/n.lines*t+"deg",left:~~i}),u(c(e("roundrect",{arcsize:n.corners}),{width:r,height:n.width,left:n.radius,top:-n.width>>1,filter:o}),e("fill",{color:n.color,opacity:n.opacity}),e("stroke",{opacity:0}))))}var r=n.length+n.width,i=2*r,o=-(n.width+n.length)*2+"px",a=c(s(),{position:"absolute",top:o,left:o}),f;if(n.shadow)for(f=1;f<=n.lines;f++)l(f,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(f=1;f<=n.lines;f++)l(f);return u(t,a)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}):s=l(t,"animation")}(),typeof define=="function"&&define.amd?define(function(){return v}):e.Spinner=v}(window,document);
if(!window.console) console = {log:function(){}};

var transitions = false;

var sitelink = "http://bit.ly/18BYMwK";


//touch events become unavaiable on fixed position elements in iOS5
var menuNavEvent = (Browser.makes.ios_v<6)?'click':Browser.evt();
jQuery.support.cors = true;
var facebookapp = window.name.indexOf('app_runner_fb');
//scroll positions for sections
var scrlpos = new Object();
scrlpos.ticker = null;
scrlpos.currentpos = 0;
scrlpos.stoppos = 0;
scrlpos.goingdown = true;
scrlpos.goingup = false;
scrlpos.facebookscrollspeed = 0;
scrlpos.facebookadjust = 60;
scrlpos.game = new Array(0,500,100);

//scroll positon for navigation in Facebook
var navobject = new Object();
navobject.currentpos = 0;
navobject.previouspos = 0;
navobject.stoppos = 0;
navobject.holder = null;
navobject.increment = 1;
navobject.height = 63;
navobject.correction = 0;
navobject.limitadjust = 100;
navobject.active = true;
navobject.animating = false;
navobject.ticker;


//holds images to preload
var preloadimages = new Array(); 

//cache buster
var cache = new Date();

preloadimages.push({
		section:"preload1",
		src:"images/abc_family_backgrnd_main.jpg?t=" + cache.getTime(),
		imgobj: null
		});

preloadimages.push({
	section:"preload3",
	src:"images/abc_family_sprite_pt1.jpg?t=" + cache.getTime(),
	imgobj: null
	});

preloadimages.push({
	section:"preload4",
	src:"images/abc_family_sprite_pt2.png?t=" + cache.getTime(),
	imgobj: null
	});

//holds total 

var mainBackgroundsImagery ={loaded:0,total:preloadimages.length};

var spinner = false;

var win_message_displayed = false;

var sharemessaging = {
	facebook: {
		caption: "See My Christmas Spirit!",
		display: null,
		intro: "I just entered the ABC Family 25 Days of Christmas Giveaway for a chance to win $25,000! Looking for some extra Christmas cheer?",
		results: "I just got seasonally-styled with the ABC Family 25 Days of Christmas Show Your Christmas Spirit app! Get your holiday look"
	},
	twitter: {
		display: null,
		intro: "I just entered the ABC Family 25 Days of Christmas Giveaway for a chance to win $25,000! You can do the same: ",
		results: "I just got seasonally-styled with the ABC Family 25 Days of Christmas Show Your Christmas Spirit app! You can, too."
	}
}

//output for testing
function t(message){
	console.log(message);
}

//pre load and display backgrounds
function loadBackImages(spinner,contents,totals){
	if(spinner){
		startSpinner();
	}
	for(var i=0; i<contents.length; i++){
		contents[i].imgobj = new Image();
		contents[i].imgobj.id = contents[i].section;
		contents[i].imgobj.src = contents[i].src;
		$(contents[i].imgobj).load(function(i){	
			//set image as section background 
			if(String(this.id).match(/preload/)){
				$("." + this.id).css("background-image","url(" + this.src + ")");
			}
			totals.loaded++;
			if(totals.loaded == totals.total){
				if(spinner){
					stopSpinner();
					//$(".content").css("display","block");
				}
			}
		});
	}
}


function facebookShare(evt,bitlylink){

	ga('send', 'event', 'Facebook Share Main Site', 'Session: ' + user_session + ' MPVD:' + user_mpvd);


	var url = (typeof bitlylink != "undefined")?bitlylink:sitelink;
	var facelink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);

	var w = 500;
	var h = 430;
	var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 4;
	window.open(facelink,'facebook','width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);
}

function postToTwitter(evt,textToPost,bitlylink){

	var url = (typeof bitlylink != "undefined")?bitlylink:sitelink;
	var twittext = (typeof textToPost != "undefined")?textToPost:sharemessaging.twitter.display;
	var twitlink = 'https://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(twittext);

	ga('send', 'event', 'Twitter Share Main Site', user_session + ' ' + user_mpvd + ' ' + url);


	var w = 500;
	var h = 430;
	var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 4;
	window.open(twitlink,'twitter','width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);
}

function postToTwitterFromFlash(textToPost,bitlylink){

	ga('send', 'event', 'Twitter Share from Flash', 'Session: ' + user_session + ' MPVD:' + user_mpvd);

	var url = (typeof bitlylink != "undefined")?bitlylink:sitelink;
	var twittext = (typeof textToPost != "undefined")?textToPost:sharemessaging.twitter.display;
	var twitlink = 'https://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(twittext);

	var w = 500;
	var h = 430;
	var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 4;
	window.open(twitlink,'twitter','width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);
}


function css3Support(){
	if(transitions && !Browser.is("ie9")){
		return true;
	}	
	else{
		return false;
	}
}

function clickEvnt(name,func){
	$(name).bind(Browser.evt(),func);
}

function assignClasses(name,add,remove){
	if(add){
		$(name).addClass(add);
	}
	if(remove){
		$(name).removeClass(remove);
	}
}

function addRemoveClass(name,add,remove){

	var moveto = 1010;

	if(transitions && !Browser.is('ie9')){
		assignClasses(name,add,remove);
	}
	else{
		var iscontent = Boolean($(name).hasClass("content"));

		if(iscontent){
			if(add){
				$(name).animate({left: moveto},100).addClass("hidden");
			}
			else{
				$(name).css("left",moveto + "px");
				$(name).removeClass("hidden").animate({left: 0},500);
			}
		}
		else{
			assignClasses(name,add,remove);
		}
	}
}

function isInFacebook(){
	if(facebookapp!=-1){
		return true;
	}
	else{
		return false;
	}
}

function createSpinner(){

	if($("#spinnerback")){
		$("#spinnerback").remove();
	}

	if(!Browser.is("ie78")){

		//creates spinner holder
		var spinback = document.createElement("div");
		spinback.id = "spinnerback";
		spinback.className = "hidden";

		var spinobject = document.createElement("div");
		spinobject.id = "spinner";

		spinback.appendChild(spinobject);
		document.body.appendChild(spinback);
	}
}

function startSpinner(video){

	t("Spinner");

	if(!Browser.is("ie78")){
		addRemoveClass("#spinnerback",false,"hidden");

		if(video){
			addRemoveClass("#spinnerback","videoloader",false);
		}

		if(!spinner){	
			spinner = new Spinner({
						lines: 13,
						length: 15,
						width: 5,
						radius: 15,
						color: '#fff',
						speed: 1,
						trail: 60,
						top: '0px', // Top position relative to parent in px
						left: '0px',
						shadow: false
			}).spin(document.getElementById("spinner"));
		}
	}
}
function stopSpinner(){
	if(!Browser.is("ie78")){
		addRemoveClass("#spinnerback","hidden",false);
		addRemoveClass("#spinnerback",false,"videoloader");
		if($("#spinnerback")){
			if(Boolean(spinner)){
				spinner.stop();
				spinner = false;
			}
		}
	}
}
function showError(jqXHR,textStatus,errorThrown){
	t(jqXHR);
	t(textStatus + " " + errorThrown);
}

function ajaxRequest(url,requestType,returnType,sendthis,func){
	if(!Boolean(returnType)){
		returnType = 'json';
	}
	if(!Boolean(requestType)){
		requestType = 'GET';
	}

	var headersobj = {
		"Content-Type":"multipart/form-data"
	};

	if(String(requestType).match(/post/i)){
		headersobj["Content-Type"] = "application/x-www-form-urlencoded";
	}

	if(!Boolean(func)){
		func = function(output){
			//t(output);
		};
	}
	var params ={
			type: requestType,
			url: url,
			error: showError,
			headers: headersobj,
			data: sendthis,
			dataType: String(returnType),
			success: func
	}
	$.ajax(params);
}


function scrollPageTo(obj){

	var to = (typeof obj != 'undefined')?obj[0]:scrlpos.game[0];
	var sec = (typeof obj != 'undefined')?obj[1]:scrlpos.game[1];
	var fbspeed = (typeof obj != 'undefined')?obj[2]:scrlpos.game[2];
	
	if(isInFacebook()){
		scrlpos.stoppos = to;
		scrlpos.facebookscrollspeed = fbspeed;
		if(scrlpos.stoppos>scrlpos.currentpos){
			scrlpos.goingdown = true;
			scrlpos.goingup = false;
		}
		else{
			scrlpos.goingdown = false;
			scrlpos.goingup = true;
		}
		animatedFBScroller();
		//FB.Canvas.scrollTo(0,to);
	}
	else{
		$("html, body").animate({ scrollTop: to }, sec);
	}
}


function changeShareLinks(key){
	var keynames = new Array("main","nuckys","makename","offer");
	var usekey = (typeof key != 'undefined')?key:0;
	navobject.facebooklink = sharelinks[keynames[usekey]].facebook;
	navobject.twitterlink = sharelinks[keynames[usekey]].twitter;
//	t("Facebook Link " + navobject.facebooklink);
//	t("Twitter Link " + navobject.twitterlink);
}

function getRules(ftr){
	var hascontent = $("#rules").find("div").text();
	 processTrackerfld('rules');

//	 if(typeof ftr == "boolean"){
		scrollPageTo();	
//	 }

	if(!hascontent){
		//ajaxRequest(url,requestType,returnType,sendthis,func);
		ajaxRequest("rules.html",false,"html",false,showRules);
	}
	else{
		if(css3Support()){
			addRemoveClass("#rules",false,"hidden");
		}
		else{
			css2DisplayOverlay("#rules",-700,320);
		}
	}
}
function showRules(output){
	$("#rules").find("div").html(output);

	ga('send', 'event', 'Rules', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
	
	if(css3Support()){
		addRemoveClass("#rules",false,"hidden");
	}
	else{
		css2DisplayOverlay("#rules",-700,320);
	}
	
}
function hideRules(){
	//$("#rules").find("div").empty();	
	
	if(css3Support()){
		addRemoveClass("#rules","hidden",false);
	}
	else{
		css2DisplayOverlay("#rules",320,-700);
	}
}

function css2DisplayOverlay(id,startpix,endpix,time){
	var atime = (typeof time != 'undefined')?time:250;
	$(id).css("top",startpix + "px").removeClass("hidden").animate({top: endpix},atime,"linear");
}

function css2HideOverlay(id,startpix,endpix,time){
	var atime = (typeof time != 'undefined')?time:250;
	$(id).css("top",startpix + "px").animate({top: endpix},atime,"linear");
}

function showPrompt(message, pgsect, buttontext, func){

	if(Browser.is("mobile")){
		message = message.replace(/(<b>)|(<\/b>)/gi,"");
		message = message.replace(/(<span>)|(<\/span>)/gi,"");
		message = message.replace(/(\&nbsp;)/gi," ");
		alert(message);

		if(func && func != "undefined"){
			func.call();	
		}
	}
	else{

		if(typeof buttontext != "undefined" && buttontext){
			$("#hide_prompt").text(buttontext);	
		}

		if(typeof func != "undefined" && func){
			clickEvnt("#hide_prompt",func);
		}
		else{
			$("#hide_prompt").unbind();
			clickEvnt("#hide_prompt",hidePrompt);	
		}

		if(pgsect && pgsect=="nm" && typeof pgsect != "undefined"){
			$("#nm_prompt").find("p").html(message);
			if(css3Support()){
				addRemoveClass("#nm_prompt",false,"hidden");
			}
			else{
				css2DisplayOverlay("#nm_prompt",-500,150);
			}
		}
		else{
			$("#prompt").find("p").html(message);
			scrollPageTo([0,500,10]);

			if(css3Support()){
				addRemoveClass("#prompt",false,"hidden");
			}
			else{
				css2DisplayOverlay("#prompt",-500,150);
			}

		}
	}
}

function hidePrompt(){
	if(css3Support()){
		addRemoveClass("#prompt","hidden",false);
	}
	else{
		css2HideOverlay("#prompt",150,-500);
	}
}

function toggleAgreeToRules(e){
	var ruleschecked = document.getElementById("ruleschk_r");
	var ischecked = ruleschecked.checked;

	if(!ischecked){
		$("#rules_toggle").addClass("checked");
		ruleschecked.checked = true;
	}

	else{
		$("#rules_toggle").removeClass("checked");
		ruleschecked.checked = false;
	}
}



function showPrizeOverlay(){
		if(css3Support()){
			addRemoveClass("#prizing",false,"hidden");
		}
		else{
			css2DisplayOverlay("#prizing",-700,318);
		}
}

function hidePrizeOverlay(){
		if(css3Support()){
			addRemoveClass("#prizing","hidden",false);
		}
		else{
			css2DisplayOverlay("#prizing",318,-700);
		}
}


////////////mk added
function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

function processTrackerfld(fld){
	ajaxRequest('processtrk.php','POST','text',{'sess':user_session,'trk':fld},null);
}

function processBonus(emailaddress){
	ajaxRequest('processbonus.php','POST','text',{'email':emailaddress},null);
}

function processPost(btn,shr,nm){
	var trk=btn;
	if(nm=='reslt'){
	var trk=shr+'_sweeps';
	}
	//if sweeps use score or find out if played
	processTrackerfld(trk);
	var fld=btn;
	if(shr=='fb'){
		 var shlnk=$('#'+fld+'_url').val();
		 var shcap=$('#'+fld+'_head').val();
		 if(nm=='name'){
			var shlng=document.getElementById('nick1').innerHTML+$('#'+fld+'_copy').val();
			shlng=shlng.replace("<br>"," ");
			shlng=shlng.replace("<br>"," ");
		}else{
			var shlng=$('#'+fld+'_copy').val();
		}
 	}
	if(shr=='tw'){
		if(nm=='name'){
			var shlng=document.getElementById('nick1').innerHTML+$('#'+fld+'_copy').val();
			shlng=shlng.replace("<br>"," ");
			shlng=shlng.replace("<br>"," ");
			var shdesc='Call me '+shlng;
		}else{
			var shdesc=$('#'+fld+'_copy').val();
		}
		 var twtrc = fixedEncodeURIComponent(shdesc);
		 var twtrd=$('#'+fld+'_url').val();
		 var shlnk=twtra+twtrc+twtrb+twtrd;
		 postToTwitter(shlnk);
	}
}
function goUrl(url,fld){
	 processTrackerfld(fld);
	window.open(url, '_blank');
	
}
function swapChk(gender){
	document.getElementById("sex").value=gender;
	document.getElementById('galchk').src="images/chk_off.jpg";
	document.getElementById('fellachk').src="images/chk_off.jpg";
	document.getElementById( gender+'chk').src="images/chk_on.jpg";	
}

/*
function ajaxRequest(url,requestType,returnType,sendthis,func){
	if(!Boolean(returnType)){
		returnType = 'json';
	}
	if(!Boolean(requestType)){
		requestType = 'GET';
	}
	if(!Boolean(func)){
		func = function(output){
			//t(output);
		};
	}
	var params ={
			type: requestType,
			url: url,
			error: showError,
			headers: { "Content-Type": "multipart/form-data" },
			data: sendthis,
			dataType: String(returnType),
			success: func
	}
	$.ajax(params);
}
*/
function displayFlash(flashfile,drawInObjectID,fwidth,fheight,requiredversion,flashvars){
	var output;
	var backgroundcolor = "#FFFFFF";
	var wmode = "transparent";

	t(Browser.flash.installed);
	t(Browser.flash.version_part1);
	t(Number(requiredversion));
	t(Number(Browser.flash.version_part1)>=Number(requiredversion))

	if(Browser.flash.installed && Number(Browser.flash.version_part1)>=Number(requiredversion)){
		output = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + fwidth + '" height="' +  fheight + '" id="' + flashfile + 'ign="middle">';
					output += '<param name="movie" value="' + flashfile + '" />';
					output += '<param name="quality" value="high" />';
					output += '<param name="bgcolor" value="' + backgroundcolor + '" />';
					output += '<param name="play" value="true" />';
					output += '<param name="loop" value="true" />';
					output += '<param name="wmode" value="' +  wmode + '" />';
					output += '<param name="scale" value="showall" />';
					output += '<param name="menu" value="true" />';
					output += '<param name="devicefont" value="false" />';
					output += '<param name="salign" value="" />';
					output += '<param name="allowScriptAccess" value="sameDomain" />';

					//add flash variables				
					if(typeof flashvars != "undefined"){
						var flashvariables = "";
						var flashvarparam;
						for(var i in flashvars){
							if(typeof i != "undefined") flashvariables += (i + "=" + flashvars[i]);
						}	
						flashvarparam = '<param name="flashvars" value="' + flashvariables + '" />';
						t(flashvarparam);
						output += flashvarparam;
					}
				
					output += '<!--[if !IE]>-->';
					output += '<object type="application/x-shockwave-flash" data="' + flashfile + '" width="' + fwidth + '" height="' +  fheight + '">';
						output += '<param name="movie" value="' + flashfile + '" />';
						output += '<param name="quality" value="high" />';
						output += '<param name="bgcolor" value="' + backgroundcolor + '" />';
						output += '<param name="play" value="true" />';
						output += '<param name="loop" value="true" />';
						output += '<param name="wmode" value="' +  wmode + '" />';
						output += '<param name="scale" value="showall" />';
						output += '<param name="menu" value="true" />';
						output += '<param name="devicefont" value="false" />';
						output += '<param name="salign" value="" />';
						output += '<param name="allowScriptAccess" value="sameDomain" />';
						if(typeof flashvarparam != "undefined"){
							output += flashvarparam;
						}

					output += '<!--<![endif]-->';
					output += '<!--[if !IE]>-->';
					output += '</object>';
					output += '<!--<![endif]-->';
				output += '</object>';
		}
		else{
			output = '<a href="http://www.adobe.com/go/getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>';
		}
	document.getElementById(drawInObjectID).innerHTML = output;
}

$(function(){
	
	createSpinner();

 	transitions = $("html").hasClass("csstransitions");

	sharemessaging.facebook.display = sharemessaging.facebook.intro;
	sharemessaging.twitter.display = sharemessaging.twitter.intro;

	//var load = setTimeout(function(){
	loadBackImages(true,preloadimages,mainBackgroundsImagery);
	//},5000);
	
	//upper navigation
	/*$("#main_share").find(".share_facebook").bind(menuNavEvent,function(){
		facebookShare(sharemessaging.facebook.display);
		 //processPost('fb_top','fb');
	});
	//upper navigation
	$("#main_share").find(".share_twitter").bind(menuNavEvent,function(){
		sharemessaging.twitter.display = sharemessaging.twitter.intro;
		postToTwitter(sharemessaging.twitter.display);
		//processPost('tw_top','tw');
	});

	//resultsFacebookPost and resultsTwitterPost lives in ballthrower_v2.js
	$("#gameover").find(".share_facebook").bind(menuNavEvent,resultsFacebookPost);
    $("#gameover").find(".share_twitter").bind(menuNavEvent,resultsTwitterPost);*/

});