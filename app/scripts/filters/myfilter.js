'use strict';

/**
 * @ngdoc filter
 * @name pharmassistApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the pharmassistApp.
 */
angular.module('pharmassistApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
