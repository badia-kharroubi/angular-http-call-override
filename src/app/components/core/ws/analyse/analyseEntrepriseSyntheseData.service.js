(function (angular) {
  'use strict';

  angular
    .module('oracall.core.ws.analyse')
    .factory('analyseEntrepriseSyntheseDataService', analyseEntrepriseSyntheseDataService);

  /** @ngInject */
  function analyseEntrepriseSyntheseDataService(analyseRestangularService, apiHostAnalyse, $log) {
    var apiHost = apiHostAnalyse;

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
        toReturn.techdata = response.techdata;
        toReturn.data = response.data;
        return toReturn;
      }

      function getDataFailed(error) {
        $log.error('XHR Failed for analyseEntrepriseSyntheseDataService.' + angular.toJson(error.data, true));
      }
    }
  }

})(angular);
