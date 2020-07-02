/* ----------------- Start Document ----------------- */
var eder = 0;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function get_home(){
	window.location.href = '/';
}

function load_populate(){

	curr_step = $("#wizard").steps("getCurrentIndex");
	section = $("section")[curr_step];

	// #remove previous step data  
	if(curr_step>0){
		console.log("emyting the last element");
		$($("section")[curr_step-1].querySelector("#resultz")).empty();
		$("#trigger").text("Continue");
	}
	// #if its first step start
	else{
		$("#trigger").text("Start");
	}

	console.log($(section).attr("pid") , ' ---------');
	$.get(
	"/learning/process_python/"+$(section).attr("pid"),
	function(data) {
		$(section.querySelector("#resultz")).append(data);
		// console.log(data);
		
		// #show the first Element
		els = $(section).find($(".hid-els"));
		els[0].style.display = 'block';

		if(curr_step==0){
			$("#loadingpart").hide();
			$("#content_pages").show();
		}
		
	});

}
  
function organizemodule(){ 

		// $("#loadingpart").fadeOut( "slow" );
		// console.log("hell yea");
			$("#wizard").steps({
				headerTag: "h4",
				bodyTag: "section",
				transitionEffect: "fade",
				enableAllSteps: false,
				transitionEffectSpeed: 500,

				onFinished: function (event, currentIndex) {

					console.log("finished");
				
				  },

				onStepChanging: function (event, currentIndex, newIndex) { 
					
				
					if ( newIndex === 1 ) {
						$('.steps ul').addClass('step-2');
					} else {
						$('.steps ul').removeClass('step-2');
					}
					if ( newIndex === 2 ) {
						$('.steps ul').addClass('step-3');
					} else {
						$('.steps ul').removeClass('step-3');
					}

			
					return true; 
				},
				labels: {
					finish: "Submit",
					next: "Next"
				}
			});
			// Custom Steps Jquery Steps

			$('.wizard > .steps li a').click(function(){
				$(this).parent().addClass('checked');
				// $(this).parent().prevAll().addClass('checked');
				$(this).parent().nextAll().removeClass('checked');
			});
			// Custom Button Jquery Steps
			$('.forward').click(function(){
				$("#wizard").steps('next');
			});

			$('.checkbox-circle label').click(function(){
				$('.checkbox-circle label').removeClass('active');
				$(this).addClass('active');
			});	

			$("a[href$='next']").hide();
			$("a[href$='previous']").hide();
			$("a[href$='finish']").hide();
		}
// ------------------ INITIALIZING THE STEPS ------------------ //


// BRYTHON FOR CHANNELING TEH ERROR FROM CONSOLE TO LIST
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
	console.logs.push(Array.from(arguments));
	console.stdlog.apply(console, arguments);
}

function show_err(pid){
	console.log("shit eror " , pid);
	// if error is logged
	if(console.logs[0][0].split("\n")[0] == "Traceback (most recent call last):"){
		err_last_line = console.logs[0][0].split("line").slice(-1)[0];
		line_num =  err_last_line.split("\n")[0].slice(1,);
		err =  err_last_line.split("\n").slice(-1)[0].split(":")[0];

		console.log(line_num);

		line_el = $(`#${pid}`).find('.ace_line')[line_num-1];
		line_el.innerHTML = line_el.innerHTML + `<div style="width:300px;background: red;opacity: 0.4;margin-top:-16px;"> <span style="padding-right: 50px;float:right;"> ${err} </span> </div>`;
	
		$(`#otp_${pid}`).val(console.logs[0][0]);
	}
}



function code_assist(){
	console.log("shit eror " , pid);
	// if error is logged
	
	console.log(line_num);

	line_el = $(`#${pid}`).find('.ace_line')[line_num-1];
	line_el.innerHTML = line_el.innerHTML + `<div style="width:300px;background: red;opacity: 0.4;margin-top:-16px;"> <span style="padding-right: 50px;float:right;"> ${err} </span> </div>`;

	$(`#otp_${pid}`).val(console.logs[0][0]);
	
}



function show_output_console(el ){
	res = '>>> Showing Output\n\n';
	if(console.logs.length>0){
		console.logs.forEach(function(e){res = res+ e[0]})
	}
	else{
		res = res+ "ComeOn Print Something ~__~"
	}
	
	$(`#otp_${el}`).val(res);
}

 ///// BRYTHON PART



 // To show the first text on contemnt load
 function firstload(){
		
		console.log('audio is loaded');
		organizemodule();

		load_populate();


		console.log("organised shit");
		document.getElementById("trigger").onclick = update_text;
		// $("#mod_content").fadeIn( "slow" );
		
}


 window.onload = function(){

	// keeps track of text step
	counter = 0;
	first_text = true;
	var audio;
	
	console.log("yo")

	// Main loop to initailize wiat for jquery to load
	while(true){
		
		if(window.jQuery){
			firstload();
			break;
		}else{
			console.log("no loads");
			sleep(500);
		}
	}
	// Main loop to initailize wiat for jquery to load ////
 }
 
 
 // Go to Next Step 
 function update_text(){

		if(eder){
			get_home();
			return 0;
		}

		 if (first_text){
			 $("#trigger").text("Continue");
		 }

		 curr_step = $("#wizard").steps("getCurrentIndex");
		 section = $("section")[curr_step];
		 els = $(section).find($(".hid-els"));

		 prev_explain = (counter>0) ? els[counter-1].querySelector('#text_slider') : 0;
		 if(prev_explain) prev_explain.style.display = "none";
		
		 console.log("shit");
		//  debugger;

		 // Try to pause teh audio if running
		 try{audio[0].pause();}catch{};

		 // Is any text left in the step?
		 if(counter+1 <= els.length){
			 
			 // Is it the not the first text
			 if(counter>0){
				 // Normalize the previous text
				 $(els[counter-1]).removeClass('curr-card');
				 try{
					els[counter-1].querySelector(".img_container").style.display = "none";
				 }catch{
					 console.log("code part");
				 }
				 
			 }
			   // Is it the final text of final Step?
			if((curr_step+1) == $("section").length &&  counter+1 == els.length){
				console.log("end of shit");
				$("#trigger").text("Finish"); 
				eder = 1;
			}
			 // whn its the last text
			 else if(counter+1 == els.length){
				 $("#trigger").text("Next Step");
			 }
			
			 // Show the text
			 $(els[counter]).show();

			
			 //  Add Animation to entitites	
			arr =  Array.from(els[counter].querySelectorAll("ent"));
			arr.forEach(item => item.className += " " +item.id);

			img_arr =  Array.from(els[counter].querySelectorAll(".img_ent"));
			img_arr.forEach(item => item.className += " " + item.id);
			


			 // get audio fro next text
			 audio = $(els[counter]).find("audio");
			 if(audio.length>0){
				audio[0].play();
			 }
			 
			 // Upgrade text count
			 counter++ ;
		 
		 }else{ 

				 // When theres no text left in step reset
				 console.log("end of step");
				 $("#trigger").text("Loading ..");

				 // Make next steps first text visible before going
				 els = $($("section")[curr_step+1]).find($(".hid-els"));
				 $(els[0]).show();   
				 
				 $("#wizard").steps("next");
				 counter = 0;

				 load_populate();
		 }
		 
	 }

