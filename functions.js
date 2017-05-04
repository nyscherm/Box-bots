var posX = 0;
var posY = 0;
var xStart = 0;
var yStart = 0;
var moveJoystick = false;
var reverse = false;

$(document).ready(function(){

	$(".joystick").mousedown(function(){
		$(".coordinates").removeClass("hidden");
	    $(".stem").removeClass("hidden");
	    startTracking(this, "joystick");
    }).mouseup(function () {
    	$(".coordinates").addClass("hidden");
    	$(".stem").addClass("hidden");
    	$(".joystick .handle").css("transform", "translate(0,0)");
    	stopTracking(this);
	});

	$(".sensitivity .slider").mousedown(function(){
	    startTracking(this, "slider");
    }).mouseup(function () {
    	stopTracking(this);
	});

	$(".indicator").mousedown(function(){
	    startTracking(this, "indicator");
    }).mouseup(function () {
    	stopTracking(this);
	});

	function startTracking($this, target){
		xStart = event.pageX;
		yStart = event.pageY;
		
		$($this).on("mousemove", function() {
	        //console.log("OK Moved!");
			if (target == "joystick") {
		        posX = Math.max(Math.min(event.pageX - xStart, 50), -50);
				posY = Math.max(Math.min(event.pageY - yStart, 50), -50);
				var msg = 'mousemove() position - x : ' + posX + ', y : ' + posY;
			  	$(".coordinates").text(msg);
			    $(".joystick .handle").css("transform", "translate("+posX+"px, "+posY+ "px)");
			}
			else if (target == "slider") {
				posX = Math.max(Math.min(event.pageX - xStart, 250), 5);
				$(".slider .bar").css("width", 10 + posX + "px");
				var msg = posX*2/5 + '%';
			  	$(".percent").text(msg);
			  	console.log(posX);
			}
			else if (target == "indicator") {
				posX = Math.max(Math.min(event.pageX - xStart, 100), 1);
				$(".indicator").css("margin-left", posX*.9 + "%");
				var msg = ((posX-50)/50).toFixed(2);
			  	$(".scale").text(msg);
			}
    	});
	}

	function stopTracking(obj) {
		$(obj).unbind("mousemove");
	}

	$("#bigStartButton").click(function(){
		$("#introScreen").addClass("noShow");
		$("#mainScreen").removeClass("noShow");
	});

	$(".actionButton").mousedown(function(){
		$(this).addClass("pressed");
    }).mouseup(function () {
    	$(this).removeClass("pressed");
	});

	$(".reverse .switch .toggle").click(function(){
		reverse = !reverse;
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
	}).mouseenter(function(){
		$(this).css("transform", "rotate(40deg)");
	}).mouseleave(function(){
		$(this).css("transform", "none");
	});

	$(".closeButton").click(function(){
		$("#mainScreen").removeClass("noShow");
		$("#settings").addClass("noShow");
	});
});
