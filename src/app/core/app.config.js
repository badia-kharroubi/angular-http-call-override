(function () {
  'use strict';

  angular
    .module('app')
    .config(configLogger);

  // The logger Levels are :
  //   1. TRACE: displays all levels, is the finest output and only recommended during debugging
  //   2. DEBUG: display all but the finest logs, only recommended during develop stages
  //   3. INFO :  Show info, warn and error messages
  //   4. WARN :  Show warn and error messages
  //   5. ERROR: Show only error messages
  //   6. OFF  : Disable all logging, recommended for silencing noisy logging during debugging.
  //             *will* surpress errors logging.

  /** @ngInject */
  function configLogger(logEnhancerProvider, APP_CONFIG) {
    logEnhancerProvider.prefixPattern = APP_CONFIG.logger.prefixPattern;
    logEnhancerProvider.datetimePattern = APP_CONFIG.logger.datetimePattern;

    var logLevels = APP_CONFIG.logger.logLevels;


    for (var prop in logLevels) {
      switch (logLevels[prop]) {
        case "INFO" :
          logLevels[prop] = logEnhancerProvider.LEVEL.INFO;
          break;
        case "DEBUG" :
          logLevels[prop] = logEnhancerProvider.LEVEL.DEBUG;
          break;
        case "TRACE" :
          logLevels[prop] = logEnhancerProvider.LEVEL.TRACE;
          break;
        case "WARN" :
          logLevels[prop] = logEnhancerProvider.LEVEL.WARN;
          break;
        case "ERROR" :
          logLevels[prop] = logEnhancerProvider.LEVEL.ERROR;
          break;
        case "OFF" :
          logLevels[prop] = logEnhancerProvider.LEVEL.OFF;
          break;
        default :
          logLevels[prop] = logEnhancerProvider.LEVEL.INFO;
      }
    }
    logEnhancerProvider.logLevels = logLevels;
  }

})();
