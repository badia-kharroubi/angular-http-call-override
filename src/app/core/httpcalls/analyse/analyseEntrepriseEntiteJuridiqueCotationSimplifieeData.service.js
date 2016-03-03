(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls.analyse')
    .factory('analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService',
      analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService);

  /** @ngInject */
  function analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService(analyseRestangularService,
                                                                         $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpcalls.analyse');

    var apiHost = APP_CONFIG.httpcalls.analyseApiBase;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData() {
      return analyseRestangularService.one('entreprise/entites-juridiques', 'E0102030405060708')
        .one('cotation-simplifiee').get()
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
        logger.error("XHR Failed for analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService : %j", error.data);
      }
    }
  }

})(angular);
