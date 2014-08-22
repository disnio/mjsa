;(function($) {
    var slice = Array.prototype.slice;
	$.whereas = function( /*[func] [, delay] [, funcParameters]*/) {
		var args = arguments,
		    isFunc = $.isFunction(args[0]),
		    func = isFunc ? args[0] : $.noop,
		    delay = (isFunc ? args[1] : args[0]) || 0,
		    funcArgs = slice.call(args, 2),
		    isCancelled = false,
		    cancel = function(reject /* = true */) {
			    clearTimeout(timerId);
			    isCancelled = true;
			    if ((!arguments.length || reject) && deferred.state() === "pending") {
				    deferred.rejectWith(null, funcArgs);
			    }
		    },
		    deferred = $.Deferred(),
		    timerId = setTimeout(function() {
			    deferred.notifyWith(promise, funcArgs);
			    if (isCancelled) {
				    return;
			    }
			    try {
				    var result = func.apply(this, funcArgs);
				    deferred.resolveWith(result, funcArgs);
			    } catch(e) {
			    	deferred.rejectWith(e, funcArgs);
			    }
		    }, delay),
		    promise = $.extend(deferred.promise(), {
			    cancel: cancel
		    });
		return promise;
	};
})(jQuery);
