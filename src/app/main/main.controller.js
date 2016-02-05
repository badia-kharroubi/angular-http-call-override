(function () {
  'use strict';

  angular
    .module('oracall')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(oracallDemos, $log) {
    var vm = this;

    vm.oracallDemos = [];

    activate();

    function activate() {

      getOracallDemos();
    }

    function getOracallDemos() {
      oracallDemos.getDemos()
        .then(function (response) {
          vm.oracallDemos = response.data.demos;
        }, function (error) {
          $log.error('Failed for getDemos.' + angular.toJson(error.data, true));
        });
    }

  }
})();
