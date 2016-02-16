'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl', function ($scope, apiService, geolocation, $location) {
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
        $scope.pharmacyDetails.no = 125477;
        console.log($scope.pharmacyDetails);
        apiService.post(url, $scope.pharmacyDetails).then(function (response) {
            console.log(response);
            console.log("Pharmacy saved successfully");
            $location.path('/search/results');
        }, function(err) {
            console.log(err);
        });
        console.log('Geometry at save: ', $scope.pharmacyDetails.point);
        }
    }
})
  .controller('PharmacyDetailCtrl',
    function ($scope, apiService, $routeParams) {
        var currentID = $routeParams.id
        var url = "http://localhost:8000/api/pharmacy/pharmacy/";
        $scope.pharmacyDetails = {};

        apiService.get(url).then(function(response){
            $scope.pharmacies = response.data.results.features;
            console.log($scope.pharmacies);
            $scope.whichPharmacy = $routeParams.id;

        });




  })


