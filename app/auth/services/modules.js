(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services", [
       "madeasy.auth.loginService",
       "madeasy.auth.homePageService",
       "madeasy.actions",
       "madeasy.authentication",
       "madeasy.authorization",
       "madeasy.networking.interceptors"
    ]);
})(angular);
