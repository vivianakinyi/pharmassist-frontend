'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.sendData = function () {
      var data = $.params({
        fName: $scope.firstName
        lName: $scope.lastName

      });
    }
  })
  .controller('RegisterCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
