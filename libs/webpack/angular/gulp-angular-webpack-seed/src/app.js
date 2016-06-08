/*** VENDOR ***/
require('../node_modules/angular/angular.js');
require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('../node_modules/lodash/lodash.js');
require('../node_modules/angular-ui-router/release/angular-ui-router.js');
require('../node_modules/angular-animate/angular-animate.js');
require('../node_modules/restangular/src/restangular.js');
require('../node_modules/angular-translate/dist/angular-translate.js');
require('../node_modules/angular-sanitize/angular-sanitize.js');

$ = require('jquery');

/*** APPLICATION ***/

// Config


// Locale
require('./locale/en-gb.js');

// Modules
require('./modules/orders');

// SCSS
require('./scss/app.scss');

// Init App
var app = angular.module('tthew.app', [
  // Vendor
  'ngSanitize',
  'ui.router',
  'restangular',
  'pascalprecht.translate',
  // Modules
  'tthew.orders'

]);

// App config
app.config(function ($urlRouterProvider, $translateProvider) {
  $urlRouterProvider.otherwise('/orders');
  $translateProvider.preferredLanguage('en');
});

module.exports = app
