(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services.authentication.pageUserRequired", [
        "ui.router",
        "madeasy.auth.services"
    ])

    .factory("madeasy.authentication.pageUserRequired", pageUserRequired);
    pageUserRequired.$inject = ["$log", "$injector", "madeasy.auth.services.login"];
    function pageUserRequired ($log, $injector, authConfig) {
        return {
            canView: function canViewFunction (fromParams, toParams) {

                if (_.has(toParams, "data")) {
                    var notRequireUser = toParams.data.requireUser === false;
                    var isLoggedIn = authConfig.isLoggedIn();

                    if (!notRequireUser && !isLoggedIn) {
                        return false;
                    }
                }
                return true;
            },
            checkFailed: function checkFailedFunction (toState, toParams) {
                var $state = $injector.get("$state");
                authConfig.dumpState(toState, toParams);
                $state.go("auth_login");
            }
        };
    }
})(angular);
