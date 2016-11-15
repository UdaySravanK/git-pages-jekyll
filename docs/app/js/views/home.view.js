/**
 * Created by UdaySravanK on 3/20/16.
 */
/**
 * @constructor
 * @requires header-mx, common-gam-mx
 * @extends Page
 ******************************************************************************/
define([
    'jquery',
    'page',
    'global',
    'underscore',
    'backbone',
    'js/models/home.model',
    'router',
    'text!templates/home.html'
], function ($, Page, Global, _, Backbone, HomeModel, Router, homeTpl) {
    /**
     * CONSTRUCTOR
     ***************************************************************************/
    var Home = Page.extend({
        constructor: function Header() {
            Page.prototype.constructor.apply(this, arguments);
        },

        /**
         * MODEL DATA
         ***********************************************************************/
        model: new HomeModel(),

        templates: {
            homeTpl: homeTpl
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
                this.compiledTemplate = _.renderPartial(self.templates['homeTpl'], this.model.tplData);
                this.$el.html(this.compiledTemplate);

            //TODO: initiate css for this view
        }
    }).mixin([]);

    return Home;
});
