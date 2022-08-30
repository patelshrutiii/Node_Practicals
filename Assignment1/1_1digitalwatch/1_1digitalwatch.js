// function currentTime() {
//     var date = new Date(); /* creating object of Date class */
//     var hour = date.getHours();
//     var min = date.getMinutes();
//     var sec = date.getSeconds();
//     hour = updateTime(hour);
//     min = updateTime(min);
//     sec = updateTime(sec);
//     document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
//     var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
//   }
  
//   function updateTime(k) {
//     if (k < 10) {
//       return "0" + k;
//     }
//     else {
//       return k;
//     }
//   }
  
//   currentTime(); /* calling currentTime() function to initiate the process */
//   function currentTime() {
//     var midday = "AM";
//     midday = (hour >= 12) ? "PM" : "AM";
//   }

//   function currentTime() {
//     hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
//   }

setInterval(showTime, 1000);
function showTime() {
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	am_pm = "AM";

	if (hour > 12) {
		hour -= 12;
		am_pm = "PM";
	}
	if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}

	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	let currentTime = hour + ":"
			+ min + ":" + sec + am_pm;

	document.getElementById("clock")
			.innerHTML = currentTime;
}
showTime();
