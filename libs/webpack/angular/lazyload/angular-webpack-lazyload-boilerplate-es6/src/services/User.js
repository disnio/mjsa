/**
 *
 */
class User {

  _user = null;
  _urls = {
    getUserInfo: 'user/info',
    setUserInfo:  'user/info',
    getAllUsers: 'user/search'
  };

  /**
   *
   * @param LocalStorage
   * @param Request
   */
  constructor(LocalStorage, Request) {
    this.LocalStorage = LocalStorage;
    this.Request      = Request;
  }

  /**
   *
   * @returns {boolean}
   */
  hasLoggedInUser() {
    return !!this._user;
  }

  /**
   *
   */
  initCurrentUser() {
    this._user = this.LocalStorage.get('user') || null;
  }
  
  /**
   *
   * @returns {*}
   */
  getCurrentUser() {
    return this._user;
  }

  /**
   *
   * @returns {null}
   */
  removeCurrentUser() {
    this._user = null;
    this.LocalStorage.remove('user');
  }

  /**
   *
   * @param data
   */
  login(data) {
    this._user = data;
    this.LocalStorage.set('user', data);
    return this._user;
  }

}

/**
 *
 * @type {string[]}
 */
User.$inject = [
  'LocalStorage',
  'Request'
];

export default User;