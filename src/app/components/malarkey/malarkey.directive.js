(function () {
  'use strict';

  angular
    .module('malarkey')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 2000,
        loop: true,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function (value) {
        typist.type(value).pause().delete();
      });

      watcher = scope.$watch('vm.contributors', function () {
        angular.forEach(vm.contributors, function (contributor) {
          typist.type(contributor.login).pause().delete();
        });
      });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributorDataService) {
      var vm = this;
      var logger = $log.getInstance('malarkey');
      vm.contributors = [];

      activate();

      function activate() {
        return getContributors().then(function () {
          logger.debug("Activated Contributors View");
        });
      }

      function getContributors() {
        return githubContributorDataService.getData(10).then(function (data) {
          vm.contributors = data;
          return vm.contributors;
        });
      }
    }
  }

})();
