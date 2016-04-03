'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('AdminCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/pharmacy/pharmacy/";
    $scope.selected_county = [];
    $scope.selected_county.value = '';
    $scope.counties = ['', 'NAIROBI', 'BARINGO'];

    $scope.list = function(county){

        var url = "http://localhost:8000/api/pharmacy/pharmacy/?county=" + county;

        apiService.get(url).then(function(response){
            $scope.pharmacies = response.data.results.features;
        });
    }
})
  .controller('ReportCtrl', function ($scope, apiService) {
    var drugUrl = "http://localhost:8000/api/pharmacy/drugs/";
    $scope.selected = {};
    $scope.selected.value = '';

    apiService.get(drugUrl).then(function (response) {
        $scope.drugs = response.data.results;
    });

    $scope.list = function(drug){
        var url = "http://localhost:8000/api/pharmacy/prices/?drug=" + drug;
        apiService.get(url).then(function(response){
            $scope.drugs = response.data.results;
            $scope.count = response.data.count;
        });
    }

})
  .controller('AnalyticsCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/pharmacy/drugs/?ordering=-counter";

    apiService.get(url).then(function(response){
        $scope.drugs = response.data.results;
    });
});

