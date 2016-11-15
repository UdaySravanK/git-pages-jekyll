/**
 * Created by UdaySravanK on 2/28/16.
 */
// Filename: views/phone/common/Page.js
// Encapsulates a tgt_mob Page
// Common functionalities such as showing error message
// linking with the respective browser etc
/* global domain, domainUrl, formFactor, img_domain, secure_domain, Tgt_Auth */
define([
    'jquery',
    'underscore',
    'backbone',
    'baseView',
    'router',
    'mixin'

], function ($, _, Backbone, BaseView, Router) {
    // Default Composite View Model to be used across the screens
    var page = BaseView.extend({
        controller: {},
        tmplAttr: '',
        tmplString: '',
        compiledTemplate: {},
        ID: 0,
        currentViewValidationSelector: '',
        selfServeMode: false,

        constructor: function Page() {
            BaseView.prototype.constructor.apply(this, arguments);
        },

        /**
         * creates instance of the view
         *
         * @param {Object} viewClass reference of the sub-view class to be instantiated.
         * @param {String} selector jquery selector string. will be used to attached instantiated.
         * @param {String} name key to identify the sub-view
         * @param {Object} options
         * @param {function} [options.onVieweLoad] callback fired after sub-view instantiation
         * @param {Object} [options.viewOptions] sub-view constructor parameter (similar to Backbone.View options)
         * @param {Boolean} [options.append] if true sub-view will be appended to element based on the selector string
         * @method addRuntimeView
         * @return view instance if created
         */
        addRuntimeView: function (viewClass, selector, name, options) {
            var views = this.getSubViews();
            var $elm = $(selector);
            var viewOptions;
            var view;

            views = this.getSubViews();
            options = options || {};
            viewOptions = options.viewOptions || {};
            name = name || _.uniqueId('view');
            view = views[name];
            $elm = $(selector);

            if (!($elm.length)) {
                throw new Error('Can\'t find DOM element to attache the view');
            }

            if (!!!view) {
                view = new viewClass(viewOptions);
                $(view.el).attr('data-name', name);
                this.addSubView(name, view);
                view.renderSubviewSpecifically();
            } else {
                view.rerenderSubViewIfNeeded(view, this, name, name);
            }

            if (options.append) {
                $elm.append(view.el);
            } else {
                $elm.html(view.el);
            }

            if (_.isFunction(options.onViewLoad)) {
                options.onViewLoad(view, viewOptions, name);
            }

            return view;
        },

        /**
         * Gets the subViews objects.
         * @method getSubViews
         */
        getSubViews: function () {
            this.subViews = this.subViews || {};

            return _.result(this, 'subViews');
        },

        setMasterHTML: function (newPageDefinition) {
            var master = $('#viewport');
            var newPageDef = $(newPageDefinition);

            newPageDef = $(newPageDef).filter('[data-child != "true"]');

            if (master[0].childNodes.length > 1) {
                this.mergePageDefinition(master, newPageDef);
            }

            // @Todo: This HardCoded Classes has to be removed, once its retrieved from JSP of Page Meta Data.
            $('#viewport #main_body').addClass('main-content');
        },
        initialize: function (options) {
            page.__super__.initialize.call(this, options);

            try {
                this.initializeView();
            } catch (e) {
            }

            return this;
        },

        extendEvents: function (extendedEvents) {
            _.extend(this.events, extendedEvents);
            this.delegateEvents();
        },

        resetFooterPageLoader: function () {
            $('#GlobalLoader').hide();
        },

        goTo: function (pageName, isSwap) {
            var currentUrl = domainUrl;
            var url;

            if (isSwap) {
                if (window.location.protocol === 'http:') {
                    currentUrl = secure_domain;
                } else {
                    currentUrl = domain;
                }

                window.location.assign(currentUrl + ((pageName.charAt(0) !== '/') ? '/' : '') + pageName);
                return;
            }

            currentUrl = currentUrl.replace('/mobile/', '').replace('/mobile', '');
            url = currentUrl.replace(window.location.protocol + '//' + window.location.host, '');

            Backbone.history.navigate(url.slice(0, url.lastIndexOf('/')) +
                ((pageName.charAt(0) !== '/') ? '/' : '') + pageName, {
                trigger: true,
                replace: false
            });
        },

        tpl: function (tplObj, tplFile, tplVars) {
            var tplData = this.getTpl(tplFile);
            var compiledTpl = _.tpl(tplObj, tplData, tplVars);

            return compiledTpl;
        },

        subTpl: function (tplObj, tplFile, tplVars) {
            var tplData = this.getTpl(tplFile);

            _.subTpl(tplObj, tplData, tplVars);
        },

        addAsSubTpl: function (tplObj, compiledTpl) {
            _.addToTplBuffer(tplObj, compiledTpl);
        },

        mergeTpl: function (tplObj, tplFile, tplVars) {
            var tplData = this.getTpl(tplFile);
            var mergeTplVars = tplVars;
            var mergedTpl = _.mergeTpl(tplObj, tplData, mergeTplVars);

            return mergedTpl;
        },

        stop: function (e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
        },

        stopAll: function (e) {
            if (e && e.stopPropagation) {
                this.stop(e);
                e.stopPropagation();
            }
        },

        loadEl: function (id) {
            var queryString = '#' + id;

            this.$el = $(queryString);

            return this;
        },

        show: function () {
            // TODO arguments configurabiility has to be checked
            View.prototype.show.apply(this, arguments);
        },

        dispose: function () {
            if (typeof this.onDispose === 'function') {
                this.onDispose();
            }

            this.remove();
        },

        getPageDefn: function () {
            var pageDefn = undefined;

            if ($('#selfserver').attr('data-definition')) {
                pageDefn = JSON.parse($('#selfserver').attr('data-definition'));
                this.selfServeMode = true;
            }

            return pageDefn;
        },

        mergePageDefinition: function (master, newPageDef) {
            var currentNode = '#pageStart';
            var oldLength = master[0].childNodes.length;
            var newLength = newPageDef.length;
            var currentNodeIndex = 0;
            var i = 0;
            var j = 0;
            var add;

            for (j; j < newLength; j++) {
                add = true;

                for (i = currentNodeIndex; i < oldLength; i++) {
                    if (master[0].childNodes[i].nodeType !== 3) {
                        if (newPageDef[j].getAttribute('data-name') === master[0].childNodes[i].getAttribute('data-Name')) {
                            add = false;
                            currentNode = '#' + newPageDef[j].id;
                            break;
                        }
                    }
                }

                if (add) {
                    $(newPageDef[j]).insertAfter(currentNode);
                    currentNode = '#' + newPageDef[j].id;
                }
            }
        }
    });

    return page;
});
