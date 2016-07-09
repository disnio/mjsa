// import './polyfill';

// vendors
import angular          from 'angular';
import uiRouter         from 'angular-ui-router';
import 'ngstorage';
import 'oclazyload';

// inner modules
import ServicesModule from './services/services.module';

// configs & utils
import AppConfig from './config';
import AppRun    from './run';
import Router    from './Router.js';

// styles
import './style.scss';

const App = angular.module('MyApp', [

  // vendors deps
  uiRouter,
  'oc.lazyLoad',
  'ngStorage',

  // inner deps
  ServicesModule

]);

AppConfig(App, Router);
AppRun(App, Router);