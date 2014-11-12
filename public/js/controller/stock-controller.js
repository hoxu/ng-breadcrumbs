define(
  [
    'angular',
    'ng-breadcrumbs',
    'public/js/service/stock-service'
  ],
  function(angular) {
    'use strict';

    angular
      .module('ng-breadcrumbs-demo.stock-controller', [
        'ng-breadcrumbs-demo',
        'ng-breadcrumbs-demo.stock-service',
        'ng-breadcrumbs'
      ])
      .controller('StockController', [
        '$scope',
        '$routeParams',
        'breadcrumbs',
        'StockService',
        function($scope, $routeParams, breadcrumbs, StockService) {
          $scope.breadcrumbs = breadcrumbs;
          $scope.stock = StockService.stocks[$routeParams.stock];
          $scope.summary = "This is the Stock page.";
        }
      ]);
  }
);