'use strict';
let MsgStoreService = require('./msg-store.service');
const msg = angular.module('msg-store', []);
msg.service('msgStore', MsgStoreService);
// export default msg;
module.exports = msg;