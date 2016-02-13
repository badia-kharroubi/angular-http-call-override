(function () {
  'use strict';

  angular
    .module('home')
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
      homeResolvePromiseData: function (dataType) {
        var logger = $log.getInstance('app.home');

        var deferred;
        var httpPromise;
        switch (dataType) {
          case 'demos':
            deferred = $q.defer();
            httpPromise = $http.get('modules/home/home.demos.json');
            break;
          case 'gericoEntrepriseEntiteJuridiqueContacts':
            deferred = $q.defer();
            httpPromise = gericoEntrepriseEntiteJuridiqueContactsDataService.getData();
            break;
          case 'gericoEntrepriseEntiteJuridiqueContact':
            deferred = $q.defer();
            httpPromise = gericoEntrepriseEntiteJuridiqueContactDataService.getData();
            break;
          case 'analyseEntrepriseEntiteJuridiqueCotationSimplifiee':
            deferred = $q.defer();
            httpPromise = analyseEntrepriseEntiteJuridiqueCotationSimplifieeDataService.getData();
            break;
          case 'analyseEntrepriseSynthese':
            deferred = $q.defer();
            httpPromise = analyseEntrepriseSyntheseDataService.getData();
            break;
          case 'gericoEntrepriseEntiteJuridiqueContactsQueryParam':
            deferred = $q.defer();
            httpPromise = gericoEntrepriseEntiteJuridiqueContactsQueryParamDataService.getData();
            break;
          case 'analyseEntreprisePersonnePhysiqueCotationSimplifiee':
            deferred = $q.defer();
            httpPromise = analyseEntreprisePersonnePhysiqueCotationSimplifieeDataService.getData();
            break;
          default:
            logger.error("XHR homeResolvePromiseData : unknowing mode '%s'", dataType);
        }
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          logger.error("XHR Failed for homeResolvePromiseData(%s) : %j", dataType, error.data);
        });
        return deferred.promise;

      }
      /*getDemos: function () {
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
      }*/
    }
  }

})();
