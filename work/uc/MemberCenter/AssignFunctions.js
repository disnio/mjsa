// /OrganizationFunction/GetOrganizationFunctionsTree  organizationID    
$(function() {
    $("#jsmc").text(roleName);
    var orgOpt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceMemberCenterAPI,
        "name": '/OrganizationFunction/GetOrganizationFunctionsTree',
        "dataType": "jsonp",
        "data": {
            RoleID: roleID,
            OrganizationID: organizationID
        }
    };
    UT.jaxJson(orgOpt).then(function(data) {

        var topNodes = function(tree) {
            var tlist = [];
            _.each(tree, function(node) {
                if (node.ParentID === 0) {
                    tlist.push(node.FunctionID);
                }
            });
            return tlist
        };
        // 叶子节点
        var leafNodes = function(tree) {
            var llist = [];
            _.each(tree, function(node) {
                if (!_.some(tree, function(inode) {
                        return node.FunctionID === inode.ParentID;
                    })) {
                    llist.push(node.FunctionID)
                }
            });
            return llist
        };
        // 找子节点
        var findChild = function(tree, fid) {
            var carr = _.filter(tree, function(node) {
                return parseInt(node.ParentID, 10) === parseInt(fid, 10);
            });
            return _.map(carr, function(v) {
                return v.FunctionID;
            });
        };

        var hasChild = function(tree, fid) {

            return _.some(tree, function(v) {
                return v.ParentID === fid;
            })
        };

        var hasParent = function(tree, fid) {
            var item = _.findIndex(tree, {
                FunctionID: fid
            });

            if (parseInt(item.ParentID, 10) != 0) {
                return true;
            } else {
                return false;
            }
        };

        var findParent = function(tree, id) {
            var cindex = _.findIndex(tree, {
                FunctionID: id
            });
            var cp = cindex !== -1 ? tree[cindex].ParentID : -1;
            return cp;
        };

        var findParents = function(tree, id) {
            var dlist = [];

            function cp(tree, id) {
                var p = findParent(tree, id);
                if (p != -1 && p != 0 && hasParent(tree, id)) {
                    dlist.push(p);
                    cp(tree, p)
                }
            }
            cp(tree, id);

            return dlist;
        };

        var findSiblings = function(tree, id) {
            var cp = findParent(tree, id);

            if (cp != -1) {
                return _.difference(_.compact(_.map(tree, function(v) {
                    if (parseInt(v.ParentID, 10) == parseInt(cp, 10)) {
                        return v.FunctionID;
                    } else {
                        return;
                    }
                })), [id]);

            }
        };

        // 构建子序列
        var createChild = function(tree, list) {
            var dlist = [];

            function cc(tree, list) {
                _.each(list, function(v, i) {
                    dlist.push(v);

                    if (hasChild(tree, v)) {
                        cc(tree, findChild(tree, v))
                    }
                });
            }
            cc(tree, list);
            return dlist;
        };

        var treelist = createChild(data.Data, topNodes(data.Data));
        // console.log(data.Data)
        var tNodes = _.map(treelist, function(d) {
            return _.find(data.Data, {
                FunctionID: d
            })
        });

        var tHtml = UT.tplRender($("#treeTpl").html(), {
            datas: tNodes
        });

        $("#js-role tbody").empty().append(tHtml);


        var tb = $("#js-role").treetable({
            expandable: true,
            parentIdAttr: "parentId",
            nodeIdAttr: "functionId"
        });

        var hasChecked = [];
        $("#js-role tbody input[ck='1']").each(function(i, v) {
            $(v).prop("checked", true);
            hasChecked.push($(v).data("fid"));
        });
        if (readOnly == 1) {
            $("#js-role tbody input[type='checkbox']").each(function(i, v) {
                $(v).prop("disabled", true);
            })
            $("#js-sel-all").prop("disabled", true);
        } else {
            $("#js-sel-all").prop("disabled", false);
        }

        if (_.every(data.Data, function(v) {
                return v.Checked == 1
            })) {
            $("#js-sel-all").prop("checked", true);
        }

        // 点击选定的节点
        $("#js-role tbody input[type='checkbox']").on("click", function(e) {
            var etr = $(e.currentTarget).closest("tr");
            var check = $(e.currentTarget);
            var isChecked = check.prop("checked");
            var fid = check.data("fid");
            // 父节点列表
            var pid = findParent(data.Data, fid);
            var pids = findParents(data.Data, fid);
            // var psibs = _.map(pidsome, function(v) {
            //     return findSiblings(data.Data, v);
            // });

            var hasSibCheck = function(tree, fid) {
                var sibs = findSiblings(tree, fid);
                // console.log("sibs:", sibs)
                var flag = false;
                $.each($("#js-role tbody input[type='checkbox']"), function(i, v) {
                    if (_.includes(sibs, $(v).data("fid")) && $(v).prop("checked") == true) {
                        flag = true;
                    }
                });

                return flag;
            };            
            
            // 单次选定的节点
            var oNodes;
            if (readOnly != 1) {
                oNodes = createChild(data.Data, [fid]);

                function changeChecked(nodes) {
                    $.each($("#js-role tbody input[type='checkbox']"), function(i, v) {
                        var vfid = $(v).data("fid");
                        if (_.includes(nodes, vfid)) {
                            $(v).prop("checked", isChecked ? true : false);
                        }
                        // 选中所有父节点
                        if (isChecked && _.includes(pids, vfid)) {
                            $(v).prop("checked", true);
                        }
                    })
                }
                changeChecked(oNodes);

                // 未选+兄弟也没选，让父未选。                
                var curSibCheck = hasSibCheck(data.Data, fid);
                
                if (!isChecked && !curSibCheck) {
                    $("#js-role tbody input[data-fid="+pid+"]").prop("checked", false);
                } 
                _.each(pids, function(v){
                    var isSibCheck = hasSibCheck(data.Data, v);
                    if ( !curSibCheck && !isChecked && !isSibCheck) {
                        
                        var cpid = findParent(data.Data, v)                        
                        $("#js-role tbody input[data-fid="+cpid+"]").prop("checked", false);    
                    }                    
                });

            }

        });
        // 全选
        $("#js-sel-all").click(function() {
            var isChecked = $(this).prop("checked");
            if (readOnly != 1) {
                $("#js-role tbody input[type='checkbox']").prop("checked", isChecked);
            }
        });
        // 确定
        $("#js-ok").click(function() {
            var checkedNodes = [];
            // 获取差异
            $.each($("#js-role tbody input[type='checkbox']"), function(i, v) {
                if ($(v).prop("checked")) {
                    checkedNodes.push($(v).data("fid"));
                }
            });
            // 改变的
            var addFunctions = _.difference(checkedNodes, hasChecked);
            // 删除的
            var delFunctions = _.difference(hasChecked, checkedNodes);

            var assignOpt = {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceMemberCenterAPI,
                "name": '/RoleFunction/AssignFunctionsToRole',
                "dataType": "jsonp",
                "data": {
                    RoleID: roleID,
                    addFunctions: addFunctions,
                    delFunctions: delFunctions
                }
            };
            if (readOnly != 1) {
                UT.jaxJson(assignOpt).then(function(data) {
                    UI.inTip(data.Message).then(function() {
                        window.location.href = ucConfig.ServerReferenceMemberCenter + "/RoleManagement/RoleList";
                    });
                });
            }
        });

    });
});
