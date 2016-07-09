/**
 *
 */
class Request {

  /**
   *
   * @type {{Accept: string, Content-Type: string}}
   * @private
   */
  _headers = {
    'Accept':       'application/json',
    'Content-Type': 'application/json'
  };

  /**
   * 
   * @param $http
   * @param Config
     */
  constructor($http, Config){
    this.$http = $http;
    this.Config = Config;

    this.apiUrl = `${this.Config.api.url}/api/`;
  }

  /**
   *
   * @param url
   * @param data
   * @param params
   * @param options
   * @returns {Promise}
   */
  post(url, data, params = {}, options = {}) {

    let headers = Object.assign({}, this._headers);

    if (options.auth) {
      headers.Authorization = `Basic ${options.auth}`;
    }

    return new Promise((resolve, reject) => {
      this.$http({
        params,
        data,
        headers,
        url:    this.apiUrl + url,
        method: 'POST'
      })
        .success(resolve)
        .error(reject);
    });
  }

  /**
   *
   * @param url
   * @param params
   * @param options
   * @returns {Promise}
   */
  get(url, params = {}, options = {}) {

    let headers = Object.assign({}, this._headers);

    if (options.auth) {
      headers.Authorization = `Basic ${options.auth}`;
    }
    
    return new Promise((resolve, reject) => {
      this.$http({
        params,
        headers,
        url:    this.apiUrl + url,
        method: 'GET'
      })
        .success( resolve )
        .error( reject );
    });
  }

  /**
   *
   * @param url
   * @param data
   * @param params
   * @returns {Promise}
   */
  put(url, data, params = {}, options = {}) {

    let headers = Object.assign({}, this._headers);

    if (options.auth) {
      headers.Authorization = `Basic ${options.auth}`;
    }

    return new Promise((resolve, reject) => {
      this.$http({
        params,
        data,
        headers,
        url: this.apiUrl + url,
        method: 'PUT'
      })
        .success( resolve )
        .error( reject );
    });
  }

  /**
   *
   * @param url
   * @param data
   * @param params
   * @returns {*}
   */
  delete(url, data, params = {}, options = {}) {

    let headers = Object.assign({}, this._headers);

    if (options.auth) {
      headers.Authorization = `Basic ${options.auth}`;
    }

    return new Promise((resolve, reject) => {
      this.$http({
        params,
        data,
        headers,
        url: this.apiUrl + url,
        method: 'DELETE'
      })
        .success( resolve )
        .error( reject );
    });
  }

}

/**
 *
 * @type {string[]}
 */
Request.$inject = [
  '$http',
  'Config'
];

export default Request;