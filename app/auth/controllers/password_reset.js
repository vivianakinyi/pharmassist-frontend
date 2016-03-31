(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.passwordReset", [
        "pharmassistApp.config",
        "madeasy.auth.services",
        "madeasy.auth.formly.reset_email"
    ])
    .controller("madeasy.auth.controllers.passwordReset", passwordReset);
    passwordReset.$inject = ["$scope", "madeasy.auth.formly.reset_email",
    "madeasy.auth.services.login", "$state", "toastr"];
    function passwordReset ($scope, formlyService, loginService, $state,
        auth_error) {

        $scope.fields = formlyService.getFields();
        $scope.submitEmail = function submitEmailFunction () {
            var error_fxn = function errorFunction (data) {
                $scope.alert = auth_error.error(data, "Error");
            };

            var success_fxn = function successFunction () {
                $state.go("auth_login", {reset_password: true});
            };

            if ($scope.resetForm.$valid) {
                loginService.resetPassword($scope.resetModel.email)
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
