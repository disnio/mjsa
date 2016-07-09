angular.module('app.token', [])
    .factory('tokenInterceptor', function($q, localStorageService) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if (localStorageService.get('token')) {
                    config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
                }
                return config;
            },

            response: function(response) {
                return response || $q.when(response);
            }
        };
    });
module.exports = 'app.token'; //直接暴露模块名称,方便require引入
