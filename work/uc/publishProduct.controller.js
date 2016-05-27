/* 
 * @Author: Allen
 * @Date:   2016-03-21 10:52:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-13 12:25:43
 */

(function() {

    var yob = angular.module('yoB', ["ui.bootstrap", "ui.bootstrap.tpls"]);

    yob.factory('list', function($http) {
        var opt = {
            "webUrl": ucConfig.ServerReferenceJavaScript,
            "name": '/product/CategoryListForPublishProduct'
        };
        return $http.get(opt.webUrl + opt.name);
    });
    yob.controller('optCtrl', function($scope, $uibModalInstance, $log, produm) {
        $scope.OptionList = _.cloneDeep(produm.data);
        var index = produm.index;
        var optflag = produm.optflag;
        var whichOpt = [{
            name: "属性名",
            value: "属性值"
        }, {
            name: "规格名",
            value: "规格值"
        }];
        var opt;
        $scope.whichOp = whichOpt[optflag];
        if (produm.action == 0) {
            opt = {
                "OptionName": "",
                "OptionValueList": [],
                // 有规格 true， 无 false
                "IsSKU": produm.optflag == 1 ? true : false,
                "Status": 1
            };
        } else {
            opt = {
                "OptionName": $scope.OptionList[index].OptionName,
                "OptionValueList": $scope.OptionList[index].OptionValueList,
                // 有规格 true， 无 false
                "IsSKU": $scope.OptionList[index].IsSKU,
                "Status": 1
            };
        }

        $scope.opt = _.cloneDeep(opt);

        $scope.optV = {
            "OptionValueName": "",
            "Status": 1 // 默认不动
        };

        $scope.ok = function() {
            // add
            if (produm.action == 0) {
                if ($scope.opt.OptionName != '' && $scope.opt.OptionValueList.length > 0) {
                    $scope.OptionList.push(_.cloneDeep($scope.opt));
                    $uibModalInstance.close(_.cloneDeep($scope.OptionList));
                } else {
                    $scope.optForm.OptionName.$dirty = true;
                    $scope.optForm.OptionValueName.$dirty = true;
                }
            } else {
                if ($scope.opt.OptionName != '' && $scope.opt.OptionValueList.length > 0) {
                    $scope.OptionList[index] = _.cloneDeep($scope.opt)
                    $uibModalInstance.close(_.cloneDeep($scope.OptionList));
                } else {
                    $scope.optForm.OptionName.$dirty = true;
                    $scope.optForm.OptionValueName.$dirty = true;
                }
            }
        };
        $scope.canOkOpt = function() {
            return $scope.opt.OptionValueList.length > 0 && !_.isEqual($scope.opt, produm.data[index]);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss(produm.data);
        };

        $scope.addOptionValue = function() {
            var v = parseFloat($scope.optV.OptionValueName, 10);
            if ($scope.optV.OptionValueName != '' && (_.isNumber(v) && !!v > 0)) {
                $scope.opt.OptionValueList.push(_.clone($scope.optV));
                $scope.optV.OptionValueName = "";
                $scope.optForm.OptionValueName.$dirty = false;
            } else {
                $scope.optForm.OptionValueName.$dirty = true;
            }

        };

        $scope.delOptLastItem = function(index) {
            if (index <= $scope.opt.OptionValueList.length - 1) {
                $scope.opt.OptionValueList.splice(index, 1);
            }
        };
    });
    yob.controller('skuCtrl', function($scope, $uibModalInstance, $log, produm) {

        $scope.skuitem = _.cloneDeep(produm.data);
        var act = produm.action;
        var priceItem = {
            "Amount": 0,
            "AmountName": "",
            "IsRecuring": false
        };

        $scope.priceItem = _.cloneDeep(priceItem);
        $scope.addPriceItem = function() {
            if (!_.isEmpty($scope.priceItem.AmountName) && !_.isEmpty($scope.priceItem.Amount)) {
                var item = _.cloneDeep($scope.priceItem);

                $scope.skuitem.PriceList.push(item);
                $scope.priceItem = _.cloneDeep(priceItem);
                $scope.skuForm.AmountName.$dirty = false;
                $scope.skuForm.Amount.$dirty = false;

            } else {
                $scope.skuForm.AmountName.$dirty = true;
                $scope.skuForm.Amount.$dirty = true;
            }
        };

        // 删除
        $scope.delPriceItem = function(e, index) {
            e.preventDefault();
            if (index <= $scope.skuitem.PriceList.length - 1) {
                $scope.skuitem.PriceList.splice(index, 1);
            }
        };
        // 编辑
        var skuItemEditIndex = -1;
        $scope.skuItemIsEdit = function(pl) {

            if (skuItemEditIndex == -1) {
                return false;
            } else {
                return _.isEqual($scope.skuitem.PriceList[skuItemEditIndex], pl);
            }
        };

        $scope.editPriceListItem = function(e, index) {
            e.preventDefault();
            skuItemEditIndex = index;
            $scope.editItem = {
                eAmount: $scope.skuitem.PriceList[index].Amount,
                eAmountName: $scope.skuitem.PriceList[index].AmountName,
                eIsRecuring: $scope.skuitem.PriceList[index].IsRecuring
            };
        };

        $scope.savePriceListItem = function(e, index) {
            e.preventDefault();
            var item = {
                "Amount": $scope.editItem.eAmount,
                "AmountName": $scope.editItem.eAmountName,
                "IsRecuring": $scope.editItem.eIsRecuring
            };

            $scope.skuitem.PriceList[index] = _.cloneDeep(item);
            skuItemEditIndex = -1;
        };

        $scope.ok = function() {
            $uibModalInstance.close(_.cloneDeep($scope.skuitem));
        };

        $scope.canOkSku = function() {
            return $scope.skuitem.PriceList.length > 0 && $scope.skuForm.$dirty && !_.isEqual(produm.data, $scope.skuitem)
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss(produm.data);
        };
    });
    yob.controller('MainController', function($scope, $timeout, $uibModal, $log, list) {
        $scope.produs = {
            "Name": "",
            "Description": "",
            "ProductCode": "",
            "IsOuterProduct": false,
            "OuterUrl": "",
            "CategoryName": "",
            "CategoryID": "",
            "Price": 0,
            "OptionList": [],
            "PictureList": [{
                "IconID": "3813a72d-1b92-46ce-9994-dd81c8499243",
                "IsMainPic": false,
                "Status": 1,
                "Url": "https://newapi-dev.ucdl.cn/FileCenterAPI/fileupload/ImgDownload/3813a72d-1b92-46ce-9994-dd81c8499243"
            }, {
                "IconID": "7f91dc96-97ab-4e4b-8cb5-2f8b972160e7",
                "IsMainPic": true,
                "Status": 1,
                "Url": "https://newapi-dev.ucdl.cn/FileCenterAPI/fileupload/ImgDownload/7f91dc96-97ab-4e4b-8cb5-2f8b972160e7"
            }],
            "SKUList": [],
            "Num": 0
        };
        // 动态改变规格项列表需要
        function filterList(list, flag) {
            return _.filter(list, {
                IsSKU: flag
            });
        }

        function genOpt(list) {

            var genObj = function(item) {
                return _.reduce(item.OptionValueList, function(result, v, i) {
                    result.push(_.zipObject([
                        [item.OptionName, v.OptionValueName]
                    ]));
                    return result;
                }, []);
            };

            var genObjList = function(list) {
                var ret = [];
                _.each(list, function(listItem, i) {
                    ret.push(genObj(listItem));
                });
                return ret;
            };

            var glist = genObjList(list);

            // 长度表现为乘法，两两做乘法
            var genOneList = function(lista, listb) {
                if (_.isEmpty(listb)) {
                    return lista;
                } else {
                    return _.flatten(_.reduce(lista, function(result, a, i) {
                        result.push(_.map(listb, function(v, j) {
                            return _.assign({}, a, v);
                        }));
                        return result;
                    }, []));
                }
            };

            var genList = function(glist) {
                var first = glist[0];
                var second = glist[1] || [];

                if (_.isEmpty(first)) {
                    return [];
                }
                if (_.isEmpty(second)) {
                    return first;
                }

                return _.reduce(_.rest(glist), function(ret, v, i) {
                    return genOneList(ret, v);
                }, first);
            }

            return genList(glist);
        }

        // 生成规格的属性名
        function genSkuList() {
            $scope.produs.SKUList = [];
            var filterData = filterList(_.clone($scope.produs.OptionList), true);

            var listOpt = genOpt(filterData) || [];

            _.each(listOpt, function(s, i) {
                var sku = {
                    Num: 0,
                    Name: '',
                    PropertiesName: '',
                    PriceList: [],
                    Status: 1,
                    Price: 0
                };
                // sku.Name = skuname;
                sku.PropertiesName = _.map(_.pairs(s), function(v, i) {
                    return v.join(":")
                }).toString();

                $scope.produs.SKUList.push(_.clone(sku));
            });
        }

        genSkuList();
        // 属性数量判断，显示列表
        $scope.hasOpts = function() {
            var opt = 0;
            _.each($scope.produs.OptionList, function(v, i) {
                if (v.IsSKU == false) {
                    opt += 1;
                }
            });
            return opt > 0;
        };
        $scope.hasSkus = function() {
            var opt = 0;
            _.each($scope.produs.OptionList, function(v, i) {
                if (v.IsSKU == true) {
                    opt += 1;
                }
            });
            return opt > 0;
        };

        $scope.hasSkuList = function() {
            return !!$scope.produs.SKUList.length > 0
        };

        $scope.isSkuPrice = function() {
            return $scope.produs.SKUList.length > 0;
        };

        // 打开属性添加对话框
        $scope.animationsEnabled = true;
        // 添加属性
        $scope.addOrEditOption = function() {
            var action, optflag, index = -1;
            if (arguments.length == 2) {
                optflag = arguments[0];
                action = arguments[1];

            }

            if (arguments.length == 3) {
                optflag = arguments[0];
                action = arguments[1];
                index = arguments[2];
            }

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                template: $('#optDialog').html(),
                controller: 'optCtrl',
                resolve: {
                    produm: function() {
                        return {
                            data: $scope.produs.OptionList,
                            action: action,
                            optflag: optflag,
                            index: index
                        }
                    }
                }
            });

            modalInstance.result.then(function(optlist) {

                $scope.produs.OptionList = optlist;
                if (optflag == 1) {
                    genSkuList();
                }
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
                if (optflag == 1) {
                    genSkuList();
                }

            });
        };
        // 属性删除
        $scope.delOpt = function(action, index) {
            $scope.produs.OptionList.splice(index, 1);
            if (action == 1) {
                genSkuList();
            }
        };

        // 添加价格项明细
        $scope.skuItemCE = function(opt, action) {
            var index = _.findIndex($scope.produs.SKUList, opt);
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                template: $('#skuDialog').html(),
                controller: 'skuCtrl',
                resolve: {
                    produm: function() {
                        return {
                            data: opt,
                            action: action
                        }
                    }
                }
            });

            function skuPLSum(ntindex) {
                $scope.produs.SKUList[ntindex].Price = 0;
                _.each($scope.produs.SKUList[ntindex].PriceList, function(v, i) {
                    $scope.produs.SKUList[ntindex].Price += parseFloat(v.Amount, 10);
                });

                $scope.produs.Price = _.min($scope.produs.SKUList, function(item) {
                    if (item.Price != 0) {
                        return item.Price;
                    }
                }).Price || 0;
            }

            modalInstance.result.then(function(skuitem) {

                $scope.produs.SKUList[index] = skuitem;
                skuPLSum(index);

            }, function(oridata) {
                $scope.produs.SKUList[index] = oridata;
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.disablePub = function() {
            if (_.isEmpty($scope.produs.SKUList)) {
                return ($scope.mainForm.$invalid || $scope.mainForm.$pristine) || parseFloat($scope.produs.Price, 10) <= 0 || parseInt($scope.produs.Num, 10) <= 0;
            } else {
                return !_.every($scope.produs.SKUList, function(skuItem) {
                    return parseInt(skuItem.Num, 10) > 0 && parseInt(skuItem.Price, 10) > 0;
                });
            }
        };
        // 选择图片
        $scope.imgSelect = function(pic) {
            var picIndex = _.findIndex($scope.produs.PictureList, pic);
            $scope.produs.PictureList[picIndex]["IsMainPic"] = true;
            _.each($scope.produs.PictureList, function(v, i) {
                if (i != picIndex) {
                    v.IsMainPic = false;
                }
            });
        };
        // 是否为主图
        $scope.isMainPic = function(pic) {
            return pic.IsMainPic == true ? "select" : "";
        };
        // 是否有外部链接
        $scope.isOuterProduct = function() {
            return $scope.produs.IsOuterProduct ? true : false;
        };

        function npic() {
            this.IconID = ""; // 图片id上传后
            this.IsMainPic = false; // 需要选
            this.Status = 1; // 默认不动
            return this;
        };
        // 上传商品图片
        var opt = {
            upload: jQuery.fn.fileupload,
            container: jQuery('#fileupload'),
            url: ImgSingleUploadUrl,
            callback: function(temp) {
                pic = new npic();
                pic.IconID = temp.id;
                pic.Url = temp.url;
                $scope.$apply(function() {
                    $scope.produs.PictureList.push(pic);
                    $timeout(function() {
                        $(".imgLiquidFill").imgLiquid({
                            fill: true
                        });
                    }, 1000);
                });
            }
        }
        UI.fileUpload(opt);
        $scope.produs.CategoryI = '';
        $scope.produs.CategoryN = '请选择';

        list.then(function(data) {
            UI.genSelect({
                list: data.data,
                container: $("#catelist"),
                callback: function() {
                    $scope.$apply(function() {
                        var slast = $("select:last", $("#catelist"));
                        var sv = slast.val(),
                            sn;
                        var getOt = function(pa, opv) {
                            $('option', pa).each(function(i, v) {
                                if (opv == $(v).val()) {
                                    sn = $(v).text();
                                }
                            });
                        }
                        getOt(slast, sv);

                        if (sv == '') {
                            sv = slast.prev('select').val();
                            getOt(slast.prev('select'), sv);
                        }

                        $("#CategoryI").val(sv);
                        $("#CategoryN").val(sn);
                    });

                }
            });
        });

        $scope.pub = function() {
            var sdata = _.cloneDeep($scope.produs);
            sdata = _.omit(sdata, ['CategoryI', 'CategoryN']);            

            var opt = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/Product/PublishProduct',
                "contentType": "application/json",
                "dataify": true,
                "data": sdata
            };

            UT.jaxJson(opt, true).then(function(data) {
                if (data.Success == true) {
                    // 发布成功后提示成功，并进行跳转
                    UI.inTip(data.Msg).then(function() {
                        location.href = ucConfig.ServerReferenceJavaScript + 'product/productlist';
                    });
                } else {
                    // 发布失败，给出错误提示，保持页面
                    UI.inTip(data.Msg);
                }

            });
        };

        $timeout(function() {
            $(".imgLiquidFill").imgLiquid({
                fill: true
            });
        }, 500);


    });
    yob.directive('category', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                scope.$watch(function() {
                    return elm.val();
                }, function(viewValue, o) {

                    if (viewValue != '' && viewValue != undefined) {
                        ctrl.$setValidity('category', true);
                        ctrl.$setDirty('category', true);
                        ctrl.$setViewValue(viewValue)
                        scope.produs.CategoryID = scope.produs.CategoryI;
                        scope.produs.CategoryName = scope.produs.CategoryN;

                        return viewValue;
                    } else {
                        ctrl.$setValidity('category', false);
                        ctrl.$setViewValue(viewValue)
                        scope.produs.CategoryID = scope.produs.CategoryI;
                        scope.produs.CategoryName = scope.produs.CategoryN;
                        return viewValue;
                    }

                })

            }
        };
    });
    yob.directive('catemust', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                scope.$watch(scope.CategoryI, function(n) {
                    ctrl.$setViewValue(n);
                });
                ctrl.$parsers.unshift(function(viewValue) {
                    // console.log(viewValue)
                    if (_.isNumber(parseInt(viewValue, 10)) && viewValue != 0) {
                        ctrl.$setValidity('catemust', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('catemust', false);
                        return undefined;
                    }
                });
            }
        };
    });
    yob.directive('gtZero', function() {
        // $scope.numPattern = /^((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue > 0) {
                        ctrl.$setValidity('gtzero', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('gtzero', false);
                        return undefined;
                    }
                });
            }
        };
    });
    // 更新总数量，根据规格项数量的变化
    yob.directive('calNum', function($parse) {
        return {
            require: ['ngModel'],
            link: function(scope, element, attrs, c) {
                scope.$watch(attrs.ngModel, function(newNum) {
                    if (!newNum) return;
                    var res = 0;
                    $(".skuNum").each(function(i, v) {
                        res += parseFloat($(v).val(), 10)
                    });

                    scope.produs.Num = res;
                });
            }
        }
    });
    yob.directive('integer', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$parsers.unshift(function(viewValue) {
                    if (/^\d+$/.test(viewValue) && viewValue > 0) {
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    });
    yob.directive('outLink', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var urlReg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

                ctrl.$parsers.unshift(function(viewValue) {                    
                    if (urlReg.test(viewValue)) {
                        ctrl.$setValidity('outlink', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('outlink', false);
                        return undefined;
                    }
                });
            }
        };
    });

    yob.directive('ueditor', function($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var id = 'ueditor_' + Date.now();
                element[0].id = id;
                var ue = UM.getEditor(id, {
                    initialFrameWidth: '100%',
                    initialFrameHeight: '200',
                    autoHeightEnabled: true
                });
                ue.ready(function() {
                    ue.addListener('contentChange', function() {
                        ctrl.$setViewValue(ue.getContent());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                });
            }
        };
    });


})();
