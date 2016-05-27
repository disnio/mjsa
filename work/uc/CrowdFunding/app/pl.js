/* 
 * @Author: Allen
 * @Date:   2016-01-13
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-01-13
 */

'use strict';
require(['jquery', '_', './js/uc.ut', './js/uc.ui', 'purl', "moment", "text!tpl/comment/owner.html", "text!tpl/comment/commer.html",  "jPages", "maxlength"],
    function($, _, UT, UI, purl, moment, owner, commer) {
        $(function() {
            // 临时图片，以后消除
            var base = purl($("#linkbase").attr("href")).segment(1);
            var icon = '/' + base + "/Statics/img/man-icon.png";

            function existy(x) {
                return x != null;
            }

            function truthy(x) {
                return (x !== false) && existy(x);
            }

            function fail(thing) {
                throw new Error(thing);
            }
            // 输出控制台警告
            function warn(thing) {
                console.log(["WARNING:", thing].join(' '));
            }

            // 输出控制台日志
            function note(thing) {
                console.log(["NOTE:", thing].join(' '));
            }

            function cat() {
                // 数组合并
                var head = _.first(arguments);
                if (existy(head))
                    return head.concat.apply(head, _.rest(arguments));
                else
                    return [];
            }

            function construct(head, tail) {
                return cat([head], _.toArray(tail));
            }

            function doWhen(cond, action) {
                if (truthy(cond))
                    return action();
                else
                    return undefined;
            }

            function invoker(NAME, METHOD) {
                return function(target /* args ... */ ) {
                    if (!existy(target)) fail("Must provide a target");
                    var targetMethod = target[NAME];
                    var args = _.rest(arguments);
                    return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
                        return targetMethod.apply(target, args);
                    });
                };
            }

            function dispatch( /* funs */ ) {
                var funs = _.toArray(arguments);
                var size = funs.length;
                return function(target /*, args */ ) {
                    var ret = undefined;
                    var args = _.rest(arguments);
                    for (var funIndex = 0; funIndex < size; funIndex++) {
                        var fun = funs[funIndex];
                        ret = fun.apply(fun, construct(target, args));
                        if (existy(ret)) return ret;
                    }
                    return ret;
                };
            }
            // 字符串反转
            function stringReverse(s) {
                if (!_.isString(s)) return undefined;
                return s.split('').reverse().join("");
            }
            var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

            function depComments(pl) {

                var pl = _.map(pl, function(v, i) {
                    if (_.isEmpty(v.CreatorIcon)) {
                        v.CreatorIcon = icon;
                    }
                    v.CreationDate = moment(v.CreationDate).format("YYYY-MM-DD HH:mm:ss");
                    return v;
                });

                // 父节点列表
                var parentList = function(tree) {
                    var plist = [];
                    _.each(tree, function(node) {
                        if (!_.contains(plist, node.ParentID) && node.ParentID != 0) {
                            plist.push(node.ParentID);
                        }
                    });
                    return plist;
                };

                // 叶子节点列表
                var leafList = function(tree) {
                    var paList = parentList(tree);
                    var clist = [];
                    return _.reduce(tree, function(mem, node) {
                        if (!_.contains(paList, node.ID)) {
                            return cat(mem, [node.ID]);
                        } else {
                            return mem;
                        }
                    }, clist);
                };

                var lfList = leafList(pl);

                // 求父节点
                var parentNode = function(tree, node) {

                    var pid;
                    _.each(tree, function(nod) {
                        if (nod.ID.toString() == node.toString()) {
                            pid = nod.ParentID;
                        }
                    });
                    return pid;
                };

                // 求每个叶子节点的路径，在父节点列表中搜索
                var lpList = parentList(pl);

                var leafPath = function(tree, lplist, leaf) {
                    if (_.isEmpty(lplist)) {
                        return [leaf];
                    } else {
                        if (_.isUndefined(leaf)) {
                            return [];
                        } else {
                            return _.reduce(lplist, function(mem, piid) {
                                var pid = parentNode(tree, _.last(mem) || 0);
                                var rest = _.filter(lplist, function(node) {
                                    return node != pid;
                                });

                                if (piid == pid) {
                                    return cat(mem, [piid]);
                                } else {
                                    if (_.isUndefined(pid) || pid == 0) {
                                        return mem;
                                    } else {
                                        return cat(mem, leafPath(tree, rest, pid));
                                    }
                                }
                            }, [leaf]);
                        }
                    }
                };
                // 所有叶子节点的路径
                var leafsPath = function(l) {

                    return _.reduce(l, function(mem, n) {
                        return cat(mem, [leafPath(pl, lpList, n)]);

                    }, [])
                };

                var allLeafPath = leafsPath(lfList);
                // console.log("all leaf path: ", lfList, allLeafPath);
                var rendCItem = function(tree, node, pos) {
                    var inode = _.find(tree, function(item) {
                        return item.ID == node;
                    });
                    // item.CreationDate = moment(item.CreationDate).format("YYYY-MM-DD HH:mm");
                    var template = _.template(commer);

                    var itemdata = {
                        "item": inode,
                        "pos": pos
                    };
                    return template(itemdata);
                };

                var rendOItem = function(tree, node) {
                    var inode = _.find(tree, function(item) {
                        return item.ID == node;
                    });
                    // item.CreationDate = moment(item.CreationDate).format("YYYY-MM-DD HH:mm");
                    var template = _.template(owner);

                    var itemdata = {
                        "item": inode
                    };
                    return template(itemdata);
                };

                var renderC = function(tree, llist) {
                    if (_.isEmpty(llist)) {
                        return;
                    }
                    var ower = _.first(llist);
                    var path = _.rest(llist);
                    var myOwer = rendOItem(tree, ower);
                    // 判断层级
                    var rlen = llist.length;
                    var mo = $(myOwer);
                    if (rlen == 1) {
                        return mo;
                    }
                    var wbox = '<div class="commentBox"></div>';
                    if (rlen == 2) {
                        var s2 = rendCItem(tree, path[0], 1);
                        var s2w = $('<div class="commentBox">' + s2 + '</div>');
                        mo.find(".body").prepend(s2w);
                        return mo;
                    }
                    //<div class="commentBox"></div>
                    if (rlen >= 3) {
                        var n = _.first(path);
                        var nn = _.rest(path);
                        var wn = rendCItem(tree, n, rlen - 1);
                        var wnj = $('<div class="commentBox">' + wn + '</div>');
                        var pos = rlen - 1;
                        var nwrap;
                        _.reduce(nn, function(nj, item) {
                            pos = pos - 1;
                            var ni = rendCItem(tree, item, pos);
                            var nw = $('<div class="commentBox">' + ni + '</div>');
                            $(nj).prepend(nw);
                            return nw;
                        }, wnj);

                        mo.find(".body").prepend(wnj);
                        return mo;
                    }
                };

                // 写所有评论路径
                var renderEl = function(leafs) {
                    var box = $(".list");
                    box.empty();
                    // 注意排序
                    _.each(rev(leafs), function(leaf) {
                        box.append(renderC(pl, leaf));
                    });
                };

                renderEl(allLeafPath);
            };

            var url = purl();

            var projectId = parseInt( url.param("id") || url.segment(-1), 10);
            var optgetC = {
                "name": '/CFProject/GetProjectComments',
                "data": {
                    id: projectId
                },
                "dataType": 'jsonp'
            };
            var regEvent = function() {
                function combover(event) {
                    event.stopPropagation();
                    $(this).addClass('commentBox-hover');
                    $(this).find("> .tieOperations").css({
                        "visibility": "visible"
                    });
                }

                function combout(event) {
                    event.stopPropagation();
                    $(this).removeClass('commentBox-hover');
                    $(this).find("> .tieOperations").css({
                        "visibility": "hidden"
                    });
                }
                $(".commentBox").bind("mouseover", combover);
                $(".commentBox").bind("mouseout", combout);
                $(".reply").click(function(e) {
                    $(".commentBox .replybox").val('');
                    $(".close").trigger('click');
                    $(".commentBox").unbind("mouseout", combout);

                    var replaybox = $(e.currentTarget).closest(".tieOperations").find(".replybox");
                    replaybox.find(".rtextarea").empty();
                    replaybox.show();
                    $(this).hide();
                });
                $(".close").click(function(e) {
                    $(this).closest('.tieOperations').find('.reply').show();
                    $(this).closest('.replybox').hide();
                    $(".commentBox").bind("mouseout", combout);
                });
            };
            UT.jaxJson(optgetC).then(function(data) {
                depComments(data.Data);
                if (data.Data.length > 5) {
                    $("#holder").jPages({
                        containerID: "list",
                        perPage: 5,
                        startPage: 1,
                        startRange: 1,
                        midRange: 5,
                        endRange: 1
                    });
                }
                setTimeout(function() {
                    regEvent();
                    regSend();

                }, 20);
            });
            // 未登录不能评论和回复
            var noComment = function(aid, txt) {               

                UI.inTip(txt);  

                return false;
            };

            var regSend = function() {
                $(".inComment").delegate(".send", "click", function(e) {
                    var cid = parseInt(AccountID, 10);
                    if (cid <= 0) {
                        noComment(cid, "请先登录再做评论和回复！");
                    }
                    var pjid = $(this).attr("data-pjid");
                    var pid = parseInt( $(this).attr("data-pid") );
                    var texta = $(this).closest('.textarea-wrapper').find(".rtextarea");
                    var contents = $.trim(texta.val());
                    var opts = {
                        ProjectID: parseInt( pjid || projectId, 10),
                        CreatorID: cid,
                        ParentID: pid,
                        Content: contents
                    };

                    var optpost = {
                        name: '/CFProject/CreateProjectComment',
                        data: opts,
                        // contentType: "application/json",
                        dataType: "jsonp"
                    };

                    if (contents.length > 3) {
                        texta.val('');
                        UT.jaxJson(optpost).then(function(data) {
                            if (data.Success == true) {
                                UT.jaxJson(optgetC).then(function(data) {
                                    depComments(data.Data);
                                    setTimeout(function() {
                                        regEvent();
                                        regSend();
                                    }, 20);
                                });
                            }
                        });
                        $(this).closest('.commentBox').find('.replay').show();

                    } else {
                        UI.inTip("评论不能少于4个字符");
                    }

                });
            };
            $(".comwrap .send").click(function() {
                var cid = parseInt(AccountID, 10);
                
                if (cid <= 0) {
                    noComment(cid, "请先登录再做评论和回复！");
                    return;
                }
                var texta = $(this).closest('.textarea-wrapper').find(".rtextarea");
                var contents = texta.val();
                var opts = {
                    ProjectID: parseInt( projectId, 10),
                    CreatorID: cid,
                    ParentID: 0,
                    Content: contents
                };

                var optpost = {
                    name: '/CFProject/CreateProjectComment',
                    data: opts,
                    // contentType: "application/json",
                    dataType: 'jsonp'
                };
                if (contents.length > 3) {
                    texta.val('');
                    UT.jaxJson(optpost).then(function(data) {
                        if (data.Success == true) {
                            UT.jaxJson(optgetC).then(function(data) {
                                depComments(data.Data);
                                setTimeout(function() {
                                    regEvent();
                                    regSend();
                                }, 20);
                            });
                        }
                    });
                } else {
                    UI.inTip("评论不能少于4个字符");
                }

            });

            setTimeout(function() {
                regSend();
            }, 20);
        });
    }
);
