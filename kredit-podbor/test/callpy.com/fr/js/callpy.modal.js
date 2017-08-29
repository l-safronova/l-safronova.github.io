/**
 * callpy.modal.js v1.0.2
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * v 1.0.2
 * — add callpy.utils.js checked
 * — Исправил ошибку с тем, что не правильно иницилизировался оверлей
 * — Добавил возможность навешивать колбеки
 *
 * v 1.0.3
 * — Исправлена ошибка только одного работающего элемента .md-callpy-close
 */

;(function(window) {

    'use strict';

    if (typeof window.classie == 'undefined') {
        throw new Error('callpy.utils.js not found!');
    }

    var
        defaults = {
            overlay: 'md-callpy-overlay',
            trigger: '.md-callpy-trigger',
            data: 'data-callpy-modal',
            show: 'md-callpy-show',
            template: '-content',
            boxClass: 'md-callpy-modal md-callpy-effect-',
            contentClass: 'md-callpy-content',
            eventName: 'transform'
        },
        noop = function () {},
        win = window,
        document = win.document,
        parseInt = win.parseInt,
        cl = win.classie;

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
            'MozTransition'    : 'transitionend',      // only for FF < 15
            'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
        },
        transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ],
        support = { animations : transEndEventName ? true : false };

    defaults.overlayEl = document.createElement('div');
    defaults.overlayEl.className = defaults.overlay;
    
    function init() {
        document.body.appendChild(defaults.overlayEl);

        [].slice.call(document.querySelectorAll(defaults.trigger)).forEach(function(el, i) {
            CallpyModal.create({
                el: document.querySelector('#' + el.getAttribute(defaults.data)),
                trigger: el
            });
        });        
    }

    function CallpyModal(options) {
        var defaults = {
            animate: 3,
            contentClass: '',
            close: '.md-callpy-close',
            onOpen: noop,
            onClose: noop
        };

        this.options = extend({}, defaults);
        extend(this.options, options);
        this._init();
    }

    CallpyModal.prototype = {
        _init: function () {
            var self = this, el = self.options.el;

            if (!el) {
                if (!self.options.text) {
                    self.options.text = '';
                }

                el = document.createElement('div');
                el.innerHTML = '\
                <div class="' + defaults.contentClass + ' ' + self.options.contentClass + '">'+self.options.text+'</div>';
                el.className = defaults.boxClass + this.options.animate;
                document.body.insertBefore(el, defaults.overlayEl);
                self.options.el = el;
            }

            this._events();
        },
        _events: function() {
            var self = this;
            var close = self.options.el.querySelectorAll(self.options.close);
            self.options.content = self.options.el.querySelector('.' + defaults.contentClass);

            function removeModalHandler() {
                self.hide();
            }

            if (self.options.trigger) {
                self.options.trigger.addEventListener('click', function () {
                    self.show();
                    defaults.overlayEl.removeEventListener('click', removeModalHandler);
                    defaults.overlayEl.addEventListener('click', removeModalHandler);
                });
            }
            else {
                defaults.overlayEl.addEventListener('click', removeModalHandler);
            }

            if (close.length) {
                for(var i = 0; i < close.length; i++){
                    close[i].addEventListener( 'click', function(ev) {
                        ev.stopPropagation();
                        removeModalHandler();
                    });
                }

            }
        },
        _callback: function() {
            var self = this;

            function _callbackFn(event) {
                if(support.animations) {
                    if (event.propertyName !== defaults.eventName) return;
                    self.options.content.removeEventListener(transEndEventName, _callbackFn);
                }

                if (cl.has(self.options.el, defaults.show)) {
                    self.options.onOpen.call(self);
                }
                else {
                    self.options.onClose.call(self);
                }
            }

            if(support.animations) {
                self.options.content.addEventListener(transEndEventName, _callbackFn);
            }
            else {
                _callbackFn();
            }

        },
        show: function() {
            var self = this;
            cl.add(self.options.el, defaults.show);
            self._callback();
        },
        hide: function() {
            var self = this;
            cl.remove(self.options.el, defaults.show);
            self._callback();
        }
    };

    CallpyModal.api = defaults;
    CallpyModal.version = '1.0.1';
    CallpyModal.create = function(options) {
        return new CallpyModal(options);
    };

    win.CallpyModal = CallpyModal;
    document.addEventListener("DOMContentLoaded", init, false);
})(window);