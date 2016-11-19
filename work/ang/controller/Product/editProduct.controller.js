/* 
 * @Author: Allen
 * @Date:   2016-03-21 10:52:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-10-10 15:51:54
 */
yob.controller('MainController', ["$scope", "$injector", "$ocLazyLoad", "$timeout", "$q", "product", "list", "genOpt", "pbFunc", "Province", "accessType", "cateSel", "recuringType", function($scope, $injector, $ocLazyLoad, $timeout, $q, product, list, genOpt, pbFunc, Province, accessType, cateSel, recuringType) {
    // 产品数据，访问类型，省区，循环类型
    $q.all([product, accessType, Province, recuringType, list]).then(function(res) {
        var data = res[0].data;
        console.log(data)
        // 类别
        var cateList = res[4].data;      

        $scope.cates = pbFunc.getCateList(cateList, data.Data.CategoryID);

        // 访问类型
        $scope.accessT = res[1].data.Data;
        // 图片地址
        _.each(data.Data.PictureList, function(v, i) {
            v.Url = imgUrl + v.IconID;
        });
        $scope.produs = data.Data;

        var recuringType = res[3].data.Data;
        // 生成 Properties
        _.each($scope.produs.SKUList, function(v) {
            var parr = [],
                arr = [];
            if(!_.isEmpty(v.PropertiesName)){
                v.Properties = [];
                parr = v.PropertiesName.split(',');
                _.each(parr, function(s) {
                    v.Properties.push(s.split(":"))
                });                
            }
            _.each(v.PriceList, function(pitem) {
                pitem.TypeName = pitem.CSRecuringTypeID == 0 ? "无" : _.find(recuringType, {
                    ID: pitem.CSRecuringTypeID
                }).TypeName
            });
        });
        $scope.status = function(id) {
            if($scope.produs.Status == id){
                return "status-current";
            }
        };
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
            pbFunc.delOpt($scope.produs.OptionList, action, index);
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

        // 上传商品图片, 选择图片
        $scope.imgSelect = function(pic) {
            pbFunc.imgSelect($scope.produs.PictureList, pic);
        };
        // 是否为主图
        $scope.isMainPic = function(pic) {
            return pic.IsMainPic == true ? "select" : "";
        };

        // 是否有外部链接
        $scope.isOuterProduct = function() {
            return $scope.produs.IsOuterProduct ? true : false;
        };
        pbFunc.picUpload($scope, $scope.produs.PictureList);
        $scope.uploadFlag = function() {
            if ($scope.produs.PictureList.length < 1) {
                return true;
            }
        };

        $(".fileupload-btn").click(function(e) {

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

        $scope.Province = res[2].data.Data;

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
        // 重写区域
        _.each($scope.produs.AreaList, function(area) {
            area.Regions = /156(\d{3})(\d{2})(\d{1})000000/.exec(area.AdministrativeRegionID);
            _.each(area.Regions, function(id, i) {
                switch (i) {
                    case 1:
                        area.ProvinceID = '156' + area.Regions[1] + '000000000';
                        break;
                    case 2:
                        area.CityID = '156' + area.Regions[1] + area.Regions[2] + '0000000';
                        break;
                    case 3:
                        area.AreaID = '156' + area.Regions[1] + area.Regions[2] + area.Regions[3] + '000000';
                        break;
                }
            })
            $q.all([pbFunc.getCity(area.ProvinceID), pbFunc.getArea(area.CityID)]).then(function(res) {
                var citys = res[0].data.Data;
                var areas = res[1].data.Data;

                var opt = {};

                opt.ProvinceName = _.find($scope.Province, {
                    ID: parseInt(area.ProvinceID, 10)
                }) ? _.find($scope.Province, {
                    ID: parseInt(area.ProvinceID, 10)
                }).Name : '';
                opt.ProvinceID = parseInt(area.ProvinceID, 10);

                opt.CityName = _.find(citys, {
                    ID: parseInt(area.CityID, 10)
                }) ? _.find(citys, {
                    ID: parseInt(area.CityID, 10)
                }).Name : '';
                opt.CityID = parseInt(area.CityID, 10);

                opt.AreaName = _.find(areas, {
                    ID: parseInt(area.AreaID, 10)
                }) ? _.find(areas, {
                    ID: parseInt(area.AreaID, 10)
                }).Name : '';
                opt.AreaID = parseInt(area.AreaID, 10);


                $scope.regList.push(new regArea(opt));
            });

        });


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

        $scope.addRegion = function() {

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
            var index = _.findWhere($scope.regList, reg);
            $scope.regList.splice(index, 1);
            $scope.produs.AreaList = _.map($scope.regList, function(item) {
                return _.pick(item, ["AdministrativeRegionID", "Status"]);
            });

        };

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
                    // 发布成功后提示成功，并进行跳转
                    UI.inTip(data.Message).then(function() {
                        $scope.produs.Status = 1;
                        location.href = ucConfig.ServerReferenceJavaScript + '/product/productlist';
                    });
                } else {
                    // 发布失败，给出错误提示，保持页面
                    UI.inTip(data.Message);
                }

            })
        };
        $scope.pubSave = function() {
            var sdata = _.cloneDeep($scope.produs);
            var opt = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                // editproduct
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
