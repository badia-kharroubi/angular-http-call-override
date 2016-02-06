(function () {
  'use strict';

  angular
    .module('oracall')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
