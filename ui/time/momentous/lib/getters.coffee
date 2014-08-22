
#NOT CURRENTLY IN USE!

path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"

getters = do ->
	_getters = [
		"unix"
		"valueOf"
		"daysInMonth"
		"isDST"
		"isLeapYear"
		"isMoment"
		"dayOfYear"
		"isoWeekday"
		"isoWeekYear"
		"weekYear"
		"week"
		"year"
		"isoWeek"
		"month"
	]
	_getString = (methodName, targetMoment) ->
		targetMoment[methodName]()

	_outs = {}
	_outs.get = partial2(_getString)
	_outs.getFrom = partial2( reverse2( _getString) )

	_.each _getters, (oneGetter) ->
		_outs.get[oneGetter] = (targetMoment) ->
			targetMoment[oneGetter]()
	_outs

module.exports = getters
