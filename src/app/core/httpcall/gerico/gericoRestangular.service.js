(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.gerico')
    .factory('gericoRestangularService', gericoRestangularService);

  /** @ngInject */
  function gericoRestangularService(Restangular, $log, APP_CONFIG) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(APP_CONFIG.httpCall.gericoApiBase);
      RestangularConfigurer.setFullResponse(true);
    });
  }

})(angular);
