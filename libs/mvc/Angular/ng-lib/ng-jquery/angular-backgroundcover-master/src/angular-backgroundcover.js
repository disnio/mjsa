(function (exports, angular, undefined) {
  'use strict';

  /**
   * angular-backgroundcover is a css3 shim for css background-size: cover
   *
   * (c) Thomas Appel 2013
   * @author Thomas Appel <mail@thomas-appel.com>
   * @license MIT
   */
  angular.module('backgroundCover', []).directive('backgroundCover', function () {
    var native = false, p,
    head = document.head ? document.head : document.getElementsByTagName('head')[0],
    props = ['mozBackgroungSize', 'webkitBackgroundSize', 'backgroundSize'];

    (function testBackgroundSize() {
      var el = document.createElement('div');
      head.appendChild(el);
      while (props.length) {
        p = props.pop();
        if (el.style[p] !== undefined) {
          el.style[p] = 'cover';
          break;
        }
      }
      native = el.style[p] ? el.style[p] === 'cover' : false;
      head.removeChild(el);
    }());

    return {
      restrict: 'AC',
      link: function (scope, element, attrs) {
        if (!native || attrs.force) {
          element.backgroundcover(attrs.image || undefined, {destroy: '$destroy', poll: attrs.poll === 'true' ? true : false});
        }
      }
    };
  });
}(this, this.angular));
