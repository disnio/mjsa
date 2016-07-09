// vendors deps
import angular  from 'angular';

// inner deps
import AboutCtrl from './AboutCtrl';

const aboutModule = angular.module('App.Main.About', []);

aboutModule.controller('AboutCtrl', AboutCtrl);

export default aboutModule;
