'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RegInput = function (_Component) {
  _inherits(RegInput, _Component);

  function RegInput(props) {
    _classCallCheck(this, RegInput);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      isRegOk: true,
      initStaus: true,
      oldStr: _this.props.value || _this.props.defaultValue
    };
    _this.doCheckReg = _this.doCheckReg.bind(_this);
    return _this;
  }

  RegInput.prototype.componentDidMount = function componentDidMount() {
    this.props['data-InitCheck'] && this.doCheckReg();
  };

  RegInput.prototype.doCheckReg = function doCheckReg() {
    var _this2 = this;

    try {

      !this.props['data-reg'] && console.warn('Input缺少data-reg属性！');
      var _val = this.refs.streamIn.value;
      var _reg = new RegExp(this.props['data-reg']);

      this.setState({
        isRegOk: _reg.test(_val),
        initStaus: false
      }, function () {
        _this2.props['data-cb'] && _this2.props['data-cb']();
      });
    } catch (e) {
      console.warn(e);
    }
  };

  RegInput.prototype.render = function render() {
    var _state = this.state,
        isRegOk = _state.isRegOk,
        initStaus = _state.initStaus,
        oldStr = _state.oldStr;
    var isblur = this.props.isblur;

    return _react2["default"].createElement(
      'div',
      null,
      !isRegOk && _react2["default"].createElement(
        'div',
        { className: this.props['data-errorCssName'] ? this.props['data-errorCssName'] : '' },
        this.props['data-error']
      ),
      !initStaus && isRegOk && _react2["default"].createElement(
        'div',
        { className: this.props['data-successCssName'] ? this.props['data-successCssName'] : '' },
        this.props['data-success']
      ),
      !isblur && _react2["default"].createElement('input', _extends({ onInput: this.doCheckReg, ref: 'streamIn' }, this.props)),
      isblur && _react2["default"].createElement('input', _extends({ onBlur: this.doCheckReg, ref: 'streamIn' }, this.props))
    );
  };

  return RegInput;
}(_react.Component);

exports["default"] = RegInput;
module.exports = exports['default'];