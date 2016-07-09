'use strict';
const Angular = require('angular');
let appModule = require('../app')(Angular);

angular.bootstrap(document, [appModule.name], { strictDi: true });
