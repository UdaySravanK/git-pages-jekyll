/**
 * Created by UdaySravanK on 4/4/16.
 */
define([
    'jquery',
    'backbone',
    'js/models/common/base.model'
], function ($, Backbone, BaseModel) {
    var FooterModel = BaseModel.extend({
        defaults: {
            welcomeText: 'Hey there!!'
        },
        tplData: {
            title: 'FooterView'
        },
        initialize: function () {
        }
    });

    return FooterModel;
});