/* global angular, require */
import tabHeaderTpl from './tab-header.html';

class TabHeaderDirective {

  /**
   * 
   * @param $compile
   * @param $timeout
   */
  constructor($compile, $timeout) {

    this.restrict   = 'E';
    this.scope      = {
      tabId:    '@',
      template: '@?'
    };
    this.template = tabHeaderTpl;

    TabHeaderDirective.$compile = $compile;
    TabHeaderDirective.$timeout = $timeout;
  }

  /**
   *
   * @param scope
   * @param elem
   */
  link(scope, elem) {

    if (scope.template) {
      let compiledTpl = TabHeaderDirective.$compile(scope.template)(scope);
      angular.element(elem.children()[0]).append(compiledTpl);
    }

    elem.on('click', () => {
      console.log(scope.tabId);
    });

  }

  /**
   *
   * @returns {TabHeaderDirective}
   */
  static directiveFactory($compile, $timeout) {
    return new TabHeaderDirective (...arguments);
  }

}

/**
 *
 * @type {string[]}
 */
TabHeaderDirective .directiveFactory.$inject = [
  '$compile',
  '$timeout'
];

export default TabHeaderDirective ;