(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services.authorization.loggedin", [
        "madeasy.authentication",
        "madeasy.auth.services"
    ])

    .factory("madeayauthorization.loggedin", loggedin);
    loggedin.$inject = ["madeay.auth.services.login"];
    function loggedin (authConfig) {

        return {
            hasPermissions : function hasPermissionsFunction () {
                return authConfig.isLoggedIn();
            }
        };
    }
})(angular);
