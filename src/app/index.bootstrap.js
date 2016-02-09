/* global deferredBootstrapper:false */
/*eslint angular/document-service: 0*/
deferredBootstrapper.bootstrap({
  element: document.body,
  module: 'oracall',
  resolve: {
    APP_CONFIG: ['$http', function ($http) {
      return $http.get('./applicationConfig.json');
    }]
  }
});
