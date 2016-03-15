$( document ).ready(function() {	
	/**** TERMS *****
	* Section: full window height section of document used by fullpage.js
	* Carousel: Component that, upon scrolling, brings one element to replace another in the same position
	****************/

 
	
	$('.bezier-test').click(function() {


	});		
	var tlContact = new TimelineLite();
	function centerExpand() {
		var windowHeight = $(window).outerHeight( true );
		var logoHeight = $('#logo').outerHeight( true );
		var allButLogo = 100 * (1 - (logoHeight / windowHeight));
		console.log(allButLogo);
		TweenMax.to('.contact', 0.3, {
			left:'50%',
		})
		TweenMax.to('.contact', 0.5, {
			delay:0.3,
			top:'0%', 
			height: allButLogo + '%',
			width:'100%',
			borderRadius:'0%',
			marginTop:'7em', // taken from compotents/_header #logo 'padding-top:1em' + 'max-height: 5em';
		})
		TweenMax.to('.media', 0.3, {
			delay:0.3,
			autoAlpha:1
		});
	}
	function actionCollapse() {
		TweenMax.to('.contact', 0.3, {
			top:'50%',
			height:'8%',
			width:'12%',
			borderRadius:'35%',
		});
		TweenMax.to('.media', 0.3, {
			autoAlpha:0
		});
		TweenMax.to('.contact', 0.3, {
			delay:0.3,
			left:'-50%',
		});
	};

	var actionClick = 0;
	$('.action-button_floating').click( function() {
		if (actionClick == 0) {
			centerExpand();
			actionClick = 1;
			console.log(actionClick);
		} else if (actionClick == 1) {
			actionCollapse();
			actionClick = 0;
			console.log(actionClick);
		}
	});
		


	var tl = new TimelineLite();
	function moveToContent() {
		// A. Unskew and move the colored div
		/*
		tl.to('#skewX', 0.25, { 
			transform: 'skewY(0deg)'
		})
		.to('#skewX', 0.25, { 
			top:'85%'
		})
		*/
		tl.to('#skewX', 0.2, {
			transform: 'skewY(0deg)',
			ease:Power1.easeInOut
		})
		.to('#skewX', 0.2, {
			bottom:'50%',
			left:'90%',
			height:'10%',
			width:'15%',
			borderRadius:'5px',
			ease:Power1.easeInOut
		})	
		.to('#skewX', 0.2, {
			bezier:{type:'cubic', values:[{left:'90%',bottom:'50%'},{left:'65%',bottom:'50%'},{left:'42.5%',bottom:'35%'}, {left:'42.5%', bottom:'0%'}]}, ease:Power1.easeInOut
		})
		.to('#skewX', 0.15, {
			height:'10%',
			width:'100%',
			left:'0%',
			ease:Power1.easeInOut
		}, "-=0.1")
		// B. Move the header from center page to the top of the page and remove the company slogan
		.to('.header', 0.5, {transform:"translateY(0%)", top:'0%' },"scene1" )
		.to('#slogan', 0.5, { display:'none', autoAlpha:0 }, "scene1")
		
		// C. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, {autoAlpha:1, display:'block' }, "scene2", "-=0.3" )
		.to('.header', 0.5, { marginLeft:'0', width:'100%', borderRadius:'0em' }, "scene2" )

		// D. Bring the action buttion into view
		.to('.action-button_floating', 0.5, { bottom:'3em' })
	}

	var tl1 = new TimelineLite();
	// Fade out & remove active carousel item; add & fade in next carousel item
	function moveCarousel(activeItem, nextItem) {
		tl1.to(activeItem, 0.3, { autoAlpha:0, display:'none' })
		.to(nextItem, 0.3, { display:'block', autoAlpha:1 })
	};

	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
		
		'onLeave': function(index, nextIndex, direction) {
			// Identify carousel items in relation to the current section
			var headerActive = '#carousel' + (index - 1).toString();
			var headerNext = '#carousel' + index.toString();
			var headerPrevious = '#carousel' + (index - 2).toString();

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
			} else if (index > 2 && direction == 'up') {
				moveCarousel(headerActive, headerPrevious); 
			};
		}
	});

});
