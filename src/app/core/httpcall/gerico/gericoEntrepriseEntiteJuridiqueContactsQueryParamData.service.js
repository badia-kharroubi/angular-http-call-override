(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService',
      gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService(gericoRestangularService,
                                                                        $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpCall.gerico');

    var apiHost = APP_CONFIG.httpCall.gericoApiBase;

    var dataService = {
      apiHost: apiHost,
      getData: getData
    };

    return dataService;

    function getData() {
      return gericoRestangularService.one('entreprise/entites-juridiques', 'E0102030405060708')
        .one('contacts').get({param1: 'param1value'})
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
        logger.error("XHR Failed for gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService : %j", error.data);
      }
    }
  }

})(angular);
