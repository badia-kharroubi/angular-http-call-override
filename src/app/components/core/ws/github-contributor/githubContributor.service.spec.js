(function () {
  'use strict';

  describe('service githubContributor', function () {
    var githubContributorService;
    var $httpBackend;
    var $log;

    beforeEach(module('oracall.core.ws.githubContributor'));
    beforeEach(inject(function (_githubContributorService_, _$httpBackend_, _$log_) {
      githubContributorService = _githubContributorService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function () {
      expect(githubContributorService).not.toEqual(null);
    });

    describe('apiHost variable', function () {
      it('should exist', function () {
        expect(githubContributorService.apiHost).not.toEqual(null);
      });
    });

    describe('getContributors function', function () {
      it('should exist', function () {
        expect(githubContributorService.getContributors).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', githubContributorService.apiHost + '/contributors?per_page=1').respond(200, [{pprt: 'value'}]);
        var data;
        githubContributorService.getContributors(1).then(function (fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should define a limit per page as default value', function () {
        $httpBackend.when('GET', githubContributorService.apiHost + '/contributors?per_page=30').respond(200, new Array(30));
        var data;
        githubContributorService.getContributors().then(function (fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 30).toBeTruthy();
      });

      it('should log a error', function () {
        $httpBackend.when('GET', githubContributorService.apiHost + '/contributors?per_page=1').respond(500);
        githubContributorService.getContributors(1);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });
  });

})();
