'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _animateCss = require('./animateCss');

var _animateCss2 = _interopRequireDefault(_animateCss);

require('../assets/css/RTMessage.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

(0, _animateCss2["default"])();

var RTMessage = function (_Component) {
  _inherits(RTMessage, _Component);

  function RTMessage(props) {
    _classCallCheck(this, RTMessage);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  RTMessage.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        keepOpen = _props.keepOpen,
        keepTime = _props.keepTime;

    $('.rtmessage[type=rtmessagePlugin]').css({ display: 'block' });
    $('.rtmessage[type=rtmessagePlugin]').animateCss('bounceInDown');
    !keepOpen && setTimeout(function () {
      $('.rtmessage[type=rtmessagePlugin]').animateCss('bounceOutUp', function () {
        $('.rtmessage[type=rtmessagePlugin]').css({ display: 'none' });
      });
    }, keepTime || 2500);
  };

  RTMessage.prototype.render = function render() {
    return _react2["default"].createElement(
      'div',
      null,
      _react2["default"].createElement(
        'div',
        { className: 'rtmessage', type: 'rtmessagePlugin' },
        this.props.children
      )
    );
  };

  return RTMessage;
}(_react.Component);

exports["default"] = RTMessage;
module.exports = exports['default'];