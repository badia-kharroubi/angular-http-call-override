(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.analyse')
    .factory('analyseEntrepriseSyntheseDataService', analyseEntrepriseSyntheseDataService);

  /** @ngInject */
  function analyseEntrepriseSyntheseDataService(analyseRestangularService, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpCall.analyse');

    var apiHost = APP_CONFIG.httpCall.analyseApiBase;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData() {
      return analyseRestangularService.one('entreprise/synthese').get()
        .then(getDataComplete)
        .catch(getDataFailed);

      function getDataComplete(response) {
        return {
          data: response.data.data,
          dataTech: response.data.dataTech,
          responseTech: response.responseTech
        };
      }

      function getDataFailed(error) {
        logger.error("XHR Failed for analyseEntrepriseSyntheseDataService : %j", error.data);
      }
    }
  }

})(angular);
