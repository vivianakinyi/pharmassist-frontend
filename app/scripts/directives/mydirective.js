'use strict';

/**
 * @ngdoc directive
 * @name pharmassistApp.directive:myDirective
 * @description
 * # myDirective
 */
angular.module('pharmassistApp')
  .directive('myDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the myDirective directive');
      }
    };
  });
