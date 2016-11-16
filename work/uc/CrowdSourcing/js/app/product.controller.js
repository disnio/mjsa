angular.module('yoB').controller('optCtrl', ["$scope", "$uibModalInstance", "$q", "produm", function($scope, $uibModalInstance, $q, produm) {
    $scope.OptionList = _.cloneDeep(produm.data);
    var index = produm.index;
    var optflag = produm.optflag;

    var whichOpt = [{
        title: "属性添加",
        name: "属性名",
        value: "属性值"
    }, {
        title: "规格添加",
        name: "规格名",
        value: "规格值"
    }];
    var opt;
    $scope.whichOp = whichOpt[optflag];
    // CSOptionTypeID 1:文本 2：下拉选项
    if (produm.action == 0) {
        opt = {
            OptionName: "",
            CSOptionTypeID: 1,
            OptionValueList: [],
            IsSKU: produm.optflag == 1 ? true : false,
            Status: 1
        };
    } else {
        opt = {
            OptionName: $scope.OptionList[index].OptionName,
            CSOptionTypeID: 1,
            OptionValueList: $scope.OptionList[index].OptionValueList,
            IsSKU: $scope.OptionList[index].IsSKU,
            Status: 1
        };
    }

    $scope.canAdd = function() {
        
        return $scope.optForm.$invalid || $scope.opt.OptionValueList.length >= 10;
        
    };

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
        // && (_.isNumber(v) && !!v > 0

        if ($scope.optV.OptionValueName != '') {
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
}]);
angular.module('yoB').controller('skuCtrl', ["$scope", "$uibModalInstance", "$q", "produm", "recuringType", function($scope, $uibModalInstance, $q, produm, recuringType) {
    $q.all([recuringType]).then(function(res) {
        // 循环类型
        if (res[0].data.Success == true) {
            _.each(res[0].data.Data, function(v, i) {                
                v.CSRecuringTypeID = v.ID;
            });
            $scope.recuringType = res[0].data.Data;
        } else {
            UI.inTip(res[0].data.Msg);
            return;
        }
        $scope.skuitem = _.cloneDeep(produm.data);

        var act = produm.action;
        var priceItem = {
            Amount: 0,
            AmountName: "",
            IsRecuring: false,
            CSRecuringTypeID: 0,
            TypeName: '',
            Status: 1


        };
        $scope.priceItem = _.cloneDeep(priceItem);

        $scope.canAddPriceItem = function() {
            return skuForm.Amount.$pristine || ($scope.priceItem.IsRecuring && parseInt($scope.priceItem.CSRecuringTypeID) === 0)
        };

        $scope.addPriceItem = function() {
            if (!_.isEmpty($scope.priceItem.AmountName) && !_.isEmpty($scope.priceItem.Amount)) {
                var csrid = _.find($scope.recuringType, {
                    CSRecuringTypeID: parseInt($scope.priceItem.CSRecuringTypeID)
                });
                $scope.priceItem.TypeName = csrid ? csrid.TypeName : "";

                var item = _.cloneDeep($scope.priceItem);

                $scope.skuitem.PriceList.push(item);
                $scope.priceItem = _.cloneDeep(priceItem);
                $scope.skuForm.AmountName.$dirty = false;
                $scope.skuForm.Amount.$dirty = false;
                priceItem.IsRecuring = false;

            } else {
                $scope.skuForm.AmountName.$dirty = true;
                $scope.skuForm.Amount.$dirty = true;
            }
        };

        $scope.hasRecuring = function() {
            return !!$scope.priceItem.IsRecuring;
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
        var hasEdit = 0;
        $scope.skuItemIsEdit = function(pl) {

            if (skuItemEditIndex == -1) {
                return false;
            } else {
                hasEdit = 1;
                return _.isEqual($scope.skuitem.PriceList[skuItemEditIndex], pl);
            }
        };

        $scope.editPriceListItem = function(e, index) {
            e.preventDefault();
            skuItemEditIndex = index;
            $scope.editItem = {
                eAmount: $scope.skuitem.PriceList[index].Amount,
                eAmountName: $scope.skuitem.PriceList[index].AmountName,
                eIsRecuring: $scope.skuitem.PriceList[index].IsRecuring,
                eCSRecuringTypeID: $scope.skuitem.PriceList[index].CSRecuringTypeID,
                eTypeName: $scope.skuitem.PriceList[index].TypeName
            };
        };

        $scope.canSavePriceListItem = function() {
            return $scope.skuForm.eAmount.$invalid
        };

        $scope.savePriceListItem = function(e, index) {
            e.preventDefault();
            var item = {
                Amount: $scope.editItem.eAmount,
                AmountName: $scope.editItem.eAmountName,
                IsRecuring: $scope.editItem.eIsRecuring,
                CSRecuringTypeID: $scope.editItem.eCSRecuringTypeID,
                TypeName: _.find($scope.recuringType, {
                    CSRecuringTypeID: parseInt($scope.editItem.eCSRecuringTypeID, 10)
                }).TypeName
            };
            if (!$scope.canSavePriceListItem()) {
                $scope.skuitem.PriceList[index] = _.cloneDeep(item);
                skuItemEditIndex = -1;
            }
        };

        $scope.ok = function() {
            $uibModalInstance.close(_.cloneDeep($scope.skuitem));
        };


        $scope.canOkSku = function() {
            return $scope.skuitem.PriceList.length > 0 && $scope.skuForm.$dirty && !_.isEqual(produm.data, $scope.skuitem) && hasEdit == 0;
        };

        $scope.canModifySku = function() {
            return !_.isEqual(produm.data, $scope.skuitem) && 　hasEdit > 0;
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss(produm.data);
        };
    });
}]);
