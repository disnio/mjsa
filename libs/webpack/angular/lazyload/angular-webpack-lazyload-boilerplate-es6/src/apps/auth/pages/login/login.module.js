// vendors deps
import angular  from 'angular';

// inner deps
import LoginCtrl from './LoginCtrl';

// styles
import './login.scss';

const loginModule = angular.module('App.Auth.Login', []);

loginModule.controller('LoginCtrl', LoginCtrl);

export default loginModule;
