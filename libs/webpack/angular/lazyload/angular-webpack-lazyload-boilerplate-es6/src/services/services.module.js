// services
import Request           from './Request';
import Auth              from './Auth';
import User              from './User';
import LocalStorage      from './LocalStorage';
import ConfigProvider    from './ConfigProvider';

let servicesModule = angular.module('App.Services', []);

servicesModule.service('Request',      Request);
servicesModule.service('Auth',         Auth);
servicesModule.service('User',         User);
servicesModule.provider('Config',      ConfigProvider);
servicesModule.service('LocalStorage', LocalStorage);

export default servicesModule.name;