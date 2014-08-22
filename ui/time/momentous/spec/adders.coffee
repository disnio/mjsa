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

_m = require inLib("addersubber.js")

meq = (moment1, moment2) ->
	if (moment1.format() is moment2.format()) then return true
	return false

describe "momentous", ->

	now = moment()
	yesterday = {}
	tomorrow = {}

	beforeEach ->
		now = moment()
		yesterday = now.clone().subtract("days", 1)
		tomorrow = now.clone().add("days", 1)

	describe "add", ->

		it "accepts a moment instance and object literal" , ->
			compare = now.clone().add("years", 2).add("days", 5)
			against = _m.add(now, {years: 2, days: 5})
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("years", 2).add("days", 5)
			against = _m.add(now, {years: 2, days: 5})
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addToNow = _m.add(now)

			compare = now.clone().add("years", 2).add("days", 5)
			against = addToNow({years: 2, days: 5})
			assert( meq(compare, against) )

	describe "addBy", ->

		it "accepts an object literal and a moment instance" , ->
			compare = now.clone().add("years", 2).add("days", 5)
			against = _m.addBy({years: 2, days: 5}, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("years", 2).add("days", 5)
			against = _m.addBy({years: 2, days: 5}, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add2years5days = _m.addBy {years: 2, days: 5}

			compare = now.clone().add("years", 2).add("days", 5)
			against = add2years5days(now)
			assert( meq(compare, against) )

	describe "add.years", ->
		it "accepts a moment instance and a number of years to add", ->
			compare = now.clone().add("years", 2)
			against = _m.add.years(now, 2)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("years", 2)
			against = _m.add.years(now, 2)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addYearsToNow = _m.add.years(now)

			compare = now.clone().add("years", 2)
			against = addYearsToNow(2)
			assert( meq(compare, against) )

	describe "add.months", ->
		it "accepts a moment instance and a number of months to add", ->
			compare = now.clone().add("months", 2)
			against = _m.add.months(now, 2)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("months", 2)
			against = _m.add.months(now, 2)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addMonthsToNow = _m.add.months(now)

			compare = now.clone().add("months", 2)
			against = addMonthsToNow(2)
			assert( meq(compare, against) )

	describe "add.days", ->
		it "accepts a moment instance and a number of days to add", ->
			compare = now.clone().add("days", 10)
			against = _m.add.days(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("days", 10)
			against = _m.add.days(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addDaysToNow = _m.add.days(now)

			compare = now.clone().add("days", 10)
			against = addDaysToNow(10)
			assert( meq(compare, against) )

	describe "add.hours", ->
		it "accepts a moment instance and a number of hours to add", ->
			compare = now.clone().add("hours", 10)
			against = _m.add.hours(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("hours", 10)
			against = _m.add.hours(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addHoursToNow = _m.add.hours(now)

			compare = now.clone().add("hours", 10)
			against = addHoursToNow(10)
			assert( meq(compare, against) )

	describe "add.minutes", ->
		it "accepts a moment instance and a number of minutes to add", ->
			compare = now.clone().add("minutes", 10)
			against = _m.add.minutes(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("minutes", 10)
			against = _m.add.minutes(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addMinutesToNow = _m.add.minutes(now)

			compare = now.clone().add("minutes", 10)
			against = addMinutesToNow(10)
			assert( meq(compare, against) )

	describe "add.seconds", ->
		it "accepts a moment instance and a number of seconds to add", ->
			compare = now.clone().add("seconds", 10)
			against = _m.add.seconds(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("seconds", 10)
			against = _m.add.seconds(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addSecondsToNow = _m.add.seconds(now)

			compare = now.clone().add("seconds", 10)
			against = addSecondsToNow(10)
			assert( meq(compare, against) )


	describe "add.msec", ->
		it "accepts a moment instance and a number of seconds to add", ->
			compare = now.clone().add("milliseconds", 2500)
			against = _m.add.msec(now, 2500)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("milliseconds", 2500)
			against = _m.add.msec(now, 2500)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			addMSecToNow = _m.add.msec(now)

			compare = now.clone().add("milliseconds", 2500)
			against = addMSecToNow(2500)
			assert( meq(compare, against) )

	describe "addBy.years", ->
		it "accepts a number of years to add and a moment instance", ->
			compare = now.clone().add("years", 2)
			against = _m.addBy.years(2, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("years", 2)
			against = _m.addBy.years(2, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add2years = _m.addBy.years(2)
			compare = now.clone().add("years", 2)
			against = add2years(now)
			assert( meq(compare, against) )

	describe "addBy.months", ->
		it "accepts a number of months and a moment instance", ->
			compare = now.clone().add("months", 2)
			against = _m.addBy.months(2, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("months", 2)
			against = _m.addBy.months(2, now)
			assert( meq(compare, against) )
			assert( meq(compare, now) is false)

		it "partially applies a single parameter", ->
			add2months = _m.addBy.months(2)
			compare = now.clone().add("months", 2)
			against = add2months(now)
			assert( meq(compare, against) )

	describe "addBy.days", ->
		it "accepts a number of days to add and a moment instance", ->
			compare = now.clone().add("days", 10)
			against = _m.addBy.days(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("days", 10)
			against = _m.addBy.days(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add10days = _m.addBy.days(10)
			compare = now.clone().add("days", 10)
			against = add10days(now)
			assert( meq(compare, against) )

	describe "addBy.hours", ->
		it "accepts a number of hours to add and a moment instance", ->
			compare = now.clone().add("hours", 10)
			against = _m.addBy.hours(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("hours", 10)
			against = _m.addBy.hours(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add10hours = _m.addBy.hours(10)
			compare = now.clone().add("hours", 10)
			against = add10hours(now)
			assert( meq(compare, against) )

	describe "addBy.minutes", ->
		it "accepts a number of minutes to add and a moment instance", ->
			compare = now.clone().add("minutes", 10)
			against = _m.addBy.minutes(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("minutes", 10)
			against = _m.addBy.minutes(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add10mins = _m.addBy.minutes(10)
			compare = now.clone().add("minutes", 10)
			against = add10mins(now)
			assert( meq(compare, against) )

	describe "addBy.seconds", ->
		it "accepts a number of seconds to add and a moment instance", ->
			compare = now.clone().add("seconds", 10)
			against = _m.addBy.seconds(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("seconds", 10)
			against = _m.addBy.seconds(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add10sec = _m.addBy.seconds(10)
			compare = now.clone().add("seconds", 10)
			against = add10sec(now)
			assert( meq(compare, against) )


	describe "addBy.msec", ->
		it "accepts a number of milliseconds to add and a moment instance", ->
			compare = now.clone().add("milliseconds", 3500)
			against = _m.addBy.msec(3500, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().add("milliseconds", 3500)
			against = _m.addBy.msec(3500, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			add3500msec = _m.addBy.msec(3500)
			compare = now.clone().add("milliseconds", 3500)
			against = add3500msec(now)
			assert( meq(compare, against) )
