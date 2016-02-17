'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl', function ($scope, apiService, geolocation, $location) {
    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    $scope.pharmacyDetails = {};

    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            var myPoint = "POINT(" + data.coords.latitude +
                         " " + data.coords.longitude + ")";
            $scope.pharmacyDetails.point = myPoint;
        });
    }

    $scope.savePharmacy = function(){
        $scope.pharmacyDetails.no = 125479;
        console.log($scope.pharmacyDetails);
        apiService.post(url, $scope.pharmacyDetails).then(function (response) {
            console.log("Pharmacy saved successfully");
            $location.path('/search/results');
        }, function(err) {
            console.log(err);
        });
        console.log('Geometry at save: ', $scope.pharmacyDetails.point);
        }
})
  .controller('PharmacyDetailCtrl',
    function ($scope, apiService, $routeParams,geolocation) {

        // $scope.pharmacyDetails.no = 12547;
        var currentID = $routeParams.id
        var url = "http://localhost:8000/api/pharmacy/pharmacy/" + currentID;
        $scope.pharmacyDetails = {};

        apiService.get(url).then(function(response){
            console.log('Detail view', response);
            $scope.pharmacies = response.data.properties;
            console.log($scope.pharmacies);

        });
        $scope.detectLocation = function(){
            geolocation.getLocation().then(function(data){
                var myPoint = "POINT(" + data.coords.latitude +
                " " + data.coords.longitude + ")";
                $scope.pharmacies.point = myPoint;
            });
        }
        $scope.update = function(){
            var endpoint = "http://localhost:8000/api/pharmacy/pharmacy/" ;
            apiService.update(endpoint, currentID, $scope.pharmacyDetails)
            .then(function(response){
                console.log(response);
                console.log("Pharmacy updated successfully");
            }, function(err){
                console.log(err);
            });
        }
  });
