/* global deferredBootstrapper:false */
/*eslint angular/document-service: 0*/
deferredBootstrapper.bootstrap({
  element: document.body,
  module: 'app',
  resolve: {
    APP_CONFIG: ['$http', function ($http) {
      return $http.get('./core/app.config.json');
    }]
  }
});
