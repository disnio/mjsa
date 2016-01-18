var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent(“on” + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent(“on” + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    }
};
var Drag = function() {
    var drag = null;
    var diffX = 0;
    var diffY = 0;

    function move(event) {
        var e = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(e);
        switch (e.type) {
            case“ mousedown”:
                if (target.className.indexOf(“drag”) & gt; - 1) {
                    drag = target;
                    diffX = e.clientX - target.parentNode.offsetLeft;
                    diffY = e.clientY - target.parentNode.offsetTop;
                }
                break;
            case“ mousemove”:
                if (drag !== null) {
                    drag.parentNode.style.left = (e.clientX - diffX) + ”px”;
                    drag.parentNode.style.top = (e.clientY - diffY) + ”px”;
                }
                break;
            case“ mouseup”:
                drag = null;
                break;
        }
    }
    return {
        enable: function() {
            EventUtil.addHandler(document, ”mousedown”, move);
            EventUtil.addHandler(document, ”mousemove”, move);
            EventUtil.addHandler(document, ”mouseup”, move);
        }
    }
}();
Drag.enable();
