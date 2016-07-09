/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-06-16 16:56:56
 */
'use strict';

$(function() {
    var wh = Response.viewportH()
    var dth = $(".desk__tabHeader");
    var thtop = dth.offset().top + dth.outerHeight(true);
    var dh = wh - thtop - 66;

    $(".desktop").height(dh);
    $("#desk").height(dh);

    var tabMap = UT.umap();
    var tabs = $('#desk').tabs();
    var tabCounter = $('.desk__tabHeader li').length + 1;
    var desk__tabHeader_w = 2;
    $('.desk__tabHeader li').each(function(i, li) {
        desk__tabHeader_w += $(li).outerWidth(true);
        var mvalue = $(li).attr("aria-controls");
        var mkey = $("#" + mkey).find('iframe').attr('src');
        tabMap.put(mkey, mvalue);
    });


    $('.desk__tabHeader').width(desk__tabHeader_w);
    // 横向导航按钮
    var tabScroll_w = $("#tab-scroll").width();
    if (desk__tabHeader_w > tabScroll_w) {
        $(".tabs-scroll").show();
    } else {
        $(".tabs-scroll").hide();
    }
    // 触发
    $(".popover a").click(function(e) {
        e.preventDefault();
        var ele = $(e.currentTarget);        
        var nhref = ele.attr("href");
        if( tabMap.hasKey(nhref) ){
            var nvalue = tabMap.get(nhref);
            $('.desk__tabHeader li').each(function(i, li){
                if(nvalue == $(li).attr("aria-controls")){
                    tabs.tabs("option", "active", i);                    
                }
            });
            return;
        }

        var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>"
        var ntabC = '<iframe width="100%" height="100%" frameborder="0" src="' + ele.attr("href") + '"></iframe>';

        var id = "tabs-" + tabCounter;
        var label = ele.text() || "Tab " + tabCounter;
        var li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
        tabs.find(".ui-tabs-nav").append(li);

        tabs.append('<div id="' + id + '">' + ntabC + '</div>');
        // 容器宽度修正
        var lw = li.outerWidth(true) + 2;
        desk__tabHeader_w += lw;
        $('.desk__tabHeader').width(desk__tabHeader_w);

        if (desk__tabHeader_w > tabScroll_w) {
            $(".tabs-scroll").show();
            $("#tab-scroll").scrollTo('li:eq(' + (tabCounter - 1) + ')', 800);
        }
        // 添加到集合
        tabMap.put(ele.attr("href"), id);        

        tabs.tabs("refresh");
        tabs.tabs("option", "active", tabCounter - 1);
        tabCounter++;
    });
    // 简单重绘
    Response.resize(function() {
        var wh = Response.viewportH();
        var thtop = dth.offset().top + dth.outerHeight(true);
        var dh = wh - thtop - 27 - 32;
        $(".desktop").height(dh);
        $("#desk").height(dh);

    });
    // 关闭
    $("#desk").on("click", 'span.ui-icon-close', function() {
        var pli = $(this).closest("li");
        var lw = pli.outerWidth(true);
        var panelId = pli.remove().attr("aria-controls");

        desk__tabHeader_w -= lw;

        $('.desk__tabHeader').width(desk__tabHeader_w);
        if (desk__tabHeader_w > tabScroll_w) {
            $(".tabs-scroll").show();
        } else {
            $(".tabs-scroll").hide();
        }
        // 集合更新
        var pvalue = $("#"+ panelId).find('iframe').attr("src");
        tabMap.remove(pvalue, panelId);

        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });

    $("#tabs_left_scroll").click(function() {
        $("#tab-scroll").scrollTo({
            top: '-=0',
            left: '-=140'
        }, 800);
    });

    $("#tabs_right_scroll").click(function() {
        $("#tab-scroll").scrollTo({
            top: '-=0',
            left: '+=140'
        }, 800);
    });


    // 
    var $menu = $(".menu");

    $menu.menuAim({
        activate: activateSubmenu,
        exit: deactivateSubmenu
    });

    function activateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId),
            height = $submenu.outerHeight(),
            width = $menu.outerWidth();

        $submenu.css({
            display: "block",
            top: -(height / 2 - 20),
            left: width - 3, // main should overlay submenu
            height: height + 10 // padding for main dropdown's arrow
        });

        $row.find("a").addClass("maintainHover");
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);

        $submenu.css("display", "none");
        $row.find("a").removeClass("maintainHover");
    }



});
