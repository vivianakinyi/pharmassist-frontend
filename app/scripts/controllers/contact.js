'use strict';

/**
 * @ngdoc function
 * @name pharmassistApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the pharmassistApp
 */
angular.module('pharmassistApp')
  .controller('ContactCtrl', function ($scope, $state, toastr) {
    $scope.message  = function(){
        toastr.info('Message send successfully!');
        $state.go('contact');
    }

});
