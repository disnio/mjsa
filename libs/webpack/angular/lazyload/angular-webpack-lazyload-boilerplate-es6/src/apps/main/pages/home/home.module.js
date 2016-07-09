// vendors deps
import angular  from 'angular';

// inner deps
import HomeCtrl from './HomeCtrl';

const homeModule = angular.module('App.Main.Home', []);

homeModule.controller('HomeCtrl', HomeCtrl);

export default homeModule;
