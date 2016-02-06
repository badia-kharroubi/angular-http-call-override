(function () {
  'use strict';

  angular
    .module('oracall')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    //$mdThemingProvider.theme('default').dark();
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
