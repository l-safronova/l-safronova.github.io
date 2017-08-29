/**
 * User: Callpy
 * Date: 10.01.15
 */

;(function(window){
    'use strict';

    function debug( obj ) {
        /*if ( window.console && window.console.log ) {
            window.console.log( obj );
        }*/
    }

    var $ = window.jQuery || window.jQuery1;
    if (!$) {
        throw new Error('jQuery not found!');
    }
    if (!$.fn.callpy_tooltip) {
        throw new Error('Plugin callpy-tooltip.js not found!');
    }

    var pluginName = "callpy-error";
    var defaults = {
        text: false,
        initClass: 'callpy_error',
        TooltipErrorClass: 'callpy_error',
        renderTo: ''
    };

    var methods = {
        _init: function() {
            debug("plugin " + pluginName + " has been initialized" );
        },
        init: function(options) {
            var o = $.extend(defaults, options);

            return this.each(function() {
                var $this = $(this);
                if (o.text == false) {
                    $this.addClass(defaults.initClass);
                }
                else {
                    $this.addClass(defaults.initClass).callpy_tooltip({
                        text: o.text,
                        hideDelay: 800,
                        checkErrorClass: defaults.initClass,
                        callpyErrorClass: defaults.TooltipErrorClass ,
                        renderTo: o.renderTo
                    }).callpy_tooltip('show');
                }
            });
        },
        off: function() {
            return this.each(function() {
                var $this = $(this);
                $this.removeClass(defaults.initClass).callpy_tooltip('drop');
            });
        }
    };

    $.fn.callpy_error = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else if (typeof method === 'string') {
            return methods.init.apply(this, [{text: method}]);
        }
    };

    var _this = $.fn.callpy_error;
    _this('_init');
})(window);