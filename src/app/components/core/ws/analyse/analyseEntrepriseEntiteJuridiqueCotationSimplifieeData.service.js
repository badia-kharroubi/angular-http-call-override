(function (angular) {
  'use strict';

  angular
    .module('oracall.core.ws.analyse')
    .factory('analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService',
      analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService);

  /** @ngInject */
  function analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService(analyseRestangularService,
                                                                         apiHostAnalyse, $log) {
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
        $log.error('XHR Failed for analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService.' +
          angular.toJson(error.data, true));
      }
    }
  }

})(angular);
