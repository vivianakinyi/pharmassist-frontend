(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services.interceptors.http", [])

    .factory("madeasy.networking.interceptors.http", http);
    http.$inject = ["$q", "$rootScope"];
    function http ($q, $rootScope) {
        var error_happend = false;
        return {
            "response": function responseFunction (response) {
                if (error_happend) {
                    error_happend = false;
                    $rootScope.$broadcast("http.error.resolved");
                }
                return response;
            },
            "responseError": function responseErrorFunction (rejection) {
                if (rejection.status === 403) {
                    error_happend = true;
                    $rootScope.$broadcast("http.auth.forbidden");
                } else if (rejection.status === 401) {
                    error_happend = true;
                    $rootScope.$broadcast("http.auth.unauthorized");
                } else if (rejection.status >= 500) {
                    error_happend = true;
                    $rootScope.$broadcast("http.server.error");
                }
                return $q.reject(rejection);
            }
        };
    }
})(angular);
