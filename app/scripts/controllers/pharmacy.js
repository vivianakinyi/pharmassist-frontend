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

        var currentID = $routeParams.id
        console.log(currentID)
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
  .controller('DrugsCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/pharmacy/drugs/"
    apiService.get(url).then(function(drugs){
        drugs = drugs.data.results
        $scope.drugs = drugs
        console.log(drugs)

        $scope.multipleDrugs = {};
        console.log('Trying out..', $scope.multipleDrugs)
        // $scope.multipleDrugs.drugs =['test1','test2'];


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

    $scope.selectYellowColor = function(){
    if($scope.multipleDemo.colors.indexOf($scope.availableColors[3]) == -1){
      $scope.multipleDemo.colors.push($scope.availableColors[3]);
    }
    };

    $scope.deselectYellowColor = function(){
        if($scope.multipleDemo.colors.indexOf($scope.availableColors[3]) != -1){
          var index = $scope.multipleDemo.colors.indexOf($scope.availableColors[3]);
          $scope.multipleDemo.colors.splice(index, 1);
        }
    };

  });

