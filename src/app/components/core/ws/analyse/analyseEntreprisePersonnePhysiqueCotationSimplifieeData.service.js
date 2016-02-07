(function (angular) {
  'use strict';

  angular
    .module('oracall.core.ws.analyse')
    .factory('analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService',
      analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService);

  /** @ngInject */
  function analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService(analyseRestangularService,
                                                                         apiHostAnalyse, $log) {
    var apiHost = apiHostAnalyse;

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
        var toReturn = {};
        toReturn.techdata = response.techdata;
        toReturn.data = response.data;
        return toReturn;
      }

      function getDataFailed(error) {
        $log.error('XHR Failed for analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService.' +
          angular.toJson(error.data, true));
      }
    }
  }

})(angular);
