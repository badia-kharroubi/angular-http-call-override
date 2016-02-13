(function (angular) {
  'use strict';

  angular
    .module('httpcalls.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactsDataService', gericoEntrepriseEntiteJuridiqueContactsDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactsDataService(gericoRestangularService, apiHostGerico, $log) {
    var apiHost = apiHostGerico;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData() {
      return gericoRestangularService.one('entreprise/entites-juridiques', 'E0102030405060708')
        .one('contacts').get()
        .then(getDataComplete)
        .catch(getDataFailed);

      function getDataComplete(response) {
        var toReturn = {};
        toReturn.techdata = response.techdata;
        toReturn.data = response.data;
        return toReturn;
      }

      function getDataFailed(error) {
        $log.error('XHR Failed for gericoEntrepriseEntiteJuridiqueContactsDataService.' +
          angular.toJson(error.data, true));
      }
    }
  }

})(angular);
