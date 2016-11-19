/* 
 * @Author: Allen
 * @Date:   2016-07-13 16:33:12
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-10-21 10:42:48
 */
yob.controller('MainController', function($scope, $http, $q, $uibModal, $timeout, $uibModal, shoppingCardBuyList, addressList) {
    var vm = this;
    $q.all([shoppingCardBuyList, addressList]).then(function(res) {
        vm.scl = res[0].Data;
        vm.adl = res[1].data.Data;

        // console.log(vm.adl)

        var sendIndex = -1;
        _.each(vm.adl, function(v, i) {
            v.sendAddress = false;
            if (v.IsDefault == true) {
                v.sendAddress = true;
                sendIndex = i;
            }
        });
        vm.sendAddress = _.find(vm.adl, {
            sendAddress: true
        });
        // 更改配送地址 
        vm.changeSend = function(ad) {
            vm.adl[sendIndex].sendAddress = false;
            sendIndex = _.findIndex(vm.adl, ad);
            vm.sendAddress = vm.adl[sendIndex];
        };
        // 修改地址
        vm.addressUp = function (ad) {
            location.href = ucConfig.ServerReferenceJavaScript + "/Address/Index?id=" + vm.sendAddress.ID + "&backurl=";
            // 更改修改地址由弹出层修改改为跳转到地址管理页修改
            //var modalInstance = $uibModal.open({
            //    animation: true,
            //    templateUrl: ucConfig.ServerReferenceJavaScript + "/Scripts/tpl/addressUp.html",
            //    controller: 'addressCtrl',
            //    controllerAs: 'vm',
            //    resolve: {
            //        address: function() {
            //            return {
            //                data: vm.sendAddress
            //            }
            //        }
            //    }
            //});

            //modalInstance.result.then(function(sendAddress) {
            //    vm.sendAddress = sendAddress;
            //}, function(address) {
            //    console.log('Modal dismissed at: ' + new Date());
            //    vm.sendAddress = address;
            //});
        };

        vm.scart = {};
        vm.TotalPrice = 0;
        vm.TotalNum = 0;
        _.each(vm.scl, function(v) {
            v.Pic = imgUrl + v.IconID;
            v.Checked = false;
            v.productUrl = ucConfig.ServerReferenceCrowdSourcing + '/productlist/productdetail/' + v.CSProductID;
            v.Requirement = '';
            vm.TotalPrice += parseInt(v.TotalAmount, 10);
            vm.TotalNum += parseInt(v.Num, 10);
        })

        function genScl(data) {
            return _.map(_.groupBy(data, function(item) {
                return item.CSShopID
            }), function(v, k) {
                return v
            });
        }
        vm.groupScl = genScl(vm.scl);
        vm.msgBoard = function(cart) {
            var modalInstance = $uibModal.open({
                animation: true,
                template: $('#msgDialog').html(),
                controller: 'msgCtrl',
                controllerAs: 'msg',
                resolve: {
                    Requirement: function() {
                        return {
                            data: cart.Requirement
                        }
                    }
                }
            });
            modalInstance.result.then(function(req) {
                cart.Requirement = req;
            }, function(data) {
                console.log("cancle", data)
            });
        };
        vm.canBuy = function(){
            return _.isEmpty(vm.scl);
        };
        // 提交
        vm.createOrder = function() {
            var ids = [];
            _.each(vm.groupScl, function(shop) {
                var items = [];
                _.each(shop, function(cart) {
                    items.push({
                        CSShoppingCardItemID: cart.ShoppingCardItemID,
                        Requirement: cart.Requirement
                    });
                });
                ids.push({
                    ShopID: shop[0].CSShopID,
                    items: items,
                    // vm.sendAddress.Address + vm.RegionAddress + vm.sendAddress.ReceiverName + vm.sendAddress.ReceiverContact
                    addressID: vm.sendAddress.ID
                });
            });
            var opt = {
                type: "get",
                webUrl: ucConfig.ServerReferenceCrowdSourcing,
                name: '/ServiceProvider/CreateOrder',
                contentType: "application/json",
                dataType: "json",
                data: {
                    shopProducts: JSON.stringify(ids)
                }
            };

            UT.jaxJson(opt, true).then(function(data) {
                if (data.Success) {
                    UI.inTip(data.Message)
                    location.href = ucConfig.ServerReferenceJavaScript + '/EmployerOrder/EmployerOrderList';
                } else {
                    UI.inTip(data.Message);
                }
            });
        };

    });

});

yob.controller('msgCtrl', function($scope, $uibModalInstance, Requirement) {
    var msg = this;
    msg.Requirement = Requirement.data || "";
    msg.maxL = function(){
        if( _.size(msg.Requirement)>=200 ){
            msg.Requirement = msg.Requirement.slice(0, 200);
            return true;
        }else{
            return false;
        }
    };

    msg.ok = function() {
        $uibModalInstance.close(_.cloneDeep(msg.Requirement));
    };

    msg.cancel = function() {
        $uibModalInstance.dismiss(_.cloneDeep(msg.Requirement));
    };

    return msg;

});