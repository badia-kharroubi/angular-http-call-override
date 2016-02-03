(function () {
  'use strict';

  angular
    .module('oracall')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
