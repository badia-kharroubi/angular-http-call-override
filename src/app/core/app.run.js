(function () {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, APP_CONFIG) {
    var logger = $log.getInstance('app');

    logger.debug("config from runBlock : %j", APP_CONFIG, APP_CONFIG);
  }

})();
