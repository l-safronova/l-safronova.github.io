$(document).ready(function(){
    var $langPopup = $(".js-lang-popup"),
        tooltipClass = "tooltip-holder",
        tooltipClassShown = "tooltip-holder--shown";
    $(".js-language-switch").on("click", function(){
        $langPopup.hasClass(tooltipClassShown)? $langPopup.removeClass(tooltipClassShown) : $langPopup.addClass(tooltipClassShown);
        return false;
    });

    $(document).on("click", function(e) {
        if ($(e.target).closest(".js-lang-popup").length) return;
        if($langPopup.hasClass(tooltipClassShown)){
            $langPopup.removeClass(tooltipClassShown);
        }
        e.stopPropagation();
    });
});

(function(window) {
    var
        _this = window,
        _module_name = 'callpyHelper';

    var defaults = {
        'c-helper-html-wrapper': '#c-helper-html-wrapper',
        'c-helper--closer': '#c-helper--closer'
    };
    var global = {};
    var methods = {
        init: function () {
            var html = document.createElement( 'div' );
            html.className = 'c-search-wrapper';
            html.innerHTML = '\
            <div class="c-search-body">\
                <div class="c-search-title">\
                    '+ "Помощь" + '<div class="c-search-title--closer c-search--closer" id="c-helper--closer"></div>\
                </div>\
                \
                <div class="c-search-section">\
                    <div class="c-search-row" id="c-helper-html-wrapper">\
                        '+ "Chargement..." + '\
                    </div>\
                </div>\
            </div>\
            ';

            $(document.body).append(html);

            $(defaults['c-helper--closer']).on('click', function () {
                methods.hide();
                return false;
            });
        },
        /**
         * Показывает окно и подгружает в него данные page
         * @param page
         */
        show: function (page) {
            $(document.body).addClass('s-search-show');
            $.post("/clpy/", {
                action: "helper",
                page: page
            }, function (data){
                callpyHelper.html = data;
            }/*, function (error){
                console.log(error);
                callpyHelper.html = "<h1>Извините, такого раздела не существует</h1><br/>Если вы уверены, что ошибка произошла на стороне Callpy, пожалуйста, напишите нам на <a href='mailto:support@callpy.com'>support@callpy.com</a> с указанием адреса этой страницы.";
            }*/);
        },
        hide: function() {
            $(document.body).removeClass('s-search-show');
        }
    };

    _this[_module_name] = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            console.log('Use only methods:');
            for (var key in methods) {
                console.log(key);
            }
        }
    };

    Object.defineProperty(_this[_module_name], "moduleName", {
        get: function() {
            return _module_name;
        }
    });

    Object.defineProperty(_this[_module_name], "html", {
        set: function(value) {
            $(defaults['c-helper-html-wrapper']).html(value);
        }
    });

    $(window).ready(function(){
        _this[_module_name]('init');
    });
})(window);