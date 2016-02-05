(function () {
  'use strict';

  angular
    .module('oracall')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(webDevTec, oracallDemo) {
    var vm = this;

    vm.awesomeThings = [];

    activate();

    function activate() {
      getWebDevTec();
    }

    function getOracallDemo() {
      vm.awesomeThings = oracallDemo.getDemos();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
