(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls.gerico')
    .factory('gericoRestangularService', gericoRestangularService);

  /** @ngInject */
  function gericoRestangularService(Restangular, $log, APP_CONFIG) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(APP_CONFIG.httpcalls.gericoApiBase);
      RestangularConfigurer.setFullResponse(true);
    });
  }

})(angular);
