(function () {
  'use strict';

  describe('service githubContributorData', function () {
    var githubContributorDataService;
    var $httpBackend;
    var $log;

    beforeEach(module('oracall.core.ws.github'));
    beforeEach(inject(function (_githubContributorDataService_, _$httpBackend_, _$log_) {
      githubContributorDataService = _githubContributorDataService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function () {
      expect(githubContributorDataService).not.toEqual(null);
    });

    describe('apiHost variable', function () {
      it('should exist', function () {
        expect(githubContributorDataService.apiHost).not.toEqual(null);
      });
    });

    describe('getContributors function', function () {
      it('should exist', function () {
        expect(githubContributorDataService.getData).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', githubContributorDataService.apiHost + '/repos/badia-kharroubi/oracall' +
          '/contributors?per_page=1').respond(200, [{pprt: 'value'}]);
        var data;
        githubContributorDataService.getData(1).then(function (fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should define a limit per page as default value', function () {
        $httpBackend.when('GET', githubContributorDataService.apiHost + '/repos/badia-kharroubi/oracall' +
          '/contributors?per_page=1').respond(200, new Array(1));
        var data;
        githubContributorDataService.getData().then(function (fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
      });

      it('should log a error', function () {
        $httpBackend.when('GET', githubContributorDataService.apiHost + '/repos/badia-kharroubi/oracall' +
          '/contributors?per_page=1').respond(500);
        githubContributorDataService.getData(1);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });
  });

})();
