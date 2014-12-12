/* global localBus, bindingsResolver, ChannelDefinition, SubscriptionDefinition, postal */
/*jshint -W020 */
//它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
postal = { // postal 对象的外部api，用于系统调用
	configuration : {
		bus             : localBus,
		resolver        : bindingsResolver,
		DEFAULT_CHANNEL : "/",
		SYSTEM_CHANNEL  : "postal"
	},

	ChannelDefinition      : ChannelDefinition,
	SubscriptionDefinition : SubscriptionDefinition,

	channel : function ( channelName ) { // 新建频道
		return new ChannelDefinition( channelName );
	},

	subscribe : function ( options ) { // 新建频道的订阅主题及回调事件
		return new SubscriptionDefinition( options.channel || postal.configuration.DEFAULT_CHANNEL, options.topic, options.callback );
	},

	publish : function ( envelope ) { // 发布主题 { channel, topic, data }
		envelope.channel = envelope.channel || postal.configuration.DEFAULT_CHANNEL;
		return postal.configuration.bus.publish( envelope ); // 通过bus 发布频道主题包裹
	},

	addWireTap : function ( callback ) {
		return this.configuration.bus.addWireTap( callback ); 
	},

	linkChannels : function ( sources, destinations ) {
		var result = [];
		sources = !_.isArray( sources ) ? [ sources ] : sources;
		destinations = !_.isArray( destinations ) ? [destinations] : destinations;
		_.each( sources, function ( source ) {
			var sourceTopic = source.topic || "#";
			_.each( destinations, function ( destination ) {
				var destChannel = destination.channel || postal.configuration.DEFAULT_CHANNEL;
				result.push(
					postal.subscribe( {
						channel  : source.channel || postal.configuration.DEFAULT_CHANNEL,
						topic    : sourceTopic,
						callback : function ( data, env ) {
							var newEnv = _.clone( env );
							newEnv.topic = _.isFunction( destination.topic ) ? destination.topic( env.topic ) : destination.topic || env.topic;
							newEnv.channel = destChannel;
							newEnv.data = data;
							postal.publish( newEnv );
						}
					} )
				);
			} );
		} );
		return result;
	},

	utils : {
		getSubscribersFor : function () {
			var channel = arguments[ 0 ],
				tpc = arguments[ 1 ];
			if ( arguments.length === 1 ) {
				channel = arguments[ 0 ].channel || postal.configuration.DEFAULT_CHANNEL;
				tpc = arguments[ 0 ].topic;
			}
			if ( postal.configuration.bus.subscriptions[ channel ] &&
			     Object.prototype.hasOwnProperty.call( postal.configuration.bus.subscriptions[ channel ], tpc ) ) {// 存在频道订阅集，里面有对应主题
				return postal.configuration.bus.subscriptions[ channel ][ tpc ];// 返回订阅者集合
			}
			return [];
		},

		reset : function () {
			postal.configuration.bus.reset();
			postal.configuration.resolver.reset();
		}
	}
};
localBus.subscriptions[postal.configuration.SYSTEM_CHANNEL] = {};