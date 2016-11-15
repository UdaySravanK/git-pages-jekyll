/**
 * Created by UdaySravanK on 4/4/16.
 */
define([
    'jquery',
    'backbone',
    'js/models/common/base.model'
], function ($, Backbone, BaseModel) {
    var HeaderModel = BaseModel.extend({
        defaults: {
            welcomeText: 'Hey there!!'
        },
        tplData: {
            title: 'HeaderView'
        },
        initialize: function () {
        }
    });

    return HeaderModel;
});