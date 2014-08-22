path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"

starters = do ->

	_outs = {}

	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current year.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current year.
	###
	_outs.startOfYear = (targetMoment) ->
		targetMoment.clone().startOf("year")



	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current month.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current month.
	###
	_outs.startOfMonth = (targetMoment) ->
		targetMoment.clone().startOf("month")


	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current week.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current week.
	###
	_outs.startOfWeek = (targetMoment) ->
		targetMoment.clone().startOf("week")


	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current day.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current day.
	###
	_outs.startOfDay = (targetMoment) ->
		targetMoment.clone().startOf("day")



	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current hour.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current hour.
	###
	_outs.startOfHour = (targetMoment) ->
		targetMoment.clone().startOf("hour")



	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current minute.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current minute.
	###
	_outs.startOfMinute = (targetMoment) ->
		targetMoment.clone().startOf("minute")



	###*
	 * Given a target moment, return a clone rounded down to the beginning of its current second.
	 *
	 * @param  {Moment} targetMoment A moment to clone and round down.
	 * @return {Moment}              A clone of the target rounded down to the beginning of its current second.
	###
	_outs.startOfSecond = (targetMoment) ->
		targetMoment.clone().startOf("second")


	_stringStartOf = (startString, targetMoment) ->
		targetMoment.clone().startOf(startString)



	###*
	 * Given a string representing a unit of time and a target moment, return a clone rounded down to the nearest whole value of that unit.
	 *
	 * Alternately, given only a unit string, return a stateless function which accepts a moment and returns a clone rounded down to the nearest whole value of that unit.
	 * @param  {String} unitString The unit to round down.
	 * @param {Moment} targetMoment The moment to clone and round down.
	 * @return {Moment}              A clone of the target with its value rounded down to the nearest whole `unitString`.
	###
	_outs.startOf = partial2(_stringStartOf)

	###*
	 * Given a target moment and a string representing a unit of time, return a clone rounded down to the nearest whole value of that unit.
	 * 
	 * Alternately, given only a target moment, return a stateless function which accepts a unit string and returns a clone of the moment rounded down to the nearest whole value of that unit.
	 * @param {Moment} targetMoment The moment to clone and round down.
	 * @param  {String} unitString The unit to round down.
	 * @return {Moment}              A clone of the target with its value rounded down to the nearest whole `unitString`.
	###
	_outs.startOfMoment = partial2( reverse2(_stringStartOf) )

	_outs


module.exports = starters
