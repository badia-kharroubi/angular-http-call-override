(function () {
  'use strict';

  angular
    .module('oracall.home')
    .factory('homeDemosService', homeDemosService);

  /** @ngInject */
  function homeDemosService($q, $http, $log) {
    return {
      getDemos: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('modules/home/home.demos.json');
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getDemos.' + angular.toJson(error.data, true));
        });
        return deferred.promise;
      }
    }
  }

})();
