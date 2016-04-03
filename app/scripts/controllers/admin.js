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

    apiService.get(url).then(function(response){
        $scope.pharmacies = response.data.results.features;
    });
})
  .controller('ReportCtrl', function ($scope, apiService) {

    $scope.selected_county = [];
    $scope.selected_county.value = '';
    $scope.counties = ['NAIROBI', 'BARINGO'];

    $scope.list = function(county){

        var url = "http://localhost:8000/api/pharmacy/pharmacy/?county=" + county;

        apiService.get(url).then(function(response){
            $scope.pharmacies = response.data.results.features;
        });
    }
})
  .controller('AnalyticsCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/pharmacy/drugs/?ordering=-counter";

    apiService.get(url).then(function(response){
        $scope.drugs = response.data.results;
    });
});

