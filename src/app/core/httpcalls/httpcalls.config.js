(function () {
  'use strict';

  angular
    .module('app.httpcalls')
    .config(configHttpcalls);

  /** @ngInject */
  function configHttpcalls($httpProvider) {
      $httpProvider.interceptors.push('httpcallsInterceptorService');
  }

})();
