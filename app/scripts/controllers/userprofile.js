'use strict';

angular.module('pharmassistApp')
  .controller('UserprofileCtrl', function ($scope, djangoAuth, Validate, apiService, $state, toastr) {
    $scope.model = {'first_name':'','last_name':'','email':''};
  	$scope.complete = false;
    var url = 'http://localhost:8000/rest-auth/user/'
    apiService.get(url).then(function(response){
        console.log('User Data',response)
    });
  	djangoAuth.profile().then(function(data){
  		$scope.model = data;
      console.log('Data',$scope.model)
  	});
    console.log('Data')
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.updateProfile(model)
        .then(function(data){
        	// success case
          console.log('Data')
        	$scope.complete = true;
          $state.reload();
          toastr.success('Profile updated', 'Success')
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
    }
  });
