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
				.to('#logo', 0.8, { top:'7%', marginLeft:'0', padding:'15px 25%', borderRadius:'0'  }, "open")
			} else if (index == 2 && direction == 'down') {
			} else if (index == 3 && direction == 'down'){
			}
			else if (index == 2 && direction == 'up'){
				tl.reverse()
			}
		}
	});

});
