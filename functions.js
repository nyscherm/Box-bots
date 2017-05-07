var posX = 0;
var posY = 0;
var xStart = 0;
var yStart = 0;

//variables for specific controller objects
var sliderPos = 125;
var indicatorPos = 50;
var reverse = false;

//Load configs
var demo = '{ "sliderPos":"125", "trimPos":50, "reverse":"false" }';
var savedSettings = JSON.parse(demo);
sliderPos = savedSettings.sliderPos;
indicatorPos = savedSettings.trimPos;
reverse = savedSettings.reverse;

$(document).ready(function(){

	// Create a new WebSocket
	var socket = new WebSocket('wss://echo.websocket.org');

	socket.onopen = function(event) {
	  	console.log('WebSocket opened');
	  	socket.send("test send message");
	};
	socket.onclose = function(event) {
		console.log('WebSocket closed: ' + event);
	};
	socket.onmessage = function (event) {
	  console.log(event.data);
	}
	socket.onerror = function(error) {
	 	console.log('WebSocket Error: ' + error);
	};

	//socket.send(JSON.stringify(demo);

	$(".joystick").bind('touchstart', function(event) {
		$(".coordinates").removeClass("hidden");
	    $(".stem").removeClass("hidden");
	    startTracking(this, "joystick");
    }).bind('touchend', function(event) {
    	$(".coordinates").addClass("hidden");
    	$(".stem").addClass("hidden");
    	$(".joystick .handle").css("transform", "translate(0,0)");
    	stopTracking(this);
	});

	$(".sensitivity .slider").bind('touchstart', function(event) {
	    startTracking(this, "slider");
    }).bind('touchend', function(event) {
    	stopTracking(this);
    	savedSettings.sliderPos = sliderPos;
	});

	$(".indicator").bind('touchstart', function(event) {
	    startTracking(this, "indicator");
    }).bind('touchend', function(event) {
    	stopTracking(this);
		savedSettings.trimPos = indicatorPos;
	});

	function startTracking($this, target){
		xStart = event.touches[0].pageX;
		yStart = event.touches[0].pageY;
		console.log(event);
		console.log(xStart);
		console.log(yStart);
		
		$($this).on("touchmove", function() {
	        //console.log("OK Moved!");
			if (target == "joystick") {
		        posX = Math.max(Math.min(event.touches[0].pageX - xStart, 50), -50);
				posY = Math.max(Math.min(event.touches[0].pageY - yStart, 50), -50);
				var msg = 'touchmove() position - x : ' + posX + ', y : ' + posY;
			  	$(".coordinates").text(msg);
			    $(".joystick .handle").css("transform", "translate("+posX+"px, "+posY+ "px)");
			}
			else if (target == "slider") {
				posX = event.touches[0].pageX - xStart;
				sliderPos = Math.max(Math.min(posX + sliderPos, 250), 5);
				$(".slider .bar").css("width", 10 + sliderPos + "px");
				var msg = sliderPos*2/5 + '%';
			  	$(".percent").text(msg);
			  	console.log(sliderPos);
			}
			else if (target == "indicator") {
				posX = event.touches[0].pageX - xStart;
				indicatorPos = Math.max(Math.min(indicatorPos + posX, 100), 1);
				$(".indicator").css("margin-left", indicatorPos*.75 + "%");
				var msg = ((indicatorPos-50)/50).toFixed(2);
			  	$(".scale").text(msg);
			}
    	});
	}

	function stopTracking(obj) {
		$(obj).unbind("touchmove");
	}

	$("#bigStartButton").click(function(){
		$("#introScreen").addClass("noShow");
		$("#mainScreen").removeClass("noShow");
	});

	$(".actionButton").bind('mousedown touchstart', function(event) {
		$(this).addClass("pressed");
    }).bind('mouseup touchend', function(event) {
    	$(this).removeClass("pressed");
	});

	$(".reverse .switch .toggle").click(function(){
		reverse = !reverse;
		savedSettings.reverse = reverse;
		if (reverse) {
			$(".reverse .status").text("on");
			$(".reverse .switch .toggle").css("margin", "0 0 0 auto");
		} 
		else {
			$(".reverse .status").text("off");
			$(".reverse .switch .toggle").css("margin", "0");
		}
	});

	$(".settingsButton").click(function(){
		$("#mainScreen").addClass("noShow");
		$("#settings").removeClass("noShow");
	});

	$(".closeButton").click(function(){
		$("#mainScreen").removeClass("noShow");
		$("#settings").addClass("noShow");
	});
});
