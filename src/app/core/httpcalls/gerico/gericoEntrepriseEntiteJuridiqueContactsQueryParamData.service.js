(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls.gerico')
    .factory('gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService',
      gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService);

  /** @ngInject */
  function gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService(gericoRestangularService,
                                                                        $log, APP_CONFIG) {
    var logger = $log.getInstance('app.httpcalls.gerico');

    var apiHost = APP_CONFIG.httpcalls.gericoApiBase;

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
        var toReturn = {};
        toReturn.techdata = response.data.techdata;
        toReturn.data = response.data.data;
        toReturn.responseTech = response.responseTech

        return toReturn;
      }

      function getDataFailed(error) {
        logger.error("XHR Failed for gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService : %j", error.data);
      }
    }
  }

})(angular);
