'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl',
    function ($scope, apiService, geolocation, $location, toastr) {
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
            toastr.success("Pharmacy saved successfully", 'Success');
            $location.path(go);
        }, function(err) {
            console.log(err);
        });
    }
})
  .controller('PharmacyDetailCtrl',
    function ($scope, apiService, $routeParams,geolocation, toastr) {
        var currentID = $routeParams.id;
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
                toastr.success("Pharmacy updated successfully", 'Success');
            }, function(err){
                console.log(err);
            });
        }
  })
  .controller('DrugsCtrl', function ($scope, apiService, $routeParams, toastr,
     $q) {
    var url = "http://localhost:8000/api/pharmacy/drugs/";
    var currentID = $routeParams.id;


    apiService.get(url).then(function(drugs){
        $scope.drugs = drugs.data.results
        $scope.multipleDrugs = {};
        $scope.multipleDrugs.value = [];


        // $scope.deleteDrug = function(index){
        //     drugs.splice(index, 1)
        // }

        // $scope.addDrug = function(index){
        //     drugs.push({
        //         id: $scope.drugs.length + 1,
        //         display_name:$scope.newDrugName

        //     });
        //     $scope.newDrugName = '';

        // }

    })
    var updateDrug = function updateDrug (drugID) {
        var defferd = $q.defer();
        var endpoint = "http://localhost:8000/api/pharmacy/prices/";
        console.log(currentID);
        var updateObj = {
                drug: drugID,
                pharmacy:currentID,
                price: 300
            }
        apiService.post(endpoint, updateObj)
        .then(function response (data) {
            defferd.resolve(data);
        }, function reject (err) {
            defferd.reject(err)
        });
        return defferd.promise;
    };

    $scope.saveDrugs = function(data){
        _.each(data, function getData(value, index) {
            var drugID = value.id;
            updateDrug(drugID).then(function resolve(data) {
                var msg = value.display_name + " drug saved successfully!";
                toastr.success(msg, 'Success');
                console.log("Saved Data", data);
            }, function error (err) {
                var msg = "Error saving drug " + value.display_name;
                toastr.error(msg, 'Error');
                console.log("Err", err);
            });
        });
    }
  });

