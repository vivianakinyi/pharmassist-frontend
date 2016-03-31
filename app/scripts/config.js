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
  .module('pharmassistApp.config', [
    // "madeasy.auth",
    "ui.router"
  ])

  .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
        $httpProvider.defaults.headers.common = {
            "Content-Type": "application/json",
            "Accept": "application/json, */*"
        };
        // $httpProvider.interceptors.push(
        //     "madeasy.networking.interceptors.http");
        // $httpProvider.interceptors.push(
        //     "madeasy.networking.interceptors.httpactivity");
        // $httpProvider.interceptors.push(
        //     "madeasy.networking.interceptors.connection");
    }])

  // .run(["api.oauth2",function (oauth2) {
  //       oauth2.setXHRToken(oauth2.getToken());
  //   }])

  .config(["$stateProvider", function stateProviderFunction ($stateProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                views:{
                    "content@":{
                        templateUrl: "views/main.html",
                        controller: "MainCtrl"
                    }
                }
            }).state("about", {
                url: "/about",
                views:{
                    "content@":{
                        templateUrl: "views/about.html",
                        controller: "AboutCtrl"
                    }
                }
            }).state("contact", {
                url: "/contact",
                views:{
                    "content@":{
                        templateUrl: "views/contact.html",
                        controller: "ContactCtrl"
                    }
                }
            }).state("pharmacy", {
                url: "/pharmacy",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacy.html",
                        controller: "PharmacyCtrl"
                    }
                }
            }).state("pharmacy.detail", {
                url: "/pharmacy/:id",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacy_detail.html",
                        controller: "PharmacyDetailCtrl"
                    }
                }
            }).state("pharmacy.detail.drugs", {
                url: "/pharmacy/:id/drugs",
                views:{
                    "content@":{
                        templateUrl: "views/drugs.html",
                        controller: "DrugsDetailCtrl"
                    }
                }
            })
            .state("pharmacy.detail.drugs.add_drugs", {
                url: "/pharmacy/:id/drugs/add_drugs",
                views:{
                    "content@":{
                        templateUrl: "views/add_drugs.html",
                        controller: "DrugsCtrl"
                    }
                }
            }).state("search", {
                url: "/search",
                views:{
                    "content@":{
                        templateUrl: "views/search.html",
                        controller: "SearchCtrl"
                    }
                }
            }).state("search.results", {
                url: "/search/results/:drugID/:distID/:locID",
                views:{
                    "content@":{
                        templateUrl: "views/results.html",
                        controller: "SearchResultsCtrl"
                    }
                }
            }).state("search.results.map", {
                url: "/search/results/:drugID/:distID/:locID/map",
                views:{
                    "content@":{
                        templateUrl: "views/map.html",
                        controller: "MapCtrl",
                        controllerAs: "vm"
                    }
                }
            });
    }]);


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
  //      .when('/pharmacy/:id', {
  //       templateUrl: 'views/pharmacy_detail.html',
  //       controller: 'PharmacyDetailCtrl',
  //       controllerAs: 'pharmacyDetail'
  //     })
  //      .when('/pharmacy/:id/drugs', {
  //       templateUrl: 'views/drugs.html',
  //       controller: 'DrugsDetailCtrl',
  //       controllerAs: 'drugs'
  //     })
  //      .when('/pharmacy/:id/drugs/add_drugs', {
  //       templateUrl: 'views/add_drugs.html',
  //       controller: 'DrugsCtrl',
  //       controllerAs: 'drugs'
  //     })
  //     .when('/search', {
  //       templateUrl: 'views/search.html',
  //       controller: 'SearchCtrl',
  //       controllerAs: 'search'
  //     })
  //     .when('/search/results/:drugID/:distID/:locID', {
  //       templateUrl: 'views/results.html',
  //       controller: 'SearchResultsCtrl',
  //       controllerAs: 'search'
  //     })
  //     .when('/search/results/:drugID/:distID/:locID/map', {
  //       templateUrl: 'views/map.html',
  //       controller: 'MapCtrl as vm',
  //       controllerAs: 'map'
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
