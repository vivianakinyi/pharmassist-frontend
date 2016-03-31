(function library (angular) {
    "use strict";

    angular.module("madeasy.networking.interceptors", [
        "madeasy.auth.services.interceptors.httpactivity",
        "madeasy.auth.services.interceptors.http",
        "madeasy.auth.services.interceptors.connection"
    ]);
})(angular);
