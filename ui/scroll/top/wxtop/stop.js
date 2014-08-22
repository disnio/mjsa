jQuery("#toTop").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 300);
});

window.onscroll = function() {
    if (document.documentElement.scrollTop + document.body.scrollTop & gt; 100) {
        jQuery("#toTop").slideDown();
    } else {
        jQuery("#toTop").slideUp();
    }
}
---------------------------------------
