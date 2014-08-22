/**
 * Helper function for passing arrays of promises to $.when
 */
jQuery.whenArray = function ( array ) {
	return jQuery.when.apply( this, array );
};


/**
 * Accepts a single image src or an array of image srcs.
 * @return Promise that resolves once images have loaded.
 */
function preloadImages (srcs) {
	var dfd = $.Deferred(),
		promises = [],
		img,
		l,
		p;
	
	if (!$.isArray(srcs)) {
		srcs = [srcs];
	}
	
	l = srcs.length;

	for (var i = 0; i < l; i++) {
		p = $.Deferred();
		img = $("<img />");
		
		img.load(p.resolve);
		img.error(p.resolve);
		
		promises.push(p);

		img.get(0).src = srcs[i];
	}

	$.whenArray(promises).done(dfd.resolve);
	return dfd.promise();
}