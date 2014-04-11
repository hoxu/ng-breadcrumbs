define(
  [
    'angular',
    'public/js/app',
    'angular-mocks',
    'ng-breadcrumbs'
  ],
  function() {
    describe('breadcrumbs', function() {

      beforeEach(module('ng-breadcrumbs-demo'));

      var breadcrumbService, http, route, location;

      // Mock the current location
      beforeEach(inject(function($location) {
        location = $location;
        location.$$path = '/stock/AAPL/detail';
      }));

      // Mock the current route
      beforeEach(inject(function($route) {
        route = $route;
        route.current = { params: { stock: 'AAPL' } };
      }));

      beforeEach(inject(function(breadcrumbs, $httpBackend) {
        breadcrumbService = breadcrumbs;
        http = $httpBackend;
      }));

      describe('#get()', function() {
        it('should return a collection of breadcrumb objects with their default labels', function() {
          var breadcrumbs = breadcrumbService.get();
          expect(breadcrumbs).to.have.length.above(0);
          expect(breadcrumbs[0].label).to.equal('Home');
          expect(breadcrumbs[1].label).to.equal('AAPL');
          expect(breadcrumbs[2].label).to.equal('Stock Detail');
        });
      });

      describe('#get(options)', function() {
        it('should return a collection of breadcrumb objects with the specified labels', function() {
          var breadcrumbs = breadcrumbService.get({ 'Stock Detail': 'AAPL Details' });
          expect(breadcrumbs[2].label).to.equal('AAPL Details');
        });
      });

    });
  }
);