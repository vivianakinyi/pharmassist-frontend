(function library (angular, _) {
    "use strict";

    angular.module("madeasy.auth.services.actions.hasAction", [
        "madeasy.exceptions"
    ])

    .constant("APP_ACTION_CHECKERS", "ACTIONS.CHECKERS")

    .factory("madeasy.actions.hasAction", hasAction);
    hasAction.$inject = ["$injector", "$log", "APP_ACTION_CHECKERS",
    "madeasy.exceptions.Errors"];
    function hasAction ($injector, $log, APP_ACTION_CHECKERS, errs) {
        var has_checkers = $injector.has(APP_ACTION_CHECKERS);
        var checkers = [];
        var checkers_value = has_checkers ?
            $injector.get(APP_ACTION_CHECKERS) : null;

        if (has_checkers) {
            // Assert we have an array
            if (!angular.isArray(checkers_value)) {
                var err = errs.createError("madeasy.actions",
                    errs.ImproperlyConfigured);
                throw err("hasAction", APP_ACTION_CHECKERS +
                    " should be an array");
            }

            // Load action checkers
            checkers_value.forEach(function actionCheckersFunction (checker) {
                checkers.push($injector.get(checker));
            });
        }

        return {
            hasActions: function hasActionsFunction (actions) {
                var AND = ":";
                var OR = ";";

                if (!_.isString(actions) || _.isEmpty(actions)) {
                    // Coz of things like the madeasy-app-actions directive
                    return true;
                }

                // Check if action checkers have been set
                if (!has_checkers) {
                    // If none are restricted, all are allowed
                    return true;
                }

                var useOr = false;
                var listActions = [actions];

                if (actions.indexOf(AND) !== -1 &&
                        actions.indexOf(OR) !== -1) {

                    throw new
                        Error("You can only use one type of action splitter");

                }

                if (actions.indexOf(AND) !== -1) {
                    listActions = actions.split(AND);
                }

                if (actions.indexOf(OR) !== -1) {
                    listActions = actions.split(OR);
                    useOr = true;
                }

                for (var i = 0; i < listActions.length; i++) {
                    var acts = listActions[i].toUpperCase();
                    var res = true;

                    for (var j = 0; j < checkers.length; j++) {
                        if (!checkers[j].canPerform(acts) && res) {
                            res = false;
                            break;
                        }
                    }

                    if (res && useOr) {
                        return true;
                    }

                    if (!(res || useOr)) {
                        return false;
                    }

                }
                return useOr ? false : true;
            }
        };
    }
})(angular, _);
