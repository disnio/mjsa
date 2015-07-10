/*jshint -W098 */
// 上次的数据也这次传入数据进行比较，只缓存一次数据。返回比较结果。
var ConsecutiveDistinctPredicate = function () {
	var previous;
	return function ( data ) {
		var eq = false;
		if ( _.isString( data ) ) {
			eq = data === previous;
			previous = data;
		}
		else {
			eq = _.isEqual( data, previous );
			previous = _.clone( data );
		}
		return !eq;
	};
};