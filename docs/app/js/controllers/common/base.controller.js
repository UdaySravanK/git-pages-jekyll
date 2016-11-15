/**
 * Created by UdaySravanK on 2/28/16.
 */
define(["underscore", "backbone", "toolbox", "lazyLoader", "js/views/common/home.shell", "jquery", "backboneAdvice", "mixin"],
    function(_, Backbone, Toolbox, LazyLoader, Shell, $, backboneAdvice) {

        var BaseController = Toolbox.Base.extend({
            context: null,
            pageMetaData: {},
            localCache: {},
            pageGridDef: null,

            constructor: function(name) {
                this.cname = name;
            },

            Shell: new Shell({
                vid: ""
            }),

            parseQueryString: function(queryString) {
                var params = {};
                if (queryString) {
                    _.each(
                        _.map(decodeURI(queryString).split(/&/g), function(el, i) {
                            var aux = el.split('='),
                                o = {};
                            if (aux.length >= 1) {
                                var val = undefined;
                                if (aux.length == 2)
                                    val = aux[1];
                                o[aux[0]] = val;
                            }
                            return o;
                        }),
                        function(o) {
                            _.extend(params, o);
                        }
                    );
                }
                return params;
            },
            /**
             * load or handle taxo content.
             * @method lazLdResource
             * @param inPageShell
             * @param inController
             */
            lazLdResource: function(inPageShell, inController) {
                var self = this;
                self.initiatePageLoad(inPageShell, inController);
            },
            /**
             * load view files from page-grid.
             *
             * @method initiatePageLoad
             * @param inPageShell
             * @param inController
             *
             */
            initiatePageLoad: function(inPageShell, inController) {
                var self = this;
                self.setPageTitle();
                var gridCount = 0;
                LazyLoader.loadPages(this.pageMetaData.SubViews, inPageShell, inController, function(key, value) {
                    var $currentViewEl = $(this.pageMetaData.page_grid).filter('#' + key);
                    var parent = $currentViewEl.data("parent");
                    if (parent && self.Shell.subViews[value] && self.Shell.subViews[parent]) {
                        self.Shell.subViews[value].parent = self.Shell.subViews[parent]
                    }
                    gridCount++;
                    if (gridCount === _.size(self.pageMetaData.SubViews)) {
                        self.pageGridDef.resolve(1);
                    }
                });
            },
            //this is used for rendering the subviews if they are not present in list of sub views
            renderLoadedSubViews: function(a, inPageShell, key, value) {
                var tempView = null;
                var subViewKey = value.replace("/" + this.formFactor, "");

                if (!(inPageShell.subViews[subViewKey])) {
                    tempView = inPageShell.addSubView(subViewKey, ((new a({
                        vid: value
                    })).loadEl(key)));
                    this.listenToEvent(tempView, key);
                    tempView.renderSubviewSpecifically();
                    if ($("#header").next().attr("id") == "nav" && $("#footer").prev().attr("id") == "nav" && window.location.protocol == "http:") {
                        $("#GlobalLoader").show();
                    }
                } else {
                    //key =
                    this.listenToEvent(this.Shell.subViews[subViewKey], key);
                    this.rerenderSubViewIfNeeded(a, inPageShell, key, subViewKey);
                }
            },

            //this method is called when view is rendered and if we want to rerender or if we want to do any thing specific we can override here
            //template - gives template of the view, inPageShell - returns shell
            //key - gives template name , value - gives template definition
            rerenderSubViewIfNeeded: function(template, inPageShell, key, value) {},

            setPageMetaData: function(inContext) {
                var self = this;
                self.pageGridDef = $.Deferred();
                this.pageMetaData = JSON.parse($('#page-meta').html()).grids[inContext];
                this.listenGlobalEvents();
                this.pageMetaData.SubViews = this.loadSubViews(this.pageMetaData.page_grid);
            },
            /**
             * Load the subviews from the page grid
             * @method loadSubViews
             * @param pageGrid
             * @return subViews
             */
            loadSubViews: function(pageGrid) {
                var subviews = {};
                var self = this;
                var html = $.parseHTML(pageGrid);
                $.each(html, function(index, val) {
                    var obj = {};
                    obj[$(val).attr("data-name")] = val.id;
                    _.extend(subviews, obj);
                });
                return subviews;
            },


            getPageMetaDataAttributes: function(dataAttribute) {
                var attribute = (dataAttribute != undefined) ? dataAttribute : 0;
                var returnAttributes = {};

                // Check If Attribute is Not Null.
                if (attribute) {

                    // Check If Given Attribute is Exist in Page Meta Data.
                    if (this.pageMetaData[attribute]) {

                        // Check If Given Attribute has attribute Property.
                        if (this.pageMetaData[attribute].attribute) {
                            var attributesObject = this.pageMetaData[attribute].attribute;

                            // Iterating the Attribute Object.
                            for (property in attributesObject) {
                                returnAttributes[attributesObject[property].name] = attributesObject[property].value;
                            }

                            return returnAttributes;
                        }
                    }
                }
            },
            listenGlobalEvents: function() {

                window.onresize = function() {
                    Backbone.Events.trigger('window:resize');
                };
            },

            listenToEvent: function(view, viewName) {},

            setPageTitle: function() {
                $("title").text("USK's blog");
            }
        });

        backboneAdvice.addMixin(BaseController);
        _.extend(BaseController.prototype, Backbone.Events);
        return BaseController;
    });
