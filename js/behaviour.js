$( document ).ready(function() {	

	var tl = new TimelineLite();
	var lineHeight = $('h1').outerHeight( true );
	var lineHeightPx = lineHeight + 'px';
	console.log(lineHeight);


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

				.to('.header', 0.5, {
					transform:"translateY(-50%)",
					top:'0' },
					"scene1" )
				.to('#slogan', 0.5, { 
					display:'none',
					autoAlpha:0 },
					"scene1")
				
				.to(['#carousel1', '.carousel-header'], 0.5, {
					autoAlpha:1,
					display:'block' }, 
					"scene2", "-=0.3" )
				.to('.header', 0.5, {
					marginLeft:'0',
					width:'100%',
					borderRadius:'0em' },
					"scene2" )

				.to('.action-button_floating', 0.5, { 
					bottom:'5em' })
			} else if (index > 1 && direction == 'down') {
				var headerActive = '#carousel' + (index - 1).toString();
				var headerNext = '#carousel' + index.toString();
			
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
