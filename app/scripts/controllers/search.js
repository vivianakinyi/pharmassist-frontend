'use strict';

angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, geolocation, apiService,
    $state, toastr) {
        var url = "http://localhost:8000/api/pharmacy/drugs/";

        $scope.selected = {};
        $scope.selected.value = '';

        apiService.get(url).then(function (response) {
            $scope.drugs = response.data.results;
        });
        var location = false;
        $scope.detectLocation = function() {
            geolocation.getLocation().then(function(data){
                $scope.coords = data.coords.latitude + ',' + data.coords.longitude;
                location = true;
                toastr.success("Location detected successfully", 'Success');
            }),function(error){
                console.log(error);
                $rootScope.$broadcast('error',CONSTANTS['errors.location.notFound']);
                toastr.error("Failed to get location", 'Error');
            }
        };
        // distance combobox
        $scope.selected_dist = [];
        $scope.selected_dist.value = '';
        $scope.distance = [100,200,300,400,500,4000]

        $scope.searchResults = function() {
            // Get the frequency of a searched drug
            var count = count + 1;
            var drugCounter = "http://localhost:8000/api/pharmacy/drugs/" + $scope.selected.value.id;

            apiService.get(drugCounter).then(function (response) {
                var counter = response.data.counter + 1;
                var clock = new Date();

                var updateObj = {
                    counter: counter,
                    updated: clock
                }

                apiService.update(url, $scope.selected.value.id, updateObj)
                .then(function(response){
                    console.log(response);
                });
            });


            $state.go("search.results", {
                drugID: $scope.selected.value.id,
                distID: $scope.selected_dist.value,
                locID:  $scope.coords
            });
        }
  })

  .controller('SearchResultsCtrl', ['$scope','apiService','$stateParams','NgMap',
    function($scope, apiService, $stateParams, NgMap) {
        var currentID = $stateParams.drugID;
        var distance = $stateParams.distID;
        var location = $stateParams.locID;

        var searchUrl = "http://localhost:8000/api/pharmacy/pharmacy/?dist="+ distance + "&point=" + location + "&drugs=" + currentID ;
        var drugUrl = "http://localhost:8000/api/pharmacy/drugs/" + currentID + '/'
        var priceUrl = "http://localhost:8000/api/pharmacy/prices/?drug=25"

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
            $scope.gridOptions.data.indexOf(row.entity);
        };


        apiService.get(searchUrl).then(function(response){
            // console.log('Search results', response.data.results.features[1].properties.pharmacy_prices)
            // var data = response.data.results.features[1].properties.pharmacy_prices
            var all = response.data.results.features;

            _.each(all, function getData(value, index) {

                var data = value.properties.pharmacy_prices
                _.each(data, function getData(value, index) {
                    if (value.drug == currentID){
                        $scope.pharmacy = value;
                        console.log(value)
                    }
                });
                // $scope.pharmacy = value
                // console.log('pharmacy',$scope.pharmacy)
            });


            $scope.gridOptions.data = response.data.results.features;
            $scope.pharmacies = response.data.results.features;

            apiService.get(priceUrl).then(function(resp){
                // $scope.prices = resp.data.results[currentID].price;
                // $scope.recommended = resp.data.results[1].recommended_price;
            });

        });
    }
])
.controller('MapCtrl', function ($http, $interval, apiService, $stateParams, NgMap) {
    var currentID = $stateParams.drugID;
    var distance = $stateParams.distID;
    var location = $stateParams.locID;

    var url = "http://localhost:8000/api/pharmacy/pharmacy/?dist="+ distance + "&point=" + location + "&drugs=" + currentID ;

    var vm = this;
    apiService.get(url).then(function(response){
        var locations = [];
        var data =  response.data.results.features

        _.each(data, function getData(value, index) {
            var positions = value.geometry.coordinates;
            locations.push(positions);
        });

        vm.positions = locations;

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

