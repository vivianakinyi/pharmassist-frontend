(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services.interceptors.httpactivity", [])

    .factory("madeasy.networking.interceptors.httpactivity", httpactivity);
    httpactivity.$inject = ["$q", "$rootScope"];
    function httpactivity ($q, $rootScope) {
        var active_http_actions = 0;
        return {
            "request" : function requestFunction (config) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions + 1 : 1;
                if (active_http_actions === 1) {
                    $rootScope.$broadcast("http.active");
                }
                return config;
            },
            "requestError": function requestErrorFunction (config) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions - 1 : 0;
                if (active_http_actions === 0) {
                    $rootScope.$broadcast("http.inactive");
                }
                return config;
            },
            "response": function responseFunction (response) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions - 1 : 0;
                if (active_http_actions === 0) {
                    $rootScope.$broadcast("http.inactive");
                }
                return response;
            },
            "responseError": function responseErrorFunction (rejection) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions - 1 : 0;
                if (active_http_actions === 0) {
                    $rootScope.$broadcast("http.inactive");
                }
                return $q.reject(rejection);
            }
        };
    }
})(angular);
