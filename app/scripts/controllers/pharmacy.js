'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl', function ($scope, apiService, geolocation) {
    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    $scope.pharmacyDetails = {};

    $scope.savePharmacy = function(){
        $scope.pharmacyDetails.no = 125456;

        $scope.detectLocation = function() {
            geolocation.getLocation().then(function(data){
                console.log(data);
                $scope.pharmacyDetails.location =data.coords.latitude +
                             " long: " + data.coords.longitude
                         });
        }

        apiService.post(url, $scope.pharmacyDetails).then(function (response) {
            console.log(response);
            console.log("Pharmacy saved successfully");
        }, function(err) {
            console.log(err);
        });
    }

    $scope.updatePharm = function(id){

    }

  });
