(function library (angular) {
    "use strict";

    angular.module("madeasy.authorization", [
        "madeasy.auth.services.authorization.loggedin",
        "madeasy.auth.services.authorization.hasPerm",
        "madeasy.auth.services.authorization.actionChecker"
    ]);
})(angular);
