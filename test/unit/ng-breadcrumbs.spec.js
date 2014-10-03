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

      var breadcrumbs, $httpBackend, $route, $location;

      beforeEach(inject(function(_$location_, _$route_) {
        $location = _$location_;
        $route = _$route_;
        $location.$$path = '/stock/o/detail';
        $route.current = { params: { stock: 'o' } };
      }));

      beforeEach(inject(function(_breadcrumbs_, _$httpBackend_) {
        breadcrumbs = _breadcrumbs_;
        $httpBackend = _$httpBackend_;
      }));

      describe('#get()', function() {
        it('should return a collection of breadcrumb objects with their default labels', function() {
          var crumbs = breadcrumbs.get();
          expect(crumbs).to.have.length.above(0);
          expect(crumbs[0].label).to.equal('Home');
          expect(crumbs[1].label).to.equal('o');
          expect(crumbs[2].label).to.equal('Stock Detail');
        });
      });

      describe('#get(options)', function() {
        it('should return a collection of breadcrumb objects with the specified labels', function() {
          var crumbs = breadcrumbs.get({ 'Stock Detail': 'AAPL Details' });
          expect(crumbs[2].label).to.equal('AAPL Details');
        });
      });

    });
  }
);