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

preds = require inLib("predicates.js")

describe "momentous::predicates", ->

	now = moment()
	earlier = {}
	later = {}
	beforeEach ->
		now = moment()
		earlier = now.clone().subtract("years", 5)
		later = now.clone().add("years", 5)


	describe "isBefore", ->
		it "returns true when its second argument's date is before the first's", ->
			assert( preds.isBefore(later, now) )


		it "returns false when its second argument's date is after the first's", ->
			assert( preds.isBefore(earlier, now) is false )

		it "partially applies a single argument", ->
			isBeforeLater = preds.isBefore(later)
			isBeforeEarlier = preds.isBefore(earlier)
			assert( isBeforeLater(now) is true )
			assert( isBeforeEarlier(now) is false)


	describe "isAfter", ->
		it "returns true when its second argument's date is after the first's", ->
			assert( preds.isAfter(earlier, now) is true )

		it "returns false when its second argument's date is before the first's", ->
			assert( preds.isAfter(later, now) is false )

		it "partially applies a single argument", ->
			isAfterLater = preds.isAfter(later)
			isAfterEarlier = preds.isAfter(earlier)
			assert( isAfterLater(now) is false )
			assert( isAfterEarlier(now) is true)


	describe "isBetween", ->

		it "returns true when its third argument's date is in the range between its first and second arguments.", ->
			assert( preds.isBetween(earlier, later, now) is true )

		it "returns false when its third argument's date is not in the range between its first and second arguments.", ->
			assert( preds.isBetween(now, later, earlier) is false )
			assert( preds.isBetween(earlier, now, later) is false )

		it "partially applies a single argument", ->
			partEarlier = preds.isBetween(earlier)
			assert( partEarlier(now, later) is false )
			assert( partEarlier(later, now) is true )
			
			partLater = preds.isBetween(later)
			assert( partLater(now, earlier) is false)
			assert( partLater(earlier, now) is false)
			partNow = preds.isBetween(now)
			assert( partNow(earlier, later) is false)
			assert( partNow(later, earlier) is false)

		it "partially applies two arguments", ->
			partEarlyLate = preds.isBetween(earlier, later)
			assert( partEarlyLate(now) is true )
			partNowLate = preds.isBetween(now, later)
			assert( partNowLate(earlier) is false)


	describe "isMomentBetween", ->

		it "returns true when its first argument's date is in the range between its second and third.", ->
			assert( preds.isMomentBetween(now, earlier, later) is true )

		it "returns false when its third argument's date is not in the range between its first and second arguments.", ->
			assert( preds.isMomentBetween(earlier, now, later) is false )
			assert( preds.isMomentBetween(later, earlier, now) is false )

		it "partially applies a single argument", ->
			partNow = preds.isMomentBetween(now)
			assert( partNow(earlier, later) is true)

			partEarly = preds.isMomentBetween(earlier)
			assert( partEarly(now, later) is false)

			partLate = preds.isMomentBetween(later)
			assert( partLate(earlier, now) is false)

		it "partially applies two arguments", ->
			partNowEarly = preds.isMomentBetween(now, earlier)
			assert( partNowEarly(later) is true )
			partLateEarly = preds.isMomentBetween(later, earlier)
			assert( partLateEarly(now) is false)
