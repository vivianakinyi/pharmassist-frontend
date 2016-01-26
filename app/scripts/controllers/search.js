'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.position = position;
            });
        });
    }
  });
