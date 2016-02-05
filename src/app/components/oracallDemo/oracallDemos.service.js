(function () {
  'use strict';

  angular
    .module('oracall')
    .factory('oracallDemos', oracallDemos);

  /** @ngInject */
  function oracallDemos($q, $http, $log) {
    return {
      getDemos: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('data/oracallDemos.json');
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
