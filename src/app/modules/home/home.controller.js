(function () {
  'use strict';

  angular
    .module('oracall.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(homeDemosService, $log) {
    var vm = this;

    vm.demos = [];
    activate();

    function activate() {
      getDemos();
    }

    function getDemos() {
      homeDemosService.getDemos()
        .then(function (response) {
          vm.demos = response.data.demos;
        }, function (error) {
          $log.error('Failed for getDemos.' + angular.toJson(error.data, true));
        });
    }

  }

})();
