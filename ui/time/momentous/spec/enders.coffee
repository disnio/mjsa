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

_mstart = require inLib("enders.js")

meq = (moment1, moment2) ->
	if (moment1.valueOf() is moment2.valueOf()) then return true
	return false


describe "momentous", ->

	now = moment()
	if now.seconds() is 0
		now.add("seconds", 10)
	yesterday = {}
	tomorrow = {}
	
	beforeEach ->
		now = moment()
		yesterday = now.clone().subtract("days", 1)
		tomorrow = now.clone().add("days", 1)


	describe "endOfYear", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest year" , ->

			modified = _mstart.endOfYear now
			momentWay = now.clone().endOf("year")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfYear now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "endOfMonth", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest month" , ->

			modified = _mstart.endOfMonth now
			momentWay = now.clone().endOf("month")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfMonth now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "endOfWeek", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest week" , ->

			modified = _mstart.endOfWeek now
			momentWay = now.clone().endOf("week")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfWeek now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "endOfDay", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest day" , ->

			modified = _mstart.endOfDay now
			momentWay = now.clone().endOf("day")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfDay now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "endOfHour", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest hour" , ->

			modified = _mstart.endOfHour now
			momentWay = now.clone().endOf("hour")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfHour now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "endOfMinute", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest minute" , ->

			modified = _mstart.endOfMinute now
			momentWay = now.clone().endOf("minute")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfMinute now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "endOfSecond", ->

		it "returns a clone of the passed moment, rounded up to the end of the nearest second" , ->

			modified = _mstart.endOfSecond now
			momentWay = now.clone().endOf("second")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.endOfSecond now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )

