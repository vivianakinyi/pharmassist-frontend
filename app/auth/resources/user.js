(function library (angular) {
    "use strict";

    angular.module("madeasy.resources.auth.user", [
        "madeasy.resources.common.jsDataUtils",
        "madeasy.resources.common.deserialize_drf"
    ])

    .constant("USER_END_POINT", "/api/auth/users/")

    .service("madeasy.resource.user", user);
    user.$inject = ["DS", "USER_END_POINT"];
    function user (DS, endPoint) {

        return DS.defineResource({
            endpoint: endPoint,
            isSystmadeasyesource: false,
            name: "user"
        });
    }
})(angular);
