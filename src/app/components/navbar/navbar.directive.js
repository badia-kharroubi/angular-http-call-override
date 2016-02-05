(function () {
  'use strict';

  angular
    .module('oracall')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controllerAs: 'vm',
      bindToController: false
    };

    return directive;
  }

})();
