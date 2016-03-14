(function () {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception($q, $log, _) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message, module) {
      return function (error) {
        if (!module) {
          module = 'app';
        }
        var logger = $log.getInstance(module);
        var newMessage = message;
        if (error.config && error.config.responseTech) {
          error.responseTech = error.config.responseTech;
          error.config = _.omit(error.config, 'responseTech');
          error.responseTech.responseHttpStatus = error.status;
          error.responseTech.responseHttpStatusText = "KO";
          error = _.omit(error, 'status');
          error = _.omit(error, 'statusText');
          switch (error.responseTech.responseHttpStatus) {
            case -1:
              error.responseTech.responseHttpStatusText = "ERROR: No communication with server";
              break;
            case 400:
              error.responseTech.responseHttpStatusText = "ERROR: Not Authorized";
              break;

          }
        }
        logger.error(newMessage + '%j', error, error);
        return $q.reject(error);
      };
    }
  }
})();
