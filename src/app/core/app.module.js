(function () {
  'use strict';

  angular
    .module('app', [
      // bower
      'restangular', 'ui.router', 'ngMaterial', 'angular-logger',
      // core
      'httpcalls',
      // components
      'malarkey', 'navbar',
      // modules
      'home']);

})();
