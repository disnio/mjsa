path = require "path"
{reverse2, partial2, flatSplat, inDir, splattedPartial2} = require path.join(__dirname, "util.js")
_ = require "underscore"

inhere = inDir(__dirname)
misc = require inhere("misc.js")


selectors = do ->

	oneArgs = {}

	###*
	 * Given a list of moments, return a clone of the moment with the earliest date.
	 * @param  {Array} momentList An array of moments, or a sequence of individual moments (splatted).
	 * @return {Moment}               A clone of the earliest moment.
	###
	oneArgs.earliest = (momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_earliestSoFar = momentList[0]
		for i in [1..momentList.length-1]
			if momentList[i].isBefore(_earliestSoFar)
				_earliestSoFar = momentList[i]
		return _earliestSoFar.clone()

	###*
	 * Given a list of moments, return a clone of the moment with the latest date.
	 * @param  {Array} momentList An array of moments, or a sequence of individual moments (splatted).
	 * @return {Moment}               A clone of the latest moment.
	###
	oneArgs.latest = (momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]	
		_latestSoFar = momentList[0]
		for i in [1..momentList.length-1]
			if momentList[i].isAfter(_latestSoFar)
				_latestSoFar = momentList[i]
		return _latestSoFar.clone()


	twoArgs = {}
	###*
	 * Given a comparison moment and a list of other moments, return clones of all moments with dates before the comparison date.
	 * @param  {Moment} compareAgainst A moment to compare the other moments against.
	 * @param {Array} momentList... An array of moments to filter, or a sequence of individual moments (splatted).
	 * @return {Array}              An array of clones of all moments occurring before the comparison moment.
	###
	twoArgs.allBefore = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_before = _.filter momentList, (aMoment) ->
			aMoment.isBefore(compareAgainst)
		_before = _.map _before, (aMoment) -> aMoment.clone()
		_before

	###*
	 * Given a comparison moment and a list of other moments, return clones of all moments with dates after the comparison date.
	 * @param  {Moment} compareAgainst A moment to compare the other moments against.
	 * @param {Array} momentList... An array of moments to filter, or a sequence of individual moments (splatted).
	 * @return {Array}              An array of clones of all moments occurring after the comparison moment.
	###
	twoArgs.allAfter = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_after = _.filter momentList, (aMoment) ->
			aMoment.isAfter(compareAgainst)
		_after = _.map _after, (aMoment) -> aMoment.clone()
		_after

	###*
	 * Given a comparison moment and a list of other moments, return the single moment closest in time to the comparison moment.
	 * @param  {Moment} compareAgainst A moment to compare agsint.
	 * @param {Array} momentList... An array of moments to select from.
	 * @return {Moment}              The single moment closest in time to the comparison moment.
	###
	twoArgs.closestTo = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_closestSoFar = momentList[0]
		_minDiff = misc.absDiff(compareAgainst, momentList[0])
		for i in [1.. momentList.length-1]
			_diff = misc.absDiff(compareAgainst, momentList[i])
			if _diff < _minDiff
				_closestSoFar = momentList[i]
				_minDiff = _diff
		return _closestSoFar

	###*
	 * Given a comparison moment and a list of other moments, return the single moment farthest in time from the comparison moment.
	 * @param  {Moment} compareAgainst A moment to compare against.
	 * @param {Array} momentList... An array of moments to select from.
	 * @return {Moment}              The single moment farthest in time from the comparison moment.
	###
	twoArgs.farthestFrom = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_farthestSoFar = momentList[0]
		_maxDiff = misc.absDiff(compareAgainst, momentList[0])
		for i in [1.. momentList.length-1]
			_diff = misc.absDiff(compareAgainst, momentList[i])
			if _diff > _maxDiff
				_farthestSoFar = momentList[i]
				_maxDiff = _diff
		return _farthestSoFar

	###*
	 * Given a comparison moment and a list of other moments, filter the list down to those moments occurring before the comparison and then return the one closest in time.
	 * @param  {Moment} compareAgainst A moment to compare the other moments against.
	 * @param {Array} momentList... An array of moments to select from.
	 * @return {Moment}              The single moment closest in time to the comparison moment, out of all moments occurring before the comparison.
	###
	twoArgs.closestBefore = (compareAgainst, momentList...) ->
		twoArgs.closestTo(compareAgainst, twoArgs.allBefore(compareAgainst, flatSplat(momentList)))

	###*
	 * Given a comparison moment and a list of other moments, filter the list down to those moments occurring after the comparison and then return the one closest in time.
	 * @param  {Moment} compareAgainst A moment to compare the other moments against.
	 * @param {Array} momentList... An array of moments to select from.
	 * @return {Moment}              The single moment closest in time to the comparison moment, out of all moments occurring after the comparison.
	###
	twoArgs.closestAfter = (compareAgainst, momentList...) ->
		twoArgs.closestTo(compareAgainst, twoArgs.allAfter(compareAgainst, flatSplat(momentList)))

	###*
	 * Given a comparison moment and a list of other moments, filter the list down to those moments occurring before the comparison and then return the one farthest in time.
	 * @param  {Moment} compareAgainst A moment to compare the other moments against.
	 * @param {Array} momentList... An array of moments to select from.
	 * @return {Moment}              The single moment farthest in time to the comparison moment, out of all moments occurring before the comparison.
	###
	twoArgs.farthestBefore = (compareAgainst, momentList...) ->
		twoArgs.farthestFrom(compareAgainst, twoArgs.allBefore(compareAgainst, flatSplat(momentList)))

	###*
	 * Given a comparison moment and a list of other moments, filter the list down to those moments occurring after the comparison and then return the one farthest in time.
	 * @param  {Moment} compareAgainst A moment to compare the other moments against.
	 * @param {Array} momentList... An array of moments to select from.
	 * @return {Moment}              The single moment farthest in time to the comparison moment, out of all moments occurring after the comparison.
	###
	twoArgs.farthestAfter = (compareAgainst, momentList...) ->
		twoArgs.farthestFrom(compareAgainst, twoArgs.allAfter(compareAgainst, flatSplat(momentList)))

	_outs = {}

	#oneArgs =
	#	earliest: earliest
	#	latest: latest

	_.extend _outs, oneArgs

	_.each _.pairs(twoArgs), (onePair) ->
		fnName = onePair[0]
		fnRef = onePair[1]
		_outs[fnName] = splattedPartial2(fnRef)

	_outs



module.exports = selectors

