(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services.actions.pageActions", [])

    .factory("madeasy.actions.pageActions", pageActions);
    pageActions.$inject = ["$log", "madeasy.actions.hasAction", "$injector"];
    function pageActions ($log, hasAction, $injector) {
        return {
            canView: function canViewFunction (fromParams, toParams) {

                if (_.has(toParams, "data")) {
                    var actions = toParams.data.actions;

                    if (!hasAction.hasActions(actions)) {
                        return false;
                    }
                }
                return true;
            },
            checkFailed: function checkFailedFunction () {
                var $state = $injector.get("$state");
                $state.go("auth_403");
            }
        };
    }
})(angular);
