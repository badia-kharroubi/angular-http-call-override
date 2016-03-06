(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(homeDemosService, $log) {
    var logger = $log.getInstance('app.home');

    var vm = this;
    vm.tech = {
      controllerName: "home",
      controllerVersion: "0.0.5",
      fns: {},
      vars: {}
    };

    // Declare tech variables
    vm.tech.vars.dataTypes = [
      'gericoEntrepriseEntiteJuridiqueContacts',
      'gericoEntrepriseEntiteJuridiqueContact',
      'analyseEntrepriseEntiteJuridiqueCotationSimplifiee',
      'analyseEntrepriseSynthese',
      'gericoEntrepriseEntiteJuridiqueContactsQueryParam',
      'analyseEntreprisePersonnePhysiqueCotationSimplifiee'
    ];

    // Declare business variables
    vm.viewdata = {};
    vm.viewdata.demos = [];

    // Declare tech functions
    vm.tech.fns.getHttpCalls = function (demoIndex, dataType) {
      if (!vm.viewdata.demos[demoIndex].callCount) {
        vm.viewdata.demos[demoIndex].callCount = 0;
      }
      if (!vm.viewdata.demos[demoIndex].dataType) {
        vm.viewdata.demos[demoIndex].dataType = dataType;
      }
      vm.viewdata.demos[demoIndex].callCount++;
      logger.debug("Calling %s time(s) getHttpCalls[%s].", vm.viewdata.demos[demoIndex].callCount, dataType);
      homeDemosService.homeResolvePromiseData(dataType)
        .then(function (response) {
          vm.viewdata.demos[demoIndex].response = {};
          vm.viewdata.demos[demoIndex].response = response;
        }, function (error) {
          logger.error("Calling %s time(s) getHttpCalls[%s] : %j",
            vm.viewdata.demos[demoIndex].callCount, dataType, error.data, error.data);
        });
    };

    //Start
    start();

    function start() {
      homeDemosService.homeResolvePromiseData('demos')
        .then(function (response) {
          vm.viewdata.demos = response.data.demos;
          for (var i = 0, tot = vm.viewdata.demos.length; i < tot; i++) {
            vm.tech.fns.getHttpCalls(i, vm.tech.vars.dataTypes[i]);
          }
        }, function (error) {
          logger.error("Failed to start : %j", error.data, error.data);
        });
    }
  }

})();
