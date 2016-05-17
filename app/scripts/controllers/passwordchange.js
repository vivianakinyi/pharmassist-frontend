'use strict';

angular.module('pharmassistApp')
  .controller('PasswordchangeCtrl', function ($scope, djangoAuth, Validate, $state, toastr) {
    $scope.model = {'new_password1':'','new_password2':''};
  	$scope.complete = false;
    $scope.changePassword = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.changePassword($scope.model.new_password1, $scope.model.new_password2)
        .then(function(data){
        	// success case
        	$scope.complete = true;
          $state.go('pharmacy_login')
          toastr.success('Password changed successfully', 'Success')

        },function(data){
        	// error case
        	$scope.errors = data;
          toastr.error($scope.errors, 'Error')

          console.log($scope.errors)
        });
      }
    }
  });
