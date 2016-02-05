(function () {
  'use strict';

  describe('controllers', function () {
    var vm;

    beforeEach(module('oracall'));
    beforeEach(inject(function (_$controller_, _oracallDemos_) {
      spyOn(_oracallDemos_, 'getDemos').and.returnValue([{}, {}, {}, {}, {}]);

      vm = _$controller_('MainController');
    }));

    it('should have a timestamp creation date', function () {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

    it('should define 6 oracallDemos', function () {
      expect(angular.isArray(vm.oracallDemos)).toBeTruthy();
      expect(vm.oracallDemos.length === 6).toBeTruthy();
    });
  });
})();
