Handlebars = require "handlebars"
fs = require "fs"
_ = require "underscore"

_names = [
	"Year"
	"Month"
	"Week"
	"Day"
	"Hour"
	"Minute"
	"Second"
]

methods = _.map _names, (aName) ->
	{method: "endOf#{aName}", unit: aName.toLowerCase()}

fs.readFile "./endspec.hbs", "utf8", (err, cont) ->
	tmpl = Handlebars.compile(cont)

	locals =
		toTest: methods

	rendered = tmpl(locals)
	fs.writeFile "./enders.coffee", rendered, (err) ->
		console.log "written"