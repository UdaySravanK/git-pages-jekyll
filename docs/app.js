/**
 * Created by UdaySravanK on 2/28/16.
 */
define(['router','bsdrawer','bootstrap','global'], function (Router) {
    var App = {
        initialize: function () {

            this.mainRouter = new Router();
            Backbone.history.start();
            // override backbone _updateHash method to avoid security risk with empty function
            Backbone.history._updateHash = function () {
                return true;
            };
        }
    };
    return App;
});