/**
 * Demo application for ng-breadcrumbs (https://github.com/ianwalter/ng-breadcrumbs)
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
define(
  [
    'angular',
    'angular-route',
    'public/js/controller/home-controller',
    'public/js/controller/stock-history-controller',
    'public/js/controller/stock-controller',
    'public/js/controller/stock-detail-controller'
  ],
  function(angular) {
    'use strict';

    angular.module('ng-breadcrumbs-demo', [
        'ngRoute',
        'ng-breadcrumbs-demo.home-controller',
        'ng-breadcrumbs-demo.stock-history-controller',
        'ng-breadcrumbs-demo.stock-controller',
        'ng-breadcrumbs-demo.stock-detail-controller'
      ])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider
          .when('/', { controller: 'HomeController',
                       templateUrl: 'public/template/home.html',
                       label: 'Home' })
          .when('/stock/:stock', { controller: 'StockController',
                                   templateUrl: 'public/template/stock.html' })
          .when('/stock/:stock/detail', {
            controller: 'StockDetailController',
            templateUrl: 'public/template/stock-detail.html',
            label: 'Stock Detail'
          })
          .when('/stock/:stock/history', {
            controller: 'StockHistoryController',
            templateUrl: 'public/template/stock-history.html'
          })
// TODO add route and test for multiple params
//          .when('/stock/:stock/history/:year/:month', {
//            controller: 'StockHistoryController',
//            templateUrl: 'public/template/stock-history.html'
//          })
          .otherwise({ redirectTo: '/' });
      }]);
  }
);