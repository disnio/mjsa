import tabsHeaderTpl from './tabs-header.html';

class TabsHeaderDirective {

  constructor() {

    this.restrict   = 'E';
    this.transclude = {
      tabHeader: 'tabHeader'
    };
    this.template   = tabsHeaderTpl;
  }

  static directiveFactory() {
    return new TabsHeaderDirective (...arguments);
  }

}

TabsHeaderDirective .directiveFactory.$inject = [
];

export default TabsHeaderDirective ;