var requirejsConfig = {
  baseUrl: '.',
  paths: {
    'angular': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular.min',
      'public/lib/angular/angular'
    ],
    'angular-route': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular-route.min',
      'public/lib/angular-route/angular-route.min'
    ],
    'ng-breadcrumbs': [
      'dist/ng-breadcrumbs.min',
      '//ianwalter.github.io/ng-breadcrumbs/dist/ng-breadcrumbs.min'
    ]
  },
  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'ng-breadcrumbs': {
      deps: ['angular']
    }
  }
};