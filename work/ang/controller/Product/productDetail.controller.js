/* 
 * @Author: Allen
 * @Date:   2016-03-21 10:52:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-09-28 14:26:16
 */
yob.controller('MainController', function($scope, $timeout, $q, product, list, genOpt, pbFunc, Province, accessType, cateSel, recuringType) {

    $q.all([product, accessType, Province, recuringType, list]).then(function(res) {
        var data = res[0].data;
        console.log(data)

        var cateList = res[4].data;
        // 类别
        $scope.cates = pbFunc.getCateList(cateList, data.Data.CategoryID);
            // 图片地址
        _.each(data.Data.PictureList, function(v, i) {
            v.Url = imgUrl + v.IconID;
        });
        $scope.produs = data.Data;

        $scope.status = function(id) {
            if($scope.produs.Status == id){
                return "status-current";
            }
        };
        // 访问类型
        var accessT = res[1].data.Data;
        $scope.accessType = _.find(accessT, {
            ID: parseInt($scope.produs.AccessType, 10)
        }).AccessName;

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
            // return $scope.produs.IsOuterProduct ? true : false;
            return $.trim($scope.produs.OuterUrl)=="" ? false : true;
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

        $timeout(function() {
            $(".imgLiquidFill").imgLiquid({
                fill: true
            });
        }, 500);

    });
});
