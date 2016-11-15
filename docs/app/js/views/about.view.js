/**
 * Created by UdaySravanK on 4/5/16.
 */
define([
    'jquery',
    'page',
    'global',
    'underscore',
    'backbone',
    'js/models/about.model',
    'router',
    'text!templates/about.html'
], function ($, Page, Global, _, Backbone, AboutModel, Router, aboutTpl) {
    /**
     * CONSTRUCTOR
     ***************************************************************************/
    var About = Page.extend({
        constructor: function Header() {
            Page.prototype.constructor.apply(this, arguments);
        },

        /**
         * MODEL DATA
         ***********************************************************************/
        model: new AboutModel(),

        templates: {
            aboutTpl: aboutTpl
        },

        /**
         * EVENTS
         * - add events that are specific to phone here
         * - all common events are in the mixin
         ***********************************************************************/
        events: {},

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
            this.compiledTemplate = _.renderPartial(self.templates['aboutTpl'], this.model.tplData);
            this.$el.html(this.compiledTemplate);

            //TODO: initiate css for this view
        }
    }).mixin([]);

    return About;
});
