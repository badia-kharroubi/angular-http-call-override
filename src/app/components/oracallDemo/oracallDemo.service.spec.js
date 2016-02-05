(function () {
  'use strict';

  describe('service oracallDemo', function () {
    var oracallDemo;
    var $httpBackend;
    var $log;

    beforeEach(module('oracall'));
    beforeEach(inject(function (_oracallDemo_, _$httpBackend_, _$log_) {
      oracallDemo = _oracallDemo_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function () {
      expect(oracallDemo).not.toEqual(null);
    });

    describe('apiHost variable', function () {
      it('should exist', function () {
        expect(oracallDemo.apiHost).not.toEqual(null);
      });
    });

    describe('getContributors function', function () {
      it('should exist', function () {
        expect(oracallDemo.getDemos).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', oracallDemo.apiHost).respond(200, [{pprt: 'value'}]);
        var data;
        oracallDemo.getDemos(1).then(function (fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should log a error', function () {
        $httpBackend.when('GET', oracallDemo.apiHost).respond(500);
        oracallDemo.getContributors(1);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });
  });
})();
