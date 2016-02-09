(function () {
  'use strict';

  angular
    .module('oracall')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, APP_CONFIG) {

    $log.debug('config from run : ',APP_CONFIG);
    $log.debug('runBlock end');
  }

})();
