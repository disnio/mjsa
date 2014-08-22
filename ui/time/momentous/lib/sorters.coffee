path = require "path"
{reverse2, partial2, flatSplat, inDir} = require path.join(__dirname, "util.js")
_ = require "underscore"

inHere = inDir(__dirname)

partial1 = (fn, x) ->
	if x?
		fn(x)
	else
		(x) ->
			fn(x)

negate = (fn, input) ->
	output = fn(input)
	if _.isNumber(output)
		return (output * -1)
	! output

negate = partial2 negate

momentVal = (aMoment) -> aMoment.valueOf()
negMomentVal = (aMoment) -> ( -1 * aMoment.valueOf() )

_g = require inHere("getters.js")

sorters = do ->
	_sort = (sortByFn, momentList...) ->
		momentList = flatSplat(momentList)
		_sorted = _.sortBy momentList, sortByFn
		_sorted

	ascending = partial2 _sort, momentVal
	descending = partial2 _sort, negMomentVal

	#yearAsc = partial2 _sort, _g.getYear
	#yearDesc = partial2 _sort, negate(_g.getYear)

	_out = {}

	###*
	 * Given an array of moments or a sequence of single moments, return an array of cloned moments sorted in order of earliest to latest.
	 *
	 * @param  {Array} momentList An array of moments to sort, or a sequence of single moments (splatted).
	 * @return {Array}              An array of cloned moments sorted in order of earliest -> latest.
	###
	_out.ascending = ascending

	_out.asc = ascending

	###*
	 * Given an array of moments or a sequence of single moments, return an array of cloned moments sorted in order of latest to earliest.
	 *
	 * @param  {Array} momentList An array of moments to sort, or a sequence of single moments (splatted).
	 * @return {Array}              An array of cloned moments sorted in order of latest -> earliest.
	###
	_out.descending = descending
	_out.desc = descending

	_out

module.exports = sorters

