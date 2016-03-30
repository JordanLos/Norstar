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
		ds = { autoAlpha:1, display:'block' };
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
		height:'84%',
		width:'100%',
		left:'0%',
		top:'8%',
		backgroundColor:'#8bc0b3',
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

	function moveToContent(tl) {
		// A. Unskew and move the colored div
		tl.to('#skewX', 0.3, skewX.unskewed)
		.to('#skewX', 0.4, skewX.backgrounded, "open")	
		// B. Move the header from center page to the top of the page and remove the company slogan
		.to('.header', 0.5, header.transitioning, "open" )
		.to('#slogan', 0.5, hd, "open -=0.2 " )
		// C. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, ds, "enterContent")
		.to('.header', 0.5, header.positioned, "enterContent" )
		.from('#section1', 0.4, { marginLeft:'50%' }, "enterContent")
		.to('#section1', 0.4, section1.positioned, "enterContent")
		.to('#section1 > p', 0.4, a1, "enterContent")
		// E. Bring the action buttion into view
		.to('.action-button_floating', 0.3, actionButton.positioned, "enterContent")
		.to('.action-button_floating', 0.2, actionButton.image)
		.to('.page-up', 0.3, { top:'0%' }, "enterContent")}

	var tl1 = new TimelineLite(); // For moving carousel headers
	// Fade out & remove active carousel item; add & fade in next carousel item
	function moveCarousel(activeItem, nextItem) {
		tl1.to(activeItem, 0.3, { autoAlpha:0, display:'none' })
		.to(nextItem, 0.3, { display:'block', autoAlpha:1 })
	};
	var tl2 = new TimelineLite(); // For Moving Sections
	function moveContent(activeItem, nextItem) {
		tl2.to(activeItem, 0.15, { 
			autoAlpha:0 
		})
		.to(nextItem, 0.15, { 
			autoAlpha:1 
		}, "+=0.35")
	};

	
/********** FULLPAGE *********/	
	$('.page-up').click(function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionUp();
	})
	$('.page-down').click(function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	})
	var lastPage = $('#fullpage .section').length;

	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.55 ,0.0 ,0.1 ,1.0)',
		autoScrolling: true,
		fixedElements: '.action-button_floating',
		
		'onLeave': function(index, nextIndex, direction) {
			// Identify carousel items in relation to the current section
			var headerActive = '#carousel' + (index - 1).toString();
			var headerNext = '#carousel' + index.toString();
			var headerPrevious = '#carousel' + (index - 2).toString();

			var contentActive = '#section' + (index - 1).toString();
			var contentNext = '#section' + index.toString();
			var contentPrevious = '#section' + (index - 2).toString();
			var openingScene = new TimelineLite();
			if (index == 1 ) {
				// The timeline requires a different function call if it has been reversed
				if (openingScene.reversed()) {
					openingScene.play();
				} else {
					moveToContent(openingScene);
				}
			} else if (index == 2 && direction == 'up') { 
				openingScene.reverse();	
			} else if (index == (lastPage) && direction == 'up') {
                TweenMax.to('.page-down', 0.15, {
					bottom:'0%'
				})
				var actionButtonInit = {
					right:'2em',
					height:'9rem',
					width:'9rem'
				};
				moveCarousel(headerActive, headerPrevious); 
				moveContent(contentActive, contentPrevious);
				TweenMax.to('.action-button_floating', 0.3, actionButtonInit)
			} else if (index > 2 && direction == 'up') {
				moveCarousel(headerActive, headerPrevious); 
				moveContent(contentActive, contentPrevious);
			} else if (index == (lastPage - 1) && direction == 'down') { //lastPage - 1 because leaving the penultimate page triggers the change
                TweenMax.to('.page-down', 0.15, {
					bottom:'-8%'
				})
				moveCarousel(headerActive, headerNext);
				moveContent(contentActive, contentNext);
				TweenMax.to('.action-button_floating', 0.3, {
					right:'14em',
					height:'15rem',
					width:'15rem'

				})
			} else if (direction == 'down') {
				moveCarousel(headerActive, headerNext);
				moveContent(contentActive, contentNext);
			};	
		}
	});

});
