$( document ).ready(function() {	
	/**** TERMS *****
	* Section: full window height section of document used by fullpage.js
	* Carousel: Component that, upon scrolling, brings one element to replace another in the same position
	****************/


/******* CONTACT BUTTON *********/
	var tlContact = new TimelineLite();
	function centerExpand() {
		TweenMax.to('.contact', 0.05, {
			autoAlpha:1,
		})
		TweenMax.to('.contact', 0.2, {
			top:'10%',
			height:'50%',
			//width:'82.94039%',
			//marginLeft:'8.5298%'
			width:'100%',
			marginLeft:'0%'
		})
		TweenMax.to('.media', 0.2, {
			delay:0.2,
			autoAlpha:1
		});
	}
	function actionCollapse() {
		TweenMax.to('.media', 0.3, {
			autoAlpha:0
		});
		TweenMax.to('.contact', 0.3, {
			delay:0.15,
			top:'25%',
			height:'0%',
			width:'0%',
			marginLeft:'50%'
		});
		TweenMax.to('.contact', 0.05, {
			delay:0.35,
			autoAlpha:0
		});
	};

	var actionClick = 0;
	$('.action-button_floating').click( function() {
		if (actionClick == 0) {
			centerExpand();
			actionClick = 1;
		} else if (actionClick == 1) {
			actionCollapse();
			actionClick = 0;
		}
	});
		

/********* OPENING SCENE **********/
	var tl = new TimelineLite();
	function moveToContent() {
		// A. Unskew and move the colored div
		tl.to('#skewX', 0.3, {
			transform: 'skewY(0deg)',
			ease:Power1.easeInOut,
		})
		.to('#skewX', 0.4, {
			delay: 0.2,
			height:'10%',
			width:'100%',
			left:'0%',
			top:'90%',
			backgroundColor:'#E1EFEB',
			ease:Power1.easeInOut
		}, "open")	
		// B. Move the header from center page to the top of the page and remove the company slogan
		.to('.header', 0.5, {
			delay: 0.2,
			transform:"translateY(0%)",
			top:'0%' 
		},"open" )
		.to('#slogan', 0.5, { 
			delay: 0.2,
			display:'none', 
			autoAlpha:0
		}, "open")

		
		// C. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, {
			autoAlpha:1, 
			display:'block' 
		}, "enterContent")
		.to('.header', 0.5, { 
			marginLeft:'0', 
			width:'100%', 
		}, "enterContent" )

		.from('#section1', 0.4, {
			margin:'50%'
		}, "enterContent")
		.to('#section1', 0.4, {
			height:'50%',
			padding:'2em',
			width:'82.94039%' // Copied from bourbon grid width of 10/12
		}, "enterContent")
		.to('#section1 > p', 0.4, {
			autoAlpha:1
		}, "enterContent")
		// E. Bring the action buttion into view
		.to('.action-button_floating', 0.3, { 
			padding:'2rem',
			height:'9rem',
			width:'9rem',
		}, "enterContent")
		.to('.action-button_floating', 0.2, { 
			background:'url(../img/phone.svg) center / 62% no-repeat #ECA400' //red accent
		})
	}

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
			if (index == 1 ) {
				// The timeline requires a different function call if it has been reversed
				if (tl.reversed()) {
					tl.play();
				} else {
					moveToContent();
				}
			} else if (index == 2 && direction == 'up') { 
				tl.reverse();	
			} else if (direction == 'down') {
				moveCarousel(headerActive, headerNext);
				moveContent(contentActive, contentNext);
			} else if (index > 2 && direction == 'up') {
				moveCarousel(headerActive, headerPrevious); 
				moveContent(contentActive, contentPrevious);
			};
		}
	});

});
