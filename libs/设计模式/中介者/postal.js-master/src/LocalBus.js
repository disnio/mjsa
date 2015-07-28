/* global postal */

/*
jQuery 自定义事件是PubSub 模式的忤逆产物，因为这里由可选择的
DOM 元素而不是脚本中的对象来触发事件。这是和postal最大的区别。
同时触发事件的控制也是重要的因素。

PubSub 模式尤其不适用于一次性事件，一次性事件要求对异步函数执行的一次性任务的
两种结果（完成任务或任务失败）做不同的处理。（Ajax 请求就是常
见的一次性事件实例。）用于解决一次性事件问题的工具叫做Promise。

mediator 中介者所做的是在模块之间进行通信，是多向的.
由于中介者模式把交互复杂性变成了中介者本身的复杂性，所以说中介者对象会比其它任何对象都复杂。
支持简单的广播通信，自动通知所有已经订阅过的对象。
页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性。
目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。

Promise 对象代表一项有两种可能结果（成功或失败）的任务，它还持有多个回调，
出现不同结果时会分别触发相应的回调。
*/
var fireSub = function ( subDef, envelope ) {// 订阅者，消息包裹
	// 
	if ( !subDef.inactive && postal.configuration.resolver.compare( subDef.topic, envelope.topic ) ) {
		if ( _.all( subDef.constraints, function ( constraint ) { // 调用所有约束，全部通过后
			return constraint.call( subDef.context, envelope.data, envelope );
		} ) ) { // 执行订阅回调，传入包裹参数
			if ( typeof subDef.callback === "function" ) {
				subDef.callback.call( subDef.context, envelope.data, envelope );
			}
		}
	}
};

var pubInProgress = 0;
var unSubQueue = [];
var clearUnSubQueue = function () {
	while ( unSubQueue.length ) {
		localBus.unsubscribe(unSubQueue.shift());
	}
};

var localBus = {// 中介对象
	addWireTap : function ( callback ) {
		var self = this;
		self.wireTaps.push( callback );
		return function () {
			var idx = self.wireTaps.indexOf( callback );
			if ( idx !== -1 ) { // ?? 删除对应回调
				self.wireTaps.splice( idx, 1 );
			}
		};
	},
	// 广播事件
	publish : function ( envelope ) {// { channel, topic, data{ event, channel, topic } }
		++pubInProgress; // 发布计数
		envelope.timeStamp = new Date(); // 时间戳
		_.each( this.wireTaps, function ( tap ) {
			tap( envelope.data, envelope ); // 执行回调
		} );
		if ( this.subscriptions[envelope.channel] ) {// 取得对应频道的订阅者
			_.each( this.subscriptions[envelope.channel], function ( subscribers ) {
				var idx = 0, len = subscribers.length, subDef;
				while ( idx < len ) { // 遍历订阅者集合
					if ( subDef = subscribers[idx++] ) {
						fireSub( subDef, envelope ); // 传递消息给订阅者
					}
				}
			} );
		}
		if ( --pubInProgress === 0 ) {
			clearUnSubQueue();
		}
		return envelope;
	},

	reset : function () {
		if ( this.subscriptions ) {
			_.each( this.subscriptions, function ( channel ) {
				_.each( channel, function ( topic ) {
					while ( topic.length ) {
						topic.pop().unsubscribe();
					}
				} );
			} );
			this.subscriptions = {};
		}
	},
	// 订阅一个事件

	subscribe : function ( subDef ) {
		var channel = this.subscriptions[subDef.channel], subs;
		if ( !channel ) {
			channel = this.subscriptions[subDef.channel] = {};
		}
		subs = this.subscriptions[subDef.channel][subDef.topic];
		if ( !subs ) {
			subs = this.subscriptions[subDef.channel][subDef.topic] = [];
		}
		subs.push( subDef );
		return subDef;
	},

	subscriptions : {},

	wireTaps : [],

	unsubscribe : function ( config ) {
		if ( pubInProgress ) {
			unSubQueue.push( config );
			return;
		}
		if ( this.subscriptions[config.channel][config.topic] ) {
			var len = this.subscriptions[config.channel][config.topic].length,
				idx = 0;
			while ( idx < len ) { // 去除频道的某个主题
				if ( this.subscriptions[config.channel][config.topic][idx] === config ) {
					this.subscriptions[config.channel][config.topic].splice( idx, 1 );
					break;
				}
				idx += 1;
			}
		}
	}
};