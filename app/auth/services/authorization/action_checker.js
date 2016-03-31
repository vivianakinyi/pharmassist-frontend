(function library (angular, _) {
    "use strict";

    angular.module("madeasy.auth.services.authorization.actionChecker", [
        "madeasy.exceptions",
        "madeasy.authentication",
        "madeasy.auth.services"
    ])

    .factory("madeasy.authorization.actionChecker", actionChecker);
    actionChecker. $inject = ["$injector", "$log", "madeasy.authorization.hasPerm",
    "madeasy.exceptions.Errors"];
    function actionChecker ($injector, $log, hasPerm, errs) {

        return {
            canPerform : function canPerformFunction (action) {
                var inject_val = action.toUpperCase();

                if (!$injector.has(inject_val)) {
                    throw errs.createError("madeasy.authorization",
                        errs.ImproperlyConfigured)
                    ("actionChecker.badaction", "no action like : '" +
                        action + "'");
                }

                var act = $injector.get(inject_val);

                if (_.isUndefined(act.action)) {
                    return true;
                }
                if (!angular.isString(act.action) || _.isEmpty(act.action)) {
                    throw errs.createError("madeasy.authorization",
                        errs.ImproperlyConfigured)
                    ("actionChecker.badperm",
                        "Action permission: '" + action +
                        "' should be a non-empty string"
                    );
                }
                return hasPerm.hasPermissions([{"name": act.action}]);
            }
        };
    }
})(angular, _);
