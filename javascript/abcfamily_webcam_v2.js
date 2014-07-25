var mobileApp = null;
var flashSupport = {
	installed: false,
	major: 0,
	minor:0
}

function addjustSizesForPhotoApp(){
	addRemoveClass("#choosetheme","hidden",false);
	addRemoveClass("#photoFrame",false,"hidden");

	if(!$("#contentsholder").hasClass("longer")){
		addRemoveClass("#contentsholder","longer",false);	
	}

	addRemoveClass("#container","longer","choosetheme");
	//addRemoveClass("#container",false,"longer");
	addRemoveClass("#footer","noback",false);
	scrollPageTo();
}

function isFlashInstalled(e){
	if(!e.success){
		initializeMobileVersion();
	}
}

function addPhotoFrame(){

	addjustSizesForPhotoApp();

	var flashvars = {};

	if(typeof fileUploaded != "undefined"){
	//image source name on server
		flashvars.externalimage = "uploads/" + fileUploaded;
	}		

	if(typeof disguiseChosen != "undefined"){
	//santa, reindeer, elf
		flashvars.costumeType = disguiseChosen;
	}		

	var params = {};
	params.bgcolor = "#FFFFFF";
	params.wmode = "transparent";
	params.allowscriptaccess = "always";

	var attributes = {};
	swfobject.embedSWF("camera_loader.swf", "flashcontent", 1010, 850, "10.0.0", false, flashvars, params, attributes,isFlashInstalled);	
}


function selectTheme(e){
	var text = $(e.currentTarget).find("h1").text();
	var formvalue = document.getElementById("my_costume");

	//remove checked
	$(".themechoice").find(".checked").remove();

	if(text.match(/elf/i)){
		disguiseChosen = "elf";
	}
	else if(text.match(/reindeer/i)){
		disguiseChosen = "reindeer";
	}
	else{
		disguiseChosen = "santa";
	}

	$(e.currentTarget).append('<div class="checked"><p></p></div>');
	$(".checked").find("p").css("background-image","url(" + preloadimages[2].imgobj.src  + ")");

	//assigns costume value to hidden field
	formvalue.value = disguiseChosen;

}

function showHideUploadForm(){

	if(typeof disguiseChosen != "undefined"){
		if($("#formholder").hasClass("hidden")){

			addRemoveClass("#formholder",false,"hidden");
//			$("#formholder").removeClass("hidden");
			scrollPageTo([500,500,10]);
		}
		else{
			addRemoveClass("#formholder","hidden",false);
//			$("#formholder").addClass("hidden");
		}
	}
	else{
		showPrompt("Please select a Christmas theme for your photo.");
	}

	ga('send', 'event', 'Open Upload Form', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
}

function submitUploadImage(){

	var temp = document.getElementById("my_field");
	var filename = String(temp.value).split("\\");
	filename = filename[filename.length-1];

	//var filename_issues = new RegExp(/[^0-9A-Za-z\._]/);
	var filename_issues = new RegExp(/\'/);
	var filetype_required = new RegExp(/\.(jpg|png|gif)/i);

	if(filename_issues.test(filename)){
		//showPrompt("File names may only contain letters, numbers or underscores.");
		showPrompt("Photo file name cannot contain the single quote character");
	}
	else if(!filetype_required.test(filename)){
		showPrompt("Photo file must be in JPG, PNG or GIF format");	
	}
	else{

		if(Browser.is("ie78")){
			showPrompt("Your file is now uploading. Please do not navigate away from this page.");	
			ga('send', 'event', 'Image Uploading', disguiseChosen +  '  ' + 'Session: ' + user_session + ' MPVD:' + user_mpvd);
		}
		else{
			startSpinner();
		}

		if(!$("#formholder").hasClass("hidden")){
			//addRemoveClass("#spinnerback","upload",false);
			//$("#spinnerback").addClass("upload");
		}

		showHideUploadForm();
		scrollPageTo();

		var temp = setTimeout(function(){
			document.getElementById("uploadform").submit();	
		},1000);
		
	}
	
}

function startWebCam(){

	if(Browser.is("mobile")){
		showPrompt("This feature requires the flash plugin!");
	}
	else{

		if(typeof disguiseChosen != "undefined"){
			ga('send', 'event', 'Web Cam', disguiseChosen +  '  ' + 'Session: ' + user_session + ' MPVD:' + user_mpvd);

			addPhotoFrame();
		}
		else{
			showPrompt("Please select a Christmas theme for your photo.");
		}
	}
}

function showShareContent(filename){
	$("#composed_image").css("background-image","url(../composites/" + filename + ".jpg)");
	addRemoveClass("#shareimage",false,"hidden");
	addRemoveClass("#footer","noback",false);
	addRemoveClass("#container","longer","landing");
	addRemoveClass("#contentsholder","longer","landing");

	ga('send', 'event', 'Shared Image Page', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
}

function showThemePage(promptmessage){

	disguiseChosen=undefined;

	if(!$("#prompt").hasClass("hidden")){
		hidePrompt();
	}

	if((Browser.is("ie78") && !flashSupport.installed) ){
		showPrompt("We are sorry. This section requires the Flash plugin or a browser which support the HTML 5 Canvas.");
		ga('send', 'event', 'Show Theme - No Flash Legacy Browser IE 7/8', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
	}
	else if(!$("html").hasClass("canvas") && !flashSupport.installed){
		showPrompt("We are sorry. This section requires the Flash plugin or a browser which support the HTML 5 Canvas.");

		ga('send', 'event', 'Show Theme - No Flash Legacy Browser', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
	}
	else if(Browser.is("ios") && Browser.is("ios_v")<=5){
		showPrompt("We are sorry. This section requires upload capabilities not available in iOS 5.");

		ga('send', 'event', 'Show Theme iOS5 Error', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
	}
	else{

		ga('send', 'event', 'Show Theme', 'Session: ' + user_session + ' MPVD:' + user_mpvd);

		if(typeof promptmessage != "undefined" && typeof promptmessage != "object"){
			if(String(promptmessage).match(/\w/)) showPrompt(promptmessage);
		}

		addRemoveClass("#footer",false,"noback");
		addRemoveClass("#shareimage","hidden",false);
		addRemoveClass("#container","choosetheme","landing");
		addRemoveClass("#choosetheme",false,"hidden");
		addRemoveClass("#landing","hidden",false);
		addRemoveClass("#contentsholder","longer","landing");
		addRemoveClass(".main_menu",false,"hidden");
		addRemoveClass("#photoFrame","hidden",false);

		if(!$("#photoFrame").hasClass("hidden")){
			addRemoveClass("#photoFrame","hidden",false);

			$("#flashcontent").removeClass("mobile");
			$("#flashcontent").empty();
			$("#flashcontent").append('<div class="frame"></div>');
			$(".mobile_interface").addClass("hidden");
		}

		if(!$("#thankyou").hasClass("hidden")){
			addRemoveClass("#thankyou","hidden",false);
			addRemoveClass("#container",false,"thankyou");
			addRemoveClass("#contentsholder",false,"thankyou");
		}
	}

	scrollPageTo();
}

function showThanks(){
	addRemoveClass("#entry","hidden",false);
	addRemoveClass("#thankyou",false,"hidden");
	addRemoveClass("#container","thankyou","entry");
	addRemoveClass("#contentsholder","thankyou","landing");
	addRemoveClass(".main_menu","hidden",false);
	scrollPageTo();

	ga('send', 'event', 'Thank You Page', 'Session: ' + user_session + ' MPVD:' + user_mpvd);
}
// CONTEST SPECIFIC 

function showEntry(){
	addRemoveClass("#landing","hidden",false);
	addRemoveClass("#entry",false,"hidden");
	addRemoveClass("#footer",false,"noback");
	addRemoveClass("#container","entry","landing longer");
	addRemoveClass("#contentsholder","landing","longer");
	addRemoveClass(".main_menu",false,"hidden");

	ga('send', 'event', 'Show Entry', 'Session: ' + user_session + ' MPVD:' + user_mpvd);


	if(!$("#photoFrame").hasClass("hidden")){
		photoFrameReset();
	}

	if(!$("#shareimage").hasClass("hidden")){
		addRemoveClass("#shareimage","hidden",false);
		addRemoveClass("#footer",false,"noback");
		addRemoveClass("#container",false,"longer");
		addRemoveClass("#contentsholder","landing","longer");
	}

	scrollPageTo();
}


function backToLanding(){

	stopSpinner();
	hidePrompt();

	//clear out variables
	disguiseChosen=undefined;
	fileUploaded=undefined;

	//hide all content sections
	$(".content").each(function(){
		if(!$(this).hasClass("hidden")){

			addRemoveClass("#" + $(this).attr("id"),"hidden",false);
			//$(this).addClass("hidden");
		}
	});

	addRemoveClass("#landing",false,"hidden");
	
	$(".themechoice").find(".checked").remove();

	if(!$("#footer").hasClass("noback")){
		addRemoveClass("#footer","noback",false);
	}

	if(!$("#rules").hasClass("hidden")){
		addRemoveClass("#rules","hidden",false);
	}

	if(!$("#prompt").hasClass("hidden")){
		addRemoveClass("#prompt","hidden",false);
	}

	addRemoveClass(".main_menu","hidden",false);
	photoFrameReset();

	ga('send', 'event', 'Back to Landing', 'Session: ' + user_session + ' MPVD:' + user_mpvd);

	//remove all classes from container and contentholder
	//$("#container").removeClass("landing longer entry thankyou choosetheme").addClass("landing");
	//$("#contentsholder").removeClass("landing thankyou longer").addClass("landing");

	addRemoveClass("#container","landing","longer entry thankyou choosetheme");
	addRemoveClass("#contentsholder","landing","thankyou longer");
	
	scrollPageTo();
}

function photoFrameReset(){
	$("#photoFrame").attr("style","").html('<div id="flashcontent"></div>');
	$("#shareimage").find(".call_to_action").clone().appendTo("#photoFrame");
	$("#photoFrame").find(".enter_now").bind(Browser.evt(),showEntry);
	$("#choosetheme").attr("style","");
}

var mobileImageName = undefined;

function openImageInNewWindow(bitlyurl){
	var url = null;

	if(typeof bitlyurl != "undefined"){
		url = bitlyurl;
	}
	else{
		url = "http://abcfamily25kgiveaway.com/saveimage.php?photo=" + mobileImageName;
	}

	var w = 532;
	var h = 767;
	var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 4;
	window.open(url,'Happy Holidays','width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);
}

function canvasSaved(output){
	stopSpinner();
	$(".edit_column,.edit_title").addClass("hidden");
	$(".share_column,.share_title").removeClass("hidden");
	$(".santa_graphic").addClass("share");
	clickEvnt("#share_mobile_facebook",function(e){
		postToFeed(output.absoluteurl,output.shorturl);
	});

	clickEvnt("#share_mobile_twitter",function(e){
		postToTwitter(e,sharemessaging.twitter.results, output.shorturl);
	})

	ga('send', 'event', 'Canvas Saved', output.shorturl);

	mobileImageName = output.filename;
	$("#butn_save_image").unbind(Browser.evt()).bind(Browser.evt(),function(e){
		openImageInNewWindow(output.shorturl);
	/*	showPrompt("Your image will open in a new window which you can share with your friends.", "undefined","Save Image", function(){
			openImageInNewWindow(output.shorturl) });
*/
	});
}

function saveCanvasMashup(){

	startSpinner();
	scrollPageTo();

	var data = {
		imagedata: "'" + mobileApp.saveImage() + "'"
	};

	ga('send', 'event', 'Canvas Saved To Server', 'Session: ' + user_session + ' MPVD:' + user_mpvd);

	ajaxRequest("/createimage_canvas.php","post","json",data,canvasSaved);
}

function initializeMobileVersion(){
		addjustSizesForPhotoApp();

		$("#flashcontent").addClass("mobile");
		$("#flashcontent").empty();
		$("#flashcontent").append('<div class="frame"></div>');
		$(".mobile_interface").removeClass("hidden");

		mobileApp = new ABCPhotoApp(402,515,"flashcontent");
		mobileApp.parents = new Array("container","contentsholder");
		mobileApp.preloadGraphics(["photo","disguise","background"],["uploads/" + fileUploaded,"images/disguise_" + disguiseChosen + ".png","images/wrapping_paper.jpg"]);
		startSpinner();
		
		$(".edit_nav").find("a").each(function(){
			$(this).bind(Browser.evt("down"),photoNavActions);
		});

		$(".edit_nav").find("a").each(function(){
			$(this).bind(Browser.evt("up"),stopPhotoNavActions);
			$(this).bind(Browser.evt("out"),stopPhotoNavActions);
		});	

		clickEvnt("#butn_share_image",saveCanvasMashup);

}

function stopPhotoNavActions(e){
		mobileApp.adjustphoto = null;
}

function photoNavActions(e){

	if(mobileApp != null){
		var dir = String(e.currentTarget.id).replace(/dir_/,"");
		mobileApp.adjustphoto = dir;
		mobileApp.drawUploadedPhoto();
	}
}

$(function(){
	
	clickEvnt("#butn_upload,#butn_hide_form",showHideUploadForm);
	clickEvnt("#butn_webcam",startWebCam);
	clickEvnt("#submit_upload_form",submitUploadImage);
	clickEvnt(".themechoice",selectTheme);
	clickEvnt(".show_spirit",showThemePage);
	clickEvnt(".enter_now",showEntry);
	clickEvnt("#rules_toggle",toggleAgreeToRules);
	clickEvnt("#gamesub",runFormValidation);
	//clickEvnt("#gamesub",showThanks);
	clickEvnt(".main_menu",backToLanding);

	clickEvnt(".share_facebook",facebookShare);
	clickEvnt(".share_twitter",postToTwitter);

	if(swfobject.getFlashPlayerVersion().major >0 ){
		flashSupport.installed = true;
		flashSupport.major = swfobject.getFlashPlayerVersion().major;
		flashSupport.minor = swfobject.getFlashPlayerVersion().minor;
	}

	if(!flashSupport.installed){
		$("#butn_upload").addClass("center");
		$("#butn_webcam").addClass("hidden");
	}

	clickEvnt(".show_rules",function(){
		getRules();
	});

	clickEvnt("#footer_rules",function(){
		getRules(true);
	});
	clickEvnt("#hide_rules",hideRules);

	if(typeof share_filename != "undefined"){
		showShareContent(share_filename);
	}


	if(typeof fileUploaded != "undefined"){
		if( Browser.is("mobile") || (!flashSupport.installed && $("html").hasClass("canvas") ) ){
			initializeMobileVersion();
		}
		else{
			//initializeMobileVersion();
			addPhotoFrame();
		}
	}

});

