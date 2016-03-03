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
        $scope.pharmacyDetails.no = 125484;

        apiService.post(url, $scope.pharmacyDetails).then(function (response) {
            var go = '/pharmacy/' + response.data.id;
            console.log("Pharmacy saved successfully");
            $location.path(go);
        }, function(err) {
            console.log(err);
        });
        console.log('Geometry at save: ', $scope.pharmacyDetails.point);
        }
})
  .controller('PharmacyDetailCtrl',
    function ($scope, apiService, $routeParams,geolocation) {

        var currentID = $routeParams.id
        var url = "http://localhost:8000/api/pharmacy/pharmacy/" + currentID + "/";
        $scope.pharmacy = {};

        apiService.get(url).then(function(response){
            $scope.pharmacies = response.data.properties;
        });
        $scope.detectLocation = function(){
            geolocation.getLocation().then(function(data){
                var myPoint = "POINT(" + data.coords.latitude +
                " " + data.coords.longitude + ")";
                $scope.pharmacies.point = myPoint;
            });
        }
        $scope.update = function(){
            var endpoint = "http://localhost:8000/api/pharmacy/pharmacy/";
            apiService.update(endpoint, currentID, $scope.pharmacies)
            .then(function(response){
                console.log("Pharmacy updated successfully");
            }, function(err){
                console.log(err);
            });
        }
  })
  .controller('DrugsCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/drugs/drugs/"
    apiService.get(url).then(function(drugs){
        drugs = drugs.data.results
        $scope.drugs = drugs
        console.log(drugs)

        $scope.deleteDrug = function(index){
            drugs.splice(index, 1)
        }

        $scope.addDrug = function(index){
            drugs.push({
                id: $scope.drugs.length + 1,
                display_name:$scope.newDrugName

            });
            $scope.newDrugName = '';

        }

    })

  });

