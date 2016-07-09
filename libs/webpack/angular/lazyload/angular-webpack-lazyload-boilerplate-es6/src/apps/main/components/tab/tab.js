import tabTpl from './tab.html';

class TabDirective {

  constructor($compile) {

    TabDirective.$compile = $compile;

    this.restrict   = 'E';
    this.transclude = true;
    this.replace    = true;
    this.template   = tabTpl;
    this.scope = {
      tabId:    '@',
      template: '@?'
    };
  }

  link(scope, elem) {

    if (scope.template) {
      let compiledTpl = TabDirective.$compile(scope.template)(scope);
      angular.element(elem.children()[0]).append(compiledTpl);
    }
  }

  static directiveFactory($compile) {
    return new TabDirective(...arguments);
  }

}

TabDirective.directiveFactory.$inject = [
  '$compile'
];

export default TabDirective;
