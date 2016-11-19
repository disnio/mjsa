/* 
 * @Author: Allen
 * @Date:   2016-07-13 16:33:12
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-10-21 10:38:03
 */
yob.controller('MainController', function($scope, $http, $q, $timeout, shoppingCardList) {
    var vm = this;
    vm.foo = "bar";
    $q.all([shoppingCardList]).then(function(res) {

        vm.scl = res[0].Data;
        vm.scart = {};
        vm.TotalPrice = 0;
        vm.TotalNum = 0;

        console.log(vm.scl)

        vm.AllChecked = false;
        _.each(vm.scl, function(v) {
            v.Pic = imgUrl + v.IconID;
            v.Checked = false;
            v.productUrl = ucConfig.ServerReferenceCrowdSourcing + '/productlist/productdetail/' + v.CSProductID;
        })

        function changeSel() {
            vm.TotalPrice = 0;
            vm.TotalNum = 0;

            _.each(vm.groupScl, function(shop) {
                _.each(shop, function(v) {
                    if (v.Checked) {
                        vm.TotalPrice += parseFloat(v.TotalAmount, 10);
                        vm.TotalNum += parseFloat(v.Num, 10);
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

        // function countPro(p) {
        //     return _.reduce(vm.groupScl, function(total, v) {
        //         return total + _.reduce(v, function(it, item) {
        //             return (it + parseInt(item[p], 10));
        //         }, 0)
        //     }, 0);
        // }

        vm.changeNum = function(e, cart) {
            var n = $(e.currentTarget).val();

            if (n <= 0) {
                UI.inTip("数量应大于0");
            }

            if (/\./.test(n)) {
                UI.inTip("请输入整数");
            }

            if (n > cart.SKUNum) {
                UI.inTip("超出现有库存数量");
            }

            if (n > 0 && !/\./.test(n) && n <= cart.SKUNum) {
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
            var n;
            if (flag === '-') {
                n = cart.Num >= 2 ? parseInt(cart.Num, 10) - 1 : 1;
            } else if (flag === '+') {
                // 应做库存限制
                n = parseInt(cart.Num, 10) + 1;
            }
            if (n <= 0) {
                UI.inTip("数量应大于0");
            }

            if (/\./.test(n)) {
                UI.inTip("请输入整数");
            }

            if (n > cart.SKUNum) {
                UI.inTip("超出现有库存数量");
            }

            if (n > 0 && n <= cart.SKUNum) {
                var opt = {
                    type: "get",
                    webUrl: ucConfig.ServerReferenceCrowdSourcing,
                    name: '/ShoppingCard/UpdateShoppingCard',
                    contentType: "application/json",
                    dataType: "json",
                    data: {
                        ShoppingCardItemID: cart.ShoppingCardItemID,
                        Num: n
                    }
                };

                UT.jaxJson(opt, true).then(function(data) {
                    if (data.Success) {
                        $scope.$apply(function() {
                            cart.Num = n;
                            cart.TotalAmount = (cart.Num * cart.ProPrice).toFixed(2);
                            cart.Checked = true;
                            changeSel()
                            var ec = $(e.currentTarget);
                            ec.closest("li").find(".check").prop("checked", true)
                        });

                    } else {
                        UI.inTip(data.Message);
                    }
                });
            }
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
                        webUrl: ucConfig.ServerReferenceCrowdSourcing,
                        name: '/ShoppingCard/RemoveFromShoppingCard',
                        contentType: "application/json",
                        dataType: "json",
                        data: {
                            ShoppingCardItemIDs: ids.join(',')
                        }
                    };

                    UT.jaxJson(opt, true).then(function(data) {
                        if (data.Success) {
                            UI.inTip(data.Message).then(function() {
                                $scope.$apply(function() {
                                    _.remove(vm.scl, function(cart) {
                                        return _.includes(ids, cart.ShoppingCardItemID)
                                    });
                                    vm.groupScl = genScl(vm.scl);
                                    changeSel()
                                });
                            });

                        } else {
                            UI.inTip(data.Message);
                        }
                    });
                },
                callback: function(modal) {}
            });


        };
        vm.delCarts = function() {

            var ids = [];
            _.each(vm.groupScl, function(shop) {
                _.each(shop, function(cart) {
                    if (cart.Checked == true) {
                        ids.push(cart.ShoppingCardItemID);
                    }
                })
            });
            if (_.isEmpty(ids)) {
                UI.inTip("请选择要删除的商品！")
                return false;
            }

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
                        baseUrl: ucConfig.ServerReferenceCrowdSourcing,
                        name: '/ShoppingCard/RemoveFromShoppingCard',
                        contentType: "application/json",
                        dataType: "json",
                        data: {
                            ShoppingCardItemIDs: ids.join(',')
                        }
                    };

                    UT.jaxJson(opt).then(function(data) {
                        if (data.Success) {
                            UI.inTip(data.Message).then(function() {
                                $scope.$apply(function() {
                                    _.remove(vm.scl, function(cart) {
                                        return _.includes(ids, cart.ShoppingCardItemID)
                                    });
                                    vm.groupScl = genScl(vm.scl);
                                    changeSel()
                                });
                            });

                        } else {
                            UI.inTip(data.Message);
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
                webUrl: ucConfig.ServerReferenceCrowdSourcing,
                name: '/ShoppingCard/SubmitSelectedItems',
                contentType: "application/json",
                dataType: "json",
                data: {
                    shoppingCardIDs: ids.join(',')
                }
            };

            UT.jaxJson(opt, true).then(function(data) {
                if (data.Success) {
                    location.href = ucConfig.ServerReferenceJavaScript + '/shoppingcard/confirmorder';

                } else {
                    UI.inTip(data.Message);
                }
            });
        };

        vm.collection = function(e, shopCart, cart) {
            e.preventDefault(shopCart);
            UI.genSingleModal({
                btnClose: true,
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确认",
                title: "确认要移入收藏夹吗？",
                // close: function(){},
                save: function(modal) {
                    var opt = {
                        type: "get",
                        baseUrl: ucConfig.ServerReferenceJavaScript,
                        name: '/Collection/AddProductCollection',
                        contentType: "application/json",
                        data: {
                            id: cart.CSProductID
                        }
                    };
                    UT.jaxJson(opt).then(function(data) {
                        UI.inTip(data.Message);
                        if (data.Success) {
                            // 从购物车中删除
                            var ids = [];
                            ids.push(cart.ShoppingCardItemID);

                            var opt = {
                                type: "get",
                                baseUrl: ucConfig.ServerReferenceCrowdSourcing,
                                //baseUrl: "http://wangya.ucdl.cn/CrowdSourcingAPI",
                                name: '/ShoppingCard/RemoveFromShoppingCard',
                                contentType: "application/json",
                                dataType: "json",
                                data: {
                                    ShoppingCardItemIDs: ids.join(',')
                                }
                            };

                            UT.jaxJson(opt).then(function(data) {
                                if (data.Success) {
                                    $scope.$apply(function() {
                                        _.remove(vm.scl, function(cart) {
                                            return _.includes(ids, cart.ShoppingCardItemID)
                                        });
                                        vm.groupScl = genScl(vm.scl);
                                        changeSel()
                                    });
                                }
                            });
                        }
                    });
                },
                callback: function(modal) {

                }
            });
        };
        vm.collections = function() {
            UI.genSingleModal({
                btnClose: true,
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确认",
                title: "确认要移入收藏夹吗？",
                // close: function(){},
                save: function(modal) {

                    var ids = [];
                    _.each(vm.groupScl, function(shop) {
                        _.each(shop, function(cart) {
                            if (cart.Checked == true) {
                                ids.push(cart.ShoppingCardItemID);
                                var opt = {
                                    type: "get",
                                    baseUrl: ucConfig.ServerReferenceJavaScript,
                                    name: '/Collection/AddProductCollection',
                                    contentType: "application/json",
                                    data: {
                                        id: cart.CSProductID
                                    }
                                };
                                UT.jaxJson(opt).then(function(data) {
                                    // alert("已收藏成功");
                                });
                            }
                        })
                    });
                    if (_.isEmpty(ids)) {
                        return false;
                    }

                    var opt = {
                        type: "get",
                        baseUrl: ucConfig.ServerReferenceCrowdSourcing,
                        name: '/ShoppingCard/RemoveFromShoppingCard',
                        contentType: "application/json",
                        dataType: "json",
                        data: {
                            ShoppingCardItemIDs: ids.join(',')
                        }
                    };
                    UI.inTip("已收藏成功");
                    UT.jaxJson(opt).then(function(data) {
                        if (data.Success) {
                            $scope.$apply(function() {
                                _.remove(vm.scl, function(cart) {
                                    return _.includes(ids, cart.ShoppingCardItemID)
                                });
                                vm.groupScl = genScl(vm.scl);
                                changeSel()
                            });
                        }
                    });
                },
                callback: function(modal) {}
            });
        };
    });

});
