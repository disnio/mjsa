/* global angular, document */

/**
 *
 */
class ConfigProvider {

  /**
   *
   */
  constructor() {
    Object.assign(this, require('../../config.json'));
  }

  $get() {
    return this;
  }

}

export default ConfigProvider;