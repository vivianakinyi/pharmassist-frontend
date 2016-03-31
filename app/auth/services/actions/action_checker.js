(function library (angular, _) {
    "use strict";

    angular.module("madeasy.auth.services.actions.actionChecker", [
        "madeasy.exceptions"
    ])

    .constant("APP_ACTION_RESTRICT", "ACTIONS.RESTRICT")

    .factory("madeasy.actions.actionChecker", actionChecker);
    actionChecker.$inject = ["$injector","$log", "APP_ACTION_RESTRICT",
    "madeasy.exceptions.Errors"];
    function actionChecker ($injector, $log, APP_ACTION_RESTRICT, errs) {
        var has_restrictions = $injector.has(APP_ACTION_RESTRICT);
        var restrictions = [];
        var restrictions_value = has_restrictions ?
            $injector.get(APP_ACTION_RESTRICT) : null;
        if (has_restrictions) {
            // Assert we have an array
            if (!angular.isArray(restrictions_value)) {
                var err = errs.createError("madeasy.actions",
                    errs.ImproperlyConfigured);
                throw err("actionChecker", APP_ACTION_RESTRICT +
                    " should be an array");
            }
            // Load restrictions
            restrictions_value.forEach(function restrictionsFunction (rest) {
                restrictions.push(rest.toUpperCase());
            });
        }

        return {
            canPerform: function canPerformFunction (actions) {
                if (!has_restrictions) {
                    return true;
                }
                return !_.contains(restrictions, actions.toUpperCase());
            }
        };
    }
})(angular, _);
