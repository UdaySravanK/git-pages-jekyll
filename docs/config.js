require.config({
    paths: {
        app: '../app',
        jquery: 'libs/jQuery/jquery-1.12.2.min',
        backbone: 'libs/backbone-min-1.2.3',
        backboneAdvice: 'libs/advice',
        underscore: 'libs/underscore-min',
        lazyRequire: 'js/helpers/lazy.require',
        lazyLoader: 'js/helpers/lazy.loader',
        baseView: 'js/views/common/base.view',
        toolbox: 'js/helpers/toolbox',
        mixin: 'js/helpers/underscore.mixin',
        page: 'js/views/common/page',
        global: 'js/helpers/global',
        router: 'js/router',
        text: 'libs/text',
        bsdrawer: 'libs/bootstrap-drawer-1.0.5/js/drawer.min',
        bootstrap: 'libs/bootstrap-3.3.6-dist/js/bootstrap.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'mixin': {
            deps: ['underscore'],
            exports: '_mixin'
        },
        'toolbox': {
            deps: ['underscore'],
            exports: 'Toolbox'
        },
        'global': {
            exports: 'Global'
        },
        'bsdrawer': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
require.config({
    baseUrl: 'app'
});

require(['app'],function(App) {
    App.initialize();
});