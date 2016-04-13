/* README: 
*
* tl are used internally for all functions 
* Section: full window height section of document used by fullpage.js
* Carousel: Component that, upon scrolling, brings one element to replace another in the same position
*
****************/

$( document ).ready(function() {	

/******* COMMON ATTRIBUTES *******/
	var a1 = { autoAlpha:1 },
		a0 = { autoAlpha:0 },
		dsp = { autoAlpha:1, display:'block' };
		hd = { autoAlpha:0, display:'none' };

/******* ONLOAD FUNCTIONS *******/
	window.onload = function() {
		TweenMax.to('.page-down', 0.35, {
			delay: 0.6,
			bottom:'0%', 
			ease: Circ.easeOut
		});
	};


/********* OPENING SCENE **********/
	var header = new Object(),
		section1 = new Object(),
		actionButton = new Object();

	header.transitioning = {
		transform:"translateY(0%)",
		top:'9%', // 8% .page-up button + 1% margin
		ease: Power2.easeInOut
	};	
	header.positioned = { //TODO: BAD NAME! doesn't describe how its fuctioning
		width:'82.94039%', // Copied from bourbon grid width of 10/12
		marginLeft:'8.5298%',
		ease: Power2.easeInOut
	};

	section1.positioned = {
		height:'50%',
		padding:'2em',
		width:'82.94039%', // Copied from bourbon grid width of 10/12
		ease: Sine.easeInOut
	};

	actionButton.positioned = {
		padding:'2rem',
		height:'10vw',
		width:'10vw',
		ease: Power2.easeInOut
	};
	actionButton.image = {
		background:'url(../img/phone-only.svg) center / 75% no-repeat #0c3e85' //red accent
	};
	actionButton.init = { // Used in FULLPAGE section TODO: MAKE CSS object section
		right:'5vw',
		height:'10vw',
		width:'10vw',
		boxShadow:'0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
		ease: Power2.easeInOut
	};
	actionButton.center = {
		right:'44.0vw',
		height:'12vw',
		width:'12vw',
		boxShadow:'0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
		ease: Expo.easeInOut
	};

	function moveToContent(tl) {
		// 1. Move the header from center page to the top of the page and remove the company slogan
		tl.to('.header', 0.5, header.transitioning, "open" )
		.to('#slogan', 0.5, hd, "open -=0.2 " )
		// 2. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, dsp, "enterContent")
		.to('.header', 0.5, header.positioned, "" )
		.to('#section1', 0.4, { autoAlpha:1, top:'35%', ease: Expo.easeInOut }, "enterContent")
		// 3. Bring the action buttion into view
		.to('.action-button_floating', 0.3, actionButton.positioned, "enterContent")
		.to('.action-button_floating', 0.2, actionButton.image)
		.to('.page-up', 0.3, { top:'0%' }, "enterContent")}


	
/********** FULLPAGE FUNCTIONS *********/	
	


/********** FULLPAGE OPERATION *********/	
	var openingScene	= new TimelineLite({paused:true} );
	var openingTl = moveToContent(openingScene);
	var clickCounter = 0;
	var thisPage = 0;

	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		autoScrolling: true,
		
		fixedElements: '.action-button_floating, .page-up, .page-down',
		
		'onLeave': function(index, nextIndex, direction) {
			var carouselTl = new TimelineLite(),
				headerActive	= '#carousel' + (index - 1).toString(),
				contentActive	= '#section' + (index - 1).toString();
			// Select content/header combo based on scroll direction
			if (direction == 'up') {
				var headerNext = '#carousel' + (index - 2).toString();
				var contentNext = '#section' + (index - 2).toString();
			} else if (direction == 'down') {
				var headerNext = '#carousel' + (index).toString();
				var contentNext = '#section' + (index).toString();
			}
			var lastPage = $('#fullpage .section').length;
				
			// Hide content/header combo
			function hideCombo(tl, header, content){
				tl.to(header, 0.3, hd, "hd")
				.to(content, 0.3, {autoAlpha:0, top:'44%', ease: Circ.easeOut }, "hd")
			}
			// Display content/header Combo
			function displayCombo(tl, header, content){
				tl.to(header, 0.3, dsp, "dsp")
				.to(content, 0.3, {autoAlpha:1, top:'35%', ease: Circ.easeInOut}, "dsp")
			}
			// Move Carousel
			function moveCarousel(tl) {
				hideCombo(tl, headerActive, contentActive);
				displayCombo(tl, headerNext, contentNext);
			}
			
			// Play Opening Animation or Move Carousel
			if (index == 1 ) {
				openingScene.play();
			} else if (index == 2 && direction == 'up') { 
				openingScene.reverse();
			} else {
				moveCarousel(carouselTl)
			};
				
			// Last Page:
			// 1. Hide page-down icon to indicate end of document
			// 2. Move action-button as a call to action on last page
			if (index == lastPage && direction == 'up') {
                TweenMax.to('.page-down', 0.15, { bottom:'0%' })
				TweenMax.to('.action-button_floating', 0.4, { bottom:'5%' })
				TweenMax.to('.footer', 0.4, { bottom:'-10%' })
			} else if (index == (lastPage - 1) && direction == 'down') { 
                TweenMax.to('.page-down', 0.15, { bottom:'-8%' })
				TweenMax.to('.action-button_floating', 0.4, { bottom:'-8%' })
				TweenMax.to('.footer', 0.4, { bottom:'0%' })
			};	
			if (clickCounter == 1) {
					TweenMax.to('#section4', 0.3, {autoAlpha:0, top:'44%'})
					TweenMax.to('#carousel4', 0.3, hd, "hd" )
					clickCounter = 0;
			};

			if (direction == 'down') {
				thisPage = index;
			} else if (direction == 'up') {
				thisPage = index - 2;
			}
		}, 'afterLoad': function() {
			TweenMax.to('.page-up', 0.0, {zIndex:'2'});
			TweenMax.to('.page-down', 0.0, {zIndex:'2'});
		}
	});

			$('.action-button_floating').click(function(){
				var headerActive = '#carousel' + thisPage.toString();  
				var contentActive = '#section' + thisPage.toString();  
				var tl = new TimelineLite();
				if (clickCounter == 0) {
					tl.to('.action-button_floating', 0.0, {zIndex:'-11'})
					.to(headerActive, 0.3, hd, "hd")
					.to(contentActive, 0.3, {autoAlpha:0, top:'44%', ease: Circ.easeInOut}, "hd")
					.to('#section4', 0.3, { autoAlpha:1, top:'35%', ease: Circ.easeInOut}, "dsp")
					.to('#carousel4', 0.3, dsp, "dsp" )
					.to('.action-button_floating', 0.0, {zIndex:'3'});
					clickCounter = 1;
					} else if (clickCounter == 1) {
					tl.to('.action-button_floating', 0.0, {zIndex:'-11'})
					.to('#section4', 0.3, { autoAlpha:0, top:'44%', ease: Circ.easeInOut}, "hd")
					.to('#carousel4', 0.3, hd, "hd" )
					.to(headerActive, 0.3, dsp, "dsp")
					.to(contentActive, 0.3, {autoAlpha:1, top:'35%', ease: Circ.easeInOut}, "dsp")
					.to('.action-button_floating', 0.0, {zIndex:'3'});

					clickCounter = 0;
				}
			});

			$('.page-up').click(function( e ){
				$.fn.fullpage.moveSectionUp();
				e.preventDefault();	
				TweenMax.to('.page-up', 0.0, {zIndex:'-9'});
			})
			$('.page-down').click(function(e){
				TweenMax.to('.page-down', 0.0, {zIndex:'-9'});
				$.fn.fullpage.moveSectionDown();
				e.preventDefault();
			})

});
