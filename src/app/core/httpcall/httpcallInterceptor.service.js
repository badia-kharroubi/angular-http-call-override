(function (angular) {
  'use strict';

  angular
    .module('app.httpCall')
    .factory('httpCallInterceptorService', httpCallInterceptorService);

  /** @ngInject */
  function httpCallInterceptorService($log, APP_CONFIG, httpCallHelperService, httpCallUtilService, _) {
    var logger = $log.getInstance('app.httpCall');

    var service = {
      request: interceptRequest,
      response: interceptResponse
    };

    return service;

    function interceptRequest(config) {
      config.responseTech = {
        requestTimestamp: new Date().getTime(),
        requestUrl: config.url,
        requestParams: config.params,
        requestMethod: config.method.toLocaleLowerCase(),
        requestHeaders: config.headers
      };
      // if asset then nothing to do else add revision query param
      // to force no browser cache
      if (httpCallUtilService.isAsset(config.responseTech.requestUrl)) {
        return config;
      }
      config.params = httpCallUtilService.setRevisionToQueryParams(config.params);
      config.responseTech.requestParams = config.params;
      config.responseTech.httpCallOverrideBeginTimestamp = new Date().getTime();
      var urlOverrideConfig =httpCallHelperService.isToOverride(config.responseTech.requestMethod,
        config.responseTech.requestUrl, APP_CONFIG.httpCall);
      if (urlOverrideConfig.override) {
        logger.debug('Found urlOverrideConfig for url(%s) : %j',
          config.responseTech.requestUrl, urlOverrideConfig.config, urlOverrideConfig.config);
        config.responseTech.requestUrlOverride = httpCallHelperService.getOverrideUrl(
          config.responseTech.requestUrl, urlOverrideConfig.config);
        config.url = config.responseTech.requestUrlOverride;
        config.responseTech.httpCallOverrideEndTimestamp = new Date().getTime();
        var time = (config.responseTech.httpCallOverrideEndTimestamp -
          config.responseTech.httpCallOverrideBeginTimestamp) / 1000;
        if (APP_CONFIG.httpCall.timestampMarker) {
          logger.info('httpCallInterceptorService override in %s seconds %j', time, config.responseTech, config.responseTech);
        }
      }
      return config;
    }

    function interceptResponse(response) {
      response.responseTech = {
        responseTimestamp: new Date().getTime(),
        responseHttpStatus: response.status,
        responseHttpStatusText: response.statusText
      };
      _.assignIn(response.responseTech, response.config.responseTech);
      response.config = _.omit(response.config, 'responseTech');
      var time = (response.responseTech.responseTimestamp - response.responseTech.requestTimestamp) / 1000;
      // Warn if http call more than 1 second
      if (time > 1) {
        logger.warn('XHR Success in %s seconds %j', time, response, response);
      }
      if (APP_CONFIG.httpCall.timestampMarker) {
        logger.info('XHR Success in %s seconds %j', time, response, response);
      }
      return response;
    }
  }

})(angular);
