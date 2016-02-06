(function () {
  'use strict';

  angular
    .module('oracall.core.navbar')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/core/navbar/navbar.html',
      controllerAs: 'vm',
      bindToController: false
    };
    return directive;
  }

})();
