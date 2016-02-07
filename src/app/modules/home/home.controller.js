(function () {
  'use strict';

  angular
    .module('oracall.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(homeDemosService, $log) {
    var vm = this;

    vm.demos = [];
    vm.demosResponses = [];
    vm.countit = 0;
    activate();

    function activate() {
      getDemos();
    }

    function getDemos() {
      homeDemosService.getDemos()
        .then(function (response) {
          vm.demos = response.data.demos;
          getGericoEntrepriseEntiteJuridiqueContacts();
          getGericoEntrepriseEntiteJuridiqueContact();
          getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee();
          getAnalyseEntrepriseSynthese();
          getGericoEntrepriseEntiteJuridiqueContactsQueryParam();
          getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee();
        }, function (error) {
          $log.error('Failed for getDemos.' + angular.toJson(error.data, true));
        });
    }

    function getGericoEntrepriseEntiteJuridiqueContacts() {
      if(!vm.demos[0].responseFunction) {
        vm.demos[0].responseFunction = getGericoEntrepriseEntiteJuridiqueContacts;
      }

      if(!vm.demos[0].callCount) {
        vm.demos[0].callCount = 0;
      }
      vm.demos[0].callCount++;
      $log.info('call getGericoEntrepriseEntiteJuridiqueContacts', vm.demos[0].callCount);
      homeDemosService.getGericoEntrepriseEntiteJuridiqueContacts()
        .then(function (response) {
          vm.demos[0].response = {};
          vm.demos[0].response = response;

        }, function (error) {
          $log.error('Failed for getGericoEntrepriseEntiteJuridiqueContacts.' +
            angular.toJson(error.data, true));
        });
    }

    function getGericoEntrepriseEntiteJuridiqueContact() {
      if(!vm.demos[1].responseFunction) {
        vm.demos[1].responseFunction = getGericoEntrepriseEntiteJuridiqueContact;
      }

      if(!vm.demos[1].callCount) {
        vm.demos[1].callCount = 0;
      }
      vm.demos[1].callCount++;
      $log.info('call getGericoEntrepriseEntiteJuridiqueContact', vm.demos[1].callCount);
      homeDemosService.getGericoEntrepriseEntiteJuridiqueContact()
        .then(function (response) {
          vm.demos[1].response = {};
          vm.demos[1].response = response;

        }, function (error) {
          $log.error('Failed for getGericoEntrepriseEntiteJuridiqueContact.' +
            angular.toJson(error.data, true));
        });
    }

    function getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee() {
      if(!vm.demos[2].responseFunction) {
        vm.demos[2].responseFunction = getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee;
      }

      if(!vm.demos[2].callCount) {
        vm.demos[2].callCount = 0;
      }
      vm.demos[2].callCount++;
      $log.info('call getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee', vm.demos[2].callCount);
      homeDemosService.getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee()
        .then(function (response) {
          vm.demos[2].response = {};
          vm.demos[2].response = response;

        }, function (error) {
          $log.error('Failed for getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee.' +
            angular.toJson(error.data, true));
        });
    }

    function getAnalyseEntrepriseSynthese() {
      if(!vm.demos[3].responseFunction) {
        vm.demos[3].responseFunction = getAnalyseEntrepriseSynthese;
      }

      if(!vm.demos[3].callCount) {
        vm.demos[3].callCount = 0;
      }
      vm.demos[3].callCount++;
      $log.info('call getAnalyseEntrepriseSynthese', vm.demos[3].callCount);
      homeDemosService.getAnalyseEntrepriseSynthese()
        .then(function (response) {
          vm.demos[3].response = {};
          vm.demos[3].response = response;

        }, function (error) {
          $log.error('Failed for getAnalyseEntrepriseSynthese.' + angular.toJson(error.data, true));
        });
    }

    function getGericoEntrepriseEntiteJuridiqueContactsQueryParam() {
      if(!vm.demos[4].responseFunction) {
        vm.demos[4].responseFunction = getGericoEntrepriseEntiteJuridiqueContactsQueryParam;
      }

      if(!vm.demos[4].callCount) {
        vm.demos[4].callCount = 0;
      }
      vm.demos[4].callCount++;
      $log.info('call getGericoEntrepriseEntiteJuridiqueContactsQueryParam', vm.demos[4].callCount);
      homeDemosService.getGericoEntrepriseEntiteJuridiqueContactsQueryParam()
        .then(function (response) {
          vm.demos[4].response = {};
          vm.demos[4].response = response;

        }, function (error) {
          $log.error('Failed for getGericoEntrepriseEntiteJuridiqueContactsQueryParam.' +
            angular.toJson(error.data, true));
        });
    }

    function getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee() {
      if(!vm.demos[5].responseFunction) {
        vm.demos[5].responseFunction = getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee;
      }

      if(!vm.demos[5].callCount) {
        vm.demos[5].callCount = 0;
      }
      vm.demos[5].callCount++;
      $log.info('call getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee', vm.demos[5].callCount);
      homeDemosService.getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee()
        .then(function (response) {
          vm.demos[5].response = {};
          vm.demos[5].response = response;

        }, function (error) {
          $log.error('Failed for getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee.' +
            angular.toJson(error.data, true));
        });
    }

  }

})();
