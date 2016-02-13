(function (angular) {
  'use strict';

  angular
    .module('httpcalls.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactDataService', gericoEntrepriseEntiteJuridiqueContactDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactDataService(gericoRestangularService, apiHostGerico, $log) {
    var apiHost = apiHostGerico;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData() {
      return gericoRestangularService.one('entreprise/entites-juridiques', 'E0102030405060708')
        .one('contacts','23').get()
        .then(getDataComplete)
        .catch(getDataFailed);

      function getDataComplete(response) {
        var toReturn = {};
        toReturn.techdata = response.techdata;
        toReturn.data = response.data;
        return toReturn;
      }

      function getDataFailed(error) {
        $log.error('XHR Failed for gericoEntrepriseEntiteJuridiqueContactDataService.' +
          angular.toJson(error.data, true));
      }
    }
  }

})(angular);
