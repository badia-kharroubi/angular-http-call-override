(function () {
  'use strict';

  angular
    .module('oracall')
    .factory('oracallDemo', oracallDemo);

  /** @ngInject */
  function oracallDemo($log, $http) {
    var apiHost = 'oracallDemo.json';

    var service = {
      apiHost: apiHost,
      getDemos: getDemos
    };

    return service;

    function getDemos() {
      return $http.get(apiHost)
        .then(getDemosComplete)
        .catch(getDemosFailed);

      function getDemosComplete(response) {
        return response.data;
      }

      function getDemosFailed(error) {
        $log.error('XHR Failed for getDemos.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
