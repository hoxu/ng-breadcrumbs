define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
      .module('ng-breadcrumbs-demo.investor-service', [])
      .factory('InvestorService', function() {
        return {
          investors: {
            1: { id: 1, name: 'Charles Munger' },
            2: { id: 2, name: 'Bill Gates' },
            3: { id: 3, name: 'Ian Walter' }
          },
          positions: {
            1: { id: 1, investor: 1, stock: 'JNJ', shares: 200000 },
            2: { id: 2, investor: 2, stock: 'TSLA', shares: 163000 },
            3: { id: 3, investor: 2, stock: 'AAPL', shares: 540000 },
            4: { id: 4, investor: 3, stock: 'TSLA', shares: 47000 }
          },
          getPositionsByStock: function(stock) {
            var _this = this;
            return Object.keys(this.positions)
              .map(function(k) { return _this.positions[k]; })
              .filter(function(position) {
                return position.stock === stock ? position : false;
              })
              .sort(function(a, b) {
                if (a.shares < b.shares) {
                  return 1;
                } else if (a.shares > b.shares) {
                  return -1;
                }
                return 0;
              });
          },
          getPositionsByInvestor: function(investor) {
            var _this = this;
            return Object.keys(this.positions)
              .map(function(k) { return _this.positions[k]; })
              .filter(function(position) {
                return position.investor === investor ? position : false;
              })
              .sort(function(a, b) {
                if (a.shares < b.shares) {
                  return 1;
                } else if (a.shares > b.shares) {
                  return -1;
                }
                return 0;
              });
          }
        };
      });
  }
);