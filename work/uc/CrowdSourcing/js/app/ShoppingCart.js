 /////////////////////////////////////////////
    //商品添加到购物车
    //http://whj.ucdl.cn/crowdsourcingapi/shoppingcard/addtoshoppingcard
    console.log("WHJ--------");
    var optopt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceCrowdSourcingAPI,
        "name": '/ShoppingCard/AddToShoppingCard',
        "contentType": "application/json",
        "dataType": "json",
        "dataify": true,
        "data": { ProductId: 71, SKUID: '1111', Num: 2 }
    };
    UT.jaxJson(optopt, true).then(function (data) {
        //console.log(data);
        if (data.success == true) {
            // 成功
            console.log(data);
        } else {
            // 失败
            console.log("购物车");
        }
    });
    //////////////////
    //获取购物车里商品列表
    var optGetList = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceCrowdSourcingAPI,
        "name": '/ShoppingCard/ShoppingCardList',
        "contentType": "application/json",
        "dataType": "json",
        "dataify": true
    };
    UT.jaxJson(optGetList, true).then(function (data) {
        //console.log(data);
        if (data.success == true) {
            // 成功
            console.log(data);
        } else {
            // 失败
            console.log(data);
        }
    });
    //从购物车中删除商品
    var optDelete = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceCrowdSourcingAPI,
        "name": '/ShoppingCard/RemoveFromShoppingCard',
        "contentType": "application/json",
        "dataType": "json",
        "dataify": true
    };
    UT.jaxJson(optDelete, true).then(function (data) {
        //console.log(data);
        if (data.success == true) {
            // 成功
            console.log(data);
        } else {
            // 失败
            console.log(data);
        }
    });
    /////////////////////////////////////////////

//更新购物车中商品数量
    var optUpdate = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceCrowdSourcingAPI,
        "name": '/ShoppingCard/UpdateShoppingCard',
        "contentType": "application/json",
        "dataType": "json",
        "dataify": true
    };
    UT.jaxJson(optUpdate, true).then(function (data) {
        //console.log(data);
        if (data.success == true) {
            // 成功
            console.log(data);
        } else {
            // 失败
            console.log(data);
        }
    });