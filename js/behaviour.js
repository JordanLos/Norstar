$( document ).ready(function() {	

	var tl = new TimelineLite();

	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
		
		'onLeave': function(index, nextIndex, direction) {
			// Three Scrolling Behaviours
			// 1. Main Animation to transfer from landing page
			//	to content
			// 2. Scroll header text when scrolling down
			// 3. Scroll header text when scrolling up

			if (index == 1 && direction == 'down') {
			// 1. Animate landing state to content
				// A. Unskew and move the colored div
				tl.to('#skewX', 0.25, {
					transform: 'skewX(0)'})
				.to('#skewX', 0.25, {
					left: '100%' }, 
					"open" )

				// B. Move the header from center page to the top
				// of the page and remove the company slogan
				.to('.header', 0.5, {
					transform:"translateY(-50%)",
					top:'0' },
					"scene1" )
				.to('#slogan', 0.5, { 
					display:'none',
					autoAlpha:0 },
					"scene1")
				
				// C. Expand the header to take up the entire width
				// of the screen and add the carousel text
				.to(['#carousel1', '.carousel-header'], 0.5, {
					autoAlpha:1,
					display:'block' }, 
					"scene2", "-=0.3" )
				.to('.header', 0.5, {
					marginLeft:'0',
					width:'100%',
					borderRadius:'0em' },
					"scene2" )

				// D. Bring the Contact Action buttion into view
				.to('.action-button_floating', 0.5, { 
					bottom:'5em' })

			} else if (index > 1 && direction == 'down') {
				// Identify the current header text to fade out
				var headerActive = '#carousel' + (index - 1).toString();
				// Identify the next header text to fade in 
				var headerNext = '#carousel' + index.toString();
			
				// Fade out the carousel text, then remove it from the document flow
				tl.to(headerActive, 0.3, {
					autoAlpha:0,
					display:'none' })
				// Add the next carousel text to the document flow, the fade in
				.to(headerNext, 0.3, {
					display:'block',
					autoAlpha:1 })
			} else if (index > 2 && direction == 'up') {
				var headerActive = '#carousel' + (index - 1).toString();
				var headerNext = '#carousel' + (index - 2).toString();

				tl.to(headerActive, 0.3, {
					autoAlpha:0,
					display:'none' })
				.to(headerNext, 0.3, {
					display:'block',
					autoAlpha:1 })
			}
		}
	});

});
