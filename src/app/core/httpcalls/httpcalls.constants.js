(function () {
  'use strict';

  angular
    .module('httpcalls')
    .constant('apiHostGithub', 'https://api.github.com')
    .constant('apiHostGerico', 'http://oracall-apimocker-badia-kharroubi.c9users.io:8081/gerico/api/v1')
    .constant('apiHostAnalyse', 'http://oracall-apimocker-badia-kharroubi.c9users.io:8081/analyse/api/v1');

})();
