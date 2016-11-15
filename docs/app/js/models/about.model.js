/**
 * Created by UdaySravanK on 4/5/16.
 */

define([
    'jquery',
    'backbone',
    'js/models/common/base.model'
], function ($, Backbone, BaseModel) {
    var AboutModel = BaseModel.extend({
        defaults: {
            welcomeText: 'Hey there!!'
        },
        tplData: {
            title: 'AboutView'
        },
        initialize: function () {
        }
    });

    return AboutModel;
});