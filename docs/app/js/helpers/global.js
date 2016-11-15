/**
 * Created by UdaySravanK on 3/29/16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mixin'
], function ($, _, Backbone, mixin) {
    var Global = {
        configJSON : {},
        isSecure : (window.location.protocol !== "http:"),
        getTimeStamp : function() {
            return new Date();
        },
        getRandomNumber : function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        isMobile : function() {
            mobile = ["Android", "webOS", "iPhone", "iPod", "BlackBerry", "Windows Phone", "Opera Mini", "IEMobile"];
            for (var i = 0; i <= mobile.length - 1; i++) {
                var mobilex = navigator.userAgent.indexOf(mobile[i]);
                if (mobilex != -1) {
                    return true;
                    break;
                }
            }
            return false;
        },
        isPad : function() {
            pad = ["iPad"];
            for (var i = 0; i <= pad.length - 1; i++) {
                var mobilex = navigator.userAgent.indexOf(pad[i]);
                if (mobilex != -1) {
                    return true;
                    break;
                }
            }
            return false;
        },
        isDesktop : function() {
            return !navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|NokiaBrowser|Silk|mobile|tablet/i);
        }
    };


    if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
        window.onpageshow = function(evt) {
            // If persisted then it is in the page cache, force a reload of the page.
            if (evt.persisted) {
                window.location.reload();
            }
        };
    }
});