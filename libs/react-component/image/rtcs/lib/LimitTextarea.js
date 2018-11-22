'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('../assets/css/LimitTextarea.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

window.$ = window.jQuery = _jquery2["default"];

var LimitTextarea = function (_Component) {
  _inherits(LimitTextarea, _Component);

  function LimitTextarea(props) {
    _classCallCheck(this, LimitTextarea);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      txtStatus: true,
      txtLen: 0

    };
    _this.doCheckTxtLength = _this.doCheckTxtLength.bind(_this);
    return _this;
  }

  LimitTextarea.prototype.componentDidMount = function componentDidMount() {
    this.doCheckTxtLength(null, $(this.refs.rtcsTxtArea));
  };

  LimitTextarea.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    setTimeout(function () {
      $(_this2.refs.txtlen).html($(_this2.refs.rtcsTxtArea).val().length);
    });
  };

  LimitTextarea.prototype.doCheckTxtLength = function doCheckTxtLength(ev, $ele) {
    var _this3 = this;

    var _txt = ($ele || $(ev.target || ev.srcElement)).val() || '';
    var _max = ($ele || $(ev.target || ev.srcElement)).attr('data-max-length');
    var _open = this.props['data-open-cb'];
    var _successFn = this.props['data-success-cb'];
    var _errorFn = this.props['data-error-cb'];
    this.setState({
      txtStatus: _txt.length <= (_max || 100),
      txtLen: _txt.length
    }, function () {
      _open && (_this3.state.txtStatus ? _successFn && _successFn() : _errorFn && _errorFn());
    });
  };

  LimitTextarea.prototype.render = function render() {
    var _this4 = this;

    var _state = this.state,
        txtStatus = _state.txtStatus,
        txtLen = _state.txtLen;

    var _maxLen = this.props['data-max-length'];
    var warnTxt = this.props['data-warnTxt'];
    var warnTxtCssName = this.props['data-warnTxtCssName'];

    return _react2["default"].createElement(
      'div',
      null,
      _react2["default"].createElement('textarea', _extends({ ref: 'rtcsTxtArea', onInput: function onInput(ev) {
          _this4.doCheckTxtLength(ev);
        } }, this.props)),
      _react2["default"].createElement(
        'span',
        { className: (txtStatus ? 'txt-success' : 'txt-error') + ' ' + warnTxtCssName },
        warnTxt,
        '\uFF1A',
        _react2["default"].createElement(
          'em',
          { ref: 'txtlen' },
          txtLen
        ),
        '/',
        _maxLen || 100
      )
    );
  };

  return LimitTextarea;
}(_react.Component);

exports["default"] = LimitTextarea;
module.exports = exports['default'];