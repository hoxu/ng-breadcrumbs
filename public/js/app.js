/**
 * Demo application for ng-breadcrumbs
 * http://ianwalter.github.io/ng-breadcrumbs
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
    'public/js/controller/stock-detail-controller',
    'public/js/controller/investor-controller',
    'public/js/controller/investor-position-controller'
  ],
  function(angular) {
    'use strict';

    angular.module('ng-breadcrumbs-demo', [
        'ngRoute',
        'ng-breadcrumbs-demo.home-controller',
        'ng-breadcrumbs-demo.stock-history-controller',
        'ng-breadcrumbs-demo.stock-controller',
        'ng-breadcrumbs-demo.stock-detail-controller',
        'ng-breadcrumbs-demo.investor-controller',
        'ng-breadcrumbs-demo.investor-position-controller'
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
          .when('/investor/:investor', {
            controller: 'InvestorController',
            templateUrl: 'public/template/investor.html',
            label: 'Investor'
          })
          .when('/investor/:investor/position/:position', {
            controller: 'InvestorPositionController',
            templateUrl: 'public/template/investor-position.html',
            label: 'Investor Position'
          })
          .otherwise({ redirectTo: '/' });
      }]);
  }
);