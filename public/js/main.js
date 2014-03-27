requirejs.config(requirejsConfig);

require([
  'angular',
  'public/js/app'
] , function (angular) {
  angular.bootstrap(document , ['ng-breadcrumbs-demo']);
});