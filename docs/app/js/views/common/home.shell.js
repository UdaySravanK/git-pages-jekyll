// Filename: HomeShell.js
// Handles the Home page events

define([
  'jquery',
  'underscore',
  'backbone',
  'page'
], function ($, _, Backbone, Page) {
  var HomeShell = Page.extend({
    subViews: {},

    // Page events
    events: {

    },

    constructor: function HomeShell() {
      Page.prototype.constructor.apply(this, arguments);
    },

    initializeView: function () {
      var self = this;

      $(window).on('orientationchange scroll', function (e) {
        self.stopAll(e);
        Backbone.Events.trigger(e.type, e);
      });
    },

    // Render view
    renderView: function () {
    }
  });

  return HomeShell;
});
