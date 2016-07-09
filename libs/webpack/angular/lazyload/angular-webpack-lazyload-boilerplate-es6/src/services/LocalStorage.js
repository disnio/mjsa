/* global angular, document */

/**
 *
 */
class LocalStorage {

  /**
   *
    * @param $localStorage
   * @param Config
     */
  constructor($localStorage, Config) {
    this.$localStorage = $localStorage;
    this.Config    = Config;
  }

  /**
   *
   * @param key
   * @param value
   */
  set(key, value) {
    this.$localStorage[`${this.Config.localStorage.prefix}${key}`] = value;
    return value;
  }


  /**
   *
   * @param key
   * @returns {*}
   */
  get(key) {
    return this.$localStorage[`${this.Config.localStorage.prefix}${key}`];
  }

  /**
   *
   * @param key
   * @returns {*}
   */
  remove(key) {
    delete this.$localStorage[`${this.Config.localStorage.prefix}${key}`];
  }

}

/**
 *
 * @type {string[]}
 */
LocalStorage.$inject = [
  '$localStorage',
  'Config'
];

export default LocalStorage;