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
            console.log(response)
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
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 100
            }
        }
    };
    $scope.data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : 10
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 12
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 3
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 1
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "F" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "G" ,
                        "value" : 6
                    } ,
                    {
                        "label" : "H" ,
                        "value" : 5
                    },
                    {
                        "label" : "A" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 3
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 1
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "F" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "G" ,
                        "value" : 6
                    } ,
                    {
                        "label" : "H" ,
                        "value" : 5
                    },{
                        "label" : "I" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "J" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "L" ,
                        "value" : 3
                    } ,
                    {
                        "label" : "M" ,
                        "value" : 1
                    } ,
                    {
                        "label" : "N" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "O" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "P" ,
                        "value" : 6
                    } ,
                    {
                        "label" : "Q" ,
                        "value" : 5
                    },
                    {
                        "label" : "R" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "S" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "T" ,
                        "value" : 3
                    } ,
                    {
                        "label" : "u" ,
                        "value" : 1
                    } ,
                    {
                        "label" : "v" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "W" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "X" ,
                        "value" : 6
                    } ,
                    {
                        "label" : "Y" ,
                        "value" : 5
                    },
                    {
                        "label" : "Z" ,
                        "value" : 5
                    }, {
                        "label" : "A" ,
                        "value" : 10
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 12
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 3
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 1
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "F" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "G" ,
                        "value" : 6
                    } ,
                    {
                        "label" : "H" ,
                        "value" : 5
                    },
                    {
                        "label" : "a" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "b" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "c" ,
                        "value" : 3
                    } ,
                    {
                        "label" : "d" ,
                        "value" : 1
                    } ,
                    {
                        "label" : "e" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "f" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "g" ,
                        "value" : 6
                    }
                ]
            }
         ]
    // $scope.fetchData = function(){
    //     apiService.get(url).then(function(response){
    //         $scope.drugs = response.data.results;
    //         console.log($scope.drugs)
    //         var dta = [{key:"test3", values:[]}];
    //         dta[0].values=response.data.results.values;
    //         $scope.leads = dta;
    //     });
    // }
    // $scope.refreshInterval = 5;
    // setInterval(function(){
    //         $scope.$apply(function(){
    //             $scope.fetchData();
    //         })
    //     }, 150);


    // apiService.get(url).then(function(response){
    //     $scope.drugs = response.data.results;

    //     var dta=[];
    //     for(var i=0 ; i < response.data.results.length ; i++){
    //         console.log(response.data.results[i].counter)
    //         dta.push({key:response.data.results[i].counter , value:response.data.results[i].display_name});
    //     }
    //     $scope.leads = dta;
    // });


    // apiService.get(url).then(function(response){
    //     $scope.drugs = response.data.results;

    //     var data =  response.data.results;
    //     var values = [];
    //     // $scope.data = [{ values: [], key: 'Random Walk' }];
    //     _.each(data, function getData(value, index) {
    //        values.push({ 'value:' : value.counter, 'label:' : value.display_name});
    //     });
    //     console.log(values);
    //     $scope.data = values;
    //     console.log($scope.data);

    // });

});
