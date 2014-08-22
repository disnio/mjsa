// checks if an element is partially inside the viewport
// inspired by James Padolsey's snippet (http://remysharp.com/2009/01/26/element-in-view-event-plugin/#comment-127058)
$.extend( $.expr[':'], {

    inViewport : function( el ) {

        var scrollTop = ( document.documentElement.scrollTop || document.body.scrollTop ),
            elOffsetTop = $( el ).offset().top,
            elH = $( el ).height()
            winH = ( window.innerHeight && window.innerHeight < $( window ).height() ) ? window.innerHeight : $( window ).height();

        return ( elOffsetTop + elH ) > scrollTop && elOffsetTop < ( scrollTop + winH );

    }

});