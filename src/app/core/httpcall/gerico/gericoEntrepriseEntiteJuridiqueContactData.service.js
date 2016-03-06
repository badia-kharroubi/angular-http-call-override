(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactDataService', gericoEntrepriseEntiteJuridiqueContactDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactDataService(gericoRestangularService, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpCall.gerico');

    var apiHost = APP_CONFIG.httpCall.gericoApiBase;

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
        toReturn.techdata = response.data.techdata;
        toReturn.data = response.data.data;
        toReturn.responseTech = response.responseTech

        return toReturn;
      }

      function getDataFailed(error) {
        logger.error("XHR Failed for gericoEntrepriseEntiteJuridiqueContactDataService : %j", error.data);
      }
    }
  }

})(angular);
