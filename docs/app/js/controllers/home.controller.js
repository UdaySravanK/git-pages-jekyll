/**
 * Created by UdaySravanK on 2/28/16.
 */
define([
    'underscore',
    'backbone',
    'js/controllers/common/base.controller'
], function (_, Backbone, BaseController) {
    var HomeController = BaseController.extend({
        /**
         * Description
         * @method constructor
         * @return
         */
        constructor: function HomeController() {
            BaseController.prototype.constructor.apply(this, arguments);
        },

        /**
         * Description
         * This Method will instantiate the header and the footer views
         * @method process
         * @return
         */
        process: function () {

        }
    }).mixin();

    return HomeController;
});
