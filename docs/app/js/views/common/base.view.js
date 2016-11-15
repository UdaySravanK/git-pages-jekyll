/**
 * Created by UdaySravanK on 2/28/16.
 */
// Filename: views/common/base.view.js
// Base model for all views
define([
    'jquery',
    'underscore',
    'backbone',
    'lazyLoader',
    'backboneAdvice'
], function ($, _, Backbone, lazyLoader) {
    var View = Backbone.View;
    var delegateEvents = View.prototype.delegateEvents;
    var undelegateEvents = View.prototype.undelegateEvents;

    // Default Composite View Model to be used across the screens
    View = Backbone.View.extend({
        isRendered: false,
        parentView: null,
        css: null,
        eventBsdlObj: {},
        eventType: '',
        constructor: function () {
            Backbone.View.prototype.constructor.apply(this, arguments);
        },
        // Sets the associated model
        setModel: function (model) {
            var prevModel = this.model;

            this.stopListening(prevModel);

            if (model !== null) {
                this.listenTo(model, 'refresh', this.onModelRefresh);
            }

            this.model = model;
        },

        // Gets the associated model
        getModel: function () {
            return this.model;
        },

        // Handles the model refresh to be overridden
        onModelRefresh: function () {

        },

        // updates the model
        updateModel: function () {

        },

        renderSubviewSpecifically: function () {
            this.performRenderCycle();
            this.delegateEvents();
        },

        // Renders the view
        render: function () {
            this.performRenderCycle();
            this.delegateEvents();
            this.isRendered = true;

            // scrolling the page to top.
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },

        performRenderCycle: function () {
            this.preRender();
            this.postRender();
        },

        // Adds the sub view
        addSubView: function (id, view) {
            view.parentView = this;

            if (!this.subViews[id]) {
                this.subViews[id] = view;
                return this.subViews[id];
            } else {
                return this.subViews[id];
            }
        },

        // Removes the sub view
        removeSubView: function (subView) {
            subView.removeCss();
            subView.undelegateEvents();
            subView.dispose();
            subView.remove();
            subView = null;
        },

        setCss: function (cssFileArray) {
            var self = this;

            if (!cssFileArray) {
                cssFileArray = this.css;
            }

            if (typeof cssFileArray === 'string') {
                cssFileArray = [cssFileArray];
            }

            _.each(cssFileArray, function (linkCss) {
                $('<link rel="stylesheet" type="text/css" href="' + img_domain + linkCss +
                    '" data-name = "' + self.$el.attr('data-name') + '/style' + '"></link>').appendTo($('head'));
            });
        },

        removeCss: function (cssFileArray) {
            if (cssFileArray) {
                if (typeof cssFileArray === 'string') {
                    cssFileArray = [cssFileArray];
                }

                _.each(cssFileArray, function (linkCss) {
                    $('link[href$="' + linkCss + '"]').attr('disabled', 'disabled').remove();
                });
            } else {
                $('link[data-name="' + this.$el.attr('data-name') + '/style"]').attr('disabled', 'disabled').remove();
            }
        },

        // Remove all sub views
        removeAllSubViews: function () {
            var self = this;

            _.each(this.subViews, function (subView) {
                self.removeSubView(subView);
            });

            this.subViews = {};
        },
        // dispose
        clearPage: function () {
            this.removeAllSubViews();
            this.dispose();
            this.undelegateEvents();
        },

        // shows the view
        show: function () {
            this.$el.show();
        },

        // hides the view
        hide: function () {
            this.$el.hide();
        },

        undelegateEvents: function () {
            return undelegateEvents.apply(this, arguments);
        },

        delegateEvents: function () {
            delegateEvents.apply(this, arguments);

            return this;
        },

        preRender: function () {
            $('#GlobalLoader').show();
            if (this.nft && this.nft.ensPageName) {
                ensCustomEvent.create('mobileAjaxPageLoad', { ensPageName: this.ensPageName, test2: '2345' });
            }

            if (this.css) {
                this.setCss();
            }

            this.renderView();
        },

        postRender: function () {
            // TODO:Temporary fixed for IOS8 device
            var ios8Device = navigator.userAgent.match(/(iPad|iPhone|iPod).*CPU.*OS\s*8_\d/i) !== null;

            if (ios8Device) {
                $(window).scrollTop(1);
            }
            $('#GlobalLoader').hide();
        },

        clearNotNeededPages: function (newSubViewsDefinition) {
            var oldSubViewArr = Object.keys(this.subViews);
            var newSubViewsArr = Object.keys(newSubViewsDefinition);
            var i;

            newSubViewsArr = newSubViewsArr.map(function (view) {
                return view.replace('/' + this.formFactor, '');
            });

            for (i = 0; i < oldSubViewArr.length; i++) {
                if (!(newSubViewsArr.indexOf(oldSubViewArr[i]) > -1)) {
                    if (this.subViews[oldSubViewArr[i]]) {
                        this.removeSubView(this.subViews[oldSubViewArr[i]]);
                        this.subViews[oldSubViewArr[i]].destroy();
                        delete this.subViews[oldSubViewArr[i]];
                    }
                }
            }

            // Is this set up so that if the main body doesn't exist? Can we delete this.
            if ($('#header').next().attr('id') === 'nav' &&
                $('#footer').prev().attr('id') === 'nav' &&
                window.location.protocol === 'http:') {
                $('#GlobalLoader').show();
            }

            // scroll to the when new page gets loaded
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },

        clickLocation: function () {
            var clickLocation = '';

            try {
                $('#viewport').find('div').each(function () {
                    if ($(this).attr('data-page')) {
                        clickLocation = $(this).attr('data-page');
                    }
                });

                return clickLocation;
            } catch (e) {
            }
        },
        /**
         * method called before the view is destroyed.
         */
        destroy: function () {

        },

        /**
         * this provides a way to mock calls by overriding the prototype
         */
        getWindowLocation: function () {
            return window.location;
        }
    });
    return View;
});
