// document.createEvent
// Many methods used with createEvent, such as initCustomEvent, are deprecated. Use event constructors instead.


// Instead use specific event constructors, like Event().
var event = document.createEvent(type);
// or
var event = new Event('build')

// Event.initEvent() 不再推荐。it may have already been removed from the relevant web standards, avoiding
// use it. the method is used to initialize the value of an event created with document.createEvent method.
// define that event name is 'build', args: type, bubbles, cancelable
event.initEvent('build', true, true);
// listen for the event
event.addEventListener('build', function (e) {
    // e.target matches elem
}, false);

Element.dispatchEvent(event);

// To add more data to the event object, the CustomEvent interface exists and detail property can be used
// to pass custom data.
var event = new CustomEvent('build', {
    bubbles: true,
    detail: { time: Element.dataset.time }
});
function eventHandler(e) {
    // e.detail
}