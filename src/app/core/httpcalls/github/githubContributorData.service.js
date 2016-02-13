(function () {
  'use strict';

  angular
    .module('httpcalls.github')
    .factory('githubContributorDataService', githubContributorDataService);

  /** @ngInject */
  function githubContributorDataService($http, apiHostGithub, $log) {
    var logger = $log.getInstance('httpcalls.github');

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
        logger.error("XHR Failed : %j", error.data);
      }
    }
  }

})();
