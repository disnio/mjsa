import tabsTpl from './tabs.html';

class TabsDirective {

  constructor() {

    this.restrict   = 'E';
    this.transclude = {
      tab:        'tab'
    };
    this.template   = tabsTpl;
  }

  link(scope) {

  }

  static directiveFactory() {
    return new TabsDirective(...arguments);
  }

}

TabsDirective.directiveFactory.$inject = [
];

export default TabsDirective;