moment = require "moment"
_ = require "underscore"
path = require "path"

{reverse2, partial2, flatSplat, inDir} = require path.join(__dirname, "lib/util.js")

inLib = inDir path.join(__dirname, "lib")



momentous = {}


predicates = require inLib("predicates.js")
_.extend momentous, predicates

selectors = require inLib("selectors.js")
_.extend momentous, selectors

addersubber = require inLib("addersubber.js")
_.extend momentous, addersubber

starters = require inLib("starters.js")
_.extend momentous, starters

enders = require inLib("enders.js")
_.extend momentous, enders

sorters = require inLib("sorters.js")
momentous.sort = sorters.ascending
_.extend momentous.sort, sorters

helpers = require inLib("helpers.js")
_.extend momentous, helpers

randoms = require inLib("random.js")
_.extend momentous, randoms

misc = require inLib("misc.js")




# Moment.js shorthands:
# years	y
# months	M
# weeks	w
# days	d
# hours	h
# minutes	m
# seconds	s
# milliseconds	ms





oneRand = do ->
	now = moment()
	fiveYears = momentous.add.years(now, 5)
	_diff = misc.absDiff(now, fiveYears)
	->
		_rnd = Math.random()
		diffAmt = _diff * _rnd
		sign = Math.random()
		if sign < 0.5
			_diffAmt = _diffAmt * -1
		momentous.add(now, diffAmt)

randDates = (dateCount) ->
	dateCount ?= 12
	_outs = []
	while dateCount--
		_outs.push oneRand()
	_outs


toStrings = (dateList...) ->
	if _.isArray(dateList[0])
		dateList = dateList[0]

	_strung = _.map dateList, (oneDate) -> oneDate.format()
	_strung

printem = (dateList) ->
	console.log toStrings(eList)


module.exports = momentous





