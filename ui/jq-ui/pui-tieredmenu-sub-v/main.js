$(function() {
    $.widget("ui.tieredmenu", {
        options: {
            autoDisplay: true
        },

        _create: function() {
            var $this = this;
            this.id = this.element.attr('id');
            // ui.core
            if (!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            this.element.wrap('<div class="ui-tieredmenu ui-menu ui-widget-content ui-helper-clearfix"></div>');

            this.container = this.element.parent();
            this.originalParent = this.container.parent();
            this.element.addClass('ui-menu-list ui-helper-reset');

            this.element.find('li').each(function() {
                var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');

                menuitemLink.addClass('ui-menuitem-link');
                menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if (icon) {
                    menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                listItem.addClass('ui-menuitem');

                if (listItem.children('ul').length > 0) {
                    listItem.addClass('ui-menu-parent');
                    listItem.children('ul').addClass('ui-widget-content ui-menu-list ui-helper-clearfix ui-menu-child');
                    menuitemLink.prepend('<span class="ui-submenu-icon fa fa-fw fa-caret-right"></span>');
                }
            });

            this.links = this.element.find('.ui-menuitem-link:not(.ui-state-disabled)');
            this._bindEvents();
            this._super();
        },

        _bindEvents: function() {
            this._bindItemEvents();
            this._bindDocumentHandler();
        },

        _bindItemEvents: function() {
            var $this = this;

            this.links.on('mouseenter.ui-menu', function() {
                var link = $(this),
                    menuitem = link.parent(),
                    autoDisplay = $this.options.autoDisplay;

                var activeSibling = menuitem.siblings('.ui-menuitem-active');
                if (activeSibling.length === 1) {
                    $this._deactivate(activeSibling);
                }

                if (autoDisplay || $this.active) {
                    if (menuitem.hasClass('ui-menuitem-active')) {
                        $this._reactivate(menuitem);
                    } else {
                        $this._activate(menuitem);
                    }
                } else {
                    $this._highlight(menuitem);
                }
            });

            if (this.options.autoDisplay === false) {
                this.rootLinks = this.element.find('> .ui-menuitem > .ui-menuitem-link');
                this.rootLinks.data('ui-rootlink', this.id).find('*').data('ui-rootlink', this.id);

                this.rootLinks.on('click.ui-menu', function(e) {
                    var link = $(this),
                        menuitem = link.parent(),
                        submenu = menuitem.children('ul.ui-menu-child');

                    if (submenu.length === 1) {
                        if (submenu.is(':visible')) {
                            $this.active = false;
                            $this._deactivate(menuitem);
                        } else {
                            $this.active = true;
                            $this._highlight(menuitem);
                            $this._showSubmenu(menuitem, submenu);
                        }
                    }
                });
            }

            this.element.parent().find('ul.ui-menu-list').on('mouseleave.ui-menu', function(e) {
                if ($this.activeitem) {
                    $this._deactivate($this.activeitem);
                }

                e.stopPropagation();
            });
        },
        _bindDocumentHandler: function() {
            var $this = this;
            // 点击关闭所有打开的
            $(document.body).on('click.ui-menu-' + this.id, function(e) {
                var target = $(e.target);
                if (target.data('ui-rootlink') === $this.id) {
                    return;
                }

                $this.active = false;
                $this.element.find('li.ui-menuitem-active').each(function() {
                    $this._deactivate($(this), true);
                });
            });
        },

        _unbindEvents: function() {
            this.links.off('mouseenter.ui-menu');
            if (this.options.autoDisplay === false) {
                this.rootLinks.off('click.ui-menu');
            }
            this.element.parent().find('ul.ui-menu-list').off('mouseleave.ui-menu');
            $(document.body).off('click.ui-menu-' + this.id);
        },

        _deactivate: function(menuitem, animate) {
            this.activeitem = null;
            menuitem.children('a.ui-menuitem-link').removeClass('ui-state-hover');
            menuitem.removeClass('ui-menuitem-active');

            if (animate) {
                menuitem.children('ul.ui-menu-child:visible').fadeOut('fast');
            } else {
                menuitem.children('ul.ui-menu-child:visible').hide();
            }
        },

        _activate: function(menuitem) {
            this._highlight(menuitem);

            var submenu = menuitem.children('ul.ui-menu-child');
            if (submenu.length === 1) {
                this._showSubmenu(menuitem, submenu);
            }
        },

        _reactivate: function(menuitem) {
            this.activeitem = menuitem;
            var submenu = menuitem.children('ul.ui-menu-child'),
                activeChilditem = submenu.children('li.ui-menuitem-active:first'),
                _self = this;

            if (activeChilditem.length === 1) {
                _self._deactivate(activeChilditem);
            }
        },

        _highlight: function(menuitem) {
            this.activeitem = menuitem;
            menuitem.children('a.ui-menuitem-link').addClass('ui-state-hover');
            menuitem.addClass('ui-menuitem-active');
        },

        _showSubmenu: function(menuitem, submenu) {
            submenu.show();
            submenu.position({
                my: 'left top',
                at: 'right top',
                of: menuitem,
                collision: "fit"
            })
        },

        _destroy: function() {
            this._super();

            var $this = this;
            this._unbindEvents();

            this.element.removeClass('ui-menu-list ui-helper-reset');
            this.element.find('li').removeClass('ui-menuitem ui-menu-parent').each(function() {
                var listItem = $(this),
                    link = listItem.children('a');

                link.removeClass('ui-menuitem-link').children('.fa').remove();
                link.children('.ui-menuitem-text').contents().unwrap();
                listItem.children('ul').removeClass('ui-widget-content ui-menu-list ui-helper-clearfix ui-menu-child');
            });

            this.element.unwrap();
        }

    });

    $('#tm1').tieredmenu({});


});
