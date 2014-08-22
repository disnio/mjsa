path = require "path"
{reverse2, partial2, partial3, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"
moment = require "moment"

checkMoment = (possibleMoment) ->
	if moment.isMoment(possibleMoment)
		return possibleMoment
	return moment(possibleMoment)


xyz_from_yzx = (fn) -> 
	(y, z, x) ->
		fn(x, y, z)

xyz_from_zxy = (fn) -> 
	(z, x, y) ->
		fn(x, y, z)




preds = do ->


	_outs = {}
	_isBetween = (beforeMoment, afterMoment, possiblyBetween) ->
		beforeMoment = checkMoment(beforeMoment)
		afterMoment = checkMoment(afterMoment)
		cmp = {}
		if beforeMoment.isBefore(afterMoment)
			cmp.before = beforeMoment
			cmp.after = afterMoment
		else
			# if before / after were passed in reversed
			cmp.before = afterMoment
			cmp.after = beforeMoment
		if beforeMoment.isBefore(possiblyBetween) or beforeMoment.isSame(possiblyBetween)
			if possiblyBetween.isBefore(afterMoment)
				return true
		return false

	###*
	 * Given three moments, return true if the third moment occurs in the range between the first and second.
	 *
	 * @param {Moment} start A moment representing the start of the range.
	 * @param {Moment} end A moment representing the end of the range.
	 * @param  {Moment} maybeBetween The moment to test.
	 * @return {Boolean}              True if `maybeBetween` occurs between `start` and `end`; otherwise `false`.
	###
	_outs.isBetween = partial3(_isBetween)

	###*
	 * Given three moments, return true if the first moment occurs in the range between the second and third.
	 *
	 * @param {Moment} maybeBetween The moment to test.
	 * @param {Moment} start A moment representing the start of the range.
	 * @param {Moment} end A moment representing the end of the range.
	 * @return {Boolean}              True if `maybeBetween` occurs between `start` and `end`; otherwise `false`.
	###
	_outs.isMomentBetween = partial3(xyz_from_zxy(_isBetween))

	#maybe 	start
	#start	end
	#end	maybe
	#zxy 	xyz
	#xyz from zxy




	_isAfter = (compareAgainst, compare) ->
		compare = checkMoment(compare)
		if compare.isAfter(compareAgainst) then return true
		return false

	###*
	 * Given two moments, return true if the second moment occurs after the first.
	 *
	 * @param {Moment} compareAgainst The moment to test against.
	 * @param {Moment} compare The moment to test.
	 * @return {Boolean}              True if `compare` occurs after `compareAgainst`
	###
	_outs.isAfter = partial2 _isAfter


	_isBefore = (compareAgainst, compare) ->
		compare = checkMoment(compare)
		if compare.isBefore(compareAgainst) then return true
		return false

	###*
	 * Given two moments, return true if the second moment occurs before the first.
	 *
	 * @param {Moment} compareAgainst The moment to test against.
	 * @param {Moment} compare The moment to test.
	 * @return {Boolean}              True if `compare` occurs before `compareAgainst`
	###
	_outs.isBefore = partial2 _isBefore


	_outs

module.exports = preds
