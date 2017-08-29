$(function () {
	
	$('.btn-mobile').click(function (e) {

		e.stopPropagation();

		$(this).toggleClass('active');
		$('.mobile-menu').toggleClass('active');

		return false;

	})

	$(".anch").click(function (e) {

	    e.preventDefault();

		var menuHeight = $('header').outerHeight();
		var anchor = $(this);

		$('html, body').stop().animate({
	    	scrollTop: $(anchor.attr('href')).offset().top-menuHeight
	  		}, 800);

		return false;
	});

/*
	var url = $('txtbox_location').getAttribute('value');;
	var match = /&q=([^&]+)/.exec(url);
	var keywordU = unescape(match[1]);
	keywordU = keywordU.replace('+', ' ');
	console.log(keywordU);
*/
})

$(document).ready(function() {
	$(window).scroll(function(){
		var popup_after = $("header").outerHeight() + $("#c1").outerHeight( true );
		//alert(popup_after);
		var scrollTop = $(window).scrollTop();
		if (scrollTop > popup_after) {
			$('.mobile-bottom').slideDown(300);
		}
		else {
			$('.mobile-bottom').slideUp(300);
		}
	});
});

window.onload = function () {
	f_e();
	mobile_tabs();
	dekstop_tabs();
	header_fixed();
}

$(window).resize(function () {
	f_e();
	mobile_tabs();
	dekstop_tabs();
	header_fixed();
})

function f_e() {
	if ( $(window).width() <= 791 ) {

		var t_h = $('h1').outerHeight(),
			h_h = $('header').outerHeight(),
			s_h = 15 + t_h + h_h;

		var height = $(window).outerHeight() - s_h;

		$('.c1__text').css({
			'position' : 'relative',
			'height' : height
		});

		$('.mobile-dropdown').click(function () {
			var toggle = $(this).data('toggle');
			$('#toggle-' + toggle).css({
				'max-height' : '5000px',
				'padding' : '30px'
			});
		})

		$('.btn-dropdown').click(function (e) {
			e.stopPropagation();
			var toggle = $(this).data('toggle');
			$('#toggle-' + toggle).css({
				'max-height' : '0px',
				'padding' : '0px'
			});
		})

	}	
}

function dekstop_tabs() {

		$('.tabs__link').click(function (e) {

			e.stopPropagation();

			var id = $(this).data('tab');

			if ( $(this).hasClass('tabs__link_active') ) {

				$(this).removeClass('tabs__link_active');
				$('#tab-' + id).slideUp(500);

			} else {

				$('.tabs__link').removeClass('tabs__link_active');
				$(this).addClass('tabs__link_active');
				$('.tabs-text').slideUp(250);
				$('#tab-' + id).slideDown(600);

			}

			return false;
		});

}

function mobile_tabs() {


		$('.tabs__link').removeClass('tabs__link_active');

		$('.tabs__link').click(function (e) {
			e.stopPropagation();

			var toggle = $(this).data('toggle'),
				box_h = $('#toggle-' + toggle).outerHeight();

			if ( box_h > 0 ) {
				$('#toggle-' + toggle).css({
					'max-height' : '0px',
					'padding' : '0px'
				});
			} else return;

			return false;
		});


}

function header_fixed() {
	if ( $(window).width() > 791 ) {

		$(window).scroll(function() {

			var top = $(document).scrollTop();

			if (top > 900) $('header').addClass('fixed');
			else $('header').removeClass('fixed');
		})

	}
}