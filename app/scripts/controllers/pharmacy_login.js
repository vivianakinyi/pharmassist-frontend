'use strict';

angular.module('pharmassistApp')
  .controller('PharmLoginCtrl', function ($scope, $state, djangoAuth, Validate, $cookies) {
    $scope.types = ['user', 'pharmacist', 'admin'];
    $scope.selection = $scope.types[0];

    $scope.model = {'username':'','password':''};
    $scope.complete = false;

    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
          $cookies.put('username', $scope.model.username);
          $cookies.put('password', $scope.model.password);
          $state.go('pharmacy', {username:$scope.model.username})
        },function(data){
          // error case
          $scope.errors = data;
        });
      }
    }
  });
