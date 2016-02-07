(function () {
  'use strict';

  angular
    .module('oracall.home')
    .factory('homeDemosService', homeDemosService);

  /** @ngInject */
  function homeDemosService($q, $http, $log,
                            gericoEntrepriseEntiteJuridiqueContactsDataService,
                            gericoEntrepriseEntiteJuridiqueContactDataService,
                            analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService,
                            analyseEntrepriseSyntheseDataService,
                            gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService,
                            analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService) {
    return {
      getDemos: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('modules/home/home.demos.json');
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getDemos.' + angular.toJson(error.data, true));
        });
        return deferred.promise;
      },
      getGericoEntrepriseEntiteJuridiqueContacts: function () {
        var deferred = $q.defer(),
          httpPromise = gericoEntrepriseEntiteJuridiqueContactsDataService.getData();
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getGericoEntrepriseEntiteJuridiqueContacts.' +
            angular.toJson(error.data, true));
        });
        return deferred.promise;
      },
      getGericoEntrepriseEntiteJuridiqueContact: function () {
        var deferred = $q.defer(),
          httpPromise = gericoEntrepriseEntiteJuridiqueContactDataService.getData();
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getGericoEntrepriseEntiteJuridiqueContact.' +
            angular.toJson(error.data, true));
        });
        return deferred.promise;
      },
      getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee: function () {
        var deferred = $q.defer(),
          httpPromise = analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService.getData();
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getAnalyseEntrepriseEntiteJuridiqueCotationSimplifiee.' +
            angular.toJson(error.data, true));
        });
        return deferred.promise;
      },
      getAnalyseEntrepriseSynthese: function () {
        var deferred = $q.defer(),
          httpPromise = analyseEntrepriseSyntheseDataService.getData();
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getAnalyseEntrepriseSynthese.' +
            angular.toJson(error.data, true));
        });
        return deferred.promise;
      },
      getGericoEntrepriseEntiteJuridiqueContactsQueryParam: function () {
        var deferred = $q.defer(),
          httpPromise = gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService.getData();
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getGericoEntrepriseEntiteJuridiqueContactsQueryParam.' +
            angular.toJson(error.data, true));
        });
        return deferred.promise;
      },
      getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee: function () {
        var deferred = $q.defer(),
          httpPromise = analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService.getData();
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          $log.error('XHR Failed for getAnalyseEntreprisePersonnePhysiqueCotationSimplifiee.' +
            angular.toJson(error.data, true));
        });
        return deferred.promise;
      }
    }
  }

})();
