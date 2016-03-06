'use strict';

angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation, apiService,
    $location) {
        var url = "http://localhost:8000/api/pharmacy/drugs/";
        // $scope.$watch('selected', function() {
        //     searchResults();
        // });
        apiService.get(url).then(function (response) {
            $scope.drugs = response.data.results;
            $scope.selected = { value: $scope.drugs[2] };
            console.log($scope.selected)
            console.log($scope.selected.value.id)
        });

    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            $scope.coords = data.coords.latitude + ' ' + data.coords.longitude

        });
    }

    $scope.searchResults = function() {
        var url = 'http://localhost:8000/api/pharmacy/prices/';
        var go = '/search/results/1'
        $location.path(go);
        // apiService.get(url).then(function(drugs){
        //     // console.log(drugs)
        //     var go = '/search/results/1'
        //     $location.path(go);

        // });
    }
  })
  .controller('SearchResultsCtrl', ['$scope','apiService',
    function($scope, apiService, $routeParams) {
        $scope.gridOptions = {};
        var url = "http://localhost:8000/api/pharmacy/pharmacy/";

        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
        };
        $scope.Edit = function(row) {
            // var index = $scope.gridOptions.data.indexOf(row.entity);
            // $scope.gridOptions.data.splice(index, 1);
            $scope.gridOptions.data.indexOf(row.entity);
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
        {
            name: 'Action',
            cellTemplate: '<a ng-href="#/pharmacy/{{gridOptions.data.indexOf(row.entity)}}" class="btn default">Edit</a>'

        },
        // {
        //     name: 'ShowScope',
        //     cellTemplate: '<button class="btn primary" ng-click="grid.appScope.Delete(row)">Delete Me</button>'
        // }
        ];

        apiService.get(url).then(function(response){
          $scope.gridOptions.data = response.data.results.features;
          $scope.pharmacies = response.data.results.features;
          console.log($scope.pharmacies);
        });
    }
]);
