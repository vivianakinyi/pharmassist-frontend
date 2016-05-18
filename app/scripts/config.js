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
    "ui.router"
  ])

  .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
        $httpProvider.defaults.headers.common = {
            "Content-Type": "application/json",
            "Accept": "application/json, */*"
        };

    }])
    .run(function(djangoAuth){
      djangoAuth.initialize('http://localhost:8000/rest-auth', false);
    })
    .run(function($cookies){
    // Let's retrieve the token from the cookie, if available
        if($cookies.token){
            $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
        }
    })

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  })


  .config(["$stateProvider", function stateProviderFunction ($stateProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                views:{
                    "content@":{
                        templateUrl: "views/home.html",
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
                url: "/register",
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
            .state("passwordChange", {
                url: "/passwordChange",
                views:{
                    "content@":{
                        templateUrl: "views/passwordchange.html",
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
            .state("about", {
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
            }).state("pharmacy_login", {
                url: "/pharmacy_login",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacy_login.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("pharmacy", {
                url: "/pharmacy/:username",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacy.html",
                        controller: "PharmacyCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("pharmacy.detail", {
                url: "/:id",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacy_detail.html",
                        controller: "PharmacyDetailCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("pharmacy.detail.drugs", {
                url: "/drugs",
                views:{
                    "content@":{
                        templateUrl: "views/drugs.html",
                        controller: "DrugsDetailCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("pharmacy.detail.drugs.add_drugs", {
                url: "/add_drugs",
                views:{
                    "content@":{
                        templateUrl: "views/add_drugs.html",
                        controller: "DrugsCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("userProfile", {
                url: '/userProfile',
                views:{
                    "content@":{
                        templateUrl: "views/userprofile.html",
                        resolve: {
                              authenticated: ['djangoAuth', function(djangoAuth){
                                return djangoAuth.authenticationStatus();
                              }],
                            }
                    }
                }
            })
            .state("search", {
                url: "/search",
                views:{
                    "content@":{
                        templateUrl: "views/search.html",
                        controller: "SearchCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("search.results", {
                url: "/results/:drugID/:distID/:locID",
                views:{
                    "content@":{
                        templateUrl: "views/results.html",
                        controller: "SearchResultsCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("search.results.map", {
                url: "/map",
                views:{
                    "content@":{
                        templateUrl: "views/map.html",
                        controller: "MapCtrl",
                        controllerAs: "vm",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("admin", {
                url: "/admin",
                views:{
                    "content@":{
                        templateUrl: "views/admin.html",
                        controller: "AdminCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("admin_login", {
                url: "/admin_login",
                views:{
                    "content@":{
                        templateUrl: "views/admin_login.html",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            })
            .state("admin.pharmacies", {
                url: "/pharmacies",
                views:{
                    "content@":{
                        templateUrl: "views/pharmacies.html",
                        controller: "AdminCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("admin.reports", {
                url: "/reports",
                views:{
                    "content@":{
                        templateUrl: "views/reports.html",
                        controller: "ReportCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("admin.analytics", {
                url: "/analytics",
                views:{
                    "content@":{
                        templateUrl: "views/analytics.html",
                        controller: "AnalyticsCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            }).state("admin.prices", {
                url: "/prices",
                views:{
                    "content@":{
                        templateUrl: "views/prices.html",
                        controller: "PricesCtrl",
                        resolve: {
                          authenticated: ['djangoAuth', function(djangoAuth){
                            return djangoAuth.authenticationStatus();
                          }],
                        }
                    }
                }
            });
    }]);
