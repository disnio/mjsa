import angular  from 'angular';

import TabsDirective        from './tabs/tabs';
import TabDirective         from './tab/tab';
import TabsHeaderDirective  from './tabs-header/tabs-header';
import TabHeaderDirective   from './tab-header/tab-header';

const componentModule = angular.module('App.Component', []);

componentModule.directive('tabs',        TabsDirective.directiveFactory);
componentModule.directive('tab',         TabDirective.directiveFactory);
componentModule.directive('tabsHeader',  TabsHeaderDirective.directiveFactory);
componentModule.directive('tabHeader',   TabHeaderDirective.directiveFactory);

export default componentModule.name;