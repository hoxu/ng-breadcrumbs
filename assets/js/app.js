/**
 * Example application for ng-breadcrumbs (https://github.com/ianwalter/ng-breadcrumbs)
 *
 * @author Ian Kennington Walter (http://www.iankwalter.com)
 */
requirejs.config({
  baseUrl: '.',
  paths: {
    'angular': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular.min',
      'assets/lib/angular/angular'
    ],
    'angular-route': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular-route.min',
      'assets/lib/angular-route/angular-route.min'
    ],
    'ng-breadcrumbs': [
      'dist/js/ng-breadcrumbs.min',
      '//ianwalter.github.io/ng-breadcrumbs/dist/js/ng-breadcrumbs.min'
    ]
  },
  shim: {
    'angular' : { 'exports' : 'angular' },
    'angular-route': { deps:['angular'] },
    'ng-breadcrumbs': { deps:['angular'] }
  }
});

require(['angular', 'angular-route', 'ng-breadcrumbs'], function(angular) {
  "use strict";

  var app = angular.module('ab', ['ngRoute', 'ng-breadcrumbs'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', { templateUrl: 'assets/template/home.html', label: 'Home' })
        .when('/stock/:stock', { controller: 'StockController', templateUrl: 'assets/template/stock.html' })
        .when('/stock/:stock/detail', {
          controller: 'StockDetailController',
          templateUrl: 'assets/template/stock-detail.html',
          label: 'Stock Detail'
        })
        .otherwise({ redirectTo: '/' });
    }]);

  app.stocks = {
    'AAPL': { symbol: 'AAPL', price: '493.03', revenue: '3,303,403,203' },
    'TSLA': { symbol: 'TSLA', price: '182.45', revenue: '121,203,542' }
  };

  app.controller('HomeController', ['$scope', 'breadcrumbs', function($scope, breadcrumbs) {
    $scope.breadcrumbs = breadcrumbs;
    $scope.breadcrumbs.options = {};

    $scope.summary = "This is the Home page.";
    $scope.stocks = app.stocks;
  }]);

  app.controller('StockController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.stock = app.stocks[$routeParams['stock']];
    $scope.summary = "This is the Stock page.";
  }]);

  app.controller('StockDetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.breadcrumbs.options = { 'Stock Detail': $routeParams['stock'] + ' Details' };
    $scope.stock = app.stocks[$routeParams['stock']];
    $scope.summary = "This is the Stock Detail page.";
  }]);

  angular.bootstrap(document , ['ab']);
});