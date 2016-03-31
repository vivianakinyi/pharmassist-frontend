(function library (angular) {
    "use strict";

    /**
     * Inspired by angular's minErr
     */
    function createError (module, err_name) {
        var name = err_name || "Error";
        var creator = function creatorFunction (code, message) {
            var prefix = "[" + (module ? module + ":" : "") + code + "] ";
            var msg = prefix + name + " : " + message;
            return new Error(msg);
        };
        return creator;
    }

    angular.module("madeasy.exceptions", [])
    .provider("madeasy.exceptions.Errors", [function exceptionErrorFunction () {
        this.$get = [function getErrorFunction ( ) {
            return {
                "ImproperlyConfigured": "ImproperlyConfigured",
                "createError": createError
            };
        }];
    }]);
})(angular);
