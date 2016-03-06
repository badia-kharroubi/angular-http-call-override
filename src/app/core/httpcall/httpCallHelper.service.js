(function (angular) {
  'use strict';

  angular
    .module('app.httpCall')
    .factory('httpCallHelperService', httpCallHelperService);

  /** @ngInject */
  function httpCallHelperService(httpCallUtilService) {
    var service = {
      isToOverride: isToOverride,
      getOverrideUrl: getOverrideUrl
    };

    return service;

    function isToOverride(requestMethod, requestUrl, httpCallConfig) {
      var result = {
        override: false,
        config: {}
      };
      // if APP_CONFIG.httpCall.override is false
      if (!httpCallConfig.override) {
        return result;
      }
      var httpMethodConfig = httpCallUtilService.getMethodConfigs(requestMethod, httpCallConfig);
      // if APP_CONFIG.httpCall.(httpGet/httpPost/httpPut/httpDelete).override is false
      if (!httpMethodConfig.override) {
        return result;
      }
      // search if found matching url
      var httpMethodConfigLength = httpMethodConfig.configs.length;
      for (var i = 0; i < httpMethodConfigLength; i++) {
        var config = httpMethodConfig.configs[i];
        if (!config.override) {
          continue;
        }
        var configRegexString = '^(' + config.origin.protocol + ':\\/\\/' + config.origin.host + ':' +
          config.origin.port + '\\/)';
        var tokens = config.origin.endpoint.split('/');
        var tokensLength = tokens.length - 1;
        for (var j = 0; j < tokensLength; j++) {
          configRegexString += httpCallUtilService.getRegexPart(tokens[j], false);
        }
        configRegexString += httpCallUtilService.getRegexPart(tokens[tokensLength], true);
        var httpCallConfigRegex = new RegExp(configRegexString, 'i');
        if (httpCallConfigRegex.test(requestUrl)) {
          result = {
            override: true,
            config: config
          };
          return result;
        }
      }
      return result;
    }

    function getOverrideUrl(requestUrl, urlOverrideConfig) {
      var targetEndpoint = urlOverrideConfig.target.endpoint;
      var targetPathParamsRegex = /{[a-z&]*}/ig;
      var resultRegex;
      var targetPathParam = [];
      while ((resultRegex = targetPathParamsRegex.exec(targetEndpoint)) !== null) {
        targetPathParam.push({param: resultRegex[0], value: ''});
      }
      var targetPathParamLength = targetPathParam.length;
      var targetUrl =
        urlOverrideConfig.target.protocol + '://' +
        urlOverrideConfig.target.host + ':' +
        urlOverrideConfig.target.port + '/';
      //if no path params
      if (targetPathParamLength < 1) {
        targetUrl += urlOverrideConfig.target.endpoint;
        return targetUrl;
      }
      //if path param
      var originUrlPattern = urlOverrideConfig.origin.protocol + '://' +
        urlOverrideConfig.origin.host + ':' +
        urlOverrideConfig.origin.port + '/' +
        urlOverrideConfig.origin.endpoint;
      var originUrlPatternTokens = originUrlPattern.split('/');
      var requestUrlTokens = requestUrl.split('/');
      var tokensLength = originUrlPatternTokens.length;
      for (var i = 0; i < targetPathParamLength; i++) {
        for (var j = 0; j < tokensLength; j++) {
          if (originUrlPatternTokens[j].startsWith('{') && originUrlPatternTokens[j] === targetPathParam[i].param) {
            targetPathParam[i].value = requestUrlTokens[j];
            break;
          }
        }
        targetEndpoint = targetEndpoint.replace(targetPathParam[i].param, targetPathParam[i].value);
      }
      return targetUrl + targetEndpoint;
    }
  }

})(angular);
