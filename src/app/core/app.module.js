(function () {
  'use strict';

  angular
    .module('app', [
      // bower_components
      'restangular', 'ui.router', 'ngMaterial', 'angular-logger',
      // src/app/blocks

      // src/app/components
      'malarkey', 'navbar',
      // src/app/core
      'app.httpCall',
      // src/app/modules
      'app.home']);

})();
