_sony = {
    "ie6": false,
    "contentSize": "b"
};

var windowW = $(window).width();

/********************************************************
 *************** 页面顶部导航javascript ********************
 ********************************************************/
/*jquery menu-aim*/
$.fn.menuAim = function(opts) {
    this.each(function() {
        init.call(this, opts)
    });
    return this
};

function init(opts) {
    var $menu = $(this),
        activeRow = null,
        mouseLocs = [],
        lastDelayLoc = null,
        timeoutId = null,
        options = $.extend({
            rowSelector: "> li",
            submenuSelector: "*",
            submenuDirection: "right",
            tolerance: 75,
            enter: $.noop,
            exit: $.noop,
            activate: $.noop,
            deactivate: $.noop,
            exitMenu: $.noop
        }, opts);
    var MOUSE_LOCS_TRACKED = 3,
        DELAY = 300;
    var mousemoveDocument = function(e) {
        mouseLocs.push({
            x: e.pageX,
            y: e.pageY
        });
        if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
            mouseLocs.shift()
        }
    };
    var mouseleaveMenu = function() {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        if (options.exitMenu(this)) {
            if (activeRow) {
                options.deactivate(activeRow)
            }
            activeRow = null
        }
    };
    var mouseenterRow = function() {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        options.enter(this);
        possiblyActivate(this)
    }, mouseleaveRow = function() {
            options.exit(this)
        };
    var clickRow = function() {
        activate(this)
    };
    var activate = function(row) {
        if (row == activeRow) {
            return
        }
        if (activeRow) {
            options.deactivate(activeRow)
        }
        options.activate(row);
        activeRow = row
    };
    var possiblyActivate = function(row) {
        var delay = activationDelay();
        if (delay) {
            timeoutId = setTimeout(function() {
                possiblyActivate(row)
            }, delay)
        } else {
            activate(row)
        }
    };
    var activationDelay = function() {
        if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
            return 0
        }
        var offset = $menu.offset(),
            upperLeft = {
                x: offset.left,
                y: offset.top - options.tolerance
            }, upperRight = {
                x: offset.left + $menu.outerWidth(),
                y: upperLeft.y
            }, lowerLeft = {
                x: offset.left,
                y: offset.top + $menu.outerHeight() + options.tolerance
            }, lowerRight = {
                x: offset.left + $menu.outerWidth(),
                y: lowerLeft.y
            }, loc = mouseLocs[mouseLocs.length - 1],
            prevLoc = mouseLocs[0];
        if (!loc) {
            return 0
        }
        if (!prevLoc) {
            prevLoc = loc
        }
        if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
            return 0
        }
        if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
            return 0
        }

        function slope(a, b) {
            return (b.y - a.y) / (b.x - a.x)
        }
        var decreasingCorner = upperRight,
            increasingCorner = lowerRight;
        if (options.submenuDirection == "left") {
            decreasingCorner = lowerLeft;
            increasingCorner = upperLeft
        } else if (options.submenuDirection == "below") {
            decreasingCorner = lowerRight;
            increasingCorner = lowerLeft
        } else if (options.submenuDirection == "above") {
            decreasingCorner = upperLeft;
            increasingCorner = upperRight
        }
        var decreasingSlope = slope(loc, decreasingCorner),
            increasingSlope = slope(loc, increasingCorner),
            prevDecreasingSlope = slope(prevLoc, decreasingCorner),
            prevIncreasingSlope = slope(prevLoc, increasingCorner);
        if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
            lastDelayLoc = loc;
            return DELAY
        }
        lastDelayLoc = null;
        return 0
    };
    $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);
    $(document).mousemove(mousemoveDocument)
};

var nav_function = function() {
    var self = this;   

    if ( !! window.ActiveXObject && !window.XMLHttpRequest) {
        $("#nav-list>li").each(function(index, el) {
            $(el).bind({
                mouseenter: function() {
                    $(this).addClass("hover");
                },
                mouseleave: function() {
                    var self = this
                    $(self).removeClass("hover");
                }
            })
        })

        $("#moreProductsButton>li").each(function(index, el) {
            $(el).bind({
                mouseover: function() {
                    $(el).addClass("hover"); //hover2
                    $(el).children("div").css({
                        "display": "block",
                        "zoom": "1"
                    });
                },
                mouseout: function() {
                    $(el).removeClass("hover");
                    $(el).children("div").css({
                        "display": "none"
                    });
                }
            })

        })
    } else {
        $("#nav-list li").bind({
            mouseenter: function() {
                $(this).addClass("hover");
            },
            mouseleave: function() {
                var self = this
                setTimeout(function() {
                    $(self).removeClass("hover");
                }, 100)
            }

        })
    }

    var $menu = $("#moreProductsButton");
    $menu.menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu
    });

    function activateSubmenu(row) {
        var $row = $(row),
            //submenuId = $row.data("submenuId"),
            $submenu = $row.children("div"),
            height = $menu.outerHeight(),
            width = $menu.outerWidth();

        // Show the submenu
        $submenu.css({
            display: "block",
            top: -1,
            left: width - 3, // main should overlay submenu
            height: height + 2 // padding for main dropdown's arrow
        });

        // Keep the currently activated row's highlighted look
        $row.find("a").addClass("hover");
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            $submenu = $row.children("div");

        // Hide the submenu and remove the row's highlighted look
        $submenu.css("display", "none");
        $row.find("a").removeClass("hover");
    }
}

/*png fixed*/
// correctly handle PNG transparency in Win IE 5.5 & 6. 
/*
function correctPNG(){
    var arVersion = navigator.appVersion.split("MSIE")
    var version = parseFloat(arVersion[1])
    if ((version >= 5.5) && (document.body.filters)) {
        for (var j = 0; j < document.images.length; j++) {
            var img = document.images[j]
            var imgName = img.src.toUpperCase()
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                var imgID = (img.id) ? "id='" + img.id + "' " : ""
                var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                var imgStyle = "display:inline-block;" + img.style.cssText
                if (img.align == "left") imgStyle = "float:left;" + imgStyle
                if (img.align == "right") imgStyle = "float:right;" + imgStyle
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                img.outerHTML = strNewHTML
                j = j - 1
            }
        }
    }
}
*/
$(document).ready(function() {
    /*
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
        _sony.ie6 = true;
        correctPNG();
    }
    */
    nav_function();

});
