$( document ).ready(function() {	
	/**** TERMS *****
	* Section: full window height section of document used by fullpage.js
	* Carousel: Component that, upon scrolling, brings one element to replace another in the same position
	****************/

	var tl = new TimelineLite();
	function moveToContent() {
		// A. Unskew and move the colored div
		tl.to('#skewX', 0.25, { transform: 'skewX(0)'})
		.to('#skewX', 0.25, {left: '100%' }, "open" )

		// B. Move the header from center page to the top of the page and remove the company slogan
		.to('.header', 0.5, {transform:"translateY(-50%)", top:'0' },"scene1" )
		.to('#slogan', 0.5, { display:'none', autoAlpha:0 }, "scene1")
		
		// C. Expand the header to take up the entire width of the screen and add the carousel text
		.to(['#carousel1', '.carousel-header'], 0.5, {autoAlpha:1, display:'block' }, "scene2", "-=0.3" )
		.to('.header', 0.5, { marginLeft:'0', width:'100%', borderRadius:'0em' }, "scene2" )

		// D. Bring the action buttion into view
		.to('.action-button_floating', 0.5, { bottom:'5em' })
	};

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
