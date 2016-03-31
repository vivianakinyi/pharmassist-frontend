(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.states", [])

    .config(["$stateProvider", function stateProviderFunction ($stateProvider) {
        $stateProvider
            .state("auth_base", {
                data: {
                    requireUser: false
                },
                views:{
                    "main":{
                        templateUrl: "auth/tpls/auth_base.tpl.html"
                    }
                }
            })
            .state("auth_login", {
                data: {
                    requireUser: false
                },
                parent: "auth_base",
                url: "/login/?reset_password&" +
                    "reset_password_confirm&change_pwd&timeout",
                views:{
                    "form":{
                        controller: "madeasy.auth.controllers.loginAuth",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            })
            .state("auth_logout", {
                data: {
                    requireUser: false,
                    showErrorPage: false
                },
                parent: "auth_base",
                url: "/logout/?timeout&change_pwd",
                views:{
                    "form":{
                        controller: "madeasy.auth.controllers.logoutAuth",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            }).state("auth_reset", {
                data: {
                    requireUser: false
                },
                parent: "auth_base",
                url: "/password/reset",
                views:{
                    "form":{
                        controller: "madeasy.auth.controllers.passwordReset",
                        templateUrl: "auth/tpls/reset_email.tpl.html"
                    }
                }
            }).state("auth_reset_confirm", {
                data: {
                    requireUser: false
                },
                parent: "auth_base",
                url: "/password/reset/confirm/:uid/:token",
                views:{
                    "form":{
                        controller: "madeasy.auth.controllers.passwordResetConfirm",
                        templateUrl: "auth/tpls/reset_confirm.tpl.html"
                    }
                }
            }).state("auth_change_pwd", {
                data: {
                    showErrorPage: false
                },
                parent: "auth_base",
                url: "/auth/change/password/",
                views:{
                    "form":{
                        controller: "madeasy.common.controllers.changePassword",
                        templateUrl: "auth/tpls/change_password.tpl.html"
                    }
                }
            });
    }]);

})(angular);
