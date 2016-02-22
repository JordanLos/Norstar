$( document ).ready(function() {	

	var tl = new TimelineLite();

	$('#fullpage').fullpage({
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
		
		'onLeave': function(index, nextIndex, direction) {

			if (index == 1 && direction == 'down') {
				tl.to('#skewX', 0.25, {
					transform: 'skewX(0)'})
				.to('#skewX', 0.25, {
					left: '100%' }, 
					"open" )
				.to('#logo', 0.5, { 
					transform:'translateY(50%)', 
					top:'0%' },
					"open" )
				.to('#logo', 0.5, { 
					marginLeft:'0%', 
					paddingLeft:'16.6666667%', 
					paddingRight:'16.6666667%', 
					borderRadius:'0px', 
					width:'100%' })
				.to('.carousel', 0.5, { 
					top:'10%' })
				.to('.carousel', 0.5, { 
				})
				.to('#slogan', 0.5, { 
					autoAlpha:0, 
					display:'none' })
				.to('.carousel-header_fixed', 0.5, { 
					autoAlpha:1, 
					marginTop:'0' }, 
					"alpha")
				.to('.carousel-header_moving', 0.5, { 
					autoAlpha:1 }, 
					"alpha" )
				.to('.action-button_floating', 0.5, { 
					bottom:'5em' })
			} else if (index == 2 && direction == 'down') {
				tl.to('#carousel-h1', 0.2, { 
					autoAlpha:0 })
				.to('.carousel-header_moving', 0.3, { 
					top:'-=131px' })
				.to('#carousel-h2', 0.2, { 
					autoAlpha:1 })
			} else if (index == 3 && direction == 'down'){
				tl.to('#carousel-h2', 0.2, { 
					autoAlpha:0 })
				.to('.carousel-header_moving', 0.3, { 
					top:'-=131px' })
				.to('#carousel-h3', 0.2, { 
					autoAlpha:1 })
			} else if (index == 4 && direction == 'down') {
				tl.to('#carousel-h3', 0.2, { autoAlpha:0 })
				.to('.carousel-header_moving', 0.3, { 
					top:'-=131px' })
				.to('#carousel-h4', 0.2, {
					autoAlpha:1 })
			}
			else if (index == 2 && direction == 'up'){
				tl.reverse()
			}
		}
	});

});
