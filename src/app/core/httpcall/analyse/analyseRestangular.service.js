(function (angular) {
  'use strict';

  angular
    .module('app.httpCall.analyse')
    .factory('analyseRestangularService', analyseRestangularService);

  /** @ngInject */
  function analyseRestangularService(Restangular, APP_CONFIG) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(APP_CONFIG.httpCall.analyseApiBase);
      RestangularConfigurer.setFullResponse(true);
    });
  }

})(angular);
