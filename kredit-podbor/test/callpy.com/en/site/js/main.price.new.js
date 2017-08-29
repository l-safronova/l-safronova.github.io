$( document ).ready(function() {
//SCROLL/ANIMATING SCRIPT
	var greatAnimateAddingClass = function(block){
		var top = block.offset().top;
		var bottom = block.height() + top;

		top = top - window.innerHeight;

		var scroll_top = $(this).scrollTop();

		if ((scroll_top > top) && (scroll_top < bottom)) {
			block.trigger('animateIn');
		} else {
			block.trigger('animateOut');
		}
	};

	$('[data-block-animate="animated"]').each(function () {
		var block = $(this);
		$(window).on('load', function(){
			greatAnimateAddingClass(block);
		});
		$(window).scroll(function() {
			greatAnimateAddingClass(block);
		});
	});

	$('.row2 .b-animate').on('animateIn', function(){
		$(this).addClass('fadeIn');
	}).on('animateOut', function(){
		$(this).removeClass('fadeIn');
	});

	$('.js-animate-calc').on('animateIn', function(){
		$(this).addClass('slideUp');
	}).on('animateOut', function(){
		$(this).removeClass('slideUp');
	});

	$('.js-animate-functions').on('animateIn', function(){
		$(this).addClass('leftIn');
	}).on('animateOut', function(){
		$(this).removeClass('leftIn');
	});

	$('.js-row3-pic').on('animateIn', function(){
		$(this).addClass('rightIn');
	}).on('animateOut', function(){
		$(this).removeClass('rightIn');
	});



});