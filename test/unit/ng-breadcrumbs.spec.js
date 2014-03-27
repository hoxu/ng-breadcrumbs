define(
  [
    'angular-mocks',
    'js/app',
    'breadcrumbs'
  ],
  function() {
    describe('breadcrumbs', function() {

      beforeEach(module('ng-breadcrumbs-demo'));

      var breadcrumbService;
      beforeEach(inject(function (breadcrumbs) {
        breadcrumbService = breadcrumbs;
      }));

      describe('#get()', function() {
        it('should return a collection of breadcrumb objects', function() {
          //sexpect(true).to.equal(true);
        });
      });

    });
  }
);