/**
 * Created by Callpyuser on 11/9/2015.
 */
$(document).ready(function(){
    var arrow = $(".js-panel-arrow");
    arrow.on('click', function(){
        var t = $(this),
            panel = $(".js-panel"),
            tooltip = $(".js-online-animate");

        if( panel.hasClass("b-demonstration__panel--hidden") )
        {
            panel.removeClass("b-demonstration__panel--hidden");
            tooltip.removeClass("demonstration-tooltip--hidden");
        }
        else{
            panel.addClass("b-demonstration__panel--hidden");
            tooltip.addClass("demonstration-tooltip--hidden");
        }
    });


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

    $('.js-active-client-animate').on('animateIn', function(){
        $(this).addClass('fadeIn');
    }).on('animateOut', function(){
        $(this).removeClass('fadeIn');
    });

    $('.js-tools-animate').on('animateIn', function(){
        $(this).addClass('fadeIn');
    }).on('animateOut', function(){
        $(this).removeClass('fadeIn');
    });

    $('.js-online-animate').on('animateIn', function(){
        $(this).addClass('fadeIn');
    }).on('animateOut', function(){
        $(this).removeClass('fadeIn');
    });
});
