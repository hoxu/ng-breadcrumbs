(function() {
  'use strict';

  describe('Going to the AAPL detail page', function() {
    it('should show a breadcrumb that links back to the AAPL page', function() {
      browser.get('http://localhost:8080/#/stock/AAPL/detail');
      var label = element(by.css('[href="#/stock/AAPL"]'));
      expect(label.getText()).toEqual('AAPL');
    });
  });
})();