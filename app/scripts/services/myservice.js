'use strict';

/**
 * @ngdoc service
 * @name pharmassistApp.myService
 * @description
 * # myService
 * Service in the pharmassistApp.
 */
angular.module('pharmassistApp')
  .service('myService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  })

  .service("apiService", ["$http", function ($http) {

        var e  = this;

        e.get = function (url) {
            return $http.get(url);
        };

        e.post = function (url, data) {
            return $http.post(url, data);
        };

        e.update = function (url, id, data) {
            var endPoint = url + id;
            return $http.patch(endPoint, data)
        };

  }]);
