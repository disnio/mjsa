'use strict';

class MessagesNewController {
  constructor(msgStore) {
    this.text = '';
    this._msgStore = msgStore;
  }
  create() {
    this._msgStore.add(this.text);
    this.text = '';
  }
}

export default (Angular) => {
  
  require('commons/msg-store')(Angular);
  
  Angular.module('MessagesNewApp',['msgStore']).controller('MessagesNewController', MessagesNewController);
}