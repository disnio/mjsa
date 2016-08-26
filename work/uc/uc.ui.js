/* 
 * @Author: Allen
 * @Date:   2015-12-04 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-26 15:17:38
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return (root.UI = factory(window.jQuery));
        });
    } else {
        root.UI = factory(root.jQuery);
    }
}(this, function(jQuery) {

    var host = location.protocol + '://' + location.host;
    var localUrl = ucConfig.ServerReferenceLocalHost || host;

    var ui = {
        zindex: 1000,
        // bootstrap modal 提示框
        inTip: function(txt) {
            var def = new $.Deferred();
            var mtip = $("#inTip");
            var modalDialog = '<div class="modal fade" id="inTip"><div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <h3></h3> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> </div> </div> </div></div>';
            if (_.isEmpty(mtip)) {
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

            var fopt = options;
            if (options.onlyImg) {
                $.blueimp.fileupload.prototype.options.processQueue.push({
                    action: 'vimg',
                    always: true,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
                });
            }

            $.blueimp.fileupload.prototype.processActions.vimg = function(data, options) {
                var dfd = $.Deferred();
                var file = data.files[data.index];

                if (!!options.disabled) {
                    return data;
                }
                var onlyimg = $(data.container).attr("onlyImg")=="false" ? false : true;
                var testtype = !options.acceptFileTypes.test(file.type);                
                if (onlyimg && testtype) {
                    file.error = '错误的文件类型.';
                    dfd.rejectWith(this, [data]);
                } else {
                    dfd.resolveWith(this, [data]);
                }
                return dfd.promise();
            }

            function fsu() {
                var ifopt = {
                    iframe: true,
                    forceIframeTransport: true,
                    redirect: localUrl + "/Scripts/cors/result.html?%s"
                };
                var opt = {
                    url: options.url,
                    dataType: 'json',
                    autoUpload: true,
                    sequentialUploads: true,

                    maxFileSize: 1000000, // 1MB
                    minFileSize: 1000, // 1k

                    add: function(e, data) {

                        $.blueimp.fileupload.prototype.options.add.call(this, e, data)
                        var allOk = _.every(data.files, function(v) {
                            return _.isUndefined(v.error);
                        });
                        if (allOk) {
                            //this will 'force' the submit in IE < 10 必须的  
                            $.each(data.files, function(i, file) {
                                file.jqXHR = data.submit()
                                    .success(function(result, textStatus, jqXHR) {})
                                    .error(function(jqXHR, textStatus, errorThrown) {})
                                    .complete(function(result, textStatus, jqXHR) {});
                            });
                        } else {
                            UI.inTip("只允许上传 jpg, png, gif")
                            return false;
                        }

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
                        // if ($.browser.msie && $.browser.version < 10) {
                        //     temp.name = result.files.files[0].name;
                        //     temp.url = result.files.files[0].url;
                        //     temp.id = result.files.files[0].id;
                        // } else {
                        //     temp.name = data.result.name;
                        //     temp.url = data.result.url;
                        //     temp.id = data.result.id;
                        // }
                        temp.name = result.files.files[0].name;
                        temp.url = result.files.files[0].url;
                        temp.id = result.files.files[0].id;
                        temp.message = result.files.files[0].message;
                        temp.isUploaded = result.files.files[0].isUploaded;

                        options.callback(temp);

                    }
                };
                opt = $.extend(true, opt, ifopt, options);
                options.container.attr("onlyImg", options.onlyImg);

                return function(container) {
                    options.upload.call(container, opt);
                }
            }
            fsu()(options.container)
        },
        // 联动，data： {ID:1, ParentID:0} opt: {list: tlist, container: $("#catelist")}
        genSelect: function(opt) {
            if (_.isFunction(opt.beforeCallback)) {
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
                var sclass = _.isUndefined(opt.className) ? 'ui-select' : opt.className;
                var optionDom = '<option value="">请选择</option>' + tpls;
                var sel = '<select class="' + sclass + '">' + optionDom + '</select>';
                return sel
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

            var getPathList = function(lsg, aid) {
                return _.find(lsg, function(vs) {
                    return vs[vs.length - 1] == parseInt(aid, 10);
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
                if (_.isFunction(opt.callback)) {
                    opt.callback();
                }

            });

            // 初始化 UI.genSelect({ list: xd, container: $("#test"), activeID: 8 }); 
            _.each(getPathList(ls, opt.activeID), function(v, i) {
                var nextList = getNextLs(opt.list, ls, v);
                if (!_.isEmpty(nextList)) {
                    opt.container.append(genDom(opt.list, nextList));
                }
                _.each($('select:eq(' + i + ')', opt.container).find('option'), function(item) {
                    if ($(item).val() == v) {
                        $(item).prop('selected', 'selected');
                        // $(item).parent().trigger('change')
                    }
                })
            });
        },
        // 单弹窗
        genSingleModal: function(opt) {
            var config = {
                btnSave: opt.btnSave || 　false,
                btnSaveName: opt.btnSaveName || '保存',
                btnClose: opt.btnClose || false,
                btnCloseName: opt.btnCloseName || '关闭',
                title: opt.title || '',
                body: opt.body || null,
                callback: opt.callback || $.noop,
                close: opt.close || $.noop,
                save: opt.save || $.noop,
                // function || false
                cond: opt.cond || false
            };

            var modal = $('<div class="modal" id="js-myModal"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close js-modal-topclose"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title"></h4> </div> <div class="modal-body"> </div> <div class="modal-footer"> <button type="button" class="btn btn-default js-modal-close">关闭</button> <button type="button" class="btn btn-primary js-modal-save">保存</button> </div> </div> </div> </div>');
            var $modal = $("#js-myModal");
            if ($modal.length === 0) {
                $('body').append(modal);
                $modal = $("#js-myModal");
            }
            $(".modal-body", $modal).empty();

            $modal.find(".modal-title").text(config.title);

            config.btnSave ? $(".js-modal-save").css("display", "inline-block").text(config.btnSaveName) : $(".js-modal-save").css("display", "none");
            config.btnClose ? $(".js-modal-close").css("display", "inline-block").text(config.btnCloseName) : $(".js-modal-close").css("display", "none");
            if (_.isNull(config.body)) {
                $(".modal-body", $modal).css({
                    "padding": 0
                });
            } else {
                $(".modal-body", $modal).append(config.body);
            }

            $('.modal-backdrop').undelegate();
            $modal.undelegate();

            $modal.delegate('.js-modal-save', 'click', function(event) {
                var saveDef = function() {
                    var deferSave = $.Deferred();
                    if (opt.cond && $.isFunction(opt.cond) && opt.cond($modal)) {
                        config.save($modal);
                        deferSave.resolve(true);
                    } else {
                        config.save($modal);
                        deferSave.resolve(true);
                    }
                    return deferSave;
                };
                saveDef().then(function(data) {
                    $modal.modal('hide');
                    $modal.undelegate();
                });
            });


            $modal.delegate('.js-modal-close, .js-modal-topclose, .modal-backdrop', 'click', function(event) {
                config.close($modal);
                $modal.modal('hide');
                $modal.undelegate();
            });

            $modal.modal({
                show: true,
                backdrop: true
            });

            config.callback($modal);
        },
        calculateScrollbarWidth: function() {
            if (!this.scrollbarWidth) {
                if ($.browser.msie) {
                    var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
                        .css({
                            position: 'absolute',
                            top: -1000,
                            left: -1000
                        }).appendTo('body'),
                        $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
                        .css({
                            position: 'absolute',
                            top: -1000,
                            left: -1000
                        }).appendTo('body');
                    this.scrollbarWidth = $textarea1.width() - $textarea2.width();
                    $textarea1.add($textarea2).remove();
                } else {
                    var $div = $('<div />')
                        .css({
                            width: 100,
                            height: 100,
                            overflow: 'auto',
                            position: 'absolute',
                            top: -1000,
                            left: -1000
                        })
                        .prependTo('body').append('<div />').find('div')
                        .css({
                            width: '100%',
                            height: 200
                        });

                    this.scrollbarWidth = 100 - $div.width();
                    $div.parent().remove();
                }
            }

            return this.scrollbarWidth;
        },
        isIE: function() {
            var uaMatch = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
            var ie = uaMatch.length ? true : false;
            var iev = parseFloat(uaMatch[1], 10);
            return {
                ie: ie,
                iev: iev
            }
        }

    };

    return ui

}));
