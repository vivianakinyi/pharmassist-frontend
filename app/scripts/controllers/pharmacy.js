'use strict';

angular.module('pharmassistApp')
  .controller('PharmacyCtrl',
    function ($scope, apiService, geolocation, $state, toastr, $stateParams) {

    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    var pharmacy = $stateParams.username;
    var owner_url = "http://localhost:8000/api/pharmacy/pharmacy/?owner=" + pharmacy


    $scope.selected = {};
    $scope.selected.value = '';

    apiService.get(owner_url).then(function(response){
        $scope.pharmacies = response.data.results.features;
        $scope.number = $scope.pharmacies.length;
    });

    $scope.viewDetails = function(){
        $state.go('pharmacy.detail', {id: $scope.selected.value.id});
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
    function ($scope, apiService, $stateParams,geolocation, toastr, $state) {
        var currentID = $stateParams.id;
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
            $scope.pharmacies.updated = new Date();
            apiService.update(endpoint, currentID, $scope.pharmacies)
            .then(function(response){
                toastr.success("Pharmacy updated successfully", 'Success');
            }, function(err){
                console.log(err);
            });
        }
        $scope.addDrugs  = function(){
            $state.go('pharmacy.detail.drugs.add_drugs', {id: currentID});
        }
        $scope.viewDrugs  = function(){
            $state.go('pharmacy.detail.drugs', {id: currentID});
        }
  })
  .controller('DrugsCtrl', function ($scope, apiService, $stateParams, toastr,
     $q, $state, $http) {
    var currentID = $stateParams.id;
    var pharmUrl = "http://localhost:8000/api/pharmacy/pharmacy/" + currentID + "/";
    var url = "http://localhost:8000/api/pharmacy/drugs/";

    // Fetch pharmacy viewDetails
    apiService.get(pharmUrl).then(function(response){
        $scope.pharmID = response.data.id;
    })

    // Fetch all drugs
    $scope.myPromise = apiService.get(url).then(function(drugs){
        $scope.drugs = drugs.data.results
        $scope.multipleDrugs = {};
        $scope.multipleDrugs.value = [];

    })

    //Goto add new drugs
    $scope.addDrugs  = function(){
        $location.path('pharmacy.detail.drugs.add_drugs', {id:currentID});
    }

    var updateDrug = function updateDrug (drugID) {
        var defferd = $q.defer();
        var time = new Date()
        var endpoint = "http://localhost:8000/api/pharmacy/prices/";
        var updateObj = {
                drug: drugID,
                pharmacy:currentID,
                update: time
            }
        apiService.post(endpoint, updateObj)
        .then(function response (data) {
            defferd.resolve(data);
        }, function reject (err) {
            defferd.reject(err)
        });
        return defferd.promise;
    };
    $scope.cancel = function(){
        $state.go('pharmacy.detail.drugs', {id:currentID})
    }

    $scope.saveDrugs = function(data){
        _.each(data, function getData(value, index) {
            var drugID = value.id;
            updateDrug(drugID).then(function resolve(data) {
                var msg = value.display_name + " drug saved successfully!";
                toastr.success(msg, 'Success');
                $state.go('pharmacy.detail.drugs', {id:currentID})

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
  })
  .controller('DrugsDetailCtrl', function ($scope, apiService, $stateParams, toastr,
     $q, $state, $http) {
    var currentID = $stateParams.id;
    // var pharmDrugsUrl = "http://localhost:8000/api/pharmacy/pharmacy/" + currentID;
    var endpoint = "http://localhost:8000/api/pharmacy/prices/?pharmacy=" + currentID;

    apiService.get(endpoint).then(function(response){


        $scope.pharmDrugs = response.data.results;
        $scope.pharmDrugs.selected = {};

        $scope.getTemplate = function (drug) {
            if (drug.id === $scope.pharmDrugs.selected.id){
                return 'edit';
            }
            else return 'display';
        };

        $scope.editPrice = function (drug) {
            $scope.pharmDrugs.selected = angular.copy(drug);
            $scope.pharmDrugs.selected.id
        };
        $scope.savePrice = function (idx) {
            $scope.pharmDrugs[idx] = angular.copy($scope.pharmDrugs.selected);
            var endpointID = $scope.pharmDrugs.selected.id;

            var updateObj = {
                price: $scope.pharmDrugs.selected.price
            }

            apiService.get(endpoint).then(function(response){
                // var endpointID = $scope.pharmDrugs.selected.id;
                var endpointUpdate = "http://localhost:8000/api/pharmacy/prices/";

                apiService.update(endpointUpdate, endpointID, updateObj).then(function(response){
                    toastr.success("Edited price successfully!", 'Success');
                });
            });
            // $scope.pharmDrugs[idx] = angular.copy($scope.pharmDrugs.selected);
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.pharmDrugs.selected = {};
        };
    });

    $scope.addDrugs  = function(){
        $state.go('pharmacy.detail.drugs.add_drugs', {id:currentID});
    }
    // TODO cHECK CODE WITH IAN
    $scope.delete = function(drug, index) {
        var drugs = drug
        var pharm = currentID

        var endpoint = "http://localhost:8000/api/pharmacy/prices/?drug=" + drugs + '&pharmacy=' + pharm;
        apiService.get(endpoint).then(function(response){
            var endpointID = response.data.results[0].id;
            var endpointDeleted = "http://localhost:8000/api/pharmacy/prices/" + endpointID + '/';

            $http.delete(endpointDeleted).then(function(data){
                toastr.success("Removed drug successfully!", 'Success');
                $scope.pharmDrugs.splice(index, 1);
                $state.go('pharmacy.detail.drugs', {id:currentID});
            });
        });

    }
});

