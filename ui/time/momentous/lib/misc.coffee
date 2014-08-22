path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"



misc = do ->

	invoke = (methodName, aMoment, params...) ->
		if _.size(params) is 1 and _.isArray(params[0])
			params = params[0]
		aMoment[methodName].apply(aMoment, params)

	invokeOnClone = (methodName, aMoment, params...) ->
		if _.size(params) is 1 and _.isArray(params[0])
			params = params[0]
		aMoment.clone()[aMethodName].apply(aMoment, params)

	clone = (aMoment) -> aMoment.clone()

	diff = (moment1, moment2) ->
		moment1.diff(moment2)

	absDiff = (moment1, moment2) ->
		_diff = moment1.diff(moment2)
		Math.abs(_diff)

	outs =
		absDiff: absDiff
		clone: clone
		diff: diff
		invoke: invoke
		invokeOnClone: invokeOnClone


module.exports = misc

