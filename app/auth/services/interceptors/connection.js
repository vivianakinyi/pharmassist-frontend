(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.services.interceptors.connection", [])

    .factory("madeasy.networking.interceptors.connection", connection);
    connection.$inject = ["$q", "$rootScope"];
    function connection ($q, $rootScope) {
        var connection_down = false;

        return {
            "response": function responseFunction (response) {
                if (connection_down) {
                    $rootScope.$broadcast("http.connection.resumed");
                    connection_down = false;
                }
                return response;
            },
            "responseError": function responseErrorFunction (rejection) {
                if (_.isEmpty(rejection.data) && rejection.status ===
                    0 && _.isEmpty(rejection.statusText)) {
                    // Broadcast only once
                    if (!connection_down) {
                        $rootScope.$broadcast("http.connection.fail");
                        connection_down = true;
                    }
                }
                return $q.reject(rejection);
            }
        };
    }
})(angular);
