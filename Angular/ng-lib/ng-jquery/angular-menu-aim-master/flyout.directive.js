/**
 *  This directive will render the desktop flyout menu. It uses the
 *  jquery-menu-aim plugin, and converts it to a more friendlier Angular
 *  implementation. Refer to the original plugin here:
 *
 *  https://github.com/kamens/jQuery-menu-aim
 */
angular.module('app.flyout', [])
    .directive('appFlyoutNavigation', function() {
        'use strict';

        return {
            restrict: 'E',
            scope: {
                categories: '=categories',
                visible: '=visible'
            },
            replace: true,
            templateUrl: 'flyout/flyout.html',
            link: function(scope, elem) {

                var $menu = elem.find('.flyout-dropdown');
                var mouseLocs = [];
                var MOUSE_LOCS_TRACKED = 3;  // number of past mouse locations to track
                var DELAY = 1000;  // ms delay when user appears to be entering submenu
                var timeoutId = null;
                var lastDelayLoc = null;
                var options = {
                    tolerance: 500
                };

                var initHeight = false;

                /**
                 *  Set the popover menu height on the first hover / click
                 *
                 *  @method setPopoverHeight
                 *
                 *  @return {undefined}
                 */
                function setPopoverHeight() {
                    initHeight = true;
                    elem.find('.popover').css('min-height', elem.outerHeight());
                }

                /**
                 *  Track the last locations of the mouse
                 *
                 *  @method mousemoveDocument
                 *
                 *  @param  {Object} e Event object
                 *
                 *  @return {undefined}
                 */
                function mousemoveDocument(e) {
                    mouseLocs.push({x: e.pageX, y: e.pageY});

                    if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                        mouseLocs.shift();
                    }
                }

                /**
                 *  Hide menu when user completely exits the menu
                 *
                 *  @method mouseleaveMenu
                 *
                 *  @return {undefined}
                 */
                function mouseleaveMenu() {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    closeMenu();
                    scope.activeRow = null;
                }

                /**
                 *  Trigger a possible row activation when user enters
                 *  a new row. If this is first time entering a row,
                 *  then set the height of the menu.
                 *
                 *  @method mouseenterRow
                 *
                 *  @param  {Integer} row Row index to activate
                 *
                 *  @return {undefined}
                 */
                function mouseenterRow(row) {
                    if (!initHeight) {
                        setPopoverHeight();
                    }

                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    possiblyActivate(row);
                }

                /**
                 *  Trigger this when users mouse leaves a row
                 *
                 *  @method mouseleaveRow
                 *
                 *  @return {undefined}
                 */
                function mouseleaveRow() {
                    console.log('mouseleaveRow');
                }

                /**
                 *  Immediately activate a row if user clicks on it.
                 *  If this is first time entering a row, then set the
                 *  height of the menu.
                 *
                 *  @method clickRow
                 *
                 *  @param  {Integer} row Row to activate
                 *
                 *  @return {undefined}
                 */
                function clickRow(row) {
                    if (!initHeight) {
                        setPopoverHeight();
                    }

                    activate(row);
                }

                /**
                 *  Close the menu
                 *
                 *  @method closeMenu
                 *
                 *  @return {undefined}
                 */
                function closeMenu() {
                    scope.visible = false;
                }

                /**
                 *  Active the provided menu row
                 *
                 *  @method activate
                 *
                 *  @param  {Integer} row The row index
                 *
                 *  @return {undefined}
                 */
                function activate(row) {
                    if (row === scope.activeRow) {
                        return;
                    }

                    if (scope.activeRow) {
                        scope.activeRow = null;
                    }

                    scope.activeRow = row;
                }

                /**
                 *  Possibly activate a row
                 *
                 *  @method possiblyActivate
                 *
                 *  @param  {Integer} row Row index to activate
                 *
                 *  @return {undefined}
                 */
                function possiblyActivate(row) {
                    var delay = activationDelay();

                    if (delay) {
                        timeoutId = setTimeout(function() {
                            possiblyActivate(row);
                        }, delay);
                    } else {
                        activate(row);
                    }
                }

                /**
                 *  Calculate activation delay based on mouse position
                 *
                 *  @method activationDelay
                 *
                 *  @return {undefined}
                 */
                function activationDelay() {
                    if (!scope.activeRow) {
                        // If there is no other submenu row already active, then
                        // go ahead and activate immediately.
                        return 0;
                    }

                    var offset = $menu.offset();
                    var upperLeft = {
                        x: offset.left,
                        y: offset.top - options.tolerance
                    };

                    var upperRight = {
                        x: offset.left + $menu.outerWidth(),
                        y: upperLeft.y
                    };

                    var lowerLeft = {
                        x: offset.left,
                        y: offset.top + $menu.outerHeight() + options.tolerance
                    };

                    var lowerRight = {
                        x: offset.left + $menu.outerWidth(),
                        y: lowerLeft.y
                    };

                    var loc = mouseLocs[mouseLocs.length - 1];
                    var prevLoc = mouseLocs[0];

                    if (!loc) {
                        return 0;
                    }

                    if (!prevLoc) {
                        prevLoc = loc;
                    }

                    if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
                        prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                        // If the previous mouse location was outside of the entire
                        // menu's bounds, immediately activate.
                        return 0;
                    }

                    if (lastDelayLoc &&
                            loc.x === lastDelayLoc.x && loc.y === lastDelayLoc.y) {
                        // If the mouse hasn't moved since the last time we checked
                        // for activation status, immediately activate.
                        return 0;
                    }

                    // Detect if the user is moving towards the currently activated
                    // submenu.
                    //
                    // If the mouse is heading relatively clearly towards
                    // the submenu's content, we should wait and give the user more
                    // time before activating a new row. If the mouse is heading
                    // elsewhere, we can immediately activate a new row.
                    //
                    // We detect this by calculating the slope formed between the
                    // current mouse location and the upper/lower right points of
                    // the menu. We do the same for the previous mouse location.
                    // If the current mouse location's slopes are
                    // increasing/decreasing appropriately compared to the
                    // previous's, we know the user is moving toward the submenu.
                    //
                    // Note that since the y-axis increases as the cursor moves
                    // down the screen, we are looking for the slope between the
                    // cursor and the upper right corner to decrease over time, not
                    // increase (somewhat counterintuitively).
                    function slope(a, b) {
                        return (b.y - a.y) / (b.x - a.x);
                    }

                    var decreasingCorner = upperRight,
                        increasingCorner = lowerRight;

                    // Our expectations for decreasing or increasing slope values
                    // depends on which direction the submenu opens relative to the
                    // main menu. By default, if the menu opens on the right, we
                    // expect the slope between the cursor and the upper right
                    // corner to decrease over time, as explained above. If the
                    // submenu opens in a different direction, we change our slope
                    // expectations.
                    if (options.submenuDirection === 'left') {
                        decreasingCorner = lowerLeft;
                        increasingCorner = upperLeft;
                    } else if (options.submenuDirection === 'below') {
                        decreasingCorner = lowerRight;
                        increasingCorner = lowerLeft;
                    } else if (options.submenuDirection === 'above') {
                        decreasingCorner = upperLeft;
                        increasingCorner = upperRight;
                    }

                    var decreasingSlope = slope(loc, decreasingCorner),
                        increasingSlope = slope(loc, increasingCorner),
                        prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                        prevIncreasingSlope = slope(prevLoc, increasingCorner);

                    if (decreasingSlope < prevDecreasingSlope &&
                            increasingSlope > prevIncreasingSlope) {
                        // Mouse is moving from previous location towards the
                        // currently activated submenu. Delay before activating a
                        // new menu row, because user may be moving into submenu.
                        lastDelayLoc = loc;
                        return DELAY;
                    }

                    lastDelayLoc = null;
                    return 0;
                }

                /**
                 *  Attach document event handlers
                 */
                $(document).mousemove(mousemoveDocument);

                /**
                 *  Attach scope methods and properties
                 */
                angular.extend(scope, {
                    mouseleaveMenu: mouseleaveMenu,
                    mouseenterRow: mouseenterRow,
                    mouseleaveRow: mouseleaveRow,
                    clickRow: clickRow,
                    closeMenu: closeMenu,
                    activeRow: null
                });
            }
        };
    });