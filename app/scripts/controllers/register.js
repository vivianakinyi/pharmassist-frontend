'use strict';

angular.module('pharmassistApp')
  .controller('RegisterCtrl', function ($scope, djangoAuth, Validate, $state, toastr) {
  	$scope.model = {'username':'','password':'','email':''};
  	$scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
          toastr.success('You have registered successfully. Now go and login', 'Success')

          $state.go('login');

        },function(data){
        	// error case
        	$scope.errors = data;
          toastr.error($scope.errors, 'Error')

        });
      }
    }
  });
