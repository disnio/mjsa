path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"

enders = do ->
	_enders = [
		"Year",
		"Month"
		"Week"
		"Day"
		"Hour"
		"Minute"
		"Second"
	]
	_outs = {}

	###*
	 * Given a target moment, return a clone rounded up to the end of its current year.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current year.
	###
	_outs.endOfYear = (targetMoment) ->
		targetMoment.clone().endOf("year")


	###*
	 * Given a target moment, return a clone rounded up to the end of its current month.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current month.
	###
	_outs.endOfMonth = (targetMoment) ->
		targetMoment.clone().endOf("month")
	###*
	 * Given a target moment, return a clone rounded up to the end of its current week.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current week.
	###
	_outs.endOfWeek = (targetMoment) ->
		targetMoment.clone().endOf("week")




	###*
	 * Given a target moment, return a clone rounded up to the end of its current day.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current day.
	###
	_outs.endOfDay = (targetMoment) ->
		targetMoment.clone().endOf("day")



	###*
	 * Given a target moment, return a clone rounded up to the end of its current hour.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current hour.
	###
	_outs.endOfHour = (targetMoment) ->
		targetMoment.clone().endOf("hour")



	###*
	 * Given a target moment, return a clone rounded up to the end of its current minute.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current minute.
	###
	_outs.endOfMinute = (targetMoment) ->
		targetMoment.clone().endOf("minute")


	###*
	 * Given a target moment, return a clone rounded up to the end of its current second.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round up.
	 * @return {Moment}              A clone of the target rounded up to the end of its current second.
	###
	_outs.endOfSecond = (targetMoment) ->
		targetMoment.clone().endOf("second")


	_stringEndOf = (endString, targetMoment) ->
		targetMoment.clone().endOf(endString)

	###*
	 * Given a string representing a unit of time and a target moment, return a clone with its value for that unit rounded up.
	 *
	 * Alternately, given only a unit string, return a stateless function which accepts a moment and return a clone rounded up to the nearest whole value for that unit.
	 * @param  {String} unitString The unit to round up.
	 * @param {Moment} targetMoment The moment to clone and round up.
	 * @return {Moment}              A clone of the target with its value rounded up to the nearest `unitString`.
	###
	_outs.endOf = partial2(_stringEndOf)

	###*
	 * Give a target moment and a string representing a unit of time, return a clone with its value for that unit rounded up.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a unit string and returns a clone of the moment rounded up to the nearest whole value for that unit.
	 * @param {Moment} targetMoment The moment to clone and round up.
	 * @param  {String} unitString The unit to round up.
	 * @return {Moment}              A clone of the target with its value rounded up to the nearest `unitString`.
	###
	_outs.endOfMoment = partial2( reverse2(_stringEndOf) )

	_outs

module.exports = enders
