'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation) {
    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            $scope.coords = "lat: " + data.coords.latitude +
                             " long: " + data.coords.longitude

        });
    }
  });
