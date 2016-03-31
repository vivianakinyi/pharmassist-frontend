(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.controllers", [
        "madeasy.auth.authBase",
        "madeasy.auth.loginAuth",
        "madeasy.auth.logoutAuth",
        "madeasy.auth.passwordReset",
        "madeasy.auth.passwordResetConfirm",
        "madeasy.auth.userDetails"
    ]);
})(angular);
