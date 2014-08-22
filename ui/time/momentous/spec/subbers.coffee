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


	describe "sub", ->

		it "accepts a moment instance and object literal" , ->
			compare = now.clone().subtract("years", 2).subtract("days", 5)
			against = _m.sub(now, {years: 2, days: 5})
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("years", 2).subtract("days", 5)
			against = _m.sub(now, {years: 2, days: 5})
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subFromNow = _m.sub(now)

			compare = now.clone().subtract("years", 2).subtract("days", 5)
			against = subFromNow({years: 2, days: 5})
			assert( meq(compare, against) )

	describe "subBy", ->

		it "accepts an object literal and a moment instance" , ->
			compare = now.clone().subtract("years", 2).subtract("days", 5)
			against = _m.subBy({years: 2, days: 5}, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("years", 2).subtract("days", 5)
			against = _m.subBy({years: 2, days: 5}, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub2y5d = _m.subBy {years: 2, days: 5}

			compare = now.clone().subtract("years", 2).subtract("days", 5)
			against = sub2y5d(now)
			assert( meq(compare, against) )

	describe "sub.years", ->
		it "accepts a moment instance and a number of years to subtract", ->
			compare = now.clone().subtract("years", 2)
			against = _m.sub.years(now, 2)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("years", 2)
			against = _m.sub.years(now, 2)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subYearsFromNow = _m.sub.years(now)

			compare = now.clone().subtract("years", 2)
			against = subYearsFromNow(2)
			assert( meq(compare, against) )

	describe "sub.months", ->
		it "accepts a moment instance and a number of months to subtract", ->
			compare = now.clone().subtract("months", 2)
			against = _m.sub.months(now, 2)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("months", 2)
			against = _m.sub.months(now, 2)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subMonthsFromNow = _m.sub.months(now)

			compare = now.clone().subtract("months", 2)
			against = subMonthsFromNow(2)
			assert( meq(compare, against) )

	describe "sub.days", ->
		it "accepts a moment instance and a number of days to subtract", ->
			compare = now.clone().subtract("days", 10)
			against = _m.sub.days(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("days", 10)
			against = _m.sub.days(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subDaysFromNow = _m.sub.days(now)

			compare = now.clone().subtract("days", 10)
			against = subDaysFromNow(10)
			assert( meq(compare, against) )

	describe "sub.hours", ->
		it "accepts a moment instance and a number of hours to subtract", ->
			compare = now.clone().subtract("hours", 10)
			against = _m.sub.hours(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("hours", 10)
			against = _m.sub.hours(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subHoursFromNow = _m.sub.hours(now)

			compare = now.clone().subtract("hours", 10)
			against = subHoursFromNow(10)
			assert( meq(compare, against) )

	describe "sub.minutes", ->
		it "accepts a moment instance and a number of minutes to subtract", ->
			compare = now.clone().subtract("minutes", 10)
			against = _m.sub.minutes(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("minutes", 10)
			against = _m.sub.minutes(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subMinsFromNow = _m.sub.minutes(now)

			compare = now.clone().subtract("minutes", 10)
			against = subMinsFromNow(10)
			assert( meq(compare, against) )

	describe "sub.seconds", ->
		it "accepts a moment instance and a number of seconds to subtract", ->
			compare = now.clone().subtract("seconds", 10)
			against = _m.sub.seconds(now, 10)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("seconds", 10)
			against = _m.sub.seconds(now, 10)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subSecFromNow = _m.sub.seconds(now)

			compare = now.clone().subtract("seconds", 10)
			against = subSecFromNow(10)
			assert( meq(compare, against) )


	describe "sub.msec", ->
		it "accepts a moment instance and a number of seconds to subtract", ->
			compare = now.clone().subtract("milliseconds", 2500)
			against = _m.sub.msec(now, 2500)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("milliseconds", 2500)
			against = _m.sub.msec(now, 2500)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			subMsecFromNow = _m.sub.msec(now)

			compare = now.clone().subtract("milliseconds", 2500)
			against = subMsecFromNow(2500)
			assert( meq(compare, against) )

	describe "subBy.years", ->
		it "accepts a number of years to subtract and a moment instance", ->
			compare = now.clone().subtract("years", 2)
			against = _m.subBy.years(2, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("years", 2)
			against = _m.subBy.years(2, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub2y = _m.subBy.years(2)
			compare = now.clone().subtract("years", 2)
			against = sub2y(now)
			assert( meq(compare, against) )

	describe "subBy.months", ->
		it "accepts a number of months and a moment instance", ->
			compare = now.clone().subtract("months", 2)
			against = _m.subBy.months(2, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("months", 2)
			against = _m.subBy.months(2, now)
			assert( meq(compare, against) )
			assert( meq(compare, now) is false)

		it "partially applies a single parameter", ->
			sub2m = _m.subBy.months(2)
			compare = now.clone().subtract("months", 2)
			against = sub2m(now)
			assert( meq(compare, against) )

	describe "subBy.days", ->
		it "accepts a number of days to subtract and a moment instance", ->
			compare = now.clone().subtract("days", 10)
			against = _m.subBy.days(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("days", 10)
			against = _m.subBy.days(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub10d = _m.subBy.days(10)
			compare = now.clone().subtract("days", 10)
			against = sub10d(now)
			assert( meq(compare, against) )

	describe "subBy.hours", ->
		it "accepts a number of hours to subtract and a moment instance", ->
			compare = now.clone().subtract("hours", 10)
			against = _m.subBy.hours(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("hours", 10)
			against = _m.subBy.hours(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub10h = _m.subBy.hours(10)
			compare = now.clone().subtract("hours", 10)
			against = sub10h(now)
			assert( meq(compare, against) )

	describe "subBy.minutes", ->
		it "accepts a number of minutes to subtract and a moment instance", ->
			compare = now.clone().subtract("minutes", 10)
			against = _m.subBy.minutes(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("minutes", 10)
			against = _m.subBy.minutes(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub10mins = _m.subBy.minutes(10)
			compare = now.clone().subtract("minutes", 10)
			against = sub10mins(now)
			assert( meq(compare, against) )

	describe "subBy.seconds", ->
		it "accepts a number of seconds to subtract and a moment instance", ->
			compare = now.clone().subtract("seconds", 10)
			against = _m.subBy.seconds(10, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("seconds", 10)
			against = _m.subBy.seconds(10, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub10sec = _m.subBy.seconds(10)
			compare = now.clone().subtract("seconds", 10)
			against = sub10sec(now)
			assert( meq(compare, against) )


	describe "subBy.msec", ->
		it "accepts a number of milliseconds to subtract and a moment instance", ->
			compare = now.clone().subtract("milliseconds", 3500)
			against = _m.subBy.msec(3500, now)
			assert( meq(compare, against) )

		it "does not mutate the original moment", ->
			compare = now.clone().subtract("milliseconds", 3500)
			against = _m.subBy.msec(3500, now)
			assert( meq(compare, against) )
			assert( meq(against, now) is false)

		it "partially applies a single parameter", ->
			sub3500 = _m.subBy.msec(3500)
			compare = now.clone().subtract("milliseconds", 3500)
			against = sub3500(now)
			assert( meq(compare, against) )
