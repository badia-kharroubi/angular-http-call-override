(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactsDataService', gericoEntrepriseEntiteJuridiqueContactsDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactsDataService(gericoRestangularService, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpcalls.gerico');

    var apiHost = APP_CONFIG.httpcalls.gericoApiBase;

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
        toReturn.techdata = response.data.techdata;
        toReturn.data = response.data.data;
        toReturn.responseTech = response.responseTech

        return toReturn;
      }

      function getDataFailed(error) {
        logger.error("XHR Failed for gericoEntrepriseEntiteJuridiqueContactsDataService : %j", error.data);
      }
    }
  }

})(angular);
