define(
  [
    'angular',
    'ng-breadcrumbs',
    'public/js/service/investor-service'
  ],
  function(angular) {
    'use strict';

    angular
      .module('ng-breadcrumbs-demo.investor-controller', [
        'ng-breadcrumbs-demo.investor-service',
        'ng-breadcrumbs-demo',
        'ng-breadcrumbs'
      ])
      .controller('InvestorController', [
        '$scope',
        '$routeParams',
        'breadcrumbs',
        'InvestorService',
        function($scope, $routeParams, breadcrumbs, InvestorService) {
          $scope.breadcrumbs = breadcrumbs;
          $scope.investorService = InvestorService;
          $scope.investor = InvestorService.investors[$routeParams.investor];
          $scope.summary = 'This is the investor page.';
          breadcrumbs.options = {
            'Investor': $scope.investor.name
          };
        }
      ]);
  }
);