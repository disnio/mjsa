/* global global */
'use strict';

const _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

require('core-js/modules/es5');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.object.assign');
require('core-js/modules/es6.object.is');
require('core-js/modules/es6.object.set-prototype-of');
require('core-js/modules/es6.object.to-string');
require('core-js/modules/es6.function.name');
require('core-js/modules/es6.function.has-instance');
require('core-js/modules/es6.number.constructor');
require('core-js/modules/es6.number.is-finite');
require('core-js/modules/es6.number.is-integer');
require('core-js/modules/es6.number.is-nan');
require('core-js/modules/es6.number.parse-float');
require('core-js/modules/es6.number.parse-int');
require('core-js/modules/es6.string.ends-with');
require('core-js/modules/es6.string.includes');
require('core-js/modules/es6.string.repeat');
require('core-js/modules/es6.string.starts-with');
require('core-js/modules/es6.array.from');
require('core-js/modules/es6.array.of');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.array.fill');
require('core-js/modules/es6.array.find');
require('core-js/modules/es6.array.find-index');
require('core-js/modules/es6.regexp.constructor');
require('core-js/modules/es6.regexp.flags');
require('core-js/modules/es6.regexp.match');
require('core-js/modules/es6.regexp.replace');
require('core-js/modules/es6.regexp.search');
require('core-js/modules/es6.regexp.split');
require('core-js/modules/es6.promise');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es7.string.at');
require('core-js/modules/es7.object.values');
require('core-js/modules/es7.object.entries');
module.exports = require('core-js/modules/$.core');

require('babel-regenerator-runtime');

if (global._babelPolyfill) {
    throw new Error('only one instance of babel-polyfill is allowed');
}
global._babelPolyfill = true;

function define(O, key, value) {
    O[key] || _Object$defineProperty(O, key, {
        writable: true,
        configurable: true,
        value: value
    });
}

define(String.prototype, 'padLeft', ''.padStart);
define(String.prototype, 'padRight', ''.padEnd);

'pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill'.split(',').forEach(function (key) {
    [][key] && define(Array, key, Function.call.bind([][key]));
});