/* ----------------- Start Document ----------------- */

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
  }

(function ($) {
	"use strict";

	$(document).ready(function () {


	/*--------------------------------------------------*/
		/* Chat box our custom installed
		/*--------------------------------------------------*/

		$(function() {
			var INDEX = 0; 
			$("#chat-submit").click(function(e) {
			  e.preventDefault();
			  var msg = $("#chat-input").val(); 
			  if(msg.trim() == ''){
				return false;
			  }
			  generate_message(msg, 'self');
			
			//   setTimeout(function() {      
			// 	generate_message(msg, 'user');  
			//   }, 1000)
			  
			})
			
			function generate_message(msg, type) {
			  INDEX++;
			  var str="";
			  str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
			  str += "          <div class=\"cm-msg-text\">";
			  str += msg;
			  str += "          <\/div>";
			  str += "        <\/div>";
			  $(".chat-logs").append(str);
			  $("#cm-msg-"+INDEX).hide().fadeIn(300);
			  if(type == 'self'){
			  $("#chat-input").val(''); 
			  }    
			  $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
			}  
			
			
			$(document).delegate(".chat-btn", "click", function() {
			  var value = $(this).attr("chat-value");
			  var name = $(this).html();
			  $("#chat-input").attr("disabled", false);
			  generate_message(name, 'self');
			})
			
			$("#chat-circle").click(function() {    
			  $("#chat-circle").toggle('scale');
			  $(".chat-box").toggle('scale');
			})
			
			$(".chat-box-toggle").click(function() {
			  $("#chat-circle").toggle('scale');
			  $(".chat-box").toggle('scale');
			})


			$(".collapser").click(function() {
				var ind = $("#wizard").steps("getCurrentIndex");
				console.log(ind);
				$($(".uk-content")[ind]).toggle();	
			})
			
		  });

		/*----------------------------------------------------*/
		/*  Sidebar Nav Submenus
		/*----------------------------------------------------*/

		$('.secondary-nav ul li a').on('click', function (e) {
			if ($(this).closest("li").children("ul").length) {
				if ($(this).closest("li").is(".active-submenu")) {
					$('.secondary-nav ul li').removeClass('active-submenu');
				} else {
					$('.secondary-nav ul li').removeClass('active-submenu');
					$(this).parent('li').addClass('active-submenu');
				}
				e.preventDefault();
			}
		});


		// Swipe finctionality 

		// function swipedetect(el, callback){
  
		// 	var touchsurface = el,
		// 	swipedir,
		// 	startX,
		// 	startY,
		// 	distX,
		// 	distY,
		// 	threshold = 150, //required min distance traveled to be considered swipe
		// 	restraint = 100, // maximum distance allowed at the same time in perpendicular direction
		// 	allowedTime = 300, // maximum time allowed to travel that distance
		// 	elapsedTime,
		// 	startTime,
		// 	handleswipe = callback || function(swipedir){}
		  
		// 	touchsurface.addEventListener('touchstart', function(e){
		// 		var touchobj = e.changedTouches[0]
		// 		swipedir = 'none'
		// 		dist = 0
		// 		startX = touchobj.pageX
		// 		startY = touchobj.pageY
		// 		startTime = new Date().getTime() // record time when finger first makes contact with surface
		// 		e.preventDefault()
		// 	}, false)
		  
		// 	touchsurface.addEventListener('touchmove', function(e){
		// 		e.preventDefault() // prevent scrolling when inside DIV
		// 	}, false)
		  
		// 	touchsurface.addEventListener('touchend', function(e){
		// 		var touchobj = e.changedTouches[0]
		// 		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		// 		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		// 		elapsedTime = new Date().getTime() - startTime // get time elapsed
		// 		if (elapsedTime <= allowedTime){ // first condition for awipe met
		// 			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
		// 				swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
		// 			}
		// 			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
		// 				swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
		// 			}
		// 		}
		// 		handleswipe(swipedir)
		// 		e.preventDefault()
		// 	}, false)
		// }

		// var el = document.getElementById('wizard');
		// swipedetect(el, function(swipedir){
		// 	// swipedir contains either "none", "left", "right", "top", or "down"
		// 	// el.innerHTML = 'Swiped <span style="color:yellow;margin: 0 5px;">' + swipedir +'</span>';
		// 	if(swipedir=="left"){
		// 		$("#wizard").steps('previous');
		// 	}else if(swipedir=="right"){
		// 		$("#wizard").steps('next');
		// 	}
		// });


		/*----------------------------------------------------*/
		/*  Back to Top
		/*----------------------------------------------------*/

		// Button
		// function backToTop() {
		// 	$('body').append('<div id="backtotop"><a href="#"></a></div>');
		// }
		// backToTop();

		// // Showing Button
		// var pxShow = 100; // height on which the button will show
		// var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

		// $(window).scroll(function () {
		// 	if ($(window).scrollTop() >= pxShow) {
		// 		$("#backtotop").addClass('visible uk-animation-slide-bottom');
		// 	} else {
		// 		$("#backtotop").removeClass('visible uk-animation-slide-bottom');
		// 	}
		// });

		// $('#backtotop a').on('click', function () {
		// 	$('html, body').animate({
		// 		scrollTop: 0
		// 	}, scrollSpeed);
		// 	return false;
		// });


		// ------------------ End Document ------------------ //
	});

})(this.jQuery);



// home audio tutorail
 

// On Audio Load Execute the Fucntion
function audioIsLoaded() {
	console.log('audio is loaded');
	audio.play();
	setTimeout(function(){

		$('html, body').animate({
			scrollTop: $(".card-icon").offset().top
		  }, 1000);	
	}, 5000);
	
}

 // To show the first text on contemnt load
 function tutorial(){

	console.log("started");
	audio = new Audio('/media/audio/home_page.mp3');
	audio.onloadeddata = audioIsLoaded();
 }



/*! NProgress (c) 2013, Rico Sta. Cruz
 *  http://ricostacruz.com/nprogress */
