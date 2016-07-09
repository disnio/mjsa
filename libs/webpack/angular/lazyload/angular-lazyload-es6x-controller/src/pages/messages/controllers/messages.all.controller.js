'use strict';
// let msg = require('commons/msg-store/index');

class MessagesAllController {
    constructor(msgStore) {
        this.msgs = msgStore.all();
    }
}

export default angular.module('MessagesAllApp', ['msg-store']).controller('MessagesAllController', MessagesAllController);
