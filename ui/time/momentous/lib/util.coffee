_ = require "underscore"

reverse2 = (fn) ->
	(x, y) -> fn(y, x)

partial2 = (fn, x, y) ->
	if y?
		fn(x, y)
	else if x?
		(y) ->
			fn(x, y)
	else
		(x, y) ->
			if y?
				fn(x, y)
			else
				(y) ->
					fn(x, y)

partial3 = (fn, x, y, z) ->
	if z?
		return fn(x, y, z)
	if y?
		return (z) -> fn(x, y, z)
	if x?
		return (y, z) ->
			if z?
				fn(x, y, z)
			else
				(z) -> fn(x, y, z)
	else
		return (x, y, z) ->
			if z?
				return fn(x, y, z)
			if y?
				return (z) -> fn(x, y, z)
			return (y, z) ->
				if z?
					fn(x, y, z)
				else
					(z) -> fn(x, y, z)


flatSplat = (aList) ->
	if _.size(aList) is 1 and _.isArray(aList[0])
		aList[0]
	else
		aList

path = require "path"
inDir = (dirName) ->
	(fName) ->
		path.join dirName, fName


catApply = (fn, args...) ->
	args = _.flatten args
	fn.apply null, args


splattedPartial2 = (fn, x, y...) ->
	if y? and _.size(y) > 0
		console.log _.size(y)
		console.log "si"
		catApply fn, x, y
	else
		if x?
			(y...) ->
				catApply fn, x, y
		else
			(x, y...) ->
				if y? and _.size(y) > 0
					catApply fn, x, y
				else
					(y...) ->
						catApply fn, x, y

module.exports =
	reverse2: reverse2
	partial2: partial2
	partial3: partial3
	flatSplat: flatSplat
	splattedPartial2: splattedPartial2
	inDir: inDir