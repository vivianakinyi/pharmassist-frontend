'use strict';

angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation, apiService, $location) {
        var url = "http://localhost:8000/api/drugs/drugs/";
        apiService.get(url).then(function (response) {
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
  .controller('SearchResultsCtrl', ['$scope','apiService',
    function($scope, apiService) {
        $scope.gridOptions = {};
        var url = "http://localhost:8000/api/pharmacy/pharmacy/";

        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
        };
        $scope.gridOptions.columnDefs = [{
            name: 'Index',
            field: 'properties.no'
        },
        {
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
        // {
        //     name: 'ShowScope',
        //     cellTemplate: '<button class="btn primary" ng-click="grid.appScope.Delete(row)">Delete Me</button>'
        // }
        ];

        apiService.get(url).then(function(response){
          $scope.gridOptions.data = response.data.results.features;
        });
    }
]);
