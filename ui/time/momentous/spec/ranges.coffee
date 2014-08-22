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

_mr = require inLib("ranges.js")

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
	tomorrow = {}
	inTenDays = {}

	beforeEach ->
		now = moment()
		yesterday = now.clone().subtract("days", 1)
		tomorrow = now.clone().add("days", 1)
		inTenDays = now.clone().add("days", 10)


	describe "range", ->

		it "accepts a start moment, end moment, and step size", ->
			
			range = _mr.range now, inTenDays, {days: 1}
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.range now, inTenDays, {days: 1}
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "includes its start point", ->
			
			range = _mr.range now, inTenDays, {days: 1}

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( moment.isMoment(_same))

		it "does not include its end point", ->
			range = _mr.range now, inTenDays, {days: 1}

			_inTen = inTenDays.valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _inTen
			#console.log _same
			assert ( _same? is false)

		it "produces the same result as manual iteration", ->

			range = _mr.range now, tomorrow, {hours: 2}

			last = now.clone()

			_manRange = []
			while last.isBefore(tomorrow)
				_manRange.push last
				last = last.clone().add({hours: 2})

			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.range now, tomorrow, {hours: 2}

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "m")
				_diff = last.diff(range[i], "m")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]

	describe "rangeExclusive", ->

		it "accepts a start moment, end moment, and step size", ->
			
			range = _mr.rangeExclusive now, inTenDays, {days: 1}
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.rangeExclusive now, inTenDays, {days: 1}
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its start point", ->
			
			range = _mr.rangeExclusive now, inTenDays, {days: 1}

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "does not include its end point", ->
			range = _mr.rangeExclusive now, inTenDays, {days: 1}

			_inTen = inTenDays.valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _inTen
			#console.log _same
			assert ( _same? is false)

		it "produces the same result as manual iteration", ->

			range = _mr.rangeExclusive now, tomorrow, {hours: 2}

			last = now.clone().add({hours: 2})

			_manRange = []
			while last.isBefore(tomorrow)
				_manRange.push last
				last = last.clone().add({hours: 2})

			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.rangeExclusive now, tomorrow, {hours: 2}

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "m")
				_diff = last.diff(range[i], "m")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]


	describe "rangeBy", ->

		it "accepts a step size, start moment, and end moment", ->
			
			range = _mr.rangeBy {days: 1}, now, inTenDays
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.rangeBy {days: 1}, now, inTenDays
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "includes its start point", ->
			
			range = _mr.rangeBy {days: 1}, now, inTenDays

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( moment.isMoment(_same))

		it "does not include its end point", ->
			range = _mr.rangeBy {days: 1}, now, inTenDays

			_inTen = inTenDays.valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _inTen
			#console.log _same
			assert ( _same? is false)

		it "produces the same result as manual iteration", ->

			range = _mr.rangeBy {hours: 2}, now, tomorrow

			last = now.clone()

			_manRange = []
			while last.isBefore(tomorrow)
				_manRange.push last
				last = last.clone().add({hours: 2})

			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.rangeBy {hours: 2}, now, tomorrow

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "m")
				_diff = last.diff(range[i], "m")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]


	describe "rangeByExclusive", ->

		it "accepts a step size, start moment, and end moment", ->
			
			range = _mr.rangeByExclusive {days: 1}, now, inTenDays
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.rangeByExclusive {days: 1}, now, inTenDays
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its start point", ->
			
			range = _mr.rangeByExclusive {days: 1}, now, inTenDays

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "does not include its end point", ->
			range = _mr.rangeByExclusive {days: 1}, now, inTenDays

			_inTen = inTenDays.valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _inTen
			#console.log _same
			assert ( _same? is false)

		it "produces the same result as manual iteration", ->

			range = _mr.rangeByExclusive {hours: 2}, now, tomorrow

			last = now.clone().add({hours: 2})

			_manRange = []
			while last.isBefore(tomorrow)
				_manRange.push last
				last = last.clone().add({hours: 2})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.rangeByExclusive {hours: 2}, now, tomorrow

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "m")
				_diff = last.diff(range[i], "m")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]


	describe "nStepsBefore", ->

		it "accepts a number of steps, a step size, and an ending moment", ->
			
			range = _mr.nStepsBefore 10, {hours: 1}, now
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.nStepsBefore 15, {days: 1}, now
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its end point", ->
			
			range = _mr.nStepsBefore 15, {days: 1}, now

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "includes the moment at (end - (nSteps * stepSize))", ->
			range = _mr.nStepsBefore 15, {days: 1}, now

			_15daysago = now.clone().subtract({days: 15}).valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _15daysago
			#console.log _same
			assert ( moment.isMoment(_same) )

		it "generates the correct number of steps", ->
			range = _mr.nStepsBefore 15, {days: 1}, now

			assert( _.size(range) is 15)


		it "produces the same result as manual iteration", ->

			range = _mr.nStepsBefore 20, {hours: 1}, now

			last = now.clone().subtract({hours: 20})

			_manRange = []
			while last.isBefore(now)
				_manRange.push last
				last = last.clone().add({hours: 1})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.nStepsBefore 12, {hours: 2}, now

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "s")
				_diff = last.diff(range[i], "s")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]

	describe "nStepsAfter", ->

		it "accepts a number of steps, a step size, and a starting moment", ->
			
			range = _mr.nStepsAfter 10, {hours: 1}, now
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.nStepsAfter 15, {days: 1}, now
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its starting point", ->
			
			range = _mr.nStepsAfter 15, {days: 1}, now

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "includes the moment at (start + (nSteps * stepSize))", ->
			range = _mr.nStepsAfter 15, {days: 1}, now

			in15days = now.clone().add({days: 15}).valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is in15days
			#console.log _same
			assert ( moment.isMoment(_same) )

		it "generates the correct number of steps", ->
			range = _mr.nStepsAfter 15, {days: 1}, now

			assert( _.size(range) is 15)


		it "produces the same result as manual iteration", ->

			range = _mr.nStepsAfter 20, {hours: 1}, now

			last = now.clone().add {hours: 1}

			_steps = 20
			_manRange = []
			while _steps--
				_manRange.push last
				last = last.clone().add({hours: 1})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.nStepsAfter 12, {hours: 2}, now

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "s")
				_diff = last.diff(range[i], "s")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]










	describe "stepsBeforeBy", ->

		it "accepts a step size, a number of steps, and an ending moment", ->
			
			range = _mr.stepsBeforeBy {hours: 1}, 10, now
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.stepsBeforeBy {days: 1}, 15, now
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its end point", ->
			
			range = _mr.stepsBeforeBy {days: 1}, 15, now

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "includes the moment at (end - (nSteps * stepSize))", ->
			range = _mr.stepsBeforeBy {days: 1}, 15, now

			_15daysago = now.clone().subtract({days: 15}).valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _15daysago
			#console.log _same
			assert ( moment.isMoment(_same) )

		it "generates the correct number of steps", ->
			range = _mr.stepsBeforeBy {days: 1}, 15, now

			assert( _.size(range) is 15)


		it "produces the same result as manual iteration", ->

			range = _mr.stepsBeforeBy {hours: 1}, 20, now

			last = now.clone().subtract({hours: 20})

			_manRange = []
			while last.isBefore(now)
				_manRange.push last
				last = last.clone().add({hours: 1})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.stepsBeforeBy {hours: 2}, 12, now

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "s")
				_diff = last.diff(range[i], "s")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]




	describe "stepsAfterBy", ->

		it "accepts a step size, a number of steps, and a starting moment", ->
			
			range = _mr.stepsAfterBy {hours: 1}, 10, now
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.stepsAfterBy {days: 1}, 15, now
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its starting point", ->
			
			range = _mr.stepsAfterBy {days: 1}, 15, now

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "includes the moment at (start + (nSteps * stepSize))", ->
			range = _mr.stepsAfterBy {days: 1}, 15, now

			in15days = now.clone().add({days: 15}).valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is in15days
			#console.log _same
			assert ( moment.isMoment(_same) )

		it "generates the correct number of steps", ->
			range = _mr.stepsAfterBy {days: 1}, 15, now

			assert( _.size(range) is 15)


		it "produces the same result as manual iteration", ->

			range = _mr.stepsAfterBy {hours: 1}, 20, now

			last = now.clone().add {hours: 1}

			_steps = 20
			_manRange = []
			while _steps--
				_manRange.push last
				last = last.clone().add({hours: 1})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.stepsAfterBy {hours: 2}, 12, now

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "s")
				_diff = last.diff(range[i], "s")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]







	describe "stepsBeforeMoment", ->

		it "accepts an ending moment, a step size, and a number of steps", ->
			
			range = _mr.stepsBeforeMoment now, {hours: 1}, 10
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.stepsBeforeMoment now, {days: 1}, 15
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its end point", ->
			
			range = _mr.stepsBeforeMoment now, {days: 1}, 15

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "includes the moment at (end - (nSteps * stepSize))", ->
			range = _mr.stepsBeforeMoment now, {days: 1}, 15

			_15daysago = now.clone().subtract({days: 15}).valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is _15daysago
			#console.log _same
			assert ( moment.isMoment(_same) )

		it "generates the correct number of steps", ->
			range = _mr.stepsBeforeMoment now, {days: 1}, 15

			assert( _.size(range) is 15)


		it "produces the same result as manual iteration", ->

			range = _mr.stepsBeforeMoment now, {hours: 1}, 20

			last = now.clone().subtract({hours: 20})

			_manRange = []
			while last.isBefore(now)
				_manRange.push last
				last = last.clone().add({hours: 1})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.stepsBeforeMoment now, {hours: 2}, 12

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "s")
				_diff = last.diff(range[i], "s")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]

	describe "stepsAfterMoment", ->

		it "accepts a start moment, a step size, and a number of steps.", ->
			
			range = _mr.stepsAfterMoment now, {hours: 1}, 10
			_.each range, (aMoment) ->
				assert( moment.isMoment(aMoment) )

		it "generates a linear sequence of moments", ->
			
			range = _mr.stepsAfterMoment now, {days: 1}, 15
			_current = range[0]
			for i in [i..range.length-1]
				assert( _current.isBefore(range[i]))

		it "does not include its starting point", ->
			
			range = _mr.stepsAfterMoment now, {days: 1}, 15

			_now = now.valueOf()
			_same = _.find range, (aMoment) -> 
				aMoment.valueOf() is _now

			assert ( _same? is false)

		it "includes the moment at (start + (nSteps * stepSize))", ->
			range = _mr.stepsAfterMoment now, {days: 1}, 15

			in15days = now.clone().add({days: 15}).valueOf()
			_same = _.find range, (aMoment) ->
				aMoment.valueOf() is in15days
			#console.log _same
			assert ( moment.isMoment(_same) )

		it "generates the correct number of steps", ->
			range = _mr.stepsAfterMoment now, {days: 1}, 15

			assert( _.size(range) is 15)


		it "produces the same result as manual iteration", ->

			range = _mr.stepsAfterMoment now, {hours: 1}, 20

			last = now.clone().add {hours: 1}

			_steps = 20
			_manRange = []
			while _steps--
				_manRange.push last
				last = last.clone().add({hours: 1})
			#console.log _.size(_manRange)
			#console.log _.size(range)
			assert( _.size(_manRange) is _.size(range) )

			zipped = _.zip(range, _manRange)
			_.each zipped, (aPair) ->
				assert ( aPair[0].valueOf() is aPair[1].valueOf() )

		it "increases by the given step size", ->

			range = _mr.stepsAfterMoment now, {hours: 2}, 12

			#console.log _.size(range)
			last = range[0]
			for i in [1..range.length-1]
				_manDiff = last.diff(last.clone().add({hours: 2}), "s")
				_diff = last.diff(range[i], "s")
				#console.log _manDiff
				#console.log _diff
				assert( _manDiff is _diff)
				last = range[i]