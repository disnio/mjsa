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

sel = require inLib("selectors.js")

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

describe "momentous::selectors", ->

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



	describe "allBefore", ->

		it "selects all dates before its first parameter's date value" , ->
			#console.log _.size(allButNow)
			selBefores = sel.allBefore(now, shuffled)
			assert( _.size(selBefores) is _.size(earlies))

		it "returns an empty array if no elements in the target array are before the date", ->
			befores = sel.allBefore(earlyRef, shuffled)
			assert(befores instanceof Array)
			assert( _.size(befores) is 0)


		it "partially applies a single argument", ->
			beforeNow = sel.allBefore(now)
			befores = beforeNow(shuffled)
			assert( _.size(befores) is _.size(earlies))




	describe "allAfter", ->

		it "selects all dates after its first parameter's date value" , ->
			#console.log _.size(allButNow)
			selAfters = sel.allAfter(now, shuffled)
			assert( _.size(selAfters) is _.size(lates))

		it "returns an empty array if no elements in the target array are after the date", ->
			afters = sel.allAfter(lateRef, shuffled)
			assert(afters instanceof Array)
			assert( _.size(afters) is 0)


		it "partially applies a single argument", ->
			afterNow = sel.allAfter(now)
			afters = afterNow(shuffled)
			assert( _.size(afters) is _.size(lates))


	describe "earliest", ->
		it "returns the earliest date in an array of dates", ->

			_early = sel.earliest(all)
			assert( _early.format() is earlyRef.format() )

		it "returns the earliest date from a splat of dates extending from the second parameter on", ->

			_rand = _.sample(all, 4)

			earliest = sel.earliest(_rand[0], _rand[1], earlyRef, _rand[2], _rand[3])

			assert( earliest.format() is earlyRef.format())

	describe "latest", ->
		it "returns the latest date in an array of dates", ->

			_late = sel.latest(all)
			assert( _late.format() is lateRef.format() )

		it "returns the latest date from a splat of dates extending from the second parameter on", ->

			_rand = _.sample(all, 4)

			latest = sel.latest(_rand[0], _rand[1], lateRef, _rand[2], _rand[3])

			assert( latest.format() is lateRef.format())

	describe "closestTo", ->

		it "selects the closest date to its first argument from a list of dates", ->

			closeBefore = sel.closestTo(now, earlies)
			assert( closeBefore.format() is twelveHrsAgo.format() )

			closeAfter = sel.closestTo(now, lates)
			assert( closeAfter.format() is inTwelveHrs.format() )

		it "selects from a variable number of dates given after the first parameter", ->

			_rand = _.sample(earlies, 3)

			closest = sel.closestTo(now, _rand[0], _rand[1], twelveHrsAgo, _rand[2])
			assert( closest.format() is twelveHrsAgo.format() )


		it "selects from an array of dates given after the first parameter", ->

			_rand = _.sample(earlies, 10)
			_rand.push twelveHrsAgo

			closest = sel.closestTo(now, _rand)
			assert( closest.format() is twelveHrsAgo.format() )

		it "partially applies a single parameter", ->

			_rand = _.sample(earlies, 10)
			_rand.push twelveHrsAgo

			closestToNow = sel.closestTo(now)
			closest = closestToNow(_rand)
			assert( closest.format() is twelveHrsAgo.format() )

	describe "farthestFrom", ->

		it "selects the farthest date from its first argument out of a list of dates", ->

			farBefore = sel.farthestFrom(now, earlies)
			assert( farBefore.format() is earlyRef.format() )

			farAfter = sel.farthestFrom(now, lates)
			assert( farAfter.format() is lateRef.format())

		it "selects from a variable number of dates given after the first parameter", ->

			_rand = _.sample(earlies, 3)

			farthest = sel.farthestFrom(now, _rand[0], _rand[1], earlyRef, _rand[2])
			assert( farthest.format() is earlyRef.format() )


		it "selects from an array of dates given after the first parameter", ->

			_rand = _.sample(lates, 10)
			_rand.push lateRef

			farthest = sel.farthestFrom(now, _rand)
			assert( farthest.format() is lateRef.format() )


		it "partially applies a single parameter", ->

			_rand = _.sample(lates, 10)
			_rand.push lateRef

			farthestFromNow = sel.farthestFrom(now)
			farthest = farthestFromNow(_rand)
			assert( farthest.format() is lateRef.format() )


	describe "closestBefore", ->

		it "returns the closest date _before_ the first parameter's date value when there is a closer date falling after that value.", ->
			
			_rand = _.sample(all, 20)
			befores = sel.allBefore(now, _rand)
			closestCalculated = sel.latest(befores)
			toTest = _.clone(befores)
			toTest.push inTwelveHrs

			close = sel.closestBefore now, toTest
			assert( close.format() is closestCalculated.format() )

		it "partially applies a single parameter", ->

			_rand = _.sample(all, 20)
			befores = sel.allBefore(now, _rand)
			closestCalculated = sel.latest(befores)
			toTest = _.clone(befores)
			toTest.push inTwelveHrs

			closestBeforeNow = sel.closestBefore(now)
			close = closestBeforeNow toTest
			assert( close.format() is closestCalculated.format() )


	describe "closestAfter", ->
		it "returns the closest date _after_ the first parameter's date value when there is a closer date falling before that value.", ->
			_rand = _.sample(all, 20)
			afters = sel.allAfter(now, _rand)
			closestCalculated = sel.earliest(afters)
			toTest = _.clone(afters)
			toTest.push twelveHrsAgo

			close = sel.closestAfter now, toTest
			assert( close.format() is closestCalculated.format() )

		it "partially applies a single parameter", ->
			_rand = _.sample(all, 20)
			afters = sel.allAfter(now, _rand)
			closestCalculated = sel.earliest(afters)
			toTest = _.clone(afters)
			toTest.push twelveHrsAgo

			closestAfterNow = sel.closestAfter(now)
			close = closestAfterNow toTest
			assert( close.format() is closestCalculated.format() )


	describe "farthestBefore", ->
		it "returns the farthest date _before_ the first parameter's date value when there is a farther date falling after that value.", ->
			_rand = _.sample(all, 20)
			befores = sel.allBefore(now, _rand)
			farthestCalculated = sel.earliest(befores)
			toTest = _.clone(befores)
			toTest.push lateRef

			far = sel.farthestBefore now, toTest
			assert( far.format() is farthestCalculated.format() )

		it "partially applies a single parameter", ->
			_rand = _.sample(all, 20)
			befores = sel.allBefore(now, _rand)
			farthestCalculated = sel.earliest(befores)
			toTest = _.clone(befores)
			toTest.push lateRef

			farthestBeforeNow = sel.farthestBefore(now)
			far = farthestBeforeNow toTest
			assert( far.format() is farthestCalculated.format() )

	describe "farthestAfter", ->
		it "returns the farthest date _after_ the first parameter's date value when there is a farther date falling before that value.", ->
			_rand = _.sample(all, 20)
			afters = sel.allAfter(now, _rand)
			farthestCalculated = sel.latest(afters)
			toTest = _.clone(afters)
			toTest.push earlyRef

			far = sel.farthestAfter now, toTest
			assert( far.format() is farthestCalculated.format() )

		it "partially applies a single parameter", ->
			_rand = _.sample(all, 20)
			afters = sel.allAfter(now, _rand)
			farthestCalculated = sel.latest(afters)
			toTest = _.clone(afters)
			toTest.push earlyRef

			farthestAfterNow = sel.farthestAfter(now)
			far = farthestAfterNow toTest
			assert( far.format() is farthestCalculated.format() )

