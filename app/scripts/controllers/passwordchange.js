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
          toastr.success('Password changed successfully. You need to login to see the changes', 'Success')
          // $state.go('')

        },function(data){
        	// error case
        	$scope.errors = data;
          toastr.error($scope.errors, 'Error')

          console.log($scope.errors)
        });
      }
    }
  });
