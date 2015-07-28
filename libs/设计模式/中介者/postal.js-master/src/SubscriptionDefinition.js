/* global postal */
/*jshint -W117 */
//定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象
var SubscriptionDefinition = function ( channel, topic, callback ) {
    if(arguments.length !== 3) {
        throw new Error("You must provide a channel, topic and callback when creating a SubscriptionDefinition instance.");
    }
    if(topic.length === 0) {
        throw new Error("Topics cannot be empty");
    }
	this.channel = channel;
	this.topic = topic;
	this.callback = callback;
	this.constraints = [];
	this.context = null;
	postal.configuration.bus.publish( {// 传入默认包裹 envelop 参数，频道主题发布
		channel : postal.configuration.SYSTEM_CHANNEL,
		topic   : "subscription.created",
		data    : {
			event   : "subscription.created",
			channel : channel,
			topic   : topic
		}
	} );

	// -----------订阅者加入订阅集中----------------
	postal.configuration.bus.subscribe( this ); 
};

SubscriptionDefinition.prototype = {
	unsubscribe : function () {
		if ( !this.inactive ) {
			this.inactive = true; // 订阅者状态标示，非激活
			postal.configuration.bus.unsubscribe( this ); // 以前订阅过，则退订
			postal.configuration.bus.publish( { // 频道
				channel : postal.configuration.SYSTEM_CHANNEL,
				topic   : "subscription.removed",
				data    : {
					event   : "subscription.removed",
					channel : this.channel,
					topic   : this.topic
				}
			} );
		}
	},

	defer : function () {
		var self = this;
		var fn = this.callback;
		this.callback = function ( data, env ) {
			setTimeout( function () {
				fn.call( self.context, data, env );
			}, 0 );
		};
		return this;
	},

	disposeAfter : function ( maxCalls ) {
		if ( _.isNaN( maxCalls ) || maxCalls <= 0 ) {
			throw "The value provided to disposeAfter (maxCalls) must be a number greater than zero.";
		}
		var self = this;
		var fn = this.callback;
		var dispose = _.after( maxCalls, _.bind( function () {// 订阅maxCalls次后，退订
			this.unsubscribe();
		}, this ) );

		this.callback = function () {
			fn.apply( self.context, arguments );
			dispose(); // 够计数次数后，退订
		};
		return this;
	},

	distinctUntilChanged : function () {// 主题变化则订阅
		this.withConstraint( new ConsecutiveDistinctPredicate() );
		return this;
	},

	distinct : function () { // 非重复主题，则订阅
		this.withConstraint( new DistinctPredicate() );
		return this;
	},

	once : function () { // 订阅一次
		this.disposeAfter( 1 );
		return this;
	},

	withConstraint : function ( predicate ) { // 判断加入约束集合
		if ( !_.isFunction( predicate ) ) {
			throw "Predicate constraint must be a function";
		}
		this.constraints.push( predicate );
		return this;
	},

	withConstraints : function ( predicates ) { // 判断集加入约束集合
		var self = this;
		if ( _.isArray( predicates ) ) {
			_.each( predicates, function ( predicate ) {
				self.withConstraint( predicate );
			} );
		}
		return self;
	},

	withContext : function ( context ) { // 设置作用域
		this.context = context;
		return this;
	},

	withDebounce : function ( milliseconds, immediate ) {
		if ( _.isNaN( milliseconds ) ) {
			throw "Milliseconds must be a number";
		}
		var fn = this.callback; // 间隔多少时间执行一次
		this.callback = _.debounce( fn, milliseconds, !!immediate );
		return this;
	},

	withDelay : function ( milliseconds ) {
		if ( _.isNaN( milliseconds ) ) {
			throw "Milliseconds must be a number";
		}
		var self = this;
		var fn = this.callback;
		this.callback = function ( data, env ) {
			setTimeout( function () {
				fn.call( self.context, data, env );
			}, milliseconds );
		};
		return this;
	},

	withThrottle : function ( milliseconds ) {
		if ( _.isNaN( milliseconds ) ) {
			throw "Milliseconds must be a number";
		}
		var fn = this.callback; // 最多每隔 wait毫秒调用一次该函数
		this.callback = _.throttle( fn, milliseconds );
		return this;
	},

	subscribe : function ( callback ) {
		this.callback = callback; // 订阅回调添加
		return this;
	}
};