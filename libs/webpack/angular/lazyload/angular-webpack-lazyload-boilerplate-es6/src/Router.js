/* global require */

/**
 *
 */
export default class Router {

  /**
   *
   * @param {string} path
   * @param {string} name
   * @private
   */
  static loadTemplate(path, name) {
    return new Promise(resolve => {

      require.ensure([], function () {
        let template = require(`./${path}`);
        resolve(template);
      });

    });
  }

  /**
   *
   * @param {string} path
   * @param $ocLazyLoad
   * @private
   */
  static loadModule(path, $ocLazyLoad) {
    return new Promise(resolve => {
      require.ensure([], function (require) {
        require(`bundle!./${path}`)(module => {

          $ocLazyLoad.load({
            name: module.name
          });

          resolve(module);
        });
      });
    });

  }

  /**
   *
   * @param {string} path
   * @param $ocLazyLoad
   * @private
   */
  static loadPageModule(path, $ocLazyLoad) {
    return new Promise(resolve => {
      require.ensure([], function (require) {
        require(`bundle!./${path}`)(module => {
          $ocLazyLoad.load({
            name: module.name
          });

          resolve(module.controller);
        });
      });
    });

  }

  /**
   *
   * @param $rootScope
   * @param $state
   * @param User
   */
  static setRoutesCheckers($rootScope, $state, User) {

    /**
     *
     * @param event
     * @param toState
     */
    const checkRoute = (event, toState) => {

      const hasUser  = User.hasLoggedInUser();

      if (hasUser && !toState.isLoggedIn) {
        event.preventDefault();
        $state.transitionTo('main.home');
      } else if (!hasUser && toState.isLoggedIn) {
        event.preventDefault();
        $state.transitionTo('auth.login');
      }
    };

    /**
     *
     */
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      checkRoute(event, toState);
    });

  }

}