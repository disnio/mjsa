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

_mstart = require inLib("starters.js")

meq = (moment1, moment2) ->
	if (moment1.valueOf() is moment2.valueOf()) then return true
	return false


describe "momentous", ->

	now = moment()
	if now.seconds() < 10
		now.add("s", 10)
		#console.log "added"
	yesterday = {}
	tomorrow = {}
	
	beforeEach ->
		now = moment()
		yesterday = now.clone().subtract("days", 1)
		tomorrow = now.clone().add("days", 1)


	describe "startOfYear", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest year" , ->

			modified = _mstart.startOfYear now
			momentWay = now.clone().startOf("year")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfYear now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "startOfMonth", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest month" , ->

			modified = _mstart.startOfMonth now
			momentWay = now.clone().startOf("month")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfMonth now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "startOfWeek", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest week" , ->

			modified = _mstart.startOfWeek now
			momentWay = now.clone().startOf("week")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfWeek now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "startOfDay", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest day" , ->

			modified = _mstart.startOfDay now
			momentWay = now.clone().startOf("day")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfDay now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "startOfHour", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest hour" , ->

			modified = _mstart.startOfHour now
			momentWay = now.clone().startOf("hour")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfHour now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "startOfMinute", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest minute" , ->

			modified = _mstart.startOfMinute now
			momentWay = now.clone().startOf("minute")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfMinute now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )


	describe "startOfSecond", ->

		it "returns a clone of the passed moment, rounded down to the start of the nearest second" , ->

			modified = _mstart.startOfSecond now
			momentWay = now.clone().startOf("second")
			assert( meq(modified, momentWay) )

		it "does not modify the original moment" , ->
			cloned = now.clone()
			modified = _mstart.startOfSecond now
			assert( meq(modified, now) is false )
			assert( meq(now, cloned) )

