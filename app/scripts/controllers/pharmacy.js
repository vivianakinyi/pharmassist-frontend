'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl',
    function ($scope, apiService, geolocation, $location, toastr) {
    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    // $scope.pharmacyDetails = {};
    // $scope.pharmacyDetails.value = '';
    $scope.selected = {};
    $scope.selected.value = '';

    apiService.get(url).then(function(response){
        $scope.pharmacies = response.data.results.features;
    });

    $scope.viewDetails = function(){
        var go = '/pharmacy/' + $scope.selected.value.id;
        $location.path(go);
    }

    // $scope.detectLocation = function() {
    //     geolocation.getLocation().then(function(data){
    //         var myPoint = "POINT(" + data.coords.latitude +
    //                      " " + data.coords.longitude + ")";
    //         $scope.pharmacyDetails.point = myPoint;
    //     });
    // }

    // $scope.savePharmacy = function(){
    //     $scope.pharmacyDetails.no = 125484;

    //     apiService.post(url, $scope.pharmacyDetails).then(function (response) {
    //         var go = '/pharmacy/' + response.data.id;
    //         toastr.success("Pharmacy saved successfully", 'Success');
    //         $location.path(go);
    //     }, function(err) {
    //         console.log(err);
    //     });
    // }

})
  .controller('PharmacyDetailCtrl',
    function ($scope, apiService, $routeParams,geolocation, toastr, $location) {
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
        $scope.addDrugs  = function(){
            var go = "/pharmacy/" + currentID + "/drugs/add_drugs";
            $location.path(go);
        }
  })
  .controller('DrugsCtrl', function ($scope, apiService, $routeParams, toastr,
     $q, $location, $http) {
    var currentID = $routeParams.id;
    var url = "http://localhost:8000/api/pharmacy/drugs/";
    var pharmDrugsUrl = "http://localhost:8000/api/pharmacy/pharmacy/" + currentID;

    apiService.get(url).then(function(drugs){
        $scope.drugs = drugs.data.results
        $scope.multipleDrugs = {};
        $scope.multipleDrugs.value = [];

    })
    apiService.get(pharmDrugsUrl).then(function(response){
        $scope.pharmDrugs = response.data.properties.drugs;
    })

    var updateDrug = function updateDrug (drugID) {
        var defferd = $q.defer();
        var endpoint = "http://localhost:8000/api/pharmacy/prices/";
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
                var redirectTo = '/pharmacy/' + currentID +'/drugs/';
                var msg = value.display_name + " drug saved successfully!";
                toastr.success(msg, 'Success');
                // $scope.$apply();
                $location.path(redirectTo);

            }, function error (err) {
                var msg = "Sorry " + value.display_name +
                        " exists. Cannot add same drug twice";
                toastr.error(msg, 'Error', {
                    closeButton: true,
                    timeOut: 0,
                });
                console.log("Err", err);
            });
        });
    }
    $scope.addDrugs  = function(){
        var go = "/pharmacy/" + currentID + "/drugs/add_drugs";
        $location.path(go);
    }
    $scope.delete = function(drug) {
        var drugs = drug
        var pharm = currentID

        var endpoint = "http://localhost:8000/api/pharmacy/prices/?drug=" + drugs + '&pharmacy=' + pharm;
        apiService.get(endpoint).then(function(response){
            var endpointID = response.data.results[0].id;
            var endpointDeleted = "http://localhost:8000/api/pharmacy/prices/" + endpointID + '/';

            $http.delete(endpointDeleted).then(function(data){
                var redirectTo = '/pharmacy/' + currentID +'/drugs/';
                toastr.success("Drug has be deleted!", 'Success');
                $location.path(redirectTo); //reloads page
            });
        });

    }
  });

