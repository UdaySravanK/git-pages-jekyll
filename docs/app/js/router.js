/**
 * Created by UdaySravanK on 2/28/16.
 */
define(['backbone','lazyLoader'], function (Backbone, Lazyloader) {
    var Router = Backbone.Router.extend({

        currentController: null,
        constructor: function Router() {
            Backbone.Router.prototype.constructor.apply(this, arguments);
        },
        routes: {
            '': 'home',
            'about':'about'
        },
        initialize: function () {
            //var domainUrl = window.location.origin;
            //var basepath = domainUrl.replace(window.location.protocol + "//" + window.location.host + "/", "");
            //this.route(basepath + "/public/index.html", "home");

            //this.on('route:defaultAction', this.home);
            //this.on('route:about', this.about);
        },
        home: function() {
            Lazyloader.loadController([this.controllerMap.home], this, 'home', this.currentController);
        },
        about: function() {
            Lazyloader.loadController([this.controllerMap.about], this, 'about', this.currentController);
        },
        controllerMap: {
            home: "js/controllers/home.controller",
            about: "js/controllers/about.controller"
        },
        initController: function (controller, context) {
            // reset header
            if (controller != undefined) {
                if (this.currentController) {
                    this.currentController.stopListening();
                    delete this.currentController;
                }
                this.currentController = controller;

                if (_.isEmpty(this.routeData)) {
                    controller.setPageMetaData(context);
                } else {
                    controller.setPageMetaData(context, _.extend({}, this.routeData));
                    this.routeData = {};
                }

                controller.Shell.setMasterHTML(controller.pageMetaData.page_grid);
                this.listenTo(controller, "navigate", this.navigateInitiate);
                controller.lazLdResource(controller.Shell, controller);

                // Always hide modals
                $('body').removeClass('has-backdrop has-backdrop-fixed');
            }
        }
    });
    return Router;
});
