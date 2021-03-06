const Angular = require('angular');

require('oclazyload');

require('./page3/page3Module')(Angular);
require('./page4/page4Module')(Angular);

require('./styles/main.scss')
const ngModule = Angular.module('myApp', [require('angular-ui-router'), 'oc.lazyLoad', 'page3App', 'page4App']);

require('./config')(ngModule, Angular);
