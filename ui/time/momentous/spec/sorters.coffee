_ = require "underscore"
moment = require "moment"
path = require "path"
assert = require "better-assert"

inDir = (dir) ->
	unless dir?
		dir = __dirname
	(fName) ->
		path.join(dir, fName)

inSpec = inDir()
inLib = inDir("../lib")

_msort = require inLib("sorters.js")

intRange = (start, end) ->
	range = (end - start) + 1
	offset = Math.random() * range
	offset = Math.floor(offset)
	num = start + offset
	num

makeMomentBetween = (first, second) ->
	working = second.clone()
	_diff = working.diff(first)
	_diff = Math.abs(_diff)
	diffAmt = Math.random() * _diff
	if diffAmt < 0.05
		diffAmt += 0.05
	if diffAmt > 0.95
		diffAmt -= 0.05
	working.subtract(diffAmt)
	working


makeNMomentsBetween = (n, first, second) ->
	_moments = []
	_count = n
	while n--
		_moments.push makeMomentBetween(first, second)
	_moments

flatSplat = (list) ->
	if _.size(list) is 1 and _.isArray(list[0])
		return list[0]
	return list

cloneMomentList = (momentList) ->
	if moment.isMoment(momentList)
		return momentList.clone()
	momentList = flatSplat(momentList)
	outs = _.map momentList, (oneMoment) -> oneMoment.clone()
	outs

catMoments = (momentLists...) ->
	_momentLists = _.flatten(flatSplat(momentLists))
	return _momentLists

describe "momentous", ->

	now = moment()
	yesterday = {}
	all = {}
	tomorrow = {}
	inTwelveHrs = {}
	twelveHrsAgo = {}
	earlyRef = {}
	lateRef = {}
	earlies = []
	lates = []
	allButNow = []
	shuffled = []
	midEarlies = []
	midLates = []

	beforeEach ->
		now = moment()
		yesterday = now.clone().subtract("days", 1)
		tomorrow = now.clone().add("days", 1)
		inTwelveHrs = now.clone().add("hours", 12)
		twelveHrsAgo = now.clone().subtract("hours", 12)

		earlyRef = now.clone().subtract("years", 5)
		lateRef = now.clone().add("years", 5)
		_earlyCount = intRange(20, 30)
		_lateCount = intRange(20, 30)
		earlies = makeNMomentsBetween(_earlyCount, earlyRef, yesterday)
		midEarlies = _.clone(earlies)
		earlies.push yesterday.clone()
		earlies.push twelveHrsAgo.clone()
		earlies.push earlyRef.clone()
		earlies = _.shuffle(earlies)
		lates = makeNMomentsBetween(_lateCount, tomorrow, lateRef)
		midLates = _.clone(lates)
		lates.push tomorrow.clone()
		lates.push inTwelveHrs.clone()
		lates.push lateRef.clone()
		lates = _.shuffle(lates)
		#console.log _.size(lates)
		allButNow = catMoments(earlies, lates)
		all = _.clone(allButNow)
		all.push now.clone()
		shuffled = _.shuffle(all)



	describe "sort.ascending", ->

		it "sorts Moments from earliest to latest" , ->
			sorted = _msort.ascending(all)

			_current = sorted[0]
			for i in [1..sorted.length-1]
				assert(_current.isBefore(sorted[i]))
				_current = sorted[i]

	describe "sort.descending", ->

		it "sorts Moments from latest to earliest" , ->
			sorted = _msort.descending(all)

			_current = sorted[0]
			for i in [1..sorted.length-1]
				assert(_current.isAfter(sorted[i]))
				_current = sorted[i]

	