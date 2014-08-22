path = require "path"
{reverse2, partial2, flatSplat, inDir, splattedPartial2} = require path.join(__dirname, "util.js")
_ = require "underscore"

inhere = inDir(__dirname)
misc = require inhere("misc.js")

moment = require "moment"

helpers = do ->


	_makeMoments = (formatStr, dateList...) ->
		dateList = flatSplat(dateList)
		_moments = _.map dateList, (oneDate) ->
			if moment.isMoment(oneDate)
				return oneDate.clone()
			return moment(formatStr, oneDate)
		_moments

	_formattedMakeMoments = (formatStr) ->
		(dateList...) ->
			dateList = flatSplat(dateList)
			_makeMoments(formatStr, dateList)

	_ISODateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

	makeMoments = (formatStr, dateList...) ->
		dateList = flatSplat(dateList)
		if _ISODateRegex.test(formatStr)
			_dateList = _.clone(dateList)
			_dateList = _.flatten([formatStr, _dateList])
			return _makeMoments("YYYY-MM-DD", _dateList)

		if _.isString(formatStr) and _.size(dateList) is 0
			return _formattedMakeMoments(formatStr)

		return _makeMoments(formatStr, dateList)


	_format = (formatStr, momentList...) ->
		momentList = flatSplat(momentList)
		if moment.isMoment(formatStr)
			#console.log "ismoment"
			momentList = _.flatten([formatStr, momentList])
			formatStr = null
		else if _.isArray(formatStr)
			#console.log "isarray"
			momentList = formatStr
			formatStr = null
		_formatted = []

		if formatStr?
			_iter = (oneMoment) -> 
				_formatted.push(oneMoment.format(formatStr))
		else
			_iter = (oneMoment) -> 
				_formatted.push(oneMoment.format())

		_.each momentList, _iter

		_formatted

	_preformattedFormatter = (formatStr) ->
		(momentList...) ->
			_stringify(formatStr, momentList)

	format = (formatStr, momentList...) ->
		if _.isString(formatStr) and _.size(momentList) is 0
			return _preformattedFormatter(formatStr)
		return _format(formatStr, momentList)


	_stringify = (formatStr, momentList...) ->
		momentList = flatSplat(momentList)
		_formatted = _format(formatStr, momentList)
		outs = "[ " + _formatted.join(", ") + " ]" 
		outs

	_formattedStringifier = (formatStr) ->
		(momentList...) ->
			momentList = flatSplat(momentList)
			return _stringify(formatStr, momentList)

	stringify = (formatStr, momentList...) ->
		if _.isString(formatStr) and _.size(momentList) is 0
			return _formattedStringifier(formatStr)
		return _stringify(formatStr, momentList)

	_formattedLogger = (formatStr) ->
		(momentList...) ->
			momentList = flatSplat(momentList)
			console.log stringify(momentList)

	log = (formatStr, momentList...) ->
		if _.isString(formatStr) and _.size(momentList) is 0
			return _formattedLogger(formatStr)
		momentList = flatSplat(momentList)
		console.log stringify(formatStr, momentList)

	intRange = (start, end) ->
		range = end - start
		_nums = []
		for i in [0..range]
			_nums.push( start + i )
		_nums

	outs =
		makeMoments: makeMoments
		stringify: stringify
		format: format
		log: log
		intRange: intRange

module.exports = helpers

