'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    $scope.pharmacyDetails = {};

    $scope.savePharmacy = function(){
        $scope.pharmacyDetails.no = 123456;
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
