$(function() {
    (function($) {
        // 获取树特定节点的所有子节点
        // function getChilds(tree, node) {
        //     if (_.isEmpty(tree)) return [];

        //     var item = _.first(tree);
        //     var pId = item.ParentID;
        //     var curId = item.ID;
        //     var more = _.rest(tree);

        //     if (_.isEqual(node, pId))
        //         return construct(curId, getChilds(more, node));
        //     else
        //         return getChilds(more, node);
        // }
        // var nodeList = getChilds(pl, 1);
        
        // var rev = invoker('reverse', Array.prototype.reverse);

        // function depS(tree, nodes, seen) {
        //     if (_.isEmpty(nodes)) return rev(seen);

        //     var node = _.first(nodes);
        //     var more = _.rest(nodes);

        //     if (_.contains(seen, node))
        //         return depS(tree, more, seen);
        //     else
        //         return depS(tree, cat(getChilds(tree, node), more), construct(node, seen));
        // }

        var dep = depS(pl, [1, 2], []);
        
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
            console.log("parentList: ", paList)
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
        console.log("leaf List: ", lfList)

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

        console.log("pid 9 is 3: ", parentNode(pl, 9));
        // 求每个叶子节点的路径，在父节点列表中搜索
        var lpList = parentList(pl);
        var leafPath = function(tree, lplist, leaf) {
            if (_.isEmpty(lplist) || _.isUndefined(leaf)) {
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

        };

        console.log("leaf path: ", leafPath(pl, lpList, 11))
            // 所有叶子节点的路径
        var leafsPath = function(l) {
            return _.reduce(l, function(mem, n) {
                return cat(mem, [leafPath(pl, lpList, n)]);

            }, [])
        };

        var allLeafPath = leafsPath(lfList);
        console.log("all leaf path: ", rev(allLeafPath));

        // var list = $(".list");
        var doms = [];
        var rendCItem = function(tree, node) {
            var inode = _.find(tree, function(item) {
                return item.ID == node;
            });
            // item.CreationDate = moment(item.CreationDate).format("YYYY-MM-DD HH:mm");
            var template = _.template($("#citem").html());

            var itemdata = {
                "item": inode
            };
            return template(itemdata);
        };

        var rendOItem = function(tree, node) {
            var inode = _.find(tree, function(item) {
                return item.ID == node;
            });
            // item.CreationDate = moment(item.CreationDate).format("YYYY-MM-DD HH:mm");
            var template = _.template($("#comower").html());

            var itemdata = {
                "item": inode
            };
            return template(itemdata);
        };

        var renderC = function(tree, llist) {
            // var rlist = rev(llist);
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
                var s2 = rendCItem(tree, path[0]);
                var s2w = $('<div class="commentBox">' + s2 + '</div>');
                mo.find(".body").prepend(s2w);
                console.log("middowm: ", mo);
                return mo;
            }
            //<div class="commentBox"></div>
            if (rlen >= 3) {
                var n = _.first(path);
                var nn = _.rest(path);
                var wn = rendCItem(tree, n);
                var wnj = $('<div class="commentBox">' + wn + '</div>');

                var nwrap;
                _.reduce(nn, function(nj, item) {
                    var ni = rendCItem(tree, item);
                    var nw = $('<div class="commentBox">' + ni + '</div>');
                    $(nj).prepend(nw);
                    return nw;
                }, wnj);

                mo.find(".body").prepend(wnj);
                console.log(mo)
                return mo;
            }
        };

        // 写所有评论路径


        var renderEl = function(leafs) {
            var box = $(".list");
            box.empty();
            _.each(leafs, function(leaf) {
                box.append(renderC(pl, leaf));
            });
        };

        renderEl(allLeafPath);
    })($);





});
