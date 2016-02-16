'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl', function ($scope, apiService, geolocation) {
    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    $scope.pharmacyDetails = {};

    $scope.detectLocation = function() {
        geolocation.getLocation().then(function(data){
            var myPoint = "POINT(" + data.coords.latitude +
                         " " + data.coords.longitude + ")";
        console.log(myPoint);
        $scope.pharmacyDetails.point = myPoint;

    });

    $scope.savePharmacy = function(){
        $scope.pharmacyDetails.no = 125472;

        console.log($scope.pharmacyDetails);
        apiService.post(url, $scope.pharmacyDetails).then(function (response) {
            console.log(response);
            console.log("Pharmacy saved successfully");
        }, function(err) {
            console.log(err);
        });
        console.log('Geometry at save: ', $scope.pharmacyDetails.point);
        }
    }
});

