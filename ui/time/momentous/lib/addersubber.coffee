path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"

manipulators = do ->
	_outs = {}
	_unpartialedAdders = {}
	_uA = _unpartialedAdders

	###*
	 * Given a target moment and a number of years, return a clone of the target with that number of years added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of years and returns a clone of the target with that many years added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numYears The number of years to add.
	 * @return {Moment}              A clone of the target with `numYears` added to it. 
	###
	_uA.years = (targetMoment, years) ->
		targetMoment.clone().add("y", years)

	###*
	 * Given a target moment and a number of days, return a clone of the target with that number of days added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of days and returns a clone of the target with that many days added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numDays The number of days to add.
	 * @return {Moment}              A clone of the target with `numDays` added to it. 
	###
	_uA.days = (targetMoment, days) ->
		targetMoment.clone().add("d", days)

	###*
	 * Given a target moment and a number of months, return a clone of the target with that number of months added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of months and returns a clone of the target with that many months added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numMonths The number of months to add.
	 * @return {Moment}              A clone of the target with `numMonths` added to it. 
	###
	_uA.months = (targetMoment, months) ->
		targetMoment.clone().add("M", months)

	###*
	 * Given a target moment and a number of hours, return a clone of the target with that number of hours added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of hours and returns a clone of the target with that many hours added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numHours The number of hours to add.
	 * @return {Moment}              A clone of the target with `numHours` added to it. 
	###
	_uA.hours = (targetMoment, hours) ->
		targetMoment.clone().add("h", hours)

	###*
	 * Given a target moment and a number of minutes, return a clone of the target with that number of minutes added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of minutes and returns a clone of the target with that many minutes added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numMinutes The number of minutes to add.
	 * @return {Moment}              A clone of the target with `numMinutes` added to it. 
	###
	_uA.minutes = (targetMoment, minutes) ->
		targetMoment.clone().add("m", minutes)

	###*
	 * Given a target moment and a number of seconds, return a clone of the target with that number of seconds added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of seconds and returns a clone of the target with that many seconds added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numSeconds The number of seconds to add.
	 * @return {Moment}              A clone of the target with `numSeconds` added to it. 
	###
	_uA.seconds = (targetMoment, seconds) ->
		targetMoment.clone().add("s", seconds)

	###*
	 * Given a target moment and a number of milliseconds, return a clone of the target with that number of milliseconds added.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of milliseconds and returns a clone of the target with that many milliseconds added.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Number} numMSec The number of milliseconds to add.
	 * @return {Moment}              A clone of the target with `numMSec` added to it. 
	###
	_uA.msec = (targetMoment, millisecs) ->
		targetMoment.clone().add('ms', millisecs)

	###*
	 * Given a target moment and an object literal, return a clone of the target with that object literal applied to the clone's `#add` method..
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts an object literal and returns a clone of the target with #add applied to the object.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @param {Object} objectLit An object literal with key-value pairs corresponding to the additions to make to `targetMoment`.
	 * @return {Moment}              A clone of the target with its #add method applied to `objectLit`.
	###
	_uA.lit = (targetMoment, objectLiteral) ->
		targetMoment.clone().add(objectLiteral)

	adders = do ->
		_partialed = {}
		_.each _.pairs(_unpartialedAdders), (onePair) ->
			_partialed[onePair[0]] = partial2(onePair[1])
		_partialed

	_addBy = {}

	###*
	 * Given a number of years and a target moment, return a clone of the target with that number of years added.
	 *
	 * Alternately, given only `numYears`, return a stateless function which accepts any moment reference and returns a clone with `numYears` added.
	 * @param {Number} numYears The number of years to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numYears` added to it. 
	###
	_addBy.years = partial2(reverse2(_uA.years))

	###*
	 * Given a number of months and a target moment, return a clone of the target with that number of months added.
	 *
	 * Alternately, given only `numMonths`, return a stateless function which accepts any moment reference and returns a clone with `numMonths` added.
	 * @param {Number} numMonths The number of months to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numMonths` added to it. 
	###
	_addBy.months = partial2(reverse2(_uA.months))

	###*
	 * Given a number of days and a target moment, return a clone of the target with that number of days added.
	 *
	 * Alternately, given only `numDays`, return a stateless function which accepts any moment reference and returns a clone with `numDays` added.
	 * @param {Number} numDays The number of days to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numDays` added to it. 
	###
	_addBy.days = partial2(reverse2(_uA.days))

	###*
	 * Given a number of hours and a target moment, return a clone of the target with that number of hours added.
	 *
	 * Alternately, given only `numHours`, return a stateless function which accepts any moment reference and returns a clone with `numHours` added.
	 * @param {Number} numHours The number of hours to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numHours` added to it. 
	###
	_addBy.hours = partial2(reverse2(_uA.hours))

	###*
	 * Given a number of minutes and a target moment, return a clone of the target with that number of minutes added.
	 *
	 * Alternately, given only `numMinutes`, return a stateless function which accepts any moment reference and returns a clone with `numMinutes` added.
	 * @param {Number} numMinutes The number of minutes to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numMinutes` added to it. 
	###
	_addBy.minutes = partial2(reverse2(_uA.minutes))

	###*
	 * Given a number of seconds and a target moment, return a clone of the target with that number of seconds added.
	 *
	 * Alternately, given only `numSeconds`, return a stateless function which accepts any moment reference and returns a clone with `numSeconds` added.
	 * @param {Number} numSeconds The number of seconds to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numSeconds` added to it. 
	###
	_addBy.seconds = partial2(reverse2(_uA.seconds))

	###*
	 * Given a number of milliseconds and a target moment, return a clone of the target with that number of milliseconds added.
	 *
	 * Alternately, given only `numMilliseconds`, return a stateless function which accepts any moment reference and returns a clone with `numMilliseconds` added.
	 * @param {Number} numMilliseconds The number of milliseconds to add.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with `numMilliseconds` added to it. 
	###
	_addBy.msec = partial2(reverse2(_uA.msec))

	###*
	 * Given an object literal and a target moment, return a clone of the target with the clone's `#add` method applied to the literal.
	 *
	 * Alternately, given only an object literal, return a stateless function which accepts any moment referenceand returns a clone its `#add` method applied to the object.
	 * @param {Object} objectLit An object literal with key-value pairs corresponding to the additions to make to `targetMoment`.
	 * @param  {Moment} targetMoment A moment to clone and add time to.
	 * @return {Moment}              A clone of the target with its `#add` method applied to `objectLit`.
	###
	_addBy.lit = partial2(reverse2(_uA.lit))


	add = adders.lit
	_.extend add, adders
	addBy = _addBy.lit
	_.extend addBy, _addBy

	_outs.add = add
	_outs.addBy = addBy

	_unpartialedSubtracters = {}
	_uS = _unpartialedSubtracters

	###*
	 * Given a target moment and a number of years, return a clone of the target with that number of years subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of years and returns a clone of the target with that many years subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numYears The number of milliseconds to subtract.
	 * @return {Moment}              A clone of the target with `numYears` subtracted from it. 
	###
	_uS.years =  (targetMoment, years) ->
		targetMoment.clone().subtract("y", years)

	###*
	 * Given a target moment and a number of days, return a clone of the target with that number of days subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of days and returns a clone of the target with that many days subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numDays The number of days to subtract.
	 * @return {Moment}              A clone of the target with `numDays` subtracted from it. 
	###
	_uS.days =  (targetMoment, days) ->
		targetMoment.clone().subtract("d", days)

	###*
	 * Given a target moment and a number of months, return a clone of the target with that number of months subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of months and returns a clone of the target with that many months subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numMonths The number of months to subtract.
	 * @return {Moment}              A clone of the target with `numMonths` subtracted from it. 
	###
	_uS.months =  (targetMoment, months) ->
		targetMoment.clone().subtract("M", months)

	###*
	 * Given a target moment and a number of hours, return a clone of the target with that number of hours subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of hours and  a clone of the target with that many hours subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numHours The number of hours to subtract.
	 * @return {Moment}              A clone of the target with `numHours` subtracted from it. 
	###
	_uS.hours =  (targetMoment, hours) ->
		targetMoment.clone().subtract("h", hours)

	###*
	 * Given a target moment and a number of minutes, return a clone of the target with that number of minutes subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of minutes and returns a clone of the target with that many minutes subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numMinutes The number of minutes to subtract.
	 * @return {Moment}              A clone of the target with `numMinutes` subtracted from it. 
	###
	_uS.minutes =  (targetMoment, minutes) ->
		targetMoment.clone().subtract("m", minutes)

	###*
	 * Given a target moment and a number of seconds, return a clone of the target with that number of seconds subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of seconds and returns a clone of the target with that many seconds subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numSeconds The number of seconds to subtract.
	 * @return {Moment}              A clone of the target with `numSeconds` subtracted from it. 
	###
	_uS.seconds =  (targetMoment, seconds) ->
		targetMoment.clone().subtract("s", seconds)

	###*
	 * Given a target moment and a number of milliseconds, return a clone of the target with that number of milliseconds subtracted.
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts a number of milliseconds and returns a clone of the target with that many milliseconds subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Number} numMSec The number of milliseconds to subtract.
	 * @return {Moment}              A clone of the target with `numMSec` subtracted from it. 
	###
	_uS.msec =  (targetMoment, millisecs) ->
		targetMoment.clone().subtract('ms', millisecs)

	###*
	 * Given a target moment and an object literal, return a clone of the target with that object literal applied to the clone's `#subtract` method..
	 *
	 * Alternately, given only a target moment, return a stateless function which accepts an object literal and returns a clone of the target with #subtract applied to the object.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @param {Object} objectLit An object literal with key-value pairs corresponding to the subtractions to make from `targetMoment`.
	 * @return {Moment}              A clone of the target with its #subtract method applied to `objectLit`.
	###
	_uS.lit =  (targetMoment, objectLiteral) ->
		targetMoment.clone().subtract(objectLiteral)

	subbers = do ->
		_partialed = {}
		_.each _.pairs(_unpartialedSubtracters), (onePair) ->
			_partialed[onePair[0]] = partial2(onePair[1])
		_partialed


	_subBy = {}

	###*
	 * Given a number of years and a target moment, return a clone of the target with that number of years subtracted.
	 *
	 * Alternately, given only `numYears`, return a stateless function which accepts any moment reference and returns a clone with `numYears` subtracted.
	 * @param {Number} numYears The number of years to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numYears` subtracted from it. 
	###
	_subBy.years = partial2(reverse2(_uS.years))

	###*
	 * Given a number of months and a target moment, return a clone of the target with that number of months subtracted.
	 *
	 * Alternately, given only `numMonths`, return a stateless function which accepts any moment reference and returns a clone with `numMonths` subtracted.
	 * @param {Number} numMonths The number of months to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numMonths` subtracted from it. 
	###
	_subBy.months = partial2(reverse2(_uS.months))

	###*
	 * Given a number of days and a target moment, return a clone of the target with that number of days subtracted.
	 *
	 * Alternately, given only `numDays`, return a stateless function which accepts any moment reference and returns a clone with `numDays` subtracted.
	 * @param {Number} numDays The number of days to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numDays` subtracted from it. 
	###
	_subBy.days = partial2(reverse2(_uS.days))

	###*
	 * Given a number of hours and a target moment, return a clone of the target with that number of hours subtracted.
	 *
	 * Alternately, given only `numHours`, return a stateless function which accepts any moment reference and returns a clone with `numHours` subtracted.
	 * @param {Number} numHours The number of hours to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numHours` subtracted from it. 
	###
	_subBy.hours = partial2(reverse2(_uS.hours))

	###*
	 * Given a number of minutes and a target moment, return a clone of the target with that number of minutes subtracted.
	 *
	 * Alternately, given only `numMinutes`, return a stateless function which accepts any moment reference and returns a clone with `numMinutes` subtracted.
	 * @param {Number} numMinutes The number of minutes to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numMinutes` subtracted from it. 
	###
	_subBy.minutes = partial2(reverse2(_uS.minutes))

	###*
	 * Given a number of seconds and a target moment, return a clone of the target with that number of seconds subtracted.
	 *
	 * Alternately, given only `numSeconds`, return a stateless function which accepts any moment reference and returns a clone with `numSeconds` subtracted.
	 * @param {Number} numSeconds The number of seconds to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numSeconds` subtracted from it. 
	###
	_subBy.seconds = partial2(reverse2(_uS.seconds))

	###*
	 * Given a number of milliseconds and a target moment, return a clone of the target with that number of milliseconds subtracted.
	 *
	 * Alternately, given only `numMilliseconds`, return a stateless function which accepts any moment reference and returns a clone with `numMilliseconds` subtracted.
	 * @param {Number} numMSec The number of milliseconds to subtracted.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with `numMSec` subtracted from it. 
	###
	_subBy.msec = partial2(reverse2(_uS.msec))

	###*
	 * Given an object literal and a target moment, return a clone of the target with the clone's `#subtract` method applied to the literal.
	 *
	 * Alternately, given only an object literal, return a stateless function which accepts any moment reference and returns a clone with its `#subtract` method applied to the object.
	 * @param {Object} objectLit An object literal with key-value pairs corresponding to the subtractions to make from `targetMoment`.
	 * @param  {Moment} targetMoment A moment to clone and subtract time from.
	 * @return {Moment}              A clone of the target with its `#subtract` method applied to `objectLit`.
	###
	_subBy.lit = partial2(reverse2(_uS.lit))

	sub = subbers.lit
	subBy = _subBy.lit

	_.extend sub, subbers
	_.extend subBy, _subBy

	_outs.sub = sub
	_outs.subBy = subBy
	_outs

module.exports = manipulators

