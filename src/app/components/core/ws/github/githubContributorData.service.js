(function () {
  'use strict';

  angular
    .module('oracall.core.ws.github')
    .factory('githubContributorDataService', githubContributorDataService);

  /** @ngInject */
  function githubContributorDataService($http, apiHostGithub, $log) {
    var apiHost = apiHostGithub;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData(limit) {
      if (!limit) {
        limit = 10;
      }

      return $http.get(apiHost + '/repos/badia-kharroubi/oracall/contributors?per_page=' + limit)
        .then(getDataComplete)
        .catch(getDataFailed);

      function getDataComplete(response) {
        return response.data;
      }

      function getDataFailed(error) {
        $log.error('XHR Failed for getContributors.' + angular.toJson(error.data, true));
      }
    }
  }

})();
