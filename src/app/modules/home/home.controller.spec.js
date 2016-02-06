(function () {
  'use strict';

  describe('controllers', function () {
    var vm;

    beforeEach(module('oracall.home'));
    beforeEach(inject(function (_$controller_, _homeDemosService_) {
      spyOn(_homeDemosService_, 'getDemos').and.returnValue([{}, {}, {}, {}, {}]);

      vm = _$controller_('HomeController');
    }));

    it('should define 6 demos', function () {
      expect(angular.isArray(vm.demos)).toBeTruthy();
      expect(vm.demos.length === 6).toBeTruthy();
    });
  });

})();
