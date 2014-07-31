define(
  [
    'angular',
    'ng-breadcrumbs',
    'public/js/service/stock-service'
  ],
  function(angular) {
    'use strict';

    angular
      .module('ng-breadcrumbs-demo.stock-detail-controller', [
        'ng-breadcrumbs-demo',
        'ng-breadcrumbs-demo.stock-service',
        'ng-breadcrumbs'
      ])
      .controller('StockDetailController', [
        '$scope',
        '$routeParams',
        '$timeout',
        'breadcrumbs',
        'StockService',
        function($scope, $routeParams, $timeout, breadcrumbs, StockService) {
          breadcrumbs.options = { 'Stock Detail': $routeParams.stock + ' Details' };
          $scope.breadcrumbs = breadcrumbs;

          // NOTE: This is for illustration purposes only
          $timeout(function() {
            breadcrumbs.options = { 'Home': 'Home!' };
          }, 1200);

          $scope.stock = StockService.stocks[$routeParams.stock];
          $scope.summary = 'This is the Stock Detail page.';
        }
      ]);
  }
);