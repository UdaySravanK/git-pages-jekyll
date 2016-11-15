/**
 * Created by UdaySravanK on 2/28/16.
 */
define(["lazyRequire"], function (LazyRequire) {
    var requireOnce = LazyRequire.once();
    var LazyLoader = {
        loadPages: function (pageNameArray, inPageShell, inController, callback) {
            var self = this;
            try {
                var pageNameArr = Object.keys(pageNameArray);
                var loadedPage = [];
                objLength = 0;
                totLength = Object.keys(pageNameArray).length;
                _.each(pageNameArray, function (key, value) {
                    requireOnce([value], function (a) {
                        loadedPage.push(value);
                        inController.renderLoadedSubViews(a, inPageShell, key, value);
                        callback.call(inController, key, value);
                        objLength++;


                        var isAllPagesLoaded = pageNameArr.every(function (val) {
                            return loadedPage.indexOf(val) >= 0;
                        });

                        if (isAllPagesLoaded) { //(objLength == totLength) {
                            inController.process();
                            inController.isRendered = true;
                            inController.Shell.clearNotNeededPages(inController.pageMetaData.SubViews);
                        }
                    });
                });
                inPageShell.renderView();
            } catch (err) {
            }
        },
        /* Loads the controller based on the router to intialize the page
         dep: controller to be lazy loaded, router initialize will called
         after controller load */
        loadController: function (controller, router, action, currentController, path) {
            try {
                path = path || "";
                requireOnce(controller, function (a) {
                    $("#page-meta").ready(function ($) {
                        page_name = _.invert(router.controllerMap)[controller];
                        if (currentController instanceof a) {
                            currentController.cname = controller[0] + path;
                            router.initController(currentController, action);
                        } else {
                            router.initController(new a(controller[0] + path), action);
                        }
                    });
                });
            } catch (err) {
            }
        }
    }
    return LazyLoader;
});
