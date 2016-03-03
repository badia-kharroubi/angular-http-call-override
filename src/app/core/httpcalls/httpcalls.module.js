(function () {
  'use strict';

  angular
    .module('app.httpcalls', [
      'app.httpcalls.github',
      'app.httpcalls.analyse',
      'app.httpcalls.gerico'
    ]);

})();
