/*jshint -W098 */
var bindingsResolver = {
	cache : {},
	regex : {},

	compare : function ( binding, topic ) { // subdef 的topic，和消息包裹的topic
		var pattern, rgx, prevSegment, result = ( this.cache[ topic ] && this.cache[ topic ][ binding ] );
		if ( typeof result !== "undefined" ) {
			return result;
		}
		if ( !( rgx = this.regex[ binding ] )) {
			pattern = "^" + _.map( binding.split( "." ),function ( segment ) {
				var res = "";
				if ( !!prevSegment ) { // 作为连接符号的.加入到res里面
					res = prevSegment !== "#" ? "\\.\\b" : "\\b";
				}
				if ( segment === "#" ) {
					res += "[\\s\\S]*"; //任意多个空格或非空格的字符
				} else if ( segment === "*" ) {
					res += "[^.]+";  //不是“.“的任意字符或符号
				} else {
					res += segment;
				}
				prevSegment = segment;
				return res;
			} ).join( "" ) + "$";
			rgx = this.regex[ binding ] = new RegExp( pattern );
		}
		this.cache[ topic ] = this.cache[ topic ] || {};
		this.cache[ topic ][ binding ] = result = rgx.test( topic );
		return result;
	},

	reset : function () {
		this.cache = {};
		this.regex = {};
	}
};