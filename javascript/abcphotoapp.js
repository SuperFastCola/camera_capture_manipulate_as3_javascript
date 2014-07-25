(function(win){

		if(!window.console) console = {log:function(){}};

		//public instance variable 
		ABCPhotoApp.prototype.holder = null;
		//hold width and height in variable to speed up processing
		ABCPhotoApp.prototype.holderwidth = null; 
		ABCPhotoApp.prototype.rendercount = 0; 
		ABCPhotoApp.prototype.holderheight = null;
		ABCPhotoApp.prototype.parents = new Array();
		ABCPhotoApp.prototype.parentsObjects = new Array();
		ABCPhotoApp.prototype.offsets = {
			left:undefined,
			top:undefined
		};
		ABCPhotoApp.prototype.context = null;
		ABCPhotoApp.prototype.counter = 0;
		ABCPhotoApp.prototype.user = {
			x:0,
			y:0,
			scrollCorrection:{
				x:0,
				y:0
			}
			
		};
		ABCPhotoApp.prototype.ticker = null;
		ABCPhotoApp.prototype.adjustphoto = null;
		ABCPhotoApp.prototype.graphics = {
			total:0,
			loaded:0,
			images: null,
		};

		ABCPhotoApp.prototype.prerender = {
			canvas: null,
			context: null
		};

		//static class variable declared once for the class type
		//Car.num_of_wheels = 4;

		//initial constructor for game
		function ABCPhotoApp(width,height,id){
			var _width = width;
			var _height = height;
			var _id = id;

			//constructs game element
			this.holder = document.createElement("canvas"); 
			this.holder.width = _width;
			this.holder.height = _height;
			//this.holder.id = _id;
			this.context = this.holder.getContext("2d");

			//getter functions
			this.getWidth = function(){ return _width;};
			this.getHeight = function(){ return _height;};

			this.setWidth = function(val){ this.holder.width = val;};
			this.setHeight = function(val){ this.holder.height = val;};

			this.getId = function(){ return _id;};
			this.getContext = function(){ return this.context;};
		}

		ABCPhotoApp.prototype.log = function(message){
			console.log(message);
		}

		//public function to attach game to parnet object
		ABCPhotoApp.prototype.attachCanvas = function(erasecontent){
			var parent = document.getElementById(this.getId());

			if(typeof erasecontent != "undefined" && erasecontent===true){
				parent.innerHTML = "";
			}

			parent.appendChild(this.holder);
		}


		ABCPhotoApp.prototype.createPreRenderObject = function(){
			this.prerender.canvas = document.createElement("canvas");
          	this.prerender.canvas.id="prerenderer";
          	this.prerender.canvas.width = this.getWidth();
          	this.prerender.canvas.height = this.getHeight();
          	this.prerender.context = this.prerender.canvas.getContext("2d");
		}

		//must be called in window context to work - this.stopTicker.call(window);
		ABCPhotoApp.prototype.stopTicker = (function() {
			return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
		})();

		/* Thank you Paul Irish - http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
		//must be called in window context to work - this.startTicker.call(window,this.render);
		ABCPhotoApp.prototype.startTicker =(function(){
	    	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element){ return window.setTimeout(callback, 1000 / 60);};
		})();

		ABCPhotoApp.prototype.preloadGraphics = function(imageIDs,imageArray){

			if(this.graphics.images==null){
				this.graphics.total = imageIDs.length;
				this.graphics.images = new Object();

				for(var i=0;i<imageIDs.length;i++){
					var d = new Date();
					this.graphics.images[imageIDs[i]] = new Object();
					this.graphics.images[imageIDs[i]].img = new Image();
					this.graphics.images[imageIDs[i]].img.id = imageIDs[i];
					this.graphics.images[imageIDs[i]].img.src = imageArray[i] + "?t=" + d.getTime();

					//bind the "this" keyword in this.initialize function to ABCPhotoApp
					this.initialize = this.initialize.bind(this);

					this.graphics.images[imageIDs[i]].img.addEventListener("load",this.initialize);
				}
			}
		}

		ABCPhotoApp.prototype.startRendering = function(){
			this.render = this.render.bind(this);
			//calls the request animation frame in the window object context otherwise request animation frame will not work.
			this.ticker = this.startTicker.call(window,this.render);
		}

		ABCPhotoApp.prototype.drawWrappingPaper = function(obj){
			this.prerender.context.drawImage(obj.img,obj.coors.x,obj.coors.y,obj.coors.w,obj.coors.h);
		}

		ABCPhotoApp.prototype.drawUploadedPhoto = function(){

				//scale amount
				var samt = .005;
				var ramt = .005;
				var xamt = 3;
				var yamt = 3;

				//Proportion Calculator
				//(Repro width / original width) * original height = repro height;
				//(original width / Repro width) * 100 = enlargement percentage

				var obj = this.graphics.images.photo;

				this.prerender.context.save();
				this.prerender.context.setTransform(1, 0, 0, 1, 0, 0);

				//sets translation point based on curretn scale of object
				this.prerender.context.translate((obj.coors.w * obj.coors.s)/2,(obj.coors.h * obj.coors.s)/2);

				if(this.adjustphoto != null){
		
					switch(this.adjustphoto){
						case "left":
							obj.coors.x -= xamt;
						break;

						case "right":
							obj.coors.x += xamt;
						break;

						case "up":
							obj.coors.y -= yamt;
						break;

						case "down":
							obj.coors.y += yamt;
						break;

						case "clockwise":
							obj.coors.r += ramt;
						break;

						case "counterclockwise":
							obj.coors.r -= ramt;
						break;

						case "reduce":
							obj.coors.s -= samt;
						break;

						case "enlarge":
							obj.coors.s += samt;
						break;
					}
				}

				this.prerender.context.rotate(obj.coors.r);
				this.prerender.context.scale(obj.coors.s,obj.coors.s);
				this.prerender.context.drawImage(obj.img,obj.coors.x,obj.coors.y,obj.coors.w,obj.coors.h);
				this.prerender.context.restore();
		}

		ABCPhotoApp.prototype.drawDisguise = function(obj){
			this.prerender.context.drawImage(obj.img,obj.coors.x,obj.coors.y,obj.coors.w,obj.coors.h);
		}

		ABCPhotoApp.prototype.saveImage = function(){
			return this.holder.toDataURL("image/jpeg",.8);
		}

		/*ABCPhotoApp.prototype.adjustDisguiseY = function(type){

			var ypos = 0;
			if(String(type).match(/reindeer/i)){

			}
			else if(String(type).match(/reindeer/i)){

			}
			else if(){
				
			}

			return this.holder.toDataURL("image/jpeg",.8);
		}*/

		/*ABCPhotoApp.prototype.setImageProperties = function(obj){

			//document.getElementById("test").innerHTML = this.graphics.images;

			for(var i in this.graphics.images){

				var obj = this.graphics.images[i];
				obj.coors = new Object();

				if(String(i).match(/photo/i)){
					obj.coors.x = this.getWidth()/2 - obj.img.width;
					obj.coors.y = this.getHeight()/2 - obj.img.height;

					document.getElementById("test").innerHTML = obj.img.width + " " + obj.img.height + " " + obj.img.src;
				}
				else if(String(i).match(/disguise/i)){
					obj.coors.x = this.getWidth()/2 - obj.img.width/2;
					obj.coors.y = this.getHeight()/2 - obj.img.height/2;
				}
				else{
					obj.coors.x = 0;
					obj.coors.y = 0;
				}

				//scale
				obj.coors.r = 0;

				//scale
				obj.coors.s = 1;
				
				//width
				obj.coors.w = obj.img.width;

				//height
				obj.coors.h = obj.img.height;
			}

			this.startRendering();
		}*/

		ABCPhotoApp.prototype.setImageProperties = function(imageobject){

			//document.getElementById("test").innerHTML = this.graphics.images;
			if(typeof imageobject != "undefined"){

				var obj = this.graphics.images[imageobject.id];
				obj.coors = new Object();

				if(String(imageobject.id).match(/photo/i)){
					obj.coors.s = (this.getHeight()/imageobject.height * 100)/100;
					obj.coors.x = -(this.getWidth()/2 + imageobject.width/2);
					//obj.coors.y = -(this.getHeight()/2 + imageobject.height/2);
					// Y coordinate is zero because we are settings the image height to the the canvas height 
					obj.coors.y = -(imageobject.height/2);

					//scale
				}
				else if(String(imageobject.id).match(/disguise/i)){
					obj.coors.x = this.getWidth()/2 - imageobject.width/2;
					//obj.coors.y = this.getHeight()/2 - imageobject.height/2;
					obj.coors.y = 10;
					//scale
					obj.coors.s = 1;
				}
				else{
					obj.coors.x = 0;
					obj.coors.y = 0;
					//scale
					obj.coors.s = 1;
				}

				//scale
				obj.coors.r = 0;

				
				
				//width
				obj.coors.w = imageobject.width;

				//height
				obj.coors.h = imageobject.height;

			}

			//this.startRendering();
		}

		//gets canvas parents objects set in parents variable
		ABCPhotoApp.prototype.getParentReferences = function(parentids){		
			for(var i=0;i<parentids.length;i++){
				this.parentsObjects.push(document.getElementById(parentids[i]));
			}
		}

		//gets offsets for canvas and canvas parents
		//used for mouse coordinate over canvas
		ABCPhotoApp.prototype.getOffsets = function(){
			//get parent offsets
			this.offsets.left = 0;
			this.offsets.top = 0;

			for(var i=0;i<this.parentsObjects.length;i++){

				this.offsets.left += Number(this.parentsObjects[i].offsetLeft);
				this.offsets.top += Number(this.parentsObjects[i].offsetTop);
			}

			
			this.offsets.left += Number(this.holder.offsetLeft);
			this.offsets.top += Number(this.holder.offsetTop);
		}		

		//tracks mouse coordinates over selected canvas
		//substracts offets from overall page mouse coordinates
		ABCPhotoApp.prototype.mouseTracker = function(e){
			
			this.getOffsets();

			if(Browser.makes.mobile){
				e.preventDefault();
			}         

			if(Browser.makes.ios || Browser.makes.android){
				this.user.x = e.targetTouches[0].pageX;
				this.user.y = e.targetTouches[0].pageY;
			}
			else if(Browser.makes.ie9 || Browser.makes.ie10){
				this.user.x =  e.clientX;
				this.user.y =  e.clientY;

				if(Browser.makes.arm && Browser.makes.touch){
					this.user.y = e.pageY;
				// this.user.y -= this.user.boundsrect.top;
				}
			}
			else{
				this.user.x =  (e.x)?e.x:e.pageX;
				this.user.y =  (e.y)?e.y:e.pageY;
			}    

			this.user.y -= this.offsets.top;
			this.user.x -= this.offsets.left;

			//substract page offsets if user has scrolled down or over and target is partially hidden
			//document.getElementById("test").innerHTML = "User: " + this.user.x + " " + this.user.y + "<br/>";

			if(Browser.makes.firefox){
				var xcoor = this.offsets.left - window.pageXOffset;
				xcoor = (xcoor<0)?xcoor*-1:xcoor;

				var ycoor = this.offsets.top - window.pageYOffset;
				ycoor = (ycoor<0)?ycoor*-1:ycoor;

				this.user.y -= ycoor;
				this.user.x -= xcoor;
			}
			else{
				this.user.y += window.pageYOffset;
				this.user.x += window.pageXOffset;
			}

			/*document.getElementById("test").innerHTML += "User Adjusted: " + this.user.x + " " + this.user.y + "<br/>";
			document.getElementById("test").innerHTML += "Offsets " + window.pageXOffset + " " + window.pageYOffset + "<br/>";
			document.getElementById("test").innerHTML += "Left: " + (this.offsets.left - window.pageXOffset) + "<br/>";
			document.getElementById("test").innerHTML += "Top: " + (this.offsets.top - window.pageYOffset);*/
 		}

		//called after all images are loaded into memory
		ABCPhotoApp.prototype.initialize = function(e){

			this.setImageProperties(e.currentTarget);
			this.graphics.loaded++;

			if(this.graphics.loaded == this.graphics.total){
					this.attachCanvas();
					this.createPreRenderObject();
					this.getParentReferences(this.parents);
					this.mouseTracker = this.mouseTracker.bind(this);
					this.holder.addEventListener(Browser.evt('over'),this.mouseTracker);
					this.holder.addEventListener(Browser.evt('move'),this.mouseTracker);
					this.startRendering();
					stopSpinner();
			}
		}

		ABCPhotoApp.prototype.drawPrerenderToCanvas = function(prerenderobj){
     		this.context.drawImage(prerenderobj,0,0,this.holder.width,this.holder.height);
		}
		
		//render each tick of the request animation frame
		ABCPhotoApp.prototype.render = function(e){


			//document.getElementById("test").innerHTML = (++this.rendercount);

			this.counter++;
			this.drawWrappingPaper(this.graphics.images.background);
			this.drawUploadedPhoto(null,this.graphics.images.photo);
			this.drawDisguise(this.graphics.images.disguise);
			this.drawPrerenderToCanvas(this.prerender.canvas);

			if(this.counter==50){
//				this.log(this.saveImage());
			}

			this.ticker = this.startTicker.call(window,this.render);
		}

		win.ABCPhotoApp = ABCPhotoApp;

}(window));
