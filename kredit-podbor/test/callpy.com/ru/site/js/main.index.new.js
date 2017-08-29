$( document ).ready(function() {
    //ACORDEON FUNCTIONS
	var slideDown = function(item) {
		var $t = item,
			$tNext = $t.nextUntil('.row3-option__description');
			$tParent = $t.parents('.row3__options-list'),
			$otherSlided = $tParent.find('.row3-option__title--slided');

		$otherSlided.each(function(){
			$(this).removeClass('row3-option__title--slided');
		});

		$t.addClass('row3-option__title--slided');
	};

	var slideUp = function(item){
		var $t = item;

		$t.removeClass('row3-option__title--slided');
	};


    //SCROLL/ANIMATING SCRIPT
    var greatAnimateAddingClass = function(block){
        var top = block.offset().top;
        var bottom = block.height() + top;

        top = top - window.innerHeight;

        var scroll_top = $(this).scrollTop();

        if ((scroll_top > top) && (scroll_top < bottom)) {
            if (!block.hasClass('animate')) {
                block.addClass('animate');
                block.trigger('animateIn');
            }
        } else {
            block.removeClass('animate');
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

    $('.row2__pics').on('animateIn', function(){
        $(this).find('article').addClass('slideUp');

    }).on('animateOut', function(){
        $(this).find('article').each(function(){
            $(this).find('article').removeClass('slideUp')
        });
    });

    $('.row3').on('animateIn', function(){
        $(this).children('article').addClass('fadeIn');
    }).on('animateOut', function(){
        $(this).children('article').removeClass('fadeIn');
    });

    $('.row3__key-visual').on('animateIn', function(e){
        $('.row3__key-visual-rocket .row3__key-visual-inner').addClass('fadeInUp');
        $('.row3__key-visual-baloon .row3__key-visual-inner').addClass('fadeInUp--slow');
        e.stopPropagation()
    }).on('animateOut', function(e){
        $('.row3__key-visual-rocket .row3__key-visual-inner').removeClass('fadeInUp');
        $('.row3__key-visual-baloon .row3__key-visual-inner').removeClass('fadeInUp--slow');
        e.stopPropagation();
    });



    $('.row4').on('animateIn', function(){
        $(this).children('article').addClass('leftIn');
    }).on('animateOut', function(){
        $(this).children('article').removeClass('leftIn');
    });

    $('.row4__bg').on('animateIn', function(e){
        $(this).addClass('rightIn');
        e.stopPropagation();
    }).on('animateOut', function(e){
        $(this).removeClass('rightIn');
        e.stopPropagation();
    });

    $('.row5').on('animateIn', function(){
        $(this).children('article').addClass('rightIn');
    }).on('animateOut', function(){
        $(this).children('article').removeClass('rightIn');
    });

    $('.row6').on('animateIn', function(){
        $(this).children().addClass('fadeIn');
    }).on('animateOut', function(){
        $(this).children().removeClass('fadeIn');
    });

    //SLIDER
	$('.row5__slider').bxSlider({
		slideWidth: 963,
	    minSlides: 1,
	    maxSlides: 1,
	    moveSlides: 1,
	    slideMargin: 0,
	    pager: true,
	    controls: true,
	    auto: true,
	    autoHover: true,
	    pause: 2000,
	    infiniteLoop: true
	});

	//ACORDEON DOING
	$('.row3-option__title').on('click', function(){
		$(this).hasClass('row3-option__title--slided') ? slideUp($(this)) : slideDown($(this));
	});

    //скролл до тест-драйва

    $(".slide-down").click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('body, html').animate({ scrollTop: destination }, 1100);
        return false;
    });



});

