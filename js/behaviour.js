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
				.to('#nav-bar', 0.0, { visibility:'visible' })
				.to('#nav-bar', 0.8, { top:'14%' })
				.to('#env', 0.0, { visibility:'visible' })
				.to('.text-block', 0.5, { top:'22%' })
				.to('.moving1', 0.2, {backgroundColor: 'hsla(0,0%,0%,0.2'});
				tl.play();
			} else if (index == 2 && direction == 'down') {
				TweenMax.to('#dev', 0.0, { visibility:'visible' })
				TweenMax.to('#env', 0.3, { left:'-100vw' });
				TweenMax.to('#dev', 0.3, { left:'0' });
				TweenMax.to('.moving2', 0.2, {backgroundColor: 'hsla(0,0%,0%,0.2'});
				TweenMax.to('.moving1', 0.2, {backgroundColor: 'hsla(0,0%,0%,0'});
			} else if (index == 3 && direction == 'down'){
				TweenMax.to('#about', 0.0, { visibility:'visible' })
				TweenMax.to('#dev', 0.3, { left:'-100vw' });
				TweenMax.to('#about', 0.3, { left:'0' });
				//TweenMax.to('.moving1', 0.2, {backgroundColor: 'hsla(0,0%,0%,0.2'});
				//TweenMax.to('.moving2', 0.2, {backgroundColor: 'hsla(0,0%,0%,0'});
			}
			else if (index == 2 && direction == 'up'){
				tl.reverse()
			}
		}
	});

});
