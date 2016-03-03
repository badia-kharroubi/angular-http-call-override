(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls')
    .factory('httpcallsInterceptorService', httpcallsInterceptorService);

  /** @ngInject */
  function httpcallsInterceptorService($log, APP_CONFIG, httpcallsUtilService) {
    var logger = $log.getInstance('app.httpcalls');

    var service = {
      request: interceptRequest,
      response: interceptResponse
    };

    return service;


    function interceptRequest(config) {
        config.responseTech = {};
        config.responseTech.requestTimestamp = new Date().getTime();
        config.responseTech.requestUrl = config.url;
        config.responseTech.requestParams = config.params;
        config.responseTech.requestMethod = config.method.toLocaleLowerCase();
        config.responseTech.requestHeaders = config.headers;
        // if asset then nothing to do else add revision query param
        // to force no browser cache
        if (httpcallsUtilService.isAsset(config.responseTech.requestUrl)) {
          return config;
        } else {
          if(config.params) {
          config.params['rev']=config.responseTech.requestTimestamp.toString();
          } else {
            config.params = {"rev":config.responseTech.requestTimestamp.toString()};
          }
        }
        config.responseTech.httpcallsOverrideBeginTimestamp = new Date().getTime();
        var httpcallsOverride = httpcallsUtilService.isToOverride(config, APP_CONFIG);
        if (httpcallsOverride.override) {
          logger.debug('Found httpcallsConfig to override url(%s) : %j',
            config.responseTech.requestUrl, httpcallsOverride.httpcallsConfig, httpcallsOverride.httpcallsConfig);
          httpcallsOverride = httpcallsUtilService.getNewRequestUrl(httpcallsOverride);
          config = httpcallsOverride.requestConfig;
          config.responseTech.httpcallsOverrideEndTimestamp = new Date().getTime();
          if (APP_CONFIG.httpcalls.timestampMarker) {
            var time = (config.responseTech.httpcallsOverrideEndTimestamp -
              config.responseTech.httpcallsOverrideBeginTimestamp) / 1000;
            logger.info('httpcallInterceptorService override in %s seconds %j', time, config.responseTech, config.responseTech);
          }
        }
        return config;
      }

      function interceptResponse(response) {
        response.responseTech = response.config.responseTech;
        response.responseTech.responseTimestamp = new Date().getTime();
        response.responseTech.responseHttpStatus = response.status;
        response.responseTech.responseHttpStatusText = response.statusText;

        if (APP_CONFIG.httpcalls.timestampMarker) {
          var time = (response.responseTech.responseTimestamp - response.responseTech.requestTimestamp) / 1000;
          logger.info('XHR Success in %s seconds %j', time, response.responseTech, response.responseTech);
        }
        return response;
      }
  }

})(angular);
