// activeElement：光标源所在的对象，document的一个属性

// srcElement::鼠标触发事件的对象,event的一个属性

var inital = newsletter.is(":checked");
var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
var topicInputs = topics.find("input").attr("disabled", !inital);

// show a simple loading indicator
var loader = jQuery('<div id="loader"><img src="images/loading.gif" alt="loading..." /></div>')
    .css({
        position: "relative",
        top: "1em",
        left: "25em",
        display: "inline"
    })
    .appendTo("body")
    .hide();
jQuery().ajaxStart(function() {
    loader.show();
}).ajaxStop(function() {
    loader.hide();
}).ajaxError(function(a, b, e) {
    throw e;
});

var user = settings.data.match( /user=(.+?)($|&)/ )[ 1 ];

var message = errors == 1
    ? 'You missed 1 field. It has been highlighted below'
    : 'You missed ' + errors + ' fields.  They have been highlighted below';