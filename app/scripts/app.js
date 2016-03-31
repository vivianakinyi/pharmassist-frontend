'use strict';

/**
 * @ngdoc overview
 * @name pharmassistApp
 * @description
 * # pharmassistApp
 *
 * Main module of the application.
 */
angular
  .module('pharmassistApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngRoute',
    'ngMap',
    'ngSanitize',
    'ngTouch',
    'geolocation',
    'ngSanitize',
    'ui.select',
    'ui.grid',
    'toastr',
    // 'madeasy.auth',
    'pharmassistApp.config'
  ]);