(function () {
  'use strict';

  angular
    .module('app.httpCall', [
      'app.httpCall.github',
      'app.httpCall.analyse',
      'app.httpCall.gerico'
    ]);

})();
