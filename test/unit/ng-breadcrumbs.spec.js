define(
  [
    'angular',
    'public/js/app',
    'angular-mocks',
    'ng-breadcrumbs'
  ],
  function() {
    'use strict';

    describe('breadcrumbs', function() {

      beforeEach(module('ng-breadcrumbs-demo'));

      var breadcrumbs, $httpBackend, $route;

      beforeEach(inject(function(_$route_) {
        $route = _$route_;
        $route.current = {
          params: { investor: 2, position: 2 },
          originalPath: '/investor/:investor/position/:position'
        };
      }));

      beforeEach(inject(function(_breadcrumbs_, _$httpBackend_) {
        breadcrumbs = _breadcrumbs_;
        $httpBackend = _$httpBackend_;
      }));

      describe('#get()', function() {
        it('should return a collection of breadcrumb objects with their ' +
           'default labels', function() {
          var crumbs = breadcrumbs.get();
          expect(crumbs).to.have.length.above(0);
          expect(crumbs[0].label).to.equal('Home');
          expect(crumbs[1].label).to.equal('Investor');
          expect(crumbs[2].label).to.equal('Investor Position');
        });
      });

      describe('#get(options)', function() {
        it('should return a collection of breadcrumb objects with the ' +
           'specified labels', function() {
          var crumbs = breadcrumbs.get({
            'Investor': 'Bill Gates',
            'Investor Position': 'TSLA Position'
          });
          expect(crumbs[0].label).to.equal('Home');
          expect(crumbs[1].label).to.equal('Bill Gates');
          expect(crumbs[2].label).to.equal('TSLA Position');
        });
      });
    });
  }
);