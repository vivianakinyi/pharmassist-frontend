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
    .run(function(djangoAuth){
      djangoAuth.initialize('http://localhost:8000/rest-auth', false);
    })

  // .run(["api.oauth2",function (oauth2) {
  //       oauth2.setXHRToken(oauth2.getToken());
  //   }])

  // .config(["$urlRouterProvider", function ($urlRouterProvider) {
  //       $urlRouterProvider.otherwise("/");

  .config(["$stateProvider", function stateProviderFunction ($stateProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                views:{
                    "content@":{
                        templateUrl: "views/main.html",
                        controller: "MainCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("register", {
                url: "register",
                views:{
                    "content@":{
                        templateUrl: "views/register.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("passwordReset", {
                url: "/passwordReset",
                views:{
                    "content@":{
                        templateUrl: "views/passwordreset.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("passwordResetConfirm", {
                url: "/passwordResetConfirm/:firstToken/:passwordResetToken",
                views:{
                    "content@":{
                        templateUrl: "views/passwordresetconfirm.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("login", {
                url: "/login",
                views:{
                    "content@":{
                        templateUrl: "views/login.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("verifyEmail", {
                url: "/verifyEmail/:emailVerificationToken",
                views:{
                    "content@":{
                        templateUrl: "views/verifyemail.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("logout", {
                url: "/logout",
                views:{
                    "content@":{
                        templateUrl: "views/logout.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("home", {
                url: "/home",
                views:{
                    "content@":{
                        templateUrl: "views/home.html",
                        controller: "MainCtrl",

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
                url: "/:id",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacy_detail.html",
                        controller: "PharmacyDetailCtrl"
                    }
                }
            }).state("pharmacy.detail.drugs", {
                url: "/drugs",
                views:{
                    "content@":{
                        templateUrl: "views/drugs.html",
                        controller: "DrugsDetailCtrl"
                    }
                }
            })
            .state("pharmacy.detail.drugs.add_drugs", {
                url: "/add_drugs",
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
                url: "/results/:drugID/:distID/:locID",
                views:{
                    "content@":{
                        templateUrl: "views/results.html",
                        controller: "SearchResultsCtrl"
                    }
                }
            }).state("search.results.map", {
                url: "/map",
                views:{
                    "content@":{
                        templateUrl: "views/map.html",
                        controller: "MapCtrl",
                        controllerAs: "vm"
                    }
                }
            }).state("admin", {
                url: "/admin",
                views:{
                    "content@":{
                        templateUrl: "views/admin.html",
                        controller: "AdminCtrl"
                    }
                }
            }).state("admin.pharmacies", {
                url: "/pharmacies",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacies.html",
                        controller: "AdminCtrl"
                    }
                }
            }).state("admin.reports", {
                url: "/reports",
                views:{
                    "content@":{
                        templateUrl: "views/reports.html",
                        controller: "ReportCtrl"
                    }
                }
            }).state("admin.analytics", {
                url: "/analytics",
                views:{
                    "content@":{
                        templateUrl: "views/analytics.html",
                        controller: "AnalyticsCtrl"
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
