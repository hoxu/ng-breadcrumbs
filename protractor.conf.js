exports.config = {
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',
  //seleniumAddress: 'http://localhost:4444/wd/hub', // Using JAR instead of address
  capabilities: {
    'browserName': 'phantomjs'
  },
  specs: ['test/ui/**/*.spec.js']
};