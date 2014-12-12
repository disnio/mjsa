/*jshint -W098 */ 
// 把缓存的数据与传入的数据进行比较，不同则加入缓存。返回比较结果。
var DistinctPredicate = function () {
	var previous = [];

	return function ( data ) {
		var isDistinct = !_.any( previous, function ( p ) {
			if ( _.isObject( data ) || _.isArray( data ) ) {
				return _.isEqual( data, p );
			}
			return data === p;
		} );
		if ( isDistinct ) {
			previous.push( data );
		}
		return isDistinct;
	};
};