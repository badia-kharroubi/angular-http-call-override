(function (angular) {
    'use strict';

    angular
        .module('httpcalls.gerico')
        .factory('gericoRestangularService', gericoRestangularService);

    /** @ngInject */
    function gericoRestangularService(Restangular, apiHostGerico) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(apiHostGerico);
        });
    }

})(angular);