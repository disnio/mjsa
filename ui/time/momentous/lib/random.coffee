path = require "path"
{reverse2, partial2, partial3, flatSplat, inDir} = require path.join(__dirname, "util.js")
_ = require "underscore"
moment = require "moment"

_momentCheck = (aMoment) ->
	unless moment.isMoment(aMoment)
		return moment(aMoment)
	aMoment


_reverse = (list) ->
	_reversed = []
	i = list.length
	while i--
		_reversed.push list[i]
	_reversed

inhere = inDir(__dirname)

randoms = do ->
	_randomizeAbsDiff = (maxDiff) ->
		diff = Math.abs(maxDiff)
		randomizedDiff = Math.round(Math.random() * diff)
		randomizedDiff

	_randomizeSignedDiff = (maxDiff) ->
		diff = _randomizeAbsDiff(maxDiff)
		sign = Math.random()
		if sign < 0.5
			diff *= -1
		diff

	_outs = {}

	_randomBetween = (startMoment, endMoment) ->
		startMoment = _momentCheck(startMoment)
		endMoment = _momentCheck(endMoment)
		resolution = "ms"
		diff = _randomizeAbsDiff(startMoment.diff(endMoment, resolution))

		if startMoment.isBefore(endMoment)
			return startMoment.clone().add(resolution, diff)
		else
			return endMoment.clone().add(resolution, diff)

	###*
	 * Given two moment instances as endpoints, return a random moment somewhere between the two.
	 *
	 * Alternately, given a single moment, return a function which accepts a second moment and returns a random point between that and the first.
	 * 
	 * @param {Moment} moment1 The first moment of the range.  It doesn't have to come before moment2.
	 * @param  {Moment} moment2 The second moment of the range.  It doesn't have to come after moment1.
	 * @return {Moment}              A new moment instance at a random point in time between the two endpoints.
	###
	_outs.randomBetween = partial2(_randomBetween)



	_nRandomBetween = (count, startMoment, endMoment) ->
		_outs = []
		while count--
			_outs.push randomBetween(startMoment, endMoment, resolution)
		_outs


	###*
	 * Given a number of moments to generate and two moment instances as endpoints, return a random moment somewhere between the two.
	 *
	 * Alternately, given only a number, return a function which accepts two moment endpoints and returns an array of that number of random moments between the two points.
	 * 
	 * @param {Number} count The number of random moments to return.
	 * @param {Moment} moment1 The first moment of the range.  It doesn't have to come before moment2.
	 * @param  {Moment} moment2 The second moment of the range.  It doesn't have to come after moment1.
	 * @return {Array}              An array of `count` random moments between `moment1` and `moment2`.
	###
	_outs.nRandomBetween = partial3 _nRandomBetween


	_randomAround = (middleMoment, offset) ->
		middleMoment = _momentCheck(middleMoment)
		maxDiff = middleMoment.diff( middleMoment.clone().add(offset) )

		diff = _randomizeSignedDiff(maxDiff)
		middleMoment.clone().add(diff)

	###*
	 * Given a moment and a maximum offset, return a random moment within that offset of the passed moment.
	 *
	 * Alternately, given only a moment, return a function which accepts a maximum offset and returns a random moment within that offset of the previously passed moment.
	 * 
	 * @param {Moment} midPoint The moment at the center of the range of possible random moments. 
	 * @param {Object} maxOffset An object with key-value pairs corresponding to the maximum offset from the midpoint.
	 * @return {Moment}             A random moment within `maxOffset` of `midPoint`.
	###
	_outs.randomAround = partial2 _randomAround

	nRandomAround = (count, middleMoment, offset) ->
		_outs = []
		while count--
			_outs.push randomAround(middleMoment, offset)
		_outs

	###*
	 * Given a number of moments to generate, a midpoint moment and a maximum offset, return an array of that number of random moments within that offset of the midpoint.
	 *
	 * Alternately, given only a number, return a function which accepts a midpoint and a maximum offset returns an array of that number of random moments within that offset of the midpoint.
	 *
	 * @param {Number} count The number of moments to generate.
	 * @param {Moment} midPoint The moment at the center of the range of possible random moments. 
	 * @param {Object} maxOffset An object with key-value pairs corresponding to the maximum offset from the midpoint.
	 * @return {Array}             A `count`-length array of random moments within `maxOffset` of `midPoint`.
	###
	_outs.nRandomAround = partial3 nRandomAround

	_outs.randBetween = _outs.randomBetween
	_outs.nRandBetween = _outs.nRandomBetween
	_outs.randAround = _outs.randomAround
	_outs.nRandAround = _outs.nRandomAround
	_outs

module.exports = randoms