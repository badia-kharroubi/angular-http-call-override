(function () {
  'use strict';

  angular
    .module('app.httpcalls.github')
    .factory('githubContributorDataService', githubContributorDataService);

  /** @ngInject */
  function githubContributorDataService($http, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpcalls.github');

    var apiHost = APP_CONFIG.httpcalls.githubApiBase;

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
        logger.error("XHR Failed for githubContributorDataService : %j", error.data);
      }
    }
  }

})();
