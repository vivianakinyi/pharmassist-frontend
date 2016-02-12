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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'geolocation',
    'ngSanitize',
    'ui.select',
    'ui.grid',
    'ui.router'

  ])

  .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
        $httpProvider.defaults.headers.common = {
            "Content-Type": "application/json",
            "Accept": "application/json, */*"
        };
    }])

  .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

  .config(function config($stateProvider) {
    $stateProvider
      .state("home", {
          parent: "base_state",
          url: "/",
          views: {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
      }).state("login", {
          url: "/login",
          views: {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
          }
      });
  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl',
  //       controllerAs: 'main'
  //     })
  //     .when('/login', {
  //       templateUrl: 'views/login.html',
  //       controller: 'LoginCtrl',
  //       controllerAs: 'login'
  //     })
  //     .when('/register', {
  //       templateUrl: 'views/register.html',
  //       controller: 'RegisterCtrl',
  //       controllerAs: 'register'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl',
  //       controllerAs: 'about'
  //     })
  //     .when('/pharmacy', {
  //       templateUrl: 'views/pharmacy.html',
  //       controller: 'PharmacyCtrl',
  //       controllerAs: 'pharmacy'
  //     })
  //     .when('/search', {
  //       templateUrl: 'views/search.html',
  //       controller: 'SearchCtrl',
  //       controllerAs: 'search'
  //     })
  //     .when('/search/results', {
  //       templateUrl: 'views/results.html',
  //       controller: 'SearchResultsCtrl',
  //       controllerAs: 'search'
  //     })
  //     .when('/contact', {
  //       templateUrl: 'views/contact.html',
  //       controller: 'ContactCtrl',
  //       controllerAs: 'contact'
  //     })
  //     .when('/my/route', {
  //       templateUrl: 'views/myroute.html',
  //       controller: 'MyrouteCtrl',
  //       controllerAs: 'myRoute'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
