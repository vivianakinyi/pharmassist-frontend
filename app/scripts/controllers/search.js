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
     // $http.get("http://localhost:8000/api/pharmacy/pharmacy/")
     // .then(function(data){
      $http({
        url: "http://localhost:8000/api/pharmacy/pharmacy/",
        method: "GET",
        params: {query: {name:name}}
      }).then(function(data){
        $scope.drugs = data;
        console.log($scope.drugs);
        console.log(data.results.data);
      });

        // $scope.data = data;
        // $scope.selected = { value: $scope.data[0] };

    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            $scope.coords = "lat: " + data.coords.latitude +
                             " long: " + data.coords.longitude

        });
    }
  });
