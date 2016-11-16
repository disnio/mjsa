/* 
 * @Author: Allen
 * @Date:   2016-07-13 16:33:12
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-11 15:32:20
 */
yob.controller('MainController', function($scope, $http, $q, $timeout, shoppingCardList) {
    var vm = this;
    vm.foo = "bar";
    $q.all([shoppingCardList]).then(function(res) {

        vm.scl = res[0].Data;
        vm.scart = {};
        vm.TotalPrice = 0;
        vm.TotalNum = 0;

        vm.AllChecked = false;
        _.each(vm.scl, function(v) {
            v.Pic = imgUrl + v.IconID;
            v.Checked = false;
            v.productUrl = ucConfig.ServerReferenceCrowdSourcing + '/productlist/productdetail/' + v.CSProductID;
            // vm.TotalPrice += parseInt(v.TotalAmount, 10);
            // vm.TotalNum += parseInt(v.Num, 10);
        })

        function changeSel() {
            vm.TotalPrice = 0;
            vm.TotalNum = 0;

            _.each(vm.groupScl, function(shop) {
                _.each(shop, function(v) {
                    if (v.Checked) {
                        vm.TotalPrice += parseInt(v.TotalAmount, 10);
                        vm.TotalNum += parseInt(v.Num, 10);
                    }
                });

            });
        }

        function genScl(data) {
            return _.map(_.groupBy(data, function(item) {
                return item.CSShopID
            }), function(v, k) {
                return v
            });
        }
        vm.groupScl = genScl(vm.scl);

        function countPro(p) {
            return _.reduce(vm.groupScl, function(total, v) {
                return total + _.reduce(v, function(it, item) {
                    return (it + parseInt(item[p], 10));
                }, 0)
            }, 0);
        }

        vm.changeNum = function(e, cart) {
            var n = parseInt($(e.currentTarget).val(), 10);

            if (n > 0) {
                cart.Num = n;
                cart.TotalAmount = (cart.Num * cart.ProPrice).toFixed(2);

                var ec = $(e.currentTarget);
                ec.closest("li").find(".check").prop("checked", true)
                cart.Checked = true;
                changeSel()

            } else {
                $(e.currentTarget).val(cart.Num)
            }
        };

        vm.selShop = function(e, shopCart) {
            var flag = $(e.currentTarget).prop("checked");
            _.each(shopCart, function(v) {
                v.Checked = flag;
            })
            changeSel()
        };

        vm.selCart = function(e, cart) {
            var flag = $(e.currentTarget).prop("checked");
            cart.Checked = flag;
            changeSel()

        };

        vm.selAll = function(e) {
            var flag = $(e.currentTarget).prop("checked");
            _.each(vm.groupScl, function(shop) {
                _.each(shop, function(cart) {
                    cart.Checked = flag;
                })
            })

            vm.AllChecked = flag;

            changeSel()
        };

        vm.checkedShop = function(shopCart) {
            return _.every(shopCart, function(cart) {
                return cart.Checked === true;
            });
        };

        vm.calNum = function(e, cart, flag) {
            var tempNum;
            if (flag === '-') {
                tempNum = cart.Num >= 2 ? cart.Num - 1 : 1;
            } else if (flag === '+') {
                // 应做库存限制
                tempNum = cart.Num + 1;
            }

            var opt = {
                type: "get",
                baseUrl: ucConfig.ServerReferenceCrowdSourcingAPI,
                name: '/ShoppingCard/UpdateShoppingCard',
                contentType: "application/json",
                dataType: "jsonp",
                data: {
                    ShoppingCardItemID: cart.ShoppingCardItemID,
                    Num: tempNum
                }
            };

            UT.jaxJson(opt).then(function(data) {
                if (data.Success) {
                    $scope.$apply(function() {
                        cart.Num = tempNum;
                        cart.TotalAmount = (cart.Num * cart.ProPrice).toFixed(2);
                        cart.Checked = true;
                        vm.TotalPrice = countPro('TotalAmount');
                        vm.TotalNum = countPro('Num');
                        var ec = $(e.currentTarget);
                        ec.closest("li").find(".check").prop("checked", true)
                    });

                } else {
                    UI.inTip(data.Msg);
                }
            });
        };

        vm.delCart = function(e, shopCart, cart) {
            e.preventDefault(shopCart);
            UI.genSingleModal({
                btnClose: true,
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确认",
                title: "确认要删除吗？",
                // close: function(){},
                save: function(modal) {
                    var ids = [];
                    ids.push(cart.ShoppingCardItemID);

                    var opt = {
                        type: "get",
                        baseUrl: ucConfig.ServerReferenceCrowdSourcingAPI,
                        name: '/ShoppingCard/RemoveFromShoppingCard',
                        contentType: "application/json",
                        dataType: "jsonp",
                        data: {
                            ShoppingCardItemIDs: ids
                        }
                    };

                    UT.jaxJson(opt).then(function(data) {
                        if (data.Success) {
                            UI.inTip(data.Msg).then(function() {
                                $scope.$apply(function() {
                                    _.remove(vm.scl, function(cart) {
                                        return _.includes(ids, cart.ShoppingCardItemID)
                                    });
                                    vm.groupScl = genScl(vm.scl);
                                    changeSel()
                                });
                            });

                        } else {
                            UI.inTip(data.Msg);
                        }
                    });
                },
                callback: function(modal) {}
            });


        };
        vm.delCarts = function() {
            UI.genSingleModal({
                btnClose: true,
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确认",
                title: "确认要删除吗？",
                // close: function(){},
                save: function(modal) {
                    var ids = [];
                    _.each(vm.groupScl, function(shop) {
                        _.each(shop, function(cart) {
                            if (cart.Checked == true) {
                                ids.push(cart.ShoppingCardItemID);
                            }
                        })
                    });
                    if (_.isEmpty(ids)) {
                        return false;
                    }

                    var opt = {
                        type: "get",
                        baseUrl: ucConfig.ServerReferenceCrowdSourcingAPI,
                        name: '/ShoppingCard/RemoveFromShoppingCard',
                        contentType: "application/json",
                        dataType: "jsonp",
                        data: {
                            ShoppingCardItemIDs: ids
                        }
                    };

                    UT.jaxJson(opt).then(function(data) {
                        if (data.Success) {
                            UI.inTip(data.Msg).then(function() {
                                $scope.$apply(function() {
                                    _.remove(vm.scl, function(cart) {
                                        return _.includes(ids, cart.ShoppingCardItemID)
                                    });
                                    vm.groupScl = genScl(vm.scl);
                                    changeSel()
                                });
                            });

                        } else {
                            UI.inTip(data.Msg);
                        }
                    });
                },
                callback: function(modal) {}
            });
        };
        // 选中至少1件商品才可点击结算
        vm.canShop = function() {
            var flag = false;
            _.each(vm.groupScl, function(shop) {
                _.each(shop, function(cart) {
                    if (cart.Checked == true) {
                        flag = true;
                    }
                })
            });

            return !flag;
        };
        // 结算就是把选中的商品提交，真正购买提交是在确认订单信息页面
        vm.endShop = function() {
            // 获取选中项
            var ids = [];
            _.each(vm.groupScl, function(shop) {
                _.each(shop, function(cart) {
                    if (cart.Checked == true) {
                        ids.push(cart.ShoppingCardItemID);
                    }
                })
            });
            // 这个不需要返回商品数据，确认订单页面需要有获取选中的接口！
            var opt = {
                type: "get",
                baseUrl: ucConfig.ServerReferenceCrowdSourcingAPI,
                name: '/ShoppingCard/SubmitSelectedItems',
                contentType: "application/json",
                dataType: "jsonp",
                data: {
                    shoppingCardIDs: ids
                }
            };

            UT.jaxJson(opt).then(function(data) {
                if (data.Success) {
                    location.href = ucConfig.ServerReferenceJavaScript + '/shoppingcard/confirmorder';

                } else {
                    UI.inTip(data.Msg);
                }
            });
        };

    });

});
