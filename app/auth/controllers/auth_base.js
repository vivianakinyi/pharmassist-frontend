(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.authBase", [])
    .controller("madeasy.auth.controllers.authBase", authBase);
    authBase.$inject = ["$state"];
    function authBase ($state) {
        // jshint validthis:true
        var vm = this;
        vm.year = new Date().getFullYear();
        vm.params = $state.params;
    }
})(angular);
