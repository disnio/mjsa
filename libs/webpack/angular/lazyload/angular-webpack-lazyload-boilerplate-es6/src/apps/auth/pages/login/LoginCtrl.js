/**
 *
 */
export default class LoginCtrl {

  /**
   *
   * @param $scope
   * @param $state
   * @param User
   */
  constructor($scope, $state, User) {

    this.$scope       = $scope;
    this.$state       = $state;
    this.User         = User;

    this.user = {
      login:    '',
      password: ''
    };

  }

  /**
   *
   * @param event
   */
  loginUser(event) {
    if (this.$scope.LoginForm.$valid) {
      this.User.login(this.user);
      this.$state.go('main.home');
    }
  }

};

/**
 *
 * @type {string[]}
 */
LoginCtrl.$inject = [
  '$scope',
  '$state',
  'User'
];

export default LoginCtrl;
