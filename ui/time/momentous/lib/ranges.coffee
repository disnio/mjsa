path = require "path"
{reverse2, partial2, partial3, flatSplat, inDir} = require path.join(__dirname, "util.js")
_ = require "underscore"
moment = require "moment"

checkMoment = (possibleMoment) ->
	if moment.isMoment(possibleMoment)
		return possibleMoment
	return moment(possibleMoment)

_reverse = (list) ->
	_reversed = []
	i = list.length
	while i--
		_reversed.push list[i]
	_reversed

inhere = inDir(__dirname)

xyz_from_yxz = (fn) ->
	(y, x, z) ->
		fn(x, y, z)

xyz_from_yzx = (fn) -> 
	(y, z, x) ->
		fn(x, y, z)

xyz_from_zxy = (fn) -> 
	(z, x, y) ->
		fn(x, y, z)

xyz_from_zyx = (fn) -> 
	(z, y, x) ->
		fn(x, y, z)

xyz_from_yxz

_mod = require inhere("addersubber.js")


_momentCheck = (aMoment) ->
	unless moment.isMoment(aMoment)
		return moment(aMoment)
	aMoment


ranges = do ->


	_outs = {}

	_momentRange_BetweenMoments_Exclusive = (start, end, step) ->
		start = _momentCheck start
		end = _momentCheck end
		_output = []
		last = _mod.add(start, step)
		while last.isBefore(end)
			_output.push last
			last = _mod.add(last, step)
		_output

	_momentRange_BetweenMoments_Inclusive = (startMoment, endMoment, step) ->
		_output = []
		_output.push startMoment.clone()
		last = _mod.add(startMoment, step)
		while last.isBefore(endMoment)
			_output.push last
			last = _mod.add(last, step)
		_output

	_momentRange_stepsBefore = (nSteps, stepObj, endMoment) ->
		endMoment = _momentCheck endMoment
		momentCount = nSteps
		_prev = endMoment
		_output = []
		while momentCount--
			current = _prev.clone().subtract(stepObj)
			_output.push current
			_prev = current
		_reverse(_output)

	_momentRange_stepsAfter = (nSteps, stepObj, startMoment) ->
		startMoment = _momentCheck startMoment
		momentCount = nSteps
		_prev = startMoment
		_output = []
		while momentCount--
			current = _prev.clone().add(stepObj)
			_output.push current
			_prev = current
		_output




	_momentRangeInc = (startMoment, endMoment, stepObj) ->
		startMoment = _momentCheck(startMoment)
		endMoment = _momentCheck(endMoment)
		return _momentRange_BetweenMoments_Inclusive(startMoment, endMoment, stepObj)


	###*
	 * Given a start moment, an end moment, and an object specifying the step size, generate an array of moment objects representing every step from the start of the range (inclusive) to the end of the range (exclusive).
	 *
	 * Alternately, given only a start moment, return a function which accepts an end moment and a step size and returns the corresponding range of moments.  That function can also accept just an end moment, in which case it returns a function which accepts a step size and returns a range of moments.
	 *
	 * Alternately, given only start and end moments, return a function which accepts a step size object and returns the corresponding range of moments.
	 * 
	 * @param  {Moment} startMoment The start of the range, which is cloned and included in the output.
	 * @param {Moment} endMoment The end of the range, which _is not_ included in the output.
	 * @param {Object} step An object giving the step size between moments in the the same format as #add, i.e. `{days: 1, hours: 2}`.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.range = partial3(_momentRangeInc)

	###*
	 * Given an object specifying step size, a start moment, and an end moment, generate an array of moment objects representing every step from the start of the range (inclusive) to the end of the range (exclusive).
	 *
	 * Alternately, given only a step size, return a function which accepts a start and end moment and returns the range between those moments with the step size passed.  That function can also accept just a start moment, in which case it returns a function which accepts an end moment and returns a range of moments.
	 *
	 * Alternately, given only a step size and start moment, return a function which accepts an end moment and returns the corresponding range of moments.
	 * @param {Object} step An object giving the step size between moments in the the same format as #add, i.e. `{days: 1, hours: 2}`.
	 * @param  {Moment} startMoment The start of the range, which is cloned and included in the output.
	 * @param {Moment} endMoment The end of the range, which _is not_ included in the output.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.rangeBy = partial3 xyz_from_zxy(_momentRangeInc)

	###*
	 * Given a start moment, an end moment, and an object specifying the step size, generate an array of moment objects representing every step from the start of the range (exclusive) to the end of the range (exclusive).
	 *
	 * Alternately, given only a start moment, return a function which accepts an end moment and a step size and returns the corresponding range of moments.  That function can also accept just an end moment, in which case it returns a function which accepts a step size and returns a range of moments.
	 *
	 * Alternately, given only start and end moments, return a function which accepts a step size object and returns the corresponding range of moments.
	 * 
	 * @param  {Moment} startMoment The start of the range, which _is not_included in the output.
	 * @param {Moment} endMoment The end of the range, which _is not_ included in the output.
	 * @param {Object} step An object giving the step size between moments in the the same format as #add, i.e. `{days: 1, hours: 2}`.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.rangeExclusive = partial3(_momentRange_BetweenMoments_Exclusive)

	###*
	 * Given an object specifying step size, a start moment, and an end moment, generate an array of moment objects representing every step from the start of the range (exclusive) to the end of the range (exclusive).
	 *
	 * Alternately, given only a step size, return a function which accepts a start and end moment and returns the range between those moments with the step size passed.  That function can also accept just a start moment, in which case it returns a function which accepts an end moment and returns a range of moments.
	 *
	 * Alternately, given only a step size and start moment, return a function which accepts an end moment and returns the corresponding range of moments.
	 * @param {Object} step An object giving the step size between moments in the the same format as #add, i.e. `{days: 1, hours: 2}`.
	 * @param  {Moment} startMoment The start of the range, which _is not_ included in the output.
	 * @param {Moment} endMoment The end of the range, which _is not_ included in the output.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.rangeByExclusive = partial3 xyz_from_zxy(_momentRange_BetweenMoments_Exclusive)


	###*
	 * Given a number of steps, an object specifying the step size, and an end-point moment, generate an array of moments in the range of (`endPoint - (`nSteps` * `stepSize`)) (inclusive) -> `endPoint` (exclusive).
	 *
	 * Alternately, given only a number of steps, return a function which accepts a step size and an end moment and returns the corresponding range.  That function can also accept just a step size, in which case it returns a function which accepts an ending moment and returns the corresponding range.
	 *
	 * Alternately, given only a number of steps and a step size, return a function which accepts an end moment and returns the corresponding range.
	 *
	 * @param {Number} nSteps The number of moments to generate
	 * @param  {Object} step An object with key-value pairs representing the time gap between steps.
	 * @param {Moment} endMoment A moment which the generated moments increment towards.  It is not included in the output.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.nStepsBefore = partial3 _momentRange_stepsBefore


	###*
	 * Given an object specifying the step size, a number of steps, and an end-point moment, generate an array of moments in the range of (`endPoint - (`nSteps` * `stepSize`)) (inclusive) -> `endPoint` (exclusive).
	 *
	 * Alternately, given only a step size, return a function which accepts a number of steps and an end moment and returns the corresponding range.  That function can also accept just a number of steps, in which case it returns a function which accepts an ending moment and returns the corresponding range.
	 *
	 * Alternately, given only a step size and number of steps, return a function which accepts an end moment and returns the corresponding range.
	 *
	 * @param  {Object} step An object with key-value pairs representing the time gap between steps.
	 * @param {Number} nSteps The number of moments to generate
	 * @param {Moment} endMoment A moment which the generated moments increment towards.  It is not included in the output.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.stepsBeforeBy = partial3 xyz_from_yxz(_momentRange_stepsBefore)

	#	object    number
	#	number    object
	#	moment    moment
	#   yxz       xyz

	###*
	 * Given an end-point moment, an object specifying the step size, and a number of steps generate an array of moments in the range of (`endPoint - (`nSteps` * `stepSize`)) (inclusive) -> `endPoint` (exclusive).
	 *
	 * Alternately, given only an ending moment, return a function which accepts a step size and a number of steps and returns the corresponding range.  That function can also accept just a step size, in which case it returns a function which accepts a number of steps and returns the corresponding range.
	 *
	 * Alternately, given only an ending moment and a step size, return a function which accepts a number of steps and returns the corresponding range.
	 *
	 * @param {Moment} startMoment A moment which the generated moments increment away from.  It is not included in the output.
	 * @param  {Object} step An object with key-value pairs representing the time gap between steps.
	 * @param {Number} nSteps The number of moments to generate
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.stepsBeforeMoment = partial3 xyz_from_zyx(_momentRange_stepsBefore)

	#	moment    number
	#	object    object
	#	number    moment
	#   zyx       xyz



	###*
	 * Given a number of steps, an object specifying the step size, and a start-point moment, generate an array of moments in the range of `startPoint` (exclusive) -> (`startPoint + (`nSteps` * `stepSize`)) (inclusive).
	 *
	 * Alternately, given only a number of steps, return a function which accepts a step size and a starting moment and returns the corresponding range.  That function can also accept just a step size, in which case it returns a function which accepts a starting moment and returns the corresponding range.
	 *
	 * Alternately, given only a number of steps and a step size, return a function which accepts a starting moment and returns the corresponding range.
	 *
	 * @param {Number} nSteps The number of moments to generate
	 * @param  {Object} step An object with key-value pairs representing the time gap between steps.
	 * @param {Moment} startMoment A moment which the generated moments increment away from.  It is not included in the output.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.nStepsAfter = partial3 _momentRange_stepsAfter

	###*
	 * Given an object specifying the step size, a number of steps, and a start-point moment, generate an array of moments in the range of `startPoint` (exclusive) -> (`startPoint + (`nSteps` * `stepSize`)) (inclusive).
	 *
	 * Alternately, given only a step size, return a function which accepts a number of steps and a start moment and returns the corresponding range.  That function can also accept just a number of steps, in which case it returns a function which accepts a start moment and returns the corresponding range.
	 *
	 * Alternately, given only a step size and number of steps, return a function which accepts a start moment and returns the corresponding range.
	 *
	 * @param  {Object} step An object with key-value pairs representing the time gap between steps.
	 * @param {Number} nSteps The number of moments to generate
	 * @param {Moment} startMoment A moment which the generated moments increment away from.  It is not included in the output.
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.stepsAfterBy = partial3 xyz_from_yxz(_momentRange_stepsAfter)

	###*
	 * Given a start-point moment, an object specifying the step size, and a number of steps generate an array of moments in the range of `startPoint` (exclusive) -> (`startPoint + (`nSteps` * `stepSize`)) (inclusive).
	 *
	 * Alternately, given only a starting moment, return a function which accepts a step size and a number of steps and returns the corresponding range.  That function can also accept just a step size, in which case it returns a function which accepts a number of steps and returns the corresponding range.
	 *
	 * Alternately, given only a starting moment and a step size, return a function which accepts a number of steps and returns the corresponding range.
	 *
	 * @param {Moment} startMoment A moment which the generated moments increment away from.  It is not included in the output.
	 * @param  {Object} step An object with key-value pairs representing the time gap between steps.
	 * @param {Number} nSteps The number of moments to generate
	 * @return {Array}              An array of new moments corresponding to the given range.
	###
	_outs.stepsAfterMoment = partial3 xyz_from_zyx(_momentRange_stepsAfter)



	_outs

module.exports = ranges
