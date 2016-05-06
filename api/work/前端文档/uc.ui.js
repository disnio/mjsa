/* 
 * @Author: Allen
 * @Date:   2015-12-04 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-04-28 17:53:25
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', '_'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery', _));
    } else {
        // Browser globals
        factory(jQuery, _);
    }
}(function(jQuery, _) {
    var jsUrl = ucConfig.ServerReferenceJavaScript;
    var ui = {
        // bootstrap modal 提示框
        inTip: function(txt) {
            var def = new $.Deferred();
            var mtip = $("#inTip");
            var modalDialog = '<div class="modal fade" id="inTip"><div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <h3></h3> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> </div> </div> </div></div>';
            if( _.isEmpty(mtip) ){
                $("body").append($(modalDialog));
                mtip = $("#inTip");
            }

            $(".modal-body h3", mtip).text(txt);
            mtip.modal('show');
            mtip.on('hidden.bs.modal', function(e) {
                def.resolve();
            });
            return def;
        },
        // 文件上传
        fileUpload: function(options) {
            var ifopt = {
                iframe: true,
                forceIframeTransport: true,
                redirect: jsUrl + "/Scripts/cors/result.html?%s"
            };
            var opt = {
                url: options.url,
                dataType: 'json',
                autoUpload: true,
                sequentialUploads: true,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 1000000, // 1MB
                minFileSize: 1000, // 1k

                add: function(e, data) {                    
                    //this will 'force' the submit in IE < 10 必须的                    
                    $.each(data.files, function(i, file) {
                        file.jqXHR = data.submit()
                            .success(function(result, textStatus, jqXHR) {})
                            .error(function(jqXHR, textStatus, errorThrown) {})
                            .complete(function(result, textStatus, jqXHR) {});
                    });
                },
                always: function(e, data) {
                    var result;
                    if (data.textStatus == 'parsererror') {
                        // IE9 fails on upload's JSON response
                        result = JSON.parse(data.jqXHR.responseText);
                    } else if (data.textStatus == 'success') {
                        result = data.result;
                    }

                    var temp = {};
                    if ($.browser.msie && $.browser.version < 10) {
                        temp.name = result.files.files[0].name;
                        temp.url = result.files.files[0].url;
                        temp.id = result.files.files[0].id;
                    } else {
                        temp.name = data.result.name;
                        temp.url = data.result.url;
                        temp.id = data.result.id;
                    }

                    options.callback(temp);

                }
            };

            if ($.browser.msie && $.browser.version < 10) {
                opt = $.extend(true, opt, ifopt);
            }

            options.upload.call(options.container, opt).prop('disabled', !$.support.fileInput).parent().addClass(jQuery.support.fileInput ? undefined : 'disabled');
        },
        //三级联动，data： {ID:1, ParentID:0} opt: {list: tlist, container: $("#catelist")}
        genSelect: function(opt) {
            if(_.isFunction(opt.beforeCallback)){                
                opt.beforeCallback(opt.list);
            }
            var lpath = function(pl) {
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
                            return _.union(mem, [node.ID]);
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
                                    return _.union(mem, [piid]);
                                } else {
                                    if (_.isUndefined(pid) || pid == 0) {
                                        return mem;
                                    } else {
                                        return _.union(mem, leafPath(tree, rest, pid));
                                    }
                                }
                            }, [leaf]);
                        }
                    }
                };
                // 所有叶子节点的路径
                var leafsPath = function(l) {
                    return _.reduce(l, function(mem, n) {
                        return _.union(mem, [leafPath(pl, lpList, n)]);
                    }, [])
                };

                return _.map(leafsPath(lfList), function(v, i) {
                    return _(v).reverse().value();
                });
            };
            // 结点
            var getNodes = function(list, id) {
                return _.compact(_.map(list, function(v, i) {
                    if (v.ParentID == id) {
                        return v.ID;
                    }
                }));
            };
            // 对象
            var getObj = function(tlist, id) {
                return _.find(tlist, {
                    ID: id
                })
            };
            // 尾巴
            var isLastNode = function(tlist, id) {
                return _.isEmpty(getNodes(tlist, id));
            };
            // 生成 select
            var genDom = function(tlist, list) {
                _.templateSettings = {
                    interpolate: /\{\{(.+?)\}\}/g
                };

                var tpl = _.template('<option value={{ v }}>{{ n }}</option>');
                var res = '';
                var tpls = _.reduce(list, function(l, id, i) {
                    var v = getObj(tlist, id);
                    l += tpl({
                        v: v[opt.key] || v.ID,
                        n: v.Name
                    });
                    return l;
                }, res);

                return $('<select/>').append('<option value="">请选择</option>' + tpls);
            };
            // 获取下一级结点列表
            var getNextLs = function(tlist, lpath, pid) {
                var clist = _.map(lpath, function(arr, i) {
                    var len = arr.length;
                    var pindex = _.indexOf(arr, pid);

                    // 不是最后的元素
                    if ((pindex + 1) <= len && pindex != -1) {
                        return arr[pindex + 1];
                    } else {
                        return;
                    }
                });
                return _.uniq(_.compact(clist));
            };

            // 头
            var topNodes = getNodes(opt.list, 0);
            var ls = lpath(opt.list);

            opt.container.append(genDom(opt.list, topNodes));

            var getPathList = function(lsg, aid){  
                return _.find(lsg, function(vs){
                    return vs[vs.length-1] == parseInt(aid, 10);
                })                                
            };

            opt.container.delegate('select', 'change', function(e) {
                var _self = $(e.currentTarget);
                _self.next().remove();
                var pid = parseInt(_self.val());
                var mindex = _self.index();

                if (_.isNaN(pid) && mindex != 0) {
                    _self.remove();
                } else {
                    if (!isLastNode(opt.list, pid)) {
                        var nextList = getNextLs(opt.list, ls, pid);
                        _self.after(genDom(opt.list, nextList));
                    }
                }
                if(_.isFunction(opt.callback)){   
                    opt.callback();
                }
                
            });

            // 初始化 UI.genSelect({ list: xd, container: $("#test"), activeID: 8 }); 
            _.each( getPathList(ls, opt.activeID), function(v, i){
                var nextList = getNextLs(opt.list, ls, v);
                if(!_.isEmpty(nextList)){
                    opt.container.append(genDom(opt.list, nextList));
                }
                _.each( $('select:eq(' +i+ ')', opt.container).find('option'), function(item){
                    if($(item).val() == v){
                        $(item).prop('selected', 'selected');
                        // $(item).parent().trigger('change')
                    }
                } )
            });


        }
    };
    if (typeof UI !== 'undefined' && $.isEmptyObject(UI)) {
        // 直接引入脚本文件
        UI = ui;
    } else {
        // AMD 方式引入
        return ui
    }
}));
