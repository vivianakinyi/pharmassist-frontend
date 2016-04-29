'use strict';

angular.module('pharmassistApp')
  .controller('AdminLoginCtrl', function ($scope, $state, djangoAuth, Validate) {
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
          $state.go('admin')
        },function(data){
          // error case
          $scope.errors = data;
        });
      }
    }
  });
