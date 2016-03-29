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

  .controller('SearchResultsCtrl', ['$scope','apiService','$routeParams','NgMap',
    function($scope, apiService, $routeParams, NgMap) {
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
        // get maps
        // NgMap.getMap().then(function(map) {
        //     console.log('cemter',map.getCenter());
        //     console.log('markers', map.markers);
        //     console.log('shapes', map.shapes);
        // });

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
])
.controller('MapCtrl', function ($http, $interval, apiService, $routeParams, NgMap) {
    var currentID = $routeParams.drugID;
    var distance = $routeParams.distID;
    var location = $routeParams.locID;

    var url = "http://localhost:8000/api/pharmacy/pharmacy/?dist="+ distance + "&point=" + location + "&drugs=" + currentID ;

    var vm = this;
    apiService.get(url).then(function(response){
        var locations = [];
        var data =  response.data.results.features
        console.log(response.data.results.features[2].geometry.coordinates);
        _.each(data, function getData(value, index) {
            // console.log(value.geometry.coordinates + ',');
            var positions = value.geometry.coordinates;
            console.log(positions);
            locations.push(positions);
        });
        console.log("My positions", locations);
        vm.positions = locations;
        // vm.positions = [
        // [-1.2719192,36.8080739], [-1.281051,36.8122748],
        // [-1.2819192,36.8280739], [-1.2719192,36.8080739],
        // [-1.2619192,36.7980739], [-1.2819192,36.8180739]];
        // vm.positions = data;
        console.log(vm.positions);
        vm.dynMarkers = []
        NgMap.getMap().then(function(map) {
            var bounds = new google.maps.LatLngBounds();
            for (var k in map.customMarkers) {
                var cm = map.customMarkers[k];
                vm.dynMarkers.push(cm);
                bounds.extend(cm.getPosition());
            };

            vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        });
    });
});

