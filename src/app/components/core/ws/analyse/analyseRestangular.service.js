(function (angular) {
    'use strict';

    angular
        .module('oracall.core.ws.analyse')
        .factory('analyseRestangularService', analyseRestangularService);

    /** @ngInject */
    function analyseRestangularService(Restangular, apiHostAnalyse) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(apiHostAnalyse);
        });
    }

})(angular);
