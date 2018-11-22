'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../assets/css/base.css');

require('../assets/css/AppleBar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AppleBar = function (_Component) {
  _inherits(AppleBar, _Component);

  function AppleBar(props) {
    _classCallCheck(this, AppleBar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.move = _this.move.bind(_this);

    return _this;
  }

  AppleBar.prototype.componentDidMount = function componentDidMount() {
    this.initAppleAnimate('homeFooter-apple');
    $(document).bind('mousemove', this.move);
  };

  AppleBar.prototype.componentWillUnmount = function componentWillUnmount() {
    $(document).unbind('mousemove', this.move);
  };

  AppleBar.prototype.move = function move(ev) {
    this.appleAnimate(ev, 'homeFooter-apple');
  };

  AppleBar.prototype.initAppleAnimate = function initAppleAnimate(el) {
    var oUl = document.getElementById(el);
    var aImg = oUl.getElementsByTagName("img");
    var aImgW = this.props.appData;

    aImgW.map(function (_item, i) {
      aImg[i].style.width = (_item.width || 50) / 2 + "px";
    });
  };

  AppleBar.prototype.appleAnimate = function appleAnimate(ev, el) {

    var oUl = document.getElementById(el);
    var aImg = oUl.getElementsByTagName("img");
    var disX = 0;
    var disY = 0;
    var dis = 0;
    var aImgW = this.props.appData;

    aImgW.map(function (_item, i) {

      disX = ev.clientX - (aImg[i].offsetWidth / 2 + aImg[i].offsetLeft);
      disY = ev.clientY - (aImg[i].offsetHeight / 2 + aImg[i].offsetTop + oUl.offsetTop);
      dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
      var scale = 1 - dis / 240;
      if (scale < 0.5) {
        scale = 0.5;
      }
      aImg[i].style.width = (aImgW[i].width || 50) * scale + "px";
    });
  };

  AppleBar.prototype.render = function render() {
    var _props = this.props,
        appData = _props.appData,
        appBarStyle = _props.appBarStyle,
        appBarCenterColr = _props.appBarCenterColr;


    return _react2["default"].createElement(
      'div',
      null,
      _react2["default"].createElement(
        'div',
        { className: 'homeFooter', id: 'homeFooter', 'data-from': 'rtcs' },
        _react2["default"].createElement('div', { style: appBarStyle || {}, className: 'homeFooter-apple-bg' }),
        appBarCenterColr && _react2["default"].createElement('div', { style: { backgroundColor: appBarCenterColr }, className: 'homeFooter-apple-box' })
      ),
      _react2["default"].createElement(
        'ul',
        { className: 'homeFooter-apple', id: 'homeFooter-apple' },
        appData && appData.length > 0 && appData.map(function (item, index) {
          return _react2["default"].createElement(
            'li',
            { onClick: function onClick() {
                item.cb && item.cb();
              }, key: '' + item.image + item.title },
            _react2["default"].createElement(
              'a',
              { href: '#' },
              _react2["default"].createElement('img', { src: item.image })
            ),
            item.title && _react2["default"].createElement(
              'span',
              null,
              item.title
            )
          );
        })
      )
    );
  };

  return AppleBar;
}(_react.Component);

exports["default"] = AppleBar;
module.exports = exports['default'];