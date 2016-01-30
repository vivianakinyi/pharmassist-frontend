'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $http.get("http://localhost:8000/api/drugs/drugs/").then(function(data){
        console.log(data);
        $scope.data = data;

    });
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position){
    //         $scope.$apply(function(){
    //             $scope.position = position;
    //         });
    //     });
    // }
  });
