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
  .controller('SearchResultsCtrl', ['$scope','$http',
    function($scope, $http) {
        $scope.gridOptions = {};

        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
        };
        $scope.gridOptions.columnDefs = [{
            name: 'Pharmacy',
            field: 'properties.name'
        },
        {
            name: 'Town',
            field: 'properties.town'
        },
        {   name: 'Street',
            field: 'properties.street'
        },
        {   name: 'County',
            field: 'properties.county'
        },
        {   name: 'Landmarks',
            field: 'properties.landmarks'
        },
        {
            name: 'ShowScope',
            cellTemplate: '<button class="btn primary" ng-click="grid.appScope.Delete(row)">Delete Me</button>'
        }];

        $http({
          url: "http://localhost:8000/api/pharmacy/pharmacy/",
          method: "GET",
          params: {name:name}
        }).then(function(response){
          console.log(response);
          $scope.gridOptions.data = response.data.results.features;
          console.log($scope.gridOptions.data);

        });
    }
]);
