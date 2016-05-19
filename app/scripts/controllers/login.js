'use strict';

angular.module('pharmassistApp')
  .controller('LoginCtrl', function ($scope, $state, djangoAuth, Validate, apiService, $cookies) {
    $scope.types = ['user', 'pharmacist', 'admin'];
    $scope.selection = $scope.types[0];

    $scope.model = {'username':'','password':''};
    $scope.complete = false;

    // var url = 'http://localhost:8000/rest-auth/user/'
    // apiService.get(url).then(function(response){
    //     console.log('User Data',response)
    // });

    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
          // $cookies.put('username', $scope.model.username);
          // $cookies.put('password', $scope.model.password);
          $state.go("home");
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
