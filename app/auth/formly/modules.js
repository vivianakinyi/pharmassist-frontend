(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.formly", [
        "madeasy.auth.formly.login",
        "madeasy.auth.formly.reset_email",
        "madeasy.auth.formly.reset_confirm"
    ]);
})(angular);
