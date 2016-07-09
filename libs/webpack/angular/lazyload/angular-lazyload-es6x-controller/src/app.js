'use strict';
let msg = require('./commons/msg-store/index');
let appRoute = require('./config');
const ngModule = angular.module('lazyApp', [
    require('angular-ui-router'), require('oclazyload'), 'msg-store'
]);

ngModule.config(appRoute);
