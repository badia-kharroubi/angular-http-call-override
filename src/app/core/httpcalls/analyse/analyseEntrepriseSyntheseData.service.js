(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls.analyse')
    .factory('analyseEntrepriseSyntheseDataService', analyseEntrepriseSyntheseDataService);

  /** @ngInject */
  function analyseEntrepriseSyntheseDataService(analyseRestangularService, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpcalls.analyse');

    var apiHost = APP_CONFIG.httpcalls.analyseApiBase;

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
        var toReturn = {};
        toReturn.techdata = response.data.techdata;
        toReturn.data = response.data.data;
        toReturn.responseTech = response.responseTech

        return toReturn;
      }

      function getDataFailed(error) {
        logger.error("XHR Failed for analyseEntrepriseSyntheseDataService : %j", error.data);
      }
    }
  }

})(angular);
