define([

    'core/module'

], function (coreModule) {

    'use strict';

    coreModule.provider('SettingsService', function () {

        var applesOrOranges = 'apples';

        return {
            $get: function() {
                return this;
            },            

            fruit: ['$q', function ($q) {
                var deferred = $q.defer();
                deferred.resolve(applesOrOranges);
                return deferred.promise;
            }]
        };
    });
});
