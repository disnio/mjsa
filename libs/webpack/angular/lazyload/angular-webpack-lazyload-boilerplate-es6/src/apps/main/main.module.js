import angular  from 'angular';
import MainCtrl from './pages/MainCtrl';

import ComponentModule from './components/components.module';

const mainModule = angular.module('App.Main', [ComponentModule]);

mainModule.controller('MainCtrl', MainCtrl);

export default mainModule;
