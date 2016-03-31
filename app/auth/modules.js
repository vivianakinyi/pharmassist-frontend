(function library (angular) {
    "use strict";

    angular.module("madeasy.auth", [
        "madeasy.auth.controllers",
        "madeasy.auth.states",
        "madeasy.auth.oauth2",
        "madeasy.auth.services",
        "madeasy.exceptions",
        "madeasy.resources.auth",
        "madeasy.auth.formly"
    ]);
})(angular);
