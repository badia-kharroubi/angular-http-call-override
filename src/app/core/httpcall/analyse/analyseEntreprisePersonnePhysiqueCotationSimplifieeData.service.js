(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.analyse')
    .factory('analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService',
      analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService);

  /** @ngInject */
  function analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService(analyseRestangularService,
                                                                         $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpCall.analyse');

    var apiHost = APP_CONFIG.httpCall.analyseApiBase;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData() {
      return analyseRestangularService.one('entreprise/personnes-physiques', 'E0102030405060708')
        .one('cotation-simplifiee').get()
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
        logger.error("XHR Failed for analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService : %j", error.data);
      }
    }
  }

})(angular);
