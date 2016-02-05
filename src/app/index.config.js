(function () {
  'use strict';

  angular
    .module('oracall')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
