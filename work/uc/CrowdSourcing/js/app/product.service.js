// 编辑的商品
yob.factory('product', function($http) {
    var id = _.last(location.pathname.split('/'));
    var opt = {
        url: ucConfig.ServerReferenceJavaScript + '/product/ProductDetailInfo/' + id,
        method: "get"
    };
    return $http(opt);
});
// 类别
yob.factory('list', function($http) {
    var opt = {
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/categorylistforpublishproduct'
    };
    return $http.get(opt.webUrl + opt.name);
});
// 生成 skulist
yob.factory('genOpt', function() {
    return {
        genOpt: function(list) {

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
    }
});
// 属性显示类型（文本，下拉框等）
yob.factory('optionType', function() {
    // 这个目前都默认为 文本类型，不需要选择 , optionType
    return {
        "Data": [{
            "CSOptionTypeID": 1,
            "TypeName": "文本"
        }, {
            "CSOptionTypeID": 2,
            "TypeName": "下拉选项"
        }]
    }
});
// 循环单位
yob.factory('recuringType', function($http) {
    var opt = {
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/recuringtypelist '
    };
    return $http.get(opt.webUrl + opt.name);
});
// 购买人群
yob.factory('accessType', function($http) {
    var opt = {
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/accesstypelist  '
    };
    return $http.get(opt.webUrl + opt.name);
});

yob.factory('Province', function($http) {
    // 发货区域，省
    var getProvinceOpt = {
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/regionlist/' + 0,
    };
    return $http.get(getProvinceOpt.webUrl + getProvinceOpt.name);

});

// 公共服务对象，处理商品相关属性
yob.factory('pbFunc', function($timeout, $http, list, genOpt) {
    return {
        // 是否有属性或规格
        hasOpts: function(optList, flag) {
            var opt = 0;
            _.each(optList, function(v, i) {
                if (v.IsSKU == flag) {
                    opt += 1;
                }
            });
            return opt > 0;
        },
        // 动态改变规格项列表需要
        filterList: function(list, flag) {
            return _.filter(list, {
                IsSKU: flag
            });
        },
        // 生成 sku list
        genSkuList: function(optList) {
            skuList = [];
            var filterData = this.filterList(_.clone(optList), true);
            var listOpt = genOpt.genOpt(filterData) || [];
            _.each(listOpt, function(s, i) {
                var sku = {
                    Num: 0,
                    Name: '',
                    PropertiesName: '',
                    Properties: [],
                    PriceList: [],
                    Status: 1,
                    Price: 0
                };
                // sku.Name = skuname;
                sku.PropertiesName = _.map(_.pairs(s), function(v, i) {
                    return v.join(":")
                }).toString();

                sku.Properties = _.pairs(listOpt[i]);

                skuList.push(_.clone(sku));
            });
            return skuList;
        },
        // 属性删除
        delOpt: function(optList, action, index) {
            optList.splice(index, 1);
            if (action == 1) {
                this.genSkuList();
            }
        },
        // 选择图片
        imgSelect: function(picList, pic) {
            var picIndex = _.findIndex(picList, pic);
            picList[picIndex]["IsMainPic"] = true;
            _.each(picList, function(v, i) {
                if (i != picIndex) {
                    v.IsMainPic = false;
                }
            });
        },
        // 上传
        picUpload: function(scope, picList) {
            function npic() {
                this.IconID = ""; // 图片id上传后
                this.IsMainPic = false; // 需要选
                this.Status = 1; // 默认不动
                return this;
            };
            var opt = {
                upload: jQuery.fn.fileupload,
                container: jQuery('#fileupload'),
                url: ImgSingleUploadUrl,
                callback: function(temp) {
                    pic = new npic();
                    pic.IconID = temp.id;
                    pic.Url = temp.url;
                    scope.$apply(function() {
                        picList.push(pic);
                        $timeout(function() {
                            $(".imgLiquidFill").imgLiquid({
                                fill: true
                            });
                        }, 1000);
                    });
                }
            };
            UI.fileUpload(opt);
        },
        // 删除图片
        delPic: function(e, pic, picList) {
            var el = $(e.currentTarget);
            var pel = el.closest(".imgLiquidFill");

            var dindex = _.findIndex(picList, pic);
            picList.splice(dindex, 1);
            pel.remove();
        },
        getCity: function(id) {
            // 发货区域，省            
            var getCityOpt = {
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/product/regionlist/' + id,
            };
            return $http.get(getCityOpt.webUrl + getCityOpt.name);
        },
        getArea: function(id) {
            // 发货区域，省            
            var getAreaOpt = {
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/product/regionlist/' + id,
            };
            return $http.get(getAreaOpt.webUrl + getAreaOpt.name);
        },
        getCateList: function(cateList, id) {
            var curCate = _.find(cateList.Data, {ID: parseInt(id, 10)});
            var pid = _.isUndefined(curCate) ?  0 : curCate.ParentID;
            var getParent = function(id){
                return _.find(cateList.Data, {ID: parseInt(id, 10)});
            };
            var cateArr = [curCate];
            
            do{
                if(getParent(pid) != undefined){
                    cateArr.push(getParent(pid));
                    pid = getParent(pid).ParentID;                    
                }
            }while(pid !== 0 && getParent(pid) != undefined)

            return cateArr.reverse();

        }
    }


});

yob.factory('cateSel', function(){
    var sel = [];
    var setSel = function(arr){
        sel = arr;
    };

    var getSel = function(){
        return sel;
    };

    return {
        get: getSel,
        set: setSel
    }
})
