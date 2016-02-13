(function (angular) {
    'use strict';

    angular
        .module('httpcalls.analyse')
        .factory('analyseRestangularService', analyseRestangularService);

    /** @ngInject */
    function analyseRestangularService(Restangular, apiHostAnalyse) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(apiHostAnalyse);
        });
    }

})(angular);
