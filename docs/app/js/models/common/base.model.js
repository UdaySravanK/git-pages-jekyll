// Filename: base.model.js
// The base model to be extended by all model classes
define([
  'backbone',
  'global'
], function (Backbone) {
  // Defining the base model to be used across
  // All common model related features go here
  var Model = Backbone.Model.extend({

    constructor: function Model() {
      Backbone.Model.prototype.constructor.apply(this, arguments);
    },

    // Returns a deep copy of the model object
    getCopy: function (id) {
      var value = this.get(id);
      return $.extend(true, {}, value);
    },

    refresh: function () {
      this.trigger('refresh');
    },

    cleanup: function () {
      this.clear();
    }
  });

  return Model;
});
