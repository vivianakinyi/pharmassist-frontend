'use strict';

angular.module('pharmassistApp')
  .controller('PharmLoginCtrl', function ($scope, $state, djangoAuth, Validate) {
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
          console.log($scope.model.username)
          $state.go('pharmacy', {username:$scope.model.username})
        },function(data){
          // error case
          $scope.errors = data;
        });
      }
    }
  });
