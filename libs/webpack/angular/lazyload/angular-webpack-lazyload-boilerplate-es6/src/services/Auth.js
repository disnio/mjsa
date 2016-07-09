class Auth {

  _requests = {
    register: {
      method: 'POST',
      url:    '/user'
    }
  };

  /**
   *
   * @param Request
   * @param User
   * @param LocalStorage
   */
  constructor(Request, User, LocalStorage) {
    this.Request      = Request;
    this.User         = User;
    this.LocalStorage = LocalStorage;
  }

}

/**
 *
 * @type {string[]}
 */
Auth.$inject = [
  'Request',
  'User',
  'LocalStorage'
];

export default Auth;