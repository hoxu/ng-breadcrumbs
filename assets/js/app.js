/**
 * Example application for angular-breadcrumbs.js (https://github.com/ianwalter/angular-breadcrumbs)
 *
 * @author Ian Kennington Walter (http://www.iankwalter.com)
 */
requirejs.config({
  baseUrl: '/',
  paths: {
    'angular': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular.min',
      'assets/lib/angular/angular'
    ],
    'angular-route': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular-route.min',
      'assets/lib/angular-route/angular-route.min'
    ],
    'angular-breadcrumbs': [
      '//ianwalter.github.io/dist/js/angular-breadcrumbs.min.',
      'dist/js/angular-breadcrumbs.min'
    ]
  },
  shim: {
    'angular' : { 'exports' : 'angular' },
    'angular-route': { deps:['angular'] },
    'angular-breadcrumbs': { deps:['angular'] }
  }
});

require(['angular', 'angular-route', 'angular-breadcrumbs'], function(angular) {
  "use strict";

  var app = angular.module('ab', ['ngRoute', 'angular-breadcrumbs'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', { controller: 'HomeController', templateUrl: 'assets/template/home.html', label: 'Home' })
        .when('/stock/:stock', { controller: 'StockController', templateUrl: 'assets/template/stock.html', label: 'Stock' })
        .when('/stock/:stock/detail', { controller: 'StockDetailController', templateUrl: 'assets/template/stock-detail.html',
          label: 'Stock Detail' })
        .otherwise({ redirectTo: '/' });
    }]);

  app.stocks = {
    'AAPL': { symbol: 'AAPL', price: '493.03', revenue: '3,303,403,203' },
    'TSLA': { symbol: 'TSLA', price: '182.45', revenue: '121,203,542' }
  };

  app.controller('HomeController', ['$scope', 'breadcrumbs', function($scope, breadcrumbs) {
    $scope.breadcrumbs = breadcrumbs;

    $scope.summary = "This is the Home page.";
    $scope.stocks = app.stocks;
  }]);

  app.controller('StockController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.stock = app.stocks[$routeParams['stock']];
    $scope.summary = "This is the Stock page.";
  }]);

  app.controller('StockDetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.stock = app.stocks[$routeParams['stock']];
    $scope.summary = "This is the Stock Detaill page.";
  }]);

  angular.bootstrap(document , ['ab']);
});