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
	var skewX = new Object(),
		header = new Object(),
		section1 = new Object(),
		actionButton = new Object();

	skewX.unskewed = {
		transform: 'skewY(0deg)',
		ease:Power1.easeInOut,
	};
	skewX.backgrounded = {
		//autoAlpha:0.8,
		height:'84%',
		width:'100%',
		left:'0%',
		top:'8%',
		//backgroundColor:'#8bc0b3',
		ease:Power1.easeInOut
	};

	header.transitioning = {
		delay: 0.2,
		transform:"translateY(0%)",
		top:'12%' 
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
		height:'9rem',
		width:'9rem',
	};
	actionButton.image = {
		background:'url(../img/phone.svg) center / 62% no-repeat #ECA400' //red accent
	};
	actionButton.init = { // Used in FULLPAGE section TODO: MAKE CSS object section
		right:'2em',
		height:'9rem',
		width:'9rem'
	};
	actionButton.center = {
		right:'14em',
		height:'15rem',
		width:'15rem'
	};

	function moveToContent(tl) {
		// A. Unskew and move the colored div
		//tl.to('#skewX', 0.3, skewX.unskewed)
		//.to('#skewX', 0.2, skewX.backgrounded, "open")	
		// B. Move the header from center page to the top of the page and remove the company slogan
		tl.to('.header', 0.5, header.transitioning, "open" )
		.to('#slogan', 0.5, hd, "open -=0.2 " )
		// C. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, dsp, "enterContent")
		.to('.header', 0.5, header.positioned, "enterContent" )
		.from('#section1', 0.4, { marginLeft:'50%' }, "enterContent")
		.to('#section1', 0.4, section1.positioned, "enterContent")
		.to('#section1 > p', 0.4, a1, "enterContent")
		// E. Bring the action buttion into view
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



	var openingScene	= new TimelineLite({paused:true} );
	var openingTl = moveToContent(openingScene);
/********** FULLPAGE OPERATION *********/	
	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.55 ,0.0 ,0.1 ,1.0)',
		autoScrolling: true,
		fixedElements: '.action-button_floating',
		
		'onLeave': function(index, nextIndex, direction) {
			// Identify carousel items in relation to the current section
			var headerActive	= '#carousel' + (index - 1).toString(),
				headerNext		= '#carousel' + index.toString(),
				headerPrevious	= '#carousel' + (index - 2).toString(),
				contentActive	= '#section' + (index - 1).toString(),
				contentNext		= '#section' + index.toString(),
				contentPrevious	= '#section' + (index - 2).toString();

			var carouselHeaders = new TimelineLite(), // For moving carousel headers
				sections = new TimelineLite(), // For Moving Sections
				lastPage = $('#fullpage .section').length;
				
			function moveCarousel(tl, activeItem, nextItem) {
				tl.to(activeItem, 0.3, hd)
				.to(nextItem, 0.3, dsp)
			};
			function moveContent(tl, activeItem, nextItem) {
				tl.to(activeItem, 0.15, a0)
				.to(nextItem, 0.15, a1, "+=0.35")
			};

			if (index == 1 ) {
				openingScene.play();
			} else if (index == 2 && direction == 'up') { 
				openingScene.reverse();
			} else if (index == (lastPage) && direction == 'up') {
                TweenMax.to('.page-down', 0.15, { bottom:'0%' })
				moveCarousel(carouselHeaders, headerActive, headerPrevious); 
				moveContent(sections, contentActive, contentPrevious);
				TweenMax.to('.action-button_floating', 0.3, actionButton.init)
			} else if (index > 2 && direction == 'up') {
				moveCarousel(carouselHeaders, headerActive, headerPrevious); 
				moveContent(sections, contentActive, contentPrevious);
			} else if (index == (lastPage - 1) && direction == 'down') { //lastPage - 1 because leaving the penultimate page triggers the change
                TweenMax.to('.page-down', 0.15, {
					bottom:'-8%'
				})
				moveCarousel(carouselHeaders, headerActive, headerNext);
				moveContent(sections, contentActive, contentNext);
				TweenMax.to('.action-button_floating', 0.3, actionButton.center)
			} else if (direction == 'down') {
				moveCarousel(carouselHeaders, headerActive, headerNext);
				moveContent(sections, contentActive, contentNext);
			};	
		}
	});

});
