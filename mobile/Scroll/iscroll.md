iscroll5:
http://lab.cubiq.org/iscroll5/demos/event-passthrough/
http://wiki.jikexueyuan.com/project/iscroll-5/basicfeatures.html


var myScroll;

function loaded () {
    myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
}
