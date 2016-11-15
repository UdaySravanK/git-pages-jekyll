/**
 * Created by UdaySravanK on 4/4/16.
 */
define([
    'jquery',
    'backbone',
    'js/models/common/base.model'
], function ($, Backbone, BaseModel) {
    var NavModel = BaseModel.extend({
        defaults: {
            welcomeText: 'Hey there!!'
        },
        tplData: {
            title: 'NavView'
        },
        initialize: function () {
        }
    });

    return NavModel;
});