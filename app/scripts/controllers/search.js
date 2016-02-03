'use strict';

angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation, $http, $location) {
      $http({
        url: "http://localhost:8000/api/drugs/drugs/",
        method: "GET",
        params: {name:name}
      }).then(function(response){
        $scope.drugs = response.data.results;
        $scope.selected = { value: $scope.drugs[0] };

        console.log($scope.drugs);
      });

    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            $scope.coords = "lat: " + data.coords.latitude +
                             " long: " + data.coords.longitude

        });
    }

    $scope.searchResults = function() {
      $location.path('/search/results');
    }
  })

  .controller('SearchResultsCtrl', function () {
    // $scope.search = function() {
    //   $scope.msg = "Hello";
    //   $location.path('/search/results');
    // }

  });
