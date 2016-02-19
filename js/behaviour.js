$( document ).ready(function() {	

	var tl = new TimelineLite();

	$('body').click(function(){
		TweenMax.to('#contact-info', 1, {autoAlpha:1});
	})
	$('#nav-bar').click(function(){
		TweenMax.to('#contact-info', 1, {autoAlpha:0});
	})


	$('#fullpage').fullpage({
		
		scrollingSpeed: 1000,
		easingcss3: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
		
		'onLeave': function(index, nextIndex, direction) {

			if (index == 1 && direction == 'down') {
				tl.to('#skewX', 0.25, {transform: 'skewX(0)'})
				.to('#skewX', 0.25, {left: '100%'}, "open")
				.to('#logo', 0.5, { transform:'translateY(50%)', top:'0%', }, "open")
				.to('#logo', 0.5, { marginLeft:'0%', paddingLeft:'16.6666667%', paddingRight:'16.6666667%', width:'100%'})
				.to('.action-button_floating', 0.5, { bottom:'5em' })
			} else if (index == 2 && direction == 'down') {
			} else if (index == 3 && direction == 'down'){
			}
			else if (index == 2 && direction == 'up'){
				tl.reverse()
			}
		}
	});

});
