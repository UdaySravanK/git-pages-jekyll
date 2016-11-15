/**
 * Created by UdaySravanK on 3/29/16.
 */
define([
    'jquery',
    'backbone',
    'js/models/common/base.model'
], function ($, Backbone, BaseModel) {
    var HomeModel = BaseModel.extend({
        defaults: {
            welcomeText: 'Hey there!!'
        },
        tplData: {
            title: 'HomeView'
        },
        initialize: function () {
        }
    });

    return HomeModel;
});