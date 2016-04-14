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

    $scope.counties = ['#', 'NAIROBI', 'BARINGO'];

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
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 10
            }
        }
    };
    // $scope.data = [
    //         {
    //             // key: "Cumulative Return",
    //             values: [
    //                 {
    //                     "label" : "A" ,
    //                     "value" : 9
    //                 } ,
    //                 {
    //                     "label" : "B" ,
    //                     "value" : 0
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
    //                 } ,
    //                 {
    //                     "label" : "H" ,
    //                     "value" : 5
    //                 },
    //                 {
    //                     "label" : "A" ,
    //                     "value" : 9
    //                 } ,
    //                 {
    //                     "label" : "B" ,
    //                     "value" : 0
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
    //                 } ,
    //                 {
    //                     "label" : "H" ,
    //                     "value" : 5
    //                 },{
    //                     "label" : "I" ,
    //                     "value" : 9
    //                 } ,
    //                 {
    //                     "label" : "J" ,
    //                     "value" : 0
    //                 } ,
    //                 {
    //                     "label" : "L" ,
    //                     "value" : 3
    //                 } ,
    //                 {
    //                     "label" : "M" ,
    //                     "value" : 1
    //                 } ,
    //                 {
    //                     "label" : "N" ,
    //                     "value" : 0
    //                 } ,
    //                 {
    //                     "label" : "O" ,
    //                     "value" : 4
    //                 } ,
    //                 {
    //                     "label" : "P" ,
    //                     "value" : 6
    //                 } ,
    //                 {
    //                     "label" : "Q" ,
    //                     "value" : 5
    //                 },
    //                 {
    //                     "label" : "R" ,
    //                     "value" : 9
    //                 } ,
    //                 {
    //                     "label" : "S" ,
    //                     "value" : 0
    //                 } ,
    //                 {
    //                     "label" : "T" ,
    //                     "value" : 3
    //                 } ,
    //                 {
    //                     "label" : "u" ,
    //                     "value" : 1
    //                 } ,
    //                 {
    //                     "label" : "v" ,
    //                     "value" : 0
    //                 } ,
    //                 {
    //                     "label" : "W" ,
    //                     "value" : 4
    //                 } ,
    //                 {
    //                     "label" : "X" ,
    //                     "value" : 6
    //                 } ,
    //                 {
    //                     "label" : "Y" ,
    //                     "value" : 5
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
           values.push({'label:' : value.display_name, 'value:' : value.counter});
        });
        console.log(values);
        $scope.data =[{ values: values}];
        console.log($scope.data);

    });

});
