(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.userDetails", [
        "pharmassistApp.config",
        "madeasy.auth.services"
    ])

    .controller("madeasy.auth.controllers.userDetails", userDetails);
    userDetails.$inject = ["$state","madeasy.auth.services.login", "$rootScope"];
    function userDetails ($state, loginService, $rootScope) {
        // jshint validthis: true
        var vm = this;
        var currUser = loginService.getUser();

        vm.displayName = currUser.first_name + " " + currUser.last_name;

        vm.logout = function logoutFunction () {
            $state.go("auth_logout");
        };

        $rootScope.$on("http.auth.forbidden", function forbiddenFunction () {
            $state.go("auth_403");
        });

        $rootScope.$on("IdleTimeout", function timeoutFunction () {
            if (loginService.isLoggedIn() ||
                $state.current.name !== "auth_login") {
                loginService.dumpState($state.current, $state.params);
                $state.go("auth_logout", {"timeout": "true"});
            }
        });
    }
})(angular);
