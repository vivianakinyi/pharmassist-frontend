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
      $http({
        url: "http://localhost:8000/api/drugs/drugs/",
        method: "GET",
        params: {name:name}
      }).then(function(response){
        $scope.drugs = response.data.results;
        $scope.selected = { value: $scope.drugs[0] };

        console.log($scope.drugs);
      });

        // $scope.data = data;


    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            $scope.coords = "lat: " + data.coords.latitude +
                             " long: " + data.coords.longitude

        });
    }
  });
