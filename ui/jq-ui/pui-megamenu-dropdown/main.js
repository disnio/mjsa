$(function() {

    $.widget("ui.dpop", $.primeui.puibasemenu, {
        _create: function() {
            this.id = this.element.attr('id');
            if (!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            this._render();

            this.rootList = this.element.children('ul');
            this.rootLinks = this.rootList.children('li').children('a');

            this._bindEvents();
        },

        _render: function() {
            var $this = this;

            this.element.addClass('ui-menu ui-menubar ui-megamenu ui-helper-clearfix');

            this.element.children('ul').addClass('ui-menu-list ui-helper-reset');
            // 定义为一级弹出菜单
            this.element.find('>ul >li').each(function() {
                var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');

                menuitemLink.addClass('ui-menuitem-link ui-submenu-link');
                menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if (icon) {
                    menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                listItem.addClass('ui-menuitem');
                // 重置样式
                listItem.parent().addClass('ui-menu-list ui-helper-reset');

                var submenuIcon = 'fa-caret-down';
                listItem.addClass('ui-menu-parent');
                listItem.children('div').addClass('ui-megamenu-panel ui-widget-content ui-helper-clearfix ui-menu-child');
                menuitemLink.prepend('<span class="ui-submenu-icon fa fa-fw ' + submenuIcon + '"></span>');
            });
        },

        _destroy: function() {
            var $this = this;
            this._unbindEvents();

            this.element.removeClass('ui-menu ui-menubar ui-megamenu');

            this.element.find('li').each(function() {
                var listItem = $(this),
                    menuitemLink = listItem.children('a');

                menuitemLink.removeClass('ui-menuitem-link');

                menuitemLink.contents().unwrap();
                menuitemLink.children('.ui-menuitem-icon').remove();

                listItem.removeClass('ui-menuitem')
                    .parent().removeClass('ui-menu-list ui-helper-reset');

                var submenuIcon = 'fa-caret-down';
                listItem.removeClass('ui-menu-parent');
                listItem.children('div').removeClass('ui-megamenu-panel ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
                menuitemLink.removeClass('ui-submenu-link').children('.ui-submenu-icon').remove();
            });
        },

        _bindEvents: function() {
            var $this = this;
            // 菜单移入
            this.rootLinks.on('mouseenter.ui-megamenu', function(e) {
                var link = $(this),
                    menuitem = link.parent();
                // 类标记找到打开的其他弹出区关闭
                var current = menuitem.siblings('.ui-menuitem-active');
                if (current.length > 0) {
                    $this._deactivate(current, false);
                }
                // 打开当前链接的弹出区
                $this._activate(menuitem);

            });
            // 事件阻止
            this.rootLinks.filter('.ui-submenu-link').on('click.ui-megamenu', function(e) {
                e.preventDefault();
            });
            // 弹出区移出
            this.rootList.on('mouseleave.ui-megamenu', function(e) {
                // 通过类标记找到弹出区域，关闭
                var activeitem = $this.rootList.children('.ui-menuitem-active');
                if (activeitem.length === 1) {
                    $this._deactivate(activeitem, false);
                }
            });
        },

        _unbindEvents: function() {
            this.rootLinks.off('mouseenter.ui-megamenu mouselave.ui-megamenu click.ui-megamenu');
            this.rootList.off('mouseleave.ui-megamenu');
        },

        _deactivate: function(menuitem, animate) {
            var link = menuitem.children('a.ui-menuitem-link'),
                submenu = link.next();

            menuitem.removeClass('ui-menuitem-active');
            link.removeClass('ui-state-hover');
            this.activeitem = null;
            submenu.hide();            
        },

        _activate: function(menuitem) {
            // 区域标记
            var submenu = menuitem.children('.ui-megamenu-panel'),
                $this = this;
                // 高亮链接，添加激活标记，保存激活项
            $this._highlight(menuitem);
            // 显示
            if (submenu.length > 0) {
                $this._showSubmenu(menuitem, submenu);
            }
        },

        _highlight: function(menuitem) {
            var link = menuitem.children('a.ui-menuitem-link');

            menuitem.addClass('ui-menuitem-active');
            link.addClass('ui-state-hover');
            this.activeitem = menuitem;
        },

        _showSubmenu: function(menuitem, submenu) {
            var pos = null;
            pos = {
                my: 'left top',
                at: 'left bottom',
                of: menuitem,
                // collision: 'fit'
            };
            submenu.css({
                'z-index': ++UI.zindex
            });
            submenu.show().position(pos);
        } 
    });

    $('#mm').dpop({});
    

});
