/**
 * Created by UdaySravanK on 4/4/16.
 */

define([
    'jquery',
    'page',
    'global',
    'underscore',
    'backbone',
    'js/models/nav.model',
    'router',
    'text!templates/nav.html'
], function ($, Page, Global, _, Backbone, NavModel, Router, navTpl) {
    /**
     * CONSTRUCTOR
     ***************************************************************************/
    var Nav = Page.extend({
        constructor: function Header() {
            Page.prototype.constructor.apply(this, arguments);
        },

        /**
         * MODEL DATA
         ***********************************************************************/
        model: new NavModel(),

        templates: {
            navTpl: navTpl
        },

        /**
         * EVENTS
         * - add events that are specific to phone here
         * - all common events are in the mixin
         ***********************************************************************/
        events: {
            "click a[href]":"onClickAboutMe"
        },

        /**
         * EXECUTION
         ***********************************************************************/

        /**
         * Initialize View
         * @method initializeView
         ***********************************************************************/
        initializeView: function () {
            this.bindBackboneListeners();
            //this.listenTo(Backbone.Events, 'vi:headerview:popularProduct', this.fetchRecommendedItems);
        },

        /**
         * Initialize PatLab
         * - Add all patlab plugins here
         *
         * @method initializePatLab
         ***********************************************************************/
        initializePatLab: function () {
            //this.patlab.header = new PatLabHeader('[data-behavior=header]', {});
        },

        /**
         * Render View
         * @method renderView
         ***********************************************************************/
        renderView: function () {
            var self = this;

            // compile and render template
            this.compiledTemplate = _.renderPartial(self.templates['navTpl'], this.model.tplData);
            this.$el.html(this.compiledTemplate);

            //TODO: initiate css for this view
        },
        onClickAboutMe: function() {
            $('.drawer').drawer('hide');
        }
    }).mixin([]);

    return Nav;
});
