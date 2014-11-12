define(
  [
    'angular',
    'ng-breadcrumbs',
    'public/js/service/investor-service'
  ],
  function(angular) {
    'use strict';

    angular
      .module('ng-breadcrumbs-demo.investor-position-controller', [
        'ng-breadcrumbs-demo.investor-service',
        'ng-breadcrumbs-demo',
        'ng-breadcrumbs'
      ])
      .controller('InvestorPositionController', [
        '$scope',
        '$routeParams',
        'breadcrumbs',
        'InvestorService',
        function($scope, $routeParams, breadcrumbs, InvestorService) {
          $scope.breadcrumbs = breadcrumbs;
          $scope.investorService = InvestorService;
          $scope.position = InvestorService.positions[$routeParams.position];
          $scope.investor = InvestorService.investors[$scope.position.investor];
          $scope.summary = 'This is the position page.';
          breadcrumbs.options = {
            'Investor': $scope.investor.name,
            'Investor Position': $scope.position.stock + ' Position'
          };
        }
      ]);
  }
);