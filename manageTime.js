$(document).ready(function() {
	// var dt, time;
	// dt = new Date();
	// time = (dt.getHours()) + ":" + (dt.getMinutes()) + ":" + (dt.getSeconds());
	// $("#timeRemaining").html(time);
	
	var hours = 0;
	var minutes = 0;
	var seconds = 0;

	var stopNow = true;

	setCookie = function(cname, cvalue) {
		document.cookie = cname + "=" + cvalue + ";";
	};
	
	getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
	    return "Not Found";
	};

	createUser = function(userName, password){
		setCookie("userName",userName);
		setCookie("password",password);
	};

	$("#signIn").click(function(){
		var userName = prompt("Please enter a user name.");
		var password = prompt("Please enter a password.");

		createUser(userName, password);

		$("#userName").html(getCookie("userName"));
	});

	$("#playButton").click(function(){
		stopNow = false;
		$("#playButton").attr("disabled", "disabled");
		$("#pauseButton").removeAttr("disabled");

		$("#addTime").attr("disabled", "disabled");
	});

	$("#pauseButton").click(function(){
		stopNow = true;
		$("#pauseButton").attr("disabled", "disabled");
		$("#playButton").removeAttr("disabled");

		$("#addTime").removeAttr("disabled");
	});

	$("#addTime").click(function(){
		var reg = new RegExp("[0-9][0-9]:[0-9][0-9]:[0-9][0-9]");

		if(reg.test($("#minutesToAdd").val())){
			var timeToAdd = $("#minutesToAdd").val().split(":");

			$("#playButton").removeAttr("disabled");

			hours += parseInt(timeToAdd[0]);
			minutes += parseInt(timeToAdd[1]);
			seconds += parseInt(timeToAdd[2]);

			if(seconds >= 60){
				tempMin = Math.floor(seconds / 60);
				seconds = seconds - (tempMin*60);
				console.log(seconds);
			}
			if(minutes >= 60){
				tempHour = Math.floor(minutes / 60);
				minutes = minutes - (tempHour*60);
				hours += tempHour;
			}

			$("#timeRemaining").html((hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
			$("#minutesToAdd").val("");
		}
		else{
			alert("Please ensure that your time is in the following format.\n00:00:00");
		}
	});

	$("#resetButton").click(function(){
		hours = 0;
		minutes = 0;
		seconds = 0;
		stopNow = true;

		$("#timeRemaining").html("00:00:00");
		$("#pauseButton").attr("disabled", "disabled");
		$("#playButton").attr("disabled", "disabled");
		$("#addTime").removeAttr("disabled");

	});

	setInterval(function() {
		if(!stopNow){
			$("#timeRemaining").html((hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
			if(seconds === 0){
				if(minutes === 0){
					hours--;
					minutes = 60;
				}
				minutes--;
				seconds = 59;
			}
			else{
				seconds--;
			}
		}
		if(hours === 0 && minutes === 0 && seconds === 0) $("#playButton").attr("disabled", "disabled");
	}, 1000);
});
