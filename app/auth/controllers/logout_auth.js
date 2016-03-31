(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.logoutAuth", [
        "pharmassistApp.config",
        "madeasy.auth.services"
    ])
    .controller("madeasy.auth.controllers.logoutAuth", logoutAuth);
    logoutAuth.$inject = ["$scope", "$state", "$stateParams",
    "madeasy.auth.services.login"];
    function logoutAuth ($scope, $state, $stateParams, loginService) {
        $scope.logout = true;

        var callback = function callbackFunction () {
            $state.go("auth_login", {
                "change_pwd": $stateParams.change_pwd
                // "timeout": $stateParams.timeout
            });
        };
        return loginService.logout().then(callback, callback);
    }
})(angular);
