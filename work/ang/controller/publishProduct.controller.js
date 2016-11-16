/* 
 * @Author: Allen
 * @Date:   2016-03-21 10:52:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-09-27 18:45:16
 */

angular.module('yoB').controller('MainController', ["$scope", "$injector", "$ocLazyLoad", "$timeout", "$q", "list", "genOpt", "pbFunc", "Province", "accessType", "cateSel", function($scope, $injector, $ocLazyLoad, $timeout, $q, list, genOpt, pbFunc, Province, accessType, cateSel) {
    var vm = this;
    $q.all([list, Province, accessType]).then(function(res) {

        $scope.accessT = res[2].data.Data;

        $scope.produs = {
            AreaList: [],
            AccessType: 0,
            "Name": "",
            "Description": "",
            "ProductCode": "",
            "IsOuterProduct": false,
            "OuterUrl": "",
            "CategoryName": "",
            "CategoryID": "",
            "Price": 0,
            "OptionList": [],
            "PictureList": [],
            "SKUList": [],
            "Num": 0,
            "Status": 0,
            FullCategoryIDs: ''

        };
        // 商品分类
        $scope.cate = cateSel.get();
        $scope.noCate = function() {
            return _.size($scope.cate) <= 0;
        };
        $scope.produs.CategoryName = $scope.cate.length > 0 ? $scope.cate[$scope.cate.length - 1].Name : "";
        $scope.produs.CategoryID = $scope.cate.length > 0 ? $scope.cate[$scope.cate.length - 1].ID : "";
        $scope.produs.FullCategoryIDs = _.map($scope.cate, function(v) {
            return v.ID;
        }).join(",");

        $scope.status = function(id) {
            if ($scope.produs.Status == id) {
                return "status-current";
            }
        };
        // 生成规格的属性名
        $scope.produs.SKUList = pbFunc.genSkuList($scope.produs.OptionList);

        // 属性数量判断，显示列表
        $scope.hasOpts = function() {
            return pbFunc.hasOpts($scope.produs.OptionList, false);
        };
        $scope.hasSkus = function() {
            return pbFunc.hasOpts($scope.produs.OptionList, true);
        };
        $scope.hasSkuList = function() {
            return !!$scope.produs.SKUList.length > 0
        };

        // 属性添加
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
            $ocLazyLoad.load([
                ucConfig.ServerReferenceJavaScript + "/Scripts/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                ucConfig.ServerReferenceJavaScript + "/Scripts/js/app/product.controller.js"
            ]).then(function() {
                var $uibModal = $injector.get("$uibModal");

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: ucConfig.ServerReferenceJavaScript + "/Scripts/tpl/productPsOpt.html",
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
                        $scope.produs.SKUList = pbFunc.genSkuList($scope.produs.OptionList);
                    }
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                    if (optflag == 1) {
                        $scope.produs.SKUList = pbFunc.genSkuList($scope.produs.OptionList);
                    }

                });
            })

        };
        // 属性删除
        $scope.delOpt = function(action, index) {
            UI.genSingleModal({
                btnClose: true,
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确定",
                title: "提示",
                body: $('<p>确定要删除该项吗？</p>'),
                close: function(modal) {
                    return false;
                },
                save: function(modal) {
                    $scope.$apply(function() {
                        pbFunc.delOpt($scope.produs.OptionList, action, index);
                    });
                }
            })
        };

        // 添加价格项明细
        $scope.skuItemCE = function(opt, action) {
            var index = _.findIndex($scope.produs.SKUList, opt);

            $ocLazyLoad.load([
                ucConfig.ServerReferenceJavaScript + "/Scripts/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                ucConfig.ServerReferenceJavaScript + "/Scripts/js/app/product.controller.js"
            ]).then(function() {
                var $uibModal = $injector.get("$uibModal");
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: ucConfig.ServerReferenceJavaScript + "/Scripts/tpl/productPsSku.html",
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
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        // 是否有外部链接
        $scope.isOuterProduct = function() {
            return $scope.produs.IsOuterProduct ? true : false;
        };

        // 上传商品图片, 选择图片
        $scope.imgSelect = function(pic) {
            pbFunc.imgSelect($scope.produs.PictureList, pic);
        };
        // 是否为主图
        $scope.isMainPic = function(pic) {
            return pic.IsMainPic == true ? "select" : "";
        };

        pbFunc.picUpload($scope, $scope.produs.PictureList);

        $scope.uploadFlag = function() {
            if ($scope.produs.PictureList.length < 1) {
                return true;
            }
        };
        $(".fileupload-btn").unbind("click").click(function(e) {
            // 限制文件上传个数为5
            var picLen = $scope.produs.PictureList.length;

            if (picLen < 5) {
                $("#fileupload").trigger("click");
            } else {
                UI.inTip("最多可有5张图片");
            }

        });
        // 逻辑删除图片
        $scope.delPic = function(e, pic) {
            pbFunc.delPic(e, pic, $scope.produs.PictureList);
        };


        // 开始时间
        $scope.timeRadio = 0;
        $scope.produs.startTime = moment().format("YYYY-MM-DD");
        $scope.$watch('timeRadio', function(val) {
            if (val === 0) {
                $scope.produs.startTime = moment().format("YYYY-MM-DD");
            }
        });
        $scope.showStartTime = function() {
            return $scope.timeRadio == 1;
        };
        // 发货区域

        $scope.Province = res[1].data.Data;
        $scope.ProvinceID = 0;
        $scope.hasProvinceID = function() {
            return $scope.ProvinceID !== 0;
        };
        $scope.CityID = 0;
        $scope.changeProvince = function(e) {
            pbFunc.getCity($scope.ProvinceID).then(function(data) {
                $scope.City = data.data.Data;
            })
        };
        $scope.hasCityID = function() {
            return $scope.CityID !== 0;
        };
        $scope.AreaID = 0;
        $scope.changeCity = function(e) {
            pbFunc.getArea($scope.CityID).then(function(data) {
                $scope.Areas = data.data.Data;
            })
        };

        $scope.regList = [];

        $scope.addRegion = function() {

            function regArea(val) {
                this.Status = 1;
                this.AdministrativeRegionID = val.AdministrativeRegionID;
                this.ProvinceID = val.ProvinceID;
                this.CityID = val.CityID || 0;
                this.AreaID = val.AreaID || 0;
                this.ProvinceName = val.ProvinceName || '';
                this.CityName = val.CityName || '';
                this.AreaName = val.AreaName || '';
                return this;
            }

            var opt = {};
            opt.AreaName = _.find($scope.Areas, {
                ID: $scope.AreaID
            }) ? _.find($scope.Areas, {
                ID: $scope.AreaID
            }).Name : '';

            opt.CityName = _.find($scope.City, {
                ID: $scope.CityID
            }) ? _.find($scope.City, {
                ID: $scope.CityID
            }).Name : '';

            opt.ProvinceName = _.find($scope.Province, {
                ID: $scope.ProvinceID
            }) ? _.find($scope.Province, {
                ID: $scope.ProvinceID
            }).Name : '';
            opt.AreaID = $scope.AreaID;
            opt.CityID = $scope.CityID;
            opt.ProvinceID = $scope.ProvinceID;

            if ($scope.AreaID != 0) {
                opt.AdministrativeRegionID = $scope.AreaID;
            } else if ($scope.CityID != 0) {
                opt.AdministrativeRegionID = $scope.CityID;
            } else if ($scope.ProvinceID != 0) {
                opt.AdministrativeRegionID = $scope.ProvinceID;
            }
            if (opt.AdministrativeRegionID != undefined) {
                $scope.regList.push(new regArea(opt));
                $scope.ProvinceID = 0;
                $scope.CityID = 0;
                $scope.AreaID = 0;
                opt = {};
            }

            $scope.produs.AreaList = _.map($scope.regList, function(item) {
                return _.pick(item, ["AdministrativeRegionID", "Status"]);
            });
        };


        $scope.delRegion = function(reg) {
            var index = _.findIndex($scope.regList, reg);
            
            $scope.regList.splice(index, 1);
            $scope.produs.AreaList = _.map($scope.regList, function(item) {
                return _.pick(item, ["AdministrativeRegionID", "Status"]);
            });

        };

        // 发布按钮
        $scope.disablePub = function() {
            if ($scope.produs.PictureList.length < 1) {
                return true;
            }

            if (_.isEmpty($scope.produs.SKUList)) {
                return ($scope.mainForm.$invalid || $scope.mainForm.$pristine) || parseFloat($scope.produs.Price, 10) <= 0 || parseInt($scope.produs.Num, 10) <= 0;
            } else {
                return !_.every($scope.produs.SKUList, function(skuItem) {
                    return parseInt(skuItem.Num, 10) >= 0 && parseInt(skuItem.Price, 10) >= 0;
                });
            }
        };

        // 发布
        $scope.pub = function() {
            var sdata = _.cloneDeep($scope.produs);

            var opt = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/product/publishproduct ',
                "contentType": "application/json",
                "dataify": true,
                "data": sdata
            };

            UT.jaxJson(opt, true).then(function(data) {
                if (data.Success == true) {
                    // 发布成功后提示，并标示状态为等待审核
                    UI.inTip(data.Message).then(function() {
                        $scope.produs.Status = 1;
                        location.href = ucConfig.ServerReferenceJavaScript + '/product/productlist';
                    });
                } else {
                    // 发布失败，给出错误提示，保持页面
                    UI.inTip(data.Message);
                }

            });
        };

        $scope.pubSave = function() {
            var sdata = _.cloneDeep($scope.produs);
            var opt = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/product/saveproduct ',
                "contentType": "application/json",
                "dataify": true,
                "data": sdata
            };

            UT.jaxJson(opt, true).then(function(data) {
                if (data.Success == true) {
                    // 发布成功后提示成功，并进行跳转
                    UI.inTip(data.Message).then(function() {
                        location.href = ucConfig.ServerReferenceJavaScript + '/product/productlist';
                    });
                } else {
                    // 发布失败，给出错误提示，保持页面
                    UI.inTip(data.Message);
                }

            });
        };

        $timeout(function() {
            $(".imgLiquidFill").imgLiquid({
                fill: true
            });
        }, 500);
    });
}]);

