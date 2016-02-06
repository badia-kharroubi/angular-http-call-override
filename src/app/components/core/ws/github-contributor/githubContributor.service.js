(function () {
  'use strict';

  angular
    .module('oracall.core.ws.githubContributor')
    .factory('githubContributorService', githubContributorService);

  /** @ngInject */
  function githubContributorService($log, $http) {
    var apiHost = 'https://api.github.com/repos/badia-kharroubi/oracall';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 10;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.' + angular.toJson(error.data, true));
      }
    }
  }

})();
