(function () {
  'use strict';

  angular
    .module('app.httpCall.github')
    .factory('githubContributorDataService', githubContributorDataService);

  /** @ngInject */
  function githubContributorDataService($http, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpCall.github');

    var apiHost = APP_CONFIG.httpCall.githubApiBase;

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
