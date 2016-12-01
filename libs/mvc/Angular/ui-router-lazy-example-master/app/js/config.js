'use strict';

require.config({

    deps: ['main'],

    // Cache busting
    // Enable for production only
    //urlArgs: '_=' + (new Date()).getTime(),

    paths: {
        angular: '../lib/angular/angular',        
        angularResource: '../lib/angular-resource/angular-resource',
        angularSanitize: '../lib/angular-sanitize/angular-sanitize.min',
        angularUiRouter: '../lib/angular-ui-router/angular-ui-router',
        d3: '../lib/d3/d3',
        async: '../lib/requirejs-plugins/src/async',        
        jquery: '../lib/jquery/jquery.min',
        lodash: '../lib/lodash/lodash.min',
        ocLazyLoad: '../lib/ocLazyLoad/ocLazyLoad.min',
        uiRouterExtras: '../lib/ui-router-extras/ct-ui-router-extras',
        uiRouterExtrasStatevis: '../lib/ui-router-extras-statevis/statevis'
    },

    shim: {
        angular: { deps: ['jquery'], exports: 'angular' },        
        angularResource: { deps: ['angular'] },
        angularSanitize: { deps: ['angular'] },
        angularUiRouter: {deps: ['angular']},
        d3: {deps: []},
        jquery: { exports: '$' },
        lodash: { exports: '_' },
        ocLazyLoad: {deps: ['angular']},
        uiRouterExtras: {deps: ['angularUiRouter']},
        uiRouterExtrasStatevis: {deps: ['uiRouterExtras']}
    }

});