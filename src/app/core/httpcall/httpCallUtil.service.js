(function (angular) {
  'use strict';

  angular
    .module('app.httpCall')
    .factory('httpCallUtilService', httpCallUtilService);

  /** @ngInject */
  function httpCallUtilService() {
    var service = {
      isAsset: isAsset,
      setRevisionToQueryParams: setRevisionToQueryParams,
      getRegexPart: getRegexPart,
      getMethodConfigs: getMethodConfigs
    };

    return service;

    function isAsset(url) {
      var regexAsset = new RegExp('\.(html|js|css|ttf|woff|woff2|svg|png|ico)$', 'i');
      var regexConfig = new RegExp('\(index.config.js)((\\?)*)', 'i');
      return regexAsset.test(url) && !regexConfig.test(url);
    }

    function setRevisionToQueryParams(params) {
      var rev = new Date().getTime().toString();
      if (angular.isUndefined(params)) {
        return {'rev': rev};
      }
      params['rev'] = rev;
      return params;
    }

    function getRegexPart(token, isLast) {
      if (isLast) {
        return token.startsWith('{') ? '([A-Za-z&0-9])*$' : '(' + token + '){1}$';
      }
      return token.startsWith('{') ? '([A-Za-z&0-9])*(\\/){1}' : '(' + token + '\\/){1}';
    }

    function getMethodConfigs(requestMethod, httpCallConfig) {
      switch (requestMethod) {
        case 'get':
          return httpCallConfig.httpGet;
        case 'post':
          return httpCallConfig.httpPost;
        case 'put':
          return httpCallConfig.httpPut;
        case 'delete':
          return httpCallConfig.httpDelete;
        default:
          return {};
      }
    }
  }

})(angular);
