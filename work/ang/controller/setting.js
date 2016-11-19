$(function () {
    var picList = [];
    var categroyList = [];
    function npic() {
        this.IconID = ""; // 图片id上传后
        this.IsMainPic = false; // 需要选
        this.Status = 1; // 默认不动
        this.CSShopID = '';
        // ID: 1, CSShopID: 1
        return this;
    };
    var csshopid = $("#ID").val();
    var picListLen = $("#preview .imgLiquidFill").length || 0;
    $("#preview .imgLiquidFill").each(function (i, v) {
        var img = $(v).find("img");
        var IsMainPic = img.attr("IsMainPic");
        var pic = new npic();
        pic.IsMainPic = IsMainPic;
        pic.IconID = _.last(img.attr("src").split("/"));
        pic.CSShopID = csshopid;
        picList.push(pic);
        if (IsMainPic == true) {
            $(v).addClass("selected");
        }
    });
    $(".imgLiquidFill").imgLiquid({
        fill: true
    });
    // UM.getEditor('Description').setShow();
    $('textarea').each(function (i, v) {
        var id = $(this).attr('id');
        UM.getEditor(id);
    });

    $("#CategoryName").val($("#CategoryID option:selected").text());
    $("#CategoryID").change(function () {
        $("#CategoryName").val($("#CategoryID option:selected").text());
    });
    $(".fileupload-btn").click(function (e) {

        // 限制文件上传个数为5
        var picLen = picList.length;
        console.log(picLen)
        if (picLen < 5) {
            $("#fileupload").trigger("click");
        } else {
            UI.inTip("最多可有5张图片");
        }

    });
    // 上传
    var hasMainPic = false;
    var opt = {
        upload: $.fn.fileupload,
        container: $('#fileupload'),
        url: ImgSingleUploadUrl,
        onlyImg:true,
        callback: function (temp) {
            var pic = new npic();
            pic.IconID = temp.id;
            pic.CSShopID = csshopid;
            picList.push(pic);

            var pv = $("#preview");
            if (picListLen > 0) {
                pv.append('<div class="imgLiquidFill"><input type="hidden" name="PictureListStrs" value="' + temp.id + '"><img src="' + temp.url + '" class="img-thumbnail" data-iconid="' + temp.id + '" /><span class="glyphicon glyphicon-remove pic-del"></span></div>');
            } else {
                picList[0].IsMainPic = true;
                pv.append('<div class="imgLiquidFill selected"><input type="hidden" name="PictureListStrs" value="' + temp.id + '"><img src="' + temp.url + '" class="img-thumbnail" data-iconid="' + temp.id + '" /><span class="glyphicon glyphicon-remove pic-del"></span></div>');
            }
            pv.show();
            $(".imgLiquidFill").imgLiquid({
                fill: true
            });
        }
    };
    UI.fileUpload(opt);


    $("#preview").delegate('.pic-del', 'click', function (e) {
        var el = $(e.currentTarget);
        var pel = el.closest(".imgLiquidFill");
        var iconid = pel.find('input').val();
        var dindex = _.findIndex(picList, { IconID: iconid });
        picList.splice(dindex, 1);
        pel.remove();

    });

    $("#preview").delegate('.imgLiquidFill', 'click', function (e) {
        var _self = $(e.currentTarget)
        _self.siblings().removeClass('selected');
        _self.addClass("selected");
        var iconid = _.last(_self.find('img').attr("src").split("/"));
        _.each(picList, function (v, i) {
            if (v.IconID != iconid) {
                v.IsMainPic = false;
            } else {
                v.IsMainPic = true;
                hasMainPic = true;
            }
        });
    });

    $("#btn-submit").click(function (e) {
        e.preventDefault();
        var pdata = {
            ID: csshopid,
            Name: $("#Name").val(),
            Description: UM.getEditor($('textarea').attr("id")).getContent(),
            PictureList: picList,
            CategoryList: categroyList
        };
        var opt = {
            "type": "post",
            "webUrl": ucConfig.ServerReferenceJavaScript,
            "name": '/shop/publishshop',
            "contentType": "application/json",
            "dataify": true,
            "data": pdata
        };
        UT.jaxJson(opt, true).then(function (data) {
            if (data.Success == true) {
                UI.inTip(data.Message);
                location.href = ucConfig.ServerReferenceJavaScript + "/shop/setting";
            } else {
                UI.inTip(data.Message);
            }
        });
    });
    //点击添加类别
    $(".submit-Industrys").click(function () {
        var lists = [];
        var text = $(".check-Industrys input:checkbox[name='Industrys']:checked").map(function (index, elem) {
            var category = {};
            category.CategoryID = $(elem).val();
            category.CategoryName = $(elem).attr("attr-text");
            lists.push(category);
            return $(elem).attr("attr-text");
        }).get().join(',');
        categroyList = lists;
        $("#Industrys-value").val(text);
    });


});
