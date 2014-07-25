(function(){
	//Request Animation Frame Functions -------------------------------------------------------------------------------------------------------- //
	/* Un grand merci a Jerome Etienne http://notes.jetienne.com/2011/05/18/cancelRequestAnimFrame-for-paul-irish-requestAnimFrame.html */
	window.stopTicker = (function() {
		return window.cancelAnimationFrame          ||
	        window.webkitCancelRequestAnimationFrame    ||
	        window.mozCancelRequestAnimationFrame       ||
	        window.oCancelRequestAnimationFrame     ||
	        window.msCancelRequestAnimationFrame        ||
	        clearTimeout
	})();

	/* Thank you Paul Irish http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
	window.ticker = (function(){
	    return  window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame    || 
	        window.oRequestAnimationFrame      || 
	        window.msRequestAnimationFrame     || 
	        function(/* function */ callback, /* DOMElement */ element){
	            return window.setTimeout(callback, 1000 / 60);
	        };
	})();

}());


