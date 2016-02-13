(function (angular) {
  'use strict';

  angular
    .module('httpcalls.analyse')
    .factory('analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService',
      analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService);

  /** @ngInject */
  function analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService(analyseRestangularService,
                                                                         apiHostAnalyse, $log) {
    var logger = $log.getInstance('httpcalls-analyse');
    var apiHost = apiHostAnalyse;

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
        toReturn.techdata = response.techdata;
        toReturn.data = response.data;
        return toReturn;
      }

      function getDataFailed(error) {
        logger.error("XHR Failed for analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService : %j", error.data);
      }
    }
  }

})(angular);
