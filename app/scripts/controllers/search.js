'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation, $http) {
     $http.get("http://localhost:8000/admin/").then(function(data){
        console.log(data);
        $scope.data = data;
    });

    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            $scope.coords = "lat: " + data.coords.latitude +
                             " long: " + data.coords.longitude

        });
    }
  });
