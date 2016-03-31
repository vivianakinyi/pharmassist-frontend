(function library (angular) {
    "use strict";

    angular.module("madeasy.actions", [
        "madeasy.auth.services.actions.actionChecker",
        "madeasy.auth.services.actions.hasAction",
        "madeasy.auth.services.actions.pageActions",
        "madeasy.auth.services.actions.pageChecker",
        "madeasy.auth.directives.madeasyAppActions"
    ]);
})(angular);
