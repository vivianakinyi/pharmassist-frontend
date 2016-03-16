'use strict';

angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation, apiService,
    $location) {
        var url = "http://localhost:8000/api/pharmacy/drugs/";
        // $scope.$watch('selected', function() {
        //     searchResults();
        // });
        $scope.selected = {};
        $scope.selected.value = '';

        apiService.get(url).then(function (response) {
            $scope.drugs = response.data.results;
        });
        console.log('After',$scope.coords)
        $scope.detectLocation = function() {
            geolocation.getLocation().then(function(data){
                $scope.coords = data.coords.latitude + ',' + data.coords.longitude;
                console.log('Before location',$scope.coords)
            });
        }
        // distance combobox
        $scope.selected_dist = [];
        $scope.selected_dist.value = '';
        $scope.distance = [100,200,300,400,500,4000]
        console.log('After after..',$scope.coords)
        $scope.searchResults = function() {
            var go = '/search/results/' + $scope.selected.value.id + '/' + $scope.selected_dist.value + '/' + $scope.coords;
            $location.path(go);
        }
  })

  .controller('SearchResultsCtrl', ['$scope','apiService','$routeParams',
    function($scope, apiService, $routeParams) {
        var currentID = $routeParams.drugID;
        var distance = $routeParams.distID;
        var location = $routeParams.locID;

        var url = "http://localhost:8000/api/pharmacy/pharmacy/?dist="+ distance + "&point=" + location + "&drugs=" + currentID ;
        var drugUrl = "http://localhost:8000/api/pharmacy/drugs/" + currentID + '/'

        $scope.gridOptions = {};

        // Detail of selected drug
        apiService.get(drugUrl).then(function(response){
            $scope.drugs = response.data;
        });

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
        });
    }
]);
