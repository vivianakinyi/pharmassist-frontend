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

    $scope.counties = ['#', 'NAIROBI', 'BARINGO', 'BUNGOMA', 'MURANGA', 'NAKURU', 'NANDI', 'NAROK', 'NYERI', 'WAJIR', 'VIHIGA', 'UASIN GISHU', 'TRANS NZOIA'];

    // nvd3 data options
     $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };


    $scope.list = function(county){

        var url = "http://localhost:8000/api/pharmacy/pharmacy/?county=" + county;

        apiService.get(url).then(function(response){

            $scope.pharmacies = response.data.results.features;

            var data =  response.data.results.features;
            var values = [];
            _.each(data, function getData(value, index) {
                values.push({'key' : value.properties.name, 'y' : value.properties.drugs.length});
            });
            $scope.data = values

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
  .controller('PricesCtrl', function ($scope, apiService) {
    var drugUrl = "http://localhost:8000/api/pharmacy/prices/";

    apiService.get(drugUrl).then(function (response) {
        $scope.drugs = response.data.results;
        console.log($scope.drugs)
    });

})
  .controller('AnalyticsCtrl', function ($scope, apiService) {
    var url = "http://localhost:8000/api/pharmacy/drugs/?ordering=-counter";
    // nvd3 data options
    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.1f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 500
            }
        }
    };
    // $scope.data = [
    //         {
    //             key: "Cumulative Return",
    //             values: [
    //                 {
    //                     "label" : "A" ,
    //                     "value" : 10
    //                 } ,
    //                 {
    //                     "label" : "B" ,
    //                     "value" : 12
    //                 } ,
    //                 {
    //                     "label" : "C" ,
    //                     "value" : 3
    //                 } ,
    //                 {
    //                     "label" : "D" ,
    //                     "value" : 1
    //                 } ,
    //                 {
    //                     "label" : "E" ,
    //                     "value" : 0
    //                 } ,
    //                 {
    //                     "label" : "F" ,
    //                     "value" : 4
    //                 } ,
    //                 {
    //                     "label" : "G" ,
    //                     "value" : 6
    //                 }
    //             ]
    //         }
    //      ]


    apiService.get(url).then(function(response){
        $scope.drugs = response.data.results;

        var data =  response.data.results;
        var values = [];
        // $scope.data = [{ values: [], key: 'Random Walk' }];
        _.each(data, function getData(value, index) {
           values.push({ 'value' : value.counter, 'label' : value.display_name});
        });
       $scope.data = [{ values: values, key: 'Random Walk' }];
    });

});
