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
		TweenMax.to('.page-down', 0.5, {
			delay: 0.6,
			bottom:'0%'
		});
	};

/******* CONTACT BUTTON *********/
	var clickCounter = 0,
		buttonClick = new TimelineLite(),
		contact = {
			top:'10%',
			height:'50%',
			width:'100%',
			marginLeft:'0%'
		};

	function openDiv(tl) {
		tl.to('.contact', 0.05, a1)
		.to('.contact', 0.2, contact) 
		.to('.media', 0.2, a1)
	};

	$('.action-button_floating').click( function() {
		openDiv(buttonClick);
		if (clickCounter % 2 == 1) {
			buttonClick.reverse();
		} else {
			buttonClick.play();
		};
		clickCounter++;
	});
		

/********* OPENING SCENE **********/
	var header = new Object(),
		section1 = new Object(),
		actionButton = new Object();

	header.transitioning = {
		delay: 0.2,
		transform:"translateY(0%)",
		top:'9%' // 8% .page-up button + 1% margin
	};	
	header.positioned = { //TODO: BAD NAME! doesn't describe how its fuctioning
		width:'82.94039%', // Copied from bourbon grid width of 10/12
		marginLeft:'8.5298%',
	};

	section1.positioned = {
		height:'50%',
		padding:'2em',
		width:'82.94039%' // Copied from bourbon grid width of 10/12
	};

	actionButton.positioned = {
		padding:'2rem',
		height:'10vw',
		width:'10vw',
	};
	actionButton.image = {
		background:'url(../img/phone.svg) center / 62% no-repeat #d17547' //red accent
	};
	actionButton.init = { // Used in FULLPAGE section TODO: MAKE CSS object section
		right:'5vw',
		height:'10vw',
		width:'10vw'
	};
	actionButton.center = {
		right:'42.5vw',
		height:'15vw',
		width:'15vw'
	};

	function moveToContent(tl) {
		// 1. Move the header from center page to the top of the page and remove the company slogan
		tl.to('.header', 0.5, header.transitioning, "open" )
		.to('#slogan', 0.5, hd, "open -=0.2 " )
		// 2. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, dsp, "enterContent")
		.to('.header', 0.5, header.positioned, "enterContent" )
		.to('#section1', 0.4, { autoAlpha:1, top:'35%' }, "enterContent")
		// 3. Bring the action buttion into view
		.to('.action-button_floating', 0.3, actionButton.positioned, "enterContent")
		.to('.action-button_floating', 0.2, actionButton.image)
		.to('.page-up', 0.3, { top:'0%' }, "enterContent")}


	
/********** FULLPAGE FUNCTIONS *********/	
	
	$('.page-up').click(function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionUp();
	})
	$('.page-down').click(function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	})


/********** FULLPAGE OPERATION *********/	
	var openingScene	= new TimelineLite({paused:true} );
	var openingTl = moveToContent(openingScene);

	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.55 ,0.0 ,0.1 ,1.0)',
		autoScrolling: true,
		fixedElements: '.action-button_floating',
		
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
				
			// Hide content/header combo
			function hideCombo(tl, header, content){
				tl.to(header, 0.3, hd, "hd")
				.to(content, 0.3, {autoAlpha:0, top:'44%'}, "hd")
			}
			// Display content/header Combo
			function displayCombo(tl, header, content){
				tl.to(header, 0.3, dsp, "dsp")
				.to(content, 0.3, {autoAlpha:1, top:'35%'}, "dsp")
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
			var lastPage = $('#fullpage .section').length;
			if (index == (lastPage) && direction == 'up') {
                TweenMax.to('.page-down', 0.15, { bottom:'0%' })
				TweenMax.to('.action-button_floating', 0.3, actionButton.init)
			} else if (index == (lastPage - 1) && direction == 'down') { 
                TweenMax.to('.page-down', 0.15, { bottom:'-8%' })
				TweenMax.to('.action-button_floating', 0.3, actionButton.center)
			};	
		}
	});

});
