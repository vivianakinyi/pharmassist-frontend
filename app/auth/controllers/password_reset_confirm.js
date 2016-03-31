(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.passwordResetConfirm", [
        "pharmassistApp.config",
        "madeasy.auth.services",
        "madeasy.auth.formly.reset_confirm"
    ])

    .controller("madeasy.auth.controllers.passwordResetConfirm",
        passwordResetConfirm);
    passwordResetConfirm.$inject = ["$scope", "madeasy.auth.formly.reset_confirm",
    "madeasy.auth.services.login", "$state", "toastr"];
    function passwordResetConfirm ($scope, formlyService, loginService, $state,
        auth_error) {

        $scope.fields = formlyService.getFields();

        $scope.submitPassword = function submitPasswordFunction () {
            var error_fxn = function errorFunction (data) {
                $scope.alert = auth_error.error(data, "Error");
            };

            var success_fxn = function successFunction () {
                $state.go("auth_login", {reset_password_confirm: true});
            };

            if ($scope.passwordForm.$valid) {
                var obj = {
                    "new_password1":
                        $scope.passwordModel.new_password1,
                    "new_password2":
                        $scope.passwordModel.new_password2,
                    "token": $state.params.token,
                    "uid": $state.params.uid
                };
                loginService.resetPasswordConfirm(obj)
                    .then(success_fxn, error_fxn);
            }
            else {
                var data = {
                    "data": {
                        "error": "Please correct the" +
                        " errors on the form to reset your password"
                    }
                };
                error_fxn(data);
            }
        };
    }
})(angular);
