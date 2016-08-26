/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function($, undefined) {

    $.ui = $.ui || {};

    var cachedScrollbarWidth,
        max = Math.max,
        abs = Math.abs,
        round = Math.round,
        rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/,
        roffset = /[\+\-]\d+(\.[\d]+)?%?/,
        rposition = /^\w+/,
        rpercent = /%$/,
        _position = $.fn.position;
    // 获取宽高的偏移量， offsets 可以是百分比或具体值
    function getOffsets(offsets, width, height) {
        return [
            parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
            parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
        ];
    }
    // 获取元素 css属性的整数值
    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0;
    }

    function getDimensions(elem) {
        var raw = elem[0];
        // 注释
        if (raw.nodeType === 9) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            };
        }
        // 窗口
        if ($.isWindow(raw)) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            };
        }
        // 链接
        if (raw.preventDefault) {
            return {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            };
        }
        return {
            width: elem.outerWidth(),
            height: elem.outerHeight(),
            offset: elem.offset()
        };
    }
    // 工具函数：滚动条信息，容器信息
    $.position = {
        // 滚动条宽度
        scrollbarWidth: function() {
            if (cachedScrollbarWidth !== undefined) {
                return cachedScrollbarWidth;
            }
            var w1, w2,
                div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                innerDiv = div.children()[0];

            $("body").append(div);
            w1 = innerDiv.offsetWidth;
            div.css("overflow", "scroll");

            w2 = innerDiv.offsetWidth;

            if (w1 === w2) {
                w2 = div[0].clientWidth;
            }

            div.remove();

            return (cachedScrollbarWidth = w1 - w2);
        },
        // 获取父元素的滚动条信息
        getScrollInfo: function(within) {
            // window 或 document 空值，普通元素拿 overflow-x/y 值
            var overflowX = within.isWindow || within.isDocument ? "" :
                within.element.css("overflow-x"),
                overflowY = within.isWindow || within.isDocument ? "" :
                within.element.css("overflow-y"),
                // 是否有滚动条出现在 x, y
                hasOverflowX = overflowX === "scroll" ||
                (overflowX === "auto" && within.width < within.element[0].scrollWidth),
                hasOverflowY = overflowY === "scroll" ||
                (overflowY === "auto" && within.height < within.element[0].scrollHeight);
            return {
                width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                height: hasOverflowX ? $.position.scrollbarWidth() : 0
            };
        },
        // 获取容器信息
        getWithinInfo: function(element) {
            var withinElement = $(element || window),
                isWindow = $.isWindow(withinElement[0]),
                isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
            return {
                element: withinElement,
                isWindow: isWindow,
                isDocument: isDocument,
                offset: withinElement.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: withinElement.scrollLeft(),
                scrollTop: withinElement.scrollTop(),
                width: isWindow ? withinElement.width() : withinElement.outerWidth(),
                height: isWindow ? withinElement.height() : withinElement.outerHeight()
            };
        }
    };

    $.fn.position = function(options) {
        // 不包含 of 属性，则调用 jq 原有的 position
        if (!options || !options.of) {
            return _position.apply(this, arguments);
        }

        // 复制
        options = $.extend({}, options);

        var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
            // 定位的目标元素
            target = $(options.of),
            // 定位的容器元素信息，用于碰撞检测
            within = $.position.getWithinInfo(options.within),
            // 容器的滚动条信息
            scrollInfo = $.position.getScrollInfo(within),
            collision = (options.collision || "flip").split(" "),
            offsets = {};
        // 目标元素维度
        dimensions = getDimensions(target);
        if (target[0].preventDefault) {
            // force left top to allow flipping
            options.at = "left top";
        }
        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        targetOffset = dimensions.offset;
        // clone to reuse original targetOffset later 保存目标信息
        basePosition = $.extend({}, targetOffset);

        // force my and at to have valid horizontal and vertical positions
        // if a value is missing or invalid, it will be converted to center
        // 计算目标要定位元素的位置【l,c,r/t,c,b】和偏移
        $.each(["my", "at"], function() {
            var pos = (options[this] || "").split(" "),
                horizontalOffset,
                verticalOffset;
            // 默认 中 中
            if (pos.length === 1) {
                pos = rhorizontal.test(pos[0]) ?
                    pos.concat(["center"]) :
                    rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
            }
            pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

            // calculate offsets 计算偏移量
            horizontalOffset = roffset.exec(pos[0]);
            verticalOffset = roffset.exec(pos[1]);
            offsets[this] = [
                horizontalOffset ? horizontalOffset[0] : 0,
                verticalOffset ? verticalOffset[0] : 0
            ];

            // reduce to just the positions without the offsets
            options[this] = [
                rposition.exec(pos[0])[0],
                rposition.exec(pos[1])[0]
            ];
        });

        // normalize collision option
        if (collision.length === 1) {
            collision[1] = collision[0];
        }
        // 根据目标位置要素计算定位起始基准
        if (options.at[0] === "right") {
            basePosition.left += targetWidth;
        } else if (options.at[0] === "center") {
            basePosition.left += targetWidth / 2;
        }

        if (options.at[1] === "bottom") {
            basePosition.top += targetHeight;
        } else if (options.at[1] === "center") {
            basePosition.top += targetHeight / 2;
        }
        // 获取目标的偏移量
        atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
        basePosition.left += atOffset[0];
        basePosition.top += atOffset[1];

        return this.each(function() {
            var collisionPosition, using,
                elem = $(this),
                elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(),
                marginLeft = parseCss(this, "marginLeft"),
                marginTop = parseCss(this, "marginTop"),
                // 碰撞警戒宽高
                collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
                collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
                position = $.extend({}, basePosition),
                myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
            // 定位基准位置计算继续
            if (options.my[0] === "right") {
                position.left -= elemWidth;
            } else if (options.my[0] === "center") {
                position.left -= elemWidth / 2;
            }

            if (options.my[1] === "bottom") {
                position.top -= elemHeight;
            } else if (options.my[1] === "center") {
                position.top -= elemHeight / 2;
            }
            // 加偏移
            position.left += myOffset[0];
            position.top += myOffset[1];
            // 不支持分数位，则四舍五入
            // if the browser doesn't support fractions, then round for consistent results
            if (!$.support.offsetFractions) {
                position.left = round(position.left);
                position.top = round(position.top);
            }
            // 元素的碰撞便界，为元素本身的外边距
            collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };
            // 通过检测调整位置
            $.each(["left", "top"], function(i, dir) {
                if ($.ui.position[collision[i]]) {
                    $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    });
                }
            });

            if (options.using) {
                // adds feedback as second argument to using callback, if present
                using = function(props) {
                    var left = targetOffset.left - position.left,
                        right = left + targetWidth - elemWidth,
                        top = targetOffset.top - position.top,
                        bottom = top + targetHeight - elemHeight,
                        feedback = {
                            target: {
                                element: target,
                                left: targetOffset.left,
                                top: targetOffset.top,
                                width: targetWidth,
                                height: targetHeight
                            },
                            element: {
                                element: elem,
                                left: position.left,
                                top: position.top,
                                width: elemWidth,
                                height: elemHeight
                            },
                            horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                            vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                        };
                    if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                        feedback.horizontal = "center";
                    }
                    if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                        feedback.vertical = "middle";
                    }
                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                        feedback.important = "horizontal";
                    } else {
                        feedback.important = "vertical";
                    }
                    options.using.call(this, props, feedback);
                };
            }

            elem.offset($.extend(position, {
                using: using
            }));
        });
    };

    $.ui.position = {
        fit: {
            left: function(position, data) {
                var within = data.within,
                    // 容器左边距坐标
                    withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                    // 容器宽
                    outerWidth = within.width,
                    // 元素左侧始位置不包括左margin
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    // 检测是否左侧超出，在内则小于0，容器左侧 与 元素左侧比较
                    overLeft = withinOffset - collisionPosLeft,
                    // 检测是否右侧超出，元素右侧位 与 容器右侧位比较
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                    newOverRight;

                // 元素大于容器的宽度
                if (data.collisionWidth > outerWidth) {
                    // element is initially over the left side of within 左侧向左超出，右侧没超
                    if (overLeft > 0 && overRight <= 0) {
                    	// 调整为靠容器右侧放
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        // position.left +=(outerWidth + withinOffset) - (position.left +  + data.collisionWidth)
                        position.left += overLeft - newOverRight;
                        // element is initially over right side of within
                    } else if (overRight > 0 && overLeft <= 0) {
                    	// 调整为靠容器左侧方
                        position.left = withinOffset;
                        // element is initially over both left and right sides of within
                    } else {
                        if (overLeft > overRight) {
                        	// 调整为靠容器右侧
                            position.left = withinOffset + outerWidth - data.collisionWidth;
                        } else {
                        	// 调整为容器左侧
                            position.left = withinOffset;
                        }
                    }
                    // too far left -> align with left edge
                } else if (overLeft > 0) {
                	// 左超靠左
                    position.left += overLeft;
                    // too far right -> align with right edge
                } else if (overRight > 0) {
                	// 右超靠右
                    position.left -= overRight;
                    // adjust based on position and margin
                } else {
                    position.left = max(position.left - collisionPosLeft, position.left);
                }
            },
            top: function(position, data) {
                var within = data.within,
                    withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                    outerHeight = data.within.height,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = withinOffset - collisionPosTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                    newOverBottom;

                // element is taller than within
                if (data.collisionHeight > outerHeight) {
                    // element is initially over the top of within
                    if (overTop > 0 && overBottom <= 0) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom;
                        // element is initially over bottom of within
                    } else if (overBottom > 0 && overTop <= 0) {
                        position.top = withinOffset;
                        // element is initially over both top and bottom of within
                    } else {
                        if (overTop > overBottom) {
                            position.top = withinOffset + outerHeight - data.collisionHeight;
                        } else {
                            position.top = withinOffset;
                        }
                    }
                    // too far up -> align with top
                } else if (overTop > 0) {
                    position.top += overTop;
                    // too far down -> align with bottom edge
                } else if (overBottom > 0) {
                    position.top -= overBottom;
                    // adjust based on position and margin
                } else {
                    position.top = max(position.top - collisionPosTop, position.top);
                }
            }
        },
        flip: {
            left: function(position, data) {
                var within = data.within,
                    withinOffset = within.offset.left + within.scrollLeft,
                    outerWidth = within.width,
                    offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = collisionPosLeft - offsetLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                    myOffset = data.my[0] === "left" ?
                    -data.elemWidth :
                    data.my[0] === "right" ?
                    data.elemWidth :
                    0,
                    atOffset = data.at[0] === "left" ?
                    data.targetWidth :
                    data.at[0] === "right" ?
                    -data.targetWidth :
                    0,
                    offset = -2 * data.offset[0],
                    newOverRight,
                    newOverLeft;

                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        position.left += myOffset + atOffset + offset;
                    }
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                        position.left += myOffset + atOffset + offset;
                    }
                }
            },
            top: function(position, data) {
                var within = data.within,
                    withinOffset = within.offset.top + within.scrollTop,
                    outerHeight = within.height,

                    offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = collisionPosTop - offsetTop,

                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                    top = data.my[1] === "top",
                    myOffset = top ?
                    -data.elemHeight :
                    data.my[1] === "bottom" ?
                    data.elemHeight :
                    0,
                    atOffset = data.at[1] === "top" ?
                    data.targetHeight :
                    data.at[1] === "bottom" ?
                    -data.targetHeight :
                    0,
                    offset = -2 * data.offset[1],
                    newOverTop,
                    newOverBottom;
                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                    if ((position.top + myOffset + atOffset + offset) > overTop && (newOverBottom < 0 || newOverBottom < abs(overTop))) {
                        position.top += myOffset + atOffset + offset;
                    }
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                    if ((position.top + myOffset + atOffset + offset) > overBottom && (newOverTop > 0 || abs(newOverTop) < overBottom)) {
                        position.top += myOffset + atOffset + offset;
                    }
                }
            }
        },
        flipfit: {
            left: function() {
                $.ui.position.flip.left.apply(this, arguments);
                $.ui.position.fit.left.apply(this, arguments);
            },
            top: function() {
                $.ui.position.flip.top.apply(this, arguments);
                $.ui.position.fit.top.apply(this, arguments);
            }
        }
    };

    // fraction support test
    (function() {
        var testElement, testElementParent, testElementStyle, offsetLeft, i,
            body = document.getElementsByTagName("body")[0],
            div = document.createElement("div");

        //Create a "fake body" for testing based on method used in jQuery.support
        testElement = document.createElement(body ? "div" : "body");
        testElementStyle = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (body) {
            $.extend(testElementStyle, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
        }
        for (i in testElementStyle) {
            testElement.style[i] = testElementStyle[i];
        }
        testElement.appendChild(div);
        testElementParent = body || document.documentElement;
        testElementParent.insertBefore(testElement, testElementParent.firstChild);

        div.style.cssText = "position: absolute; left: 10.7432222px;";

        offsetLeft = $(div).offset().left;
        $.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;

        testElement.innerHTML = "";
        testElementParent.removeChild(testElement);
    })();

}(jQuery));
