jQuery(document).ready(function($) {
    // mask source
    var maskSource = jQuery('.mask');
    jQuery('.entity-results').hover(function() {
        maskSource.animate({opacity:0.7},1).fadeIn('750');
    }, function() {
        maskSource.fadeOut('1000');
    });
    
    // match hover
    var sample1 = jQuery('span.d1');
    var sample2 = jQuery('span.d2');
    var sample3 = jQuery('span.d3');
    jQuery('a.d1').hover(function() {
        sample1.addClass('show');
    }, function() {
        sample1.removeClass('show');
    });
    jQuery('a.d2').hover(function() {
        sample2.addClass('show');
    }, function() {
        sample2.removeClass('show');
    });
    jQuery('a.d3').hover(function() {
        sample3.addClass('show');
    }, function() {
        sample3.removeClass('show');
    });
});
