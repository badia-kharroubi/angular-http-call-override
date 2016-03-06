(function () {
  'use strict';

  angular
    .module('app.httpCall')
    .config(configHttpCall);

  /** @ngInject */
  function configHttpCall($httpProvider) {
      $httpProvider.interceptors.push('httpCallInterceptorService');
  }

})();
