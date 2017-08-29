;(function(window){
    'use strict';

    function debug( obj ) {
        if (window.console && window.console.log) {
            window.console.log(obj);
        }
    }

    var $ = window.jQuery || window.jQuery1;

    if (!$) {
        throw new Error('jQuery not found!');
    }

    var pluginName = "callpy-tooltip";

    var defaults = {
        tooltipClass: 'callpy_tooltip_wr',
        tooltipClassIn: 'callpy_tooltip_in',
        tooltipClassOut: 'callpy_tooltip_out',
        tooltipClassHide: 'callpy_tooltip_hide',
        initClass: 'callpy_tooltip',
        spaceName: 'callpyTooltip',
        animationNameEnd: 'callpy_tooltip_out',
        tooltipData: 'callpy_tooltip',
        hideDelay: 0,
        showDelay: 300,
        showTimer: false,
        offset: {
            top: 0,
            left: 0,
            corner: 0
        },
        text: '',
        pos: "left",
        callpyErrorClass: 'callpy_error',
        checkErrorClass: 'callpy_error',
        renderTo: ''
    };

    var _offsets = function() {
        var $this = $(this);
        var left, top, ofsl = 0,
            data = $this.data(defaults.tooltipData),
            settings = data.settings;
        
        if ((settings.offset.corner + settings.offset.left) > ($this.outerWidth(false) / 2)) {
            ofsl = ($this.outerWidth(false) / 2) - (settings.offset.corner + settings.offset.left);
        }

        left = ($this.offset().left + ($this.outerWidth(false) / 2 - (data.tooltip.outerWidth(false) / 2)) + settings.offset.left) + 'px';//$this.offset().left + defaults.offset.left + ofsl + 'px';
        top = (($this.offset().top + $this.outerHeight(false) + settings.offset.top) + settings.offset.top) + 'px';

        return {
            left: left,
            top: top
        };
    };

    var methods = {
        _init: function() {

            $(document)
                .on('mouseenter.' + defaults.spaceName, '.' + defaults.initClass, function() {
                    var $t = $(this);
                    if (!$t.data(defaults.tooltipData)) {
                        $t.callpy_tooltip();

                    }

                    var data = $t.data(defaults.tooltipData);

                    data.settings.showTimer = setTimeout(function() {
                        _this('show', $t);
                        data.settings.showTimer = false;
                    }, data.settings.showDelay);

                })
                .on('mouseleave.' + defaults.spaceName, '.' + defaults.initClass, function() {
                    var $t = $(this);
                    var data = $t.data(defaults.tooltipData);

                    if (data.settings.showTimer) {
                        clearTimeout(data.settings.showTimer);
                        data.settings.showTimer = false;
                    }

                    _this('hide', $(this));
                })
                .on('animationend.' + defaults.spaceName + ', webkitAnimationEnd.' + defaults.spaceName, function(e) {
                    if (!e) e = window.event;
                    if (e.originalEvent.animationName == defaults.animationNameEnd) {
                        $(e.originalEvent.target)
                            .removeClass(defaults.tooltipClassOut)
                            .addClass(defaults.tooltipClassHide);
                    }
                });
        },
        init: function(options) {
            var settings = $.extend({}, defaults, options);

            return this.each(function() {

                var $this = $(this),
                    data = $this.data(defaults.tooltipData),
                    tooltip = $('<div />', {
                        html : settings.text ? settings.text : $this.attr('title')
                    }).addClass(defaults.tooltipClass).addClass(defaults.tooltipClassHide);

                if (!settings.text) $this.removeAttr('title');

                if (!data) {
                    $this.data(defaults.tooltipData, {
                        target : $this,
                        tooltip : tooltip,
                        timer: false,
                        settings: settings
                    }).addClass(defaults.initClass);

                    $(settings.renderTo || document.body).append(tooltip);
                }
                else {
                    $this.callpy_tooltip('update', settings.text ? settings.text : $this.attr('title'));
                }
            });
        },
        drop: function() {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data(defaults.tooltipData);
                if (data) {
                    data.tooltip.remove();
                    $this.removeClass(defaults.initClass).removeData(defaults.tooltipData);
                }
            });
        },
        position: function() {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data(defaults.tooltipData);
                if (data) {
                    data.tooltip.css(_offsets.call(this));
                }
            });
        },
        show: function(t) {
            if (!t) {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data(defaults.tooltipData);
                    if (data) _this('show', $(this));
                });
            }

            var data = t.data(defaults.tooltipData);

            t.callpy_tooltip('position');

            data.tooltip
                .addClass(defaults.tooltipClassIn)
                .removeClass(defaults.tooltipClassHide);

            if (data.timer) {
                clearTimeout(data.timer);
                return;
            }

            if (data.tooltip.hasClass(defaults.tooltipClassOut) && !data.timer) {
                data.tooltip.removeClass(defaults.tooltipClassOut);
            }
        },
        hide: function(t, d) {
            if (!d && d !== 0) d = defaults.hideDelay;
            var data = t.data(defaults.tooltipData);
            data.timer = setTimeout(function() {
                data.tooltip
                    .addClass(defaults.tooltipClassOut)
                    .removeClass(defaults.tooltipClassIn);
                data.timer = false;
            }, d);
        },
        update: function(content) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data(defaults.tooltipData);

                if (data) {
                    data.tooltip.html(content).callpy_tooltip('position');
                }
            });
        }
    };

    $.fn.callpy_tooltip = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        }
        else {
            return false;
        }
    };


    var _this = $.fn.callpy_tooltip;
    _this('_init');
})(window);
