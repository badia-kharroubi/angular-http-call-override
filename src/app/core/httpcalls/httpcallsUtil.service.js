(function (angular) {
  'use strict';

  angular
    .module('app.httpcalls')
    .factory('httpcallsUtilService', httpcallsUtilService);

  /** @ngInject */
  function httpcallsUtilService() {
    var service = {
      isAsset: isAsset,
      isToOverride: isToOverride,
      getNewRequestUrl: getNewRequestUrl
    };

    return service;

    function isAsset(url) {
      var regexAsset = new RegExp('\.(html|js|css|ttf|woff|woff2|svg|png|ico)$', 'i');
      var regexConfig = new RegExp('\(index.config.js)((\\?)*)', 'i');
      return regexAsset.test(url) && !regexConfig.test(url);
    }

    function isToOverride(requestConfig, appConfig) {
      var httpcallsOverride = {};
      httpcallsOverride.override = false;
      httpcallsOverride.requestConfig = requestConfig;
      httpcallsOverride.httpcallsConfig = appConfig;
      if (httpcallsOverride.httpcallsConfig.httpcalls.override) {
        switch (httpcallsOverride.requestConfig.responseTech.requestMethod) {
          case 'get':
            if (httpcallsOverride.httpcallsConfig.httpcalls.httpGet.override) {
              httpcallsOverride.httpcallsConfig = appConfig.httpcalls.httpGet.configs;
              httpcallsOverride.override = true;
            }
            break;
          case 'post':
            if (httpcallsOverride.httpcallsConfig.httpcalls.httpPost.override) {
              httpcallsOverride.httpcallsConfig = appConfig.httpcalls.httpPost.configs;
              httpcallsOverride.override = true;
            }
            break;
          case 'put':
            if (httpcallsOverride.httpcallsConfig.httpcalls.httpPut.override) {
              httpcallsOverride.httpcallsConfig = appConfig.httpcalls.httpPut.configs;
              httpcallsOverride.override = true;
            }
            break;
          case 'delete':
            if (httpcallsOverride.httpcallsConfig.httpcalls.httpDelete.override) {
              httpcallsOverride.httpcallsConfig = appConfig.httpcalls.httpDelete.configs;
              httpcallsOverride.override = true;
            }
            break;
          default:
            break;
        }
      }
      // If override in APP_CONFIG is false so break
      if (!httpcallsOverride.override) {
        return httpcallsOverride;
      }
      // If not search if found matching url
      var httpcallsConfigLength = httpcallsOverride.httpcallsConfig.length;
      var httpCallConfigFound = false;
      for (var i = 0; i < httpcallsConfigLength; i++) {
        if (httpcallsOverride.httpcallsConfig[i].override) {
          var httpCallConfig = httpcallsOverride.httpcallsConfig[i];

          var regexCallString = '^(' + httpCallConfig.origin.protocol + ':\\/\\/' + httpCallConfig.origin.host + ':' +
            httpCallConfig.origin.port + '\\/)';
          var tokens = httpCallConfig.origin.endpoint.split('/');
          var tokensLenght = tokens.length - 1;
          for (var j = 0; j < tokensLenght; j++) {
            var token = tokens[j];
            if (token.startsWith('{')) {
              regexCallString += '([A-Za-z&0-9])*(\\/){1}';
            } else {
              regexCallString += '(' + token + '\\/){1}';
            }
          }
          token = tokens[tokensLenght]
          if (token.startsWith('{')) {
            regexCallString += '([A-Za-z&0-9])*$';
          } else {
            regexCallString += '(' + token + '){1}$';
          }
          var httpCallConfigRegex = new RegExp(regexCallString, 'i');
          if (httpCallConfigRegex.test(httpcallsOverride.requestConfig.responseTech.requestUrl)) {
            httpcallsOverride.httpcallsConfig = httpCallConfig;
            httpCallConfigFound = true;
          }
        }
        //if match one config then break
        if (httpCallConfigFound) {
          break;
        }
      }
      if (!httpCallConfigFound) {
        httpcallsOverride.override = false;
      }
      return httpcallsOverride;
    }

    function getNewRequestUrl(httpcallsOverride) {
      var targetEndpoint = httpcallsOverride.httpcallsConfig.target.endpoint;
      var targetPathParamsRegex = /{[a-z&]*}/ig;
      var resultRegex;
      var targetPathParam = [];

      while ((resultRegex = targetPathParamsRegex.exec(targetEndpoint)) !== null) {
        targetPathParam.push({param: resultRegex[0], value: ""});
      }
      httpcallsOverride.requestConfig.responseTech.requestUrlOverrided =
        httpcallsOverride.httpcallsConfig.target.protocol + '://' +
        httpcallsOverride.httpcallsConfig.target.host + ':' +
        httpcallsOverride.httpcallsConfig.target.port + '/';
      var targetPathParamLength = targetPathParam.length;
      //if path params search values
      if (targetPathParamLength > 0) {
        var urlPatern = httpcallsOverride.httpcallsConfig.origin.protocol + '://' +
          httpcallsOverride.httpcallsConfig.origin.host + ':' +
          httpcallsOverride.httpcallsConfig.origin.port + '/' +
          httpcallsOverride.httpcallsConfig.origin.endpoint;
        var requestUrl = httpcallsOverride.requestConfig.responseTech.requestUrl;
        var urlPaternTokens = urlPatern.split('/');
        var requestUrlTokens = requestUrl.split('/');
        var tokensLenght = urlPaternTokens.length;
        for (var i = 0; i < targetPathParamLength; i++) {
          for (var j = 0; j < tokensLenght; j++) {
            if (urlPaternTokens[j].startsWith('{')) {
              if (urlPaternTokens[j] === targetPathParam[i].param) {
                targetPathParam[i].value = requestUrlTokens[j];
                break;
              }
            }
          }
          targetEndpoint = targetEndpoint.replace(targetPathParam[i].param, targetPathParam[i].value);
        }
        httpcallsOverride.requestConfig.responseTech.requestUrlOverrided += targetEndpoint;
      } else {
        httpcallsOverride.requestConfig.responseTech.requestUrlOverrided +=
          httpcallsOverride.httpcallsConfig.target.endpoint;
      }
      return httpcallsOverride;
    }
  }

})(angular);
