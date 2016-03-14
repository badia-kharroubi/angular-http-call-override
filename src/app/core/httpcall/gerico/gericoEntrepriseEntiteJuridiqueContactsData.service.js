(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactsDataService', gericoEntrepriseEntiteJuridiqueContactsDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactsDataService(gericoRestangularService, $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpCall.gerico');

    var apiHost = APP_CONFIG.httpCall.gericoApiBase;

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
        return {
          data: response.data.data,
          dataTech: response.data.dataTech,
          responseTech: response.responseTech
        };
      }

      function getDataFailed(error) {
        //return exception.catcher('XHR Failed for gericoEntrepriseEntiteJuridiqueContactsDataService')(error);
        logger.error("XHR Failed for gericoEntrepriseEntiteJuridiqueContactsDataService : %j", error.data);
      }
    }
  }

})(angular);
