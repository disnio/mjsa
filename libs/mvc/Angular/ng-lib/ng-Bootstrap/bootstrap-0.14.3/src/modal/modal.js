angular.module('ui.bootstrap.modal', ['ui.bootstrap.stackedMap'])
    /**
     * A helper, internal data structure that stores all references attached to key
     */
    .factory('$$multiMap', function() {
        return {
            createNew: function() {
                // 映射
                var map = {};

                return {
                    // 返回对象数组，把key,value 对放入数组中
                    entries: function() {
                        return Object.keys(map).map(function(key) {
                            return {
                                key: key,
                                value: map[key]
                            };
                        });
                    },
                    get: function(key) {
                        return map[key];
                    },
                    hasKey: function(key) {
                        return !!map[key];
                    },
                    keys: function() {
                        return Object.keys(map);
                    },
                    put: function(key, value) {
                        if (!map[key]) {
                            map[key] = [];
                        }

                        map[key].push(value);
                    },
                    remove: function(key, value) {
                        var values = map[key];

                        if (!values) {
                            return;
                        }

                        var idx = values.indexOf(value);

                        if (idx !== -1) {
                            values.splice(idx, 1);
                        }

                        if (!values.length) {
                            delete map[key];
                        }
                    }
                };
            }
        };
    })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
.directive('uibModalBackdrop', [
    '$animate', '$injector', '$uibModalStack',
    function($animate, $injector, $modalStack) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
            $animateCss = $injector.get('$animateCss');
        }

        return {
            replace: true,
            templateUrl: 'template/modal/backdrop.html',
            compile: function(tElement, tAttrs) {
                // 添加属性背景的类
                tElement.addClass(tAttrs.backdropClass);
                return linkFn;
            }
        };

        function linkFn(scope, element, attrs) {
            // Temporary fix for prefixing 添加默认的类
            element.addClass('modal-backdrop');

            if (attrs.modalInClass) {
                if ($animateCss) {
                    $animateCss(element, {
                        addClass: attrs.modalInClass
                    }).start();
                } else {
                    // 控制对话框的显示
                    $animate.addClass(element, attrs.modalInClass);
                }

                scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
                    var done = setIsAsync();
                    if ($animateCss) {
                        $animateCss(element, {
                            removeClass: attrs.modalInClass
                        }).start().then(done);
                    } else {
                        // 隐藏
                        $animate.removeClass(element, attrs.modalInClass).then(done);
                    }
                });
            }
        }
    }
])

.directive('uibModalWindow', [
    '$uibModalStack', '$q', '$animate', '$injector',
    function($modalStack, $q, $animate, $injector) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
            $animateCss = $injector.get('$animateCss');
        }

        return {
            scope: {
                index: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: function(tElement, tAttrs) {
                // 对话框弹出模板
                return tAttrs.templateUrl || 'template/modal/window.html';
            },
            link: function(scope, element, attrs) {
                element.addClass(attrs.windowClass || '');
                element.addClass(attrs.windowTopClass || '');
                // lg,sm 控制对话框大小
                scope.size = attrs.size;
                // 关闭
                scope.close = function(evt) {
                    var modal = $modalStack.getTop();
                    if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        $modalStack.dismiss(modal.key, 'backdrop click');
                    }
                };

                // moved from template to fix issue #2280
                element.on('click', scope.close);

                // This property is only added to the scope for the purpose of detecting when this directive is rendered.
                // We can detect that by using this property in the template associated with this directive and then use
                // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
                scope.$isRendered = true;

                // Deferred object that will be resolved when this modal is render.
                var modalRenderDeferObj = $q.defer();
                // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
                // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
                attrs.$observe('modalRender', function(value) {
                    if (value == 'true') {
                        modalRenderDeferObj.resolve();
                    }
                });

                modalRenderDeferObj.promise.then(function() {
                    var animationPromise = null;

                    if (attrs.modalInClass) {
                        if ($animateCss) {
                            animationPromise = $animateCss(element, {
                                addClass: attrs.modalInClass
                            }).start();
                        } else {
                            animationPromise = $animate.addClass(element, attrs.modalInClass);
                        }

                        scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
                            var done = setIsAsync();
                            if ($animateCss) {
                                $animateCss(element, {
                                    removeClass: attrs.modalInClass
                                }).start().then(done);
                            } else {
                                $animate.removeClass(element, attrs.modalInClass).then(done);
                            }
                        });
                    }


                    $q.when(animationPromise).then(function() {
                        var inputWithAutofocus = element[0].querySelector('[autofocus]');
                        /**
                         * Auto-focusing of a freshly-opened modal element causes any child elements
                         * with the autofocus attribute to lose focus. This is an issue on touch
                         * based devices which will show and then hide the onscreen keyboard.
                         * Attempts to refocus the autofocus element via JavaScript will not reopen
                         * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
                         * the modal element if the modal does not contain an autofocus element.
                         */
                        if (inputWithAutofocus) {
                            inputWithAutofocus.focus();
                        } else {
                            element[0].focus();
                        }
                    });

                    // Notify {@link $modalStack} that modal is rendered.
                    var modal = $modalStack.getTop();
                    if (modal) {
                        $modalStack.modalRendered(modal.key);
                    }
                });
            }
        };
    }
])

.directive('uibModalAnimationClass', function() {
    return {
        compile: function(tElement, tAttrs) {
            if (tAttrs.modalAnimation) {
                tElement.addClass(tAttrs.uibModalAnimationClass);
            }
        }
    };
})

.directive('uibModalTransclude', function() {
    return {
        link: function($scope, $element, $attrs, controller, $transclude) {
            $transclude($scope.$parent, function(clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    };
})
// 构建多个对话框组成的堆栈
.factory('$uibModalStack', [
    '$animate', '$timeout', '$document', '$compile', '$rootScope',
    '$q',
    '$injector',
    '$$multiMap',
    '$$stackedMap',
    function($animate, $timeout, $document, $compile, $rootScope,
        $q,
        $injector,
        $$multiMap,
        $$stackedMap) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
            // 注入当前 scope
            $animateCss = $injector.get('$animateCss');
        }
        // 附加到 body 作为指示器
        var OPENED_MODAL_CLASS = 'modal-open';

        var backdropDomEl, backdropScope;
        // 堆栈，打开的多个对话框，有当前最顶层， [{key, value}]
        var openedWindows = $$stackedMap.createNew();
        // 映射，打开的多个对话框{key,value|[]}
        var openedClasses = $$multiMap.createNew();
        // 对话框对象
        var $modalStack = {
            // 关闭事件值
            NOW_CLOSING_EVENT: 'modal.stack.now-closing'
        };

        //Modal focus behavior，可获得焦点的元素列表
        var focusableElementList;
        var focusIndex = 0;
        // 选择器字符串，建立 tab 的列表，用于焦点变换
        var tababbleSelector = 'a[href], area[href], input:not([disabled]), ' +
            'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
            'iframe, object, embed, *[tabindex], *[contenteditable=true]';
            // 获取背景在打开对话框栈中的索引
        function backdropIndex() {
            var topBackdropIndex = -1;
            // 打开对话框 kye 的数组
            var opened = openedWindows.keys();
            for (var i = 0; i < opened.length; i++) {
                if (openedWindows.get(opened[i]).value.backdrop) {
                    // value 附加的 backdrop 属性存在则返回在 打开堆栈中对应的索引
                    topBackdropIndex = i;
                }
            }
            return topBackdropIndex;
        }
        // 设置当前对话框的层级索引
        $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
            if (backdropScope) {
                backdropScope.index = newBackdropIndex;
            }
        });
        // 移除对话框
        function removeModalWindow(modalInstance, elementToReceiveFocus) {
            var body = $document.find('body').eq(0);
            // modalInstance 为对话框栈中的key， 值：{modalDomEl, modalScope, backdrop, openedClass}
            var modalWindow = openedWindows.get(modalInstance).value;

            //clean up the stack, 从栈中删除
            openedWindows.remove(modalInstance);
            // 动画后移除，有延迟
            removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
                var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
                // remove(k,v) from map
                openedClasses.remove(modalBodyClass, modalInstance);
                body.toggleClass(modalBodyClass, openedClasses.hasKey(modalBodyClass));
                // 开关当前对话框的 topClass
                toggleTopWindowClass(true);
            });
            // 检查移除 backdropDomEl backdropScope
            checkRemoveBackdrop();

            //move focus to specified element if available, or else to body 获取或释放焦点
            if (elementToReceiveFocus && elementToReceiveFocus.focus) {
                elementToReceiveFocus.focus();
            } else {
                body.focus();
            }
        }

        // Add or remove "windowTopClass" from the top window in the stack
        function toggleTopWindowClass(toggleSwitch) {
            var modalWindow;

            if (openedWindows.length() > 0) {
                modalWindow = openedWindows.top().value;
                modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
            }
        }

        function checkRemoveBackdrop() {
            //remove backdrop if no longer needed
            if (backdropDomEl && backdropIndex() == -1) {
                var backdropScopeRef = backdropScope;
                removeAfterAnimate(backdropDomEl, backdropScope, function() {
                    backdropScopeRef = null;
                });
                backdropDomEl = undefined;
                backdropScope = undefined;
            }
        }

        function removeAfterAnimate(domEl, scope, done) {
            var asyncDeferred;
            // ??
            var asyncPromise = null;
            var setIsAsync = function() {
                if (!asyncDeferred) {
                    asyncDeferred = $q.defer();
                    asyncPromise = asyncDeferred.promise;
                }

                return function asyncDone() {
                    asyncDeferred.resolve();
                };
            };
            scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

            // Note that it's intentional that asyncPromise might be null.
            // That's when setIsAsync has not been called during the
            // NOW_CLOSING_EVENT broadcast.
            return $q.when(asyncPromise).then(afterAnimating);

            function afterAnimating() {
                if (afterAnimating.done) {
                    return;
                }
                afterAnimating.done = true;

                if ($animateCss) {
                    $animateCss(domEl, {
                        event: 'leave'
                    }).start().then(function() {
                        domEl.remove();
                    });
                } else {
                    $animate.leave(domEl);
                }
                scope.$destroy();
                if (done) {
                    done();
                }
            }
        }

        $document.bind('keydown', function(evt) {
            if (evt.isDefaultPrevented()) {
                return evt;
            }
            // 获取当前 modal
            var modal = openedWindows.top();
            if (modal && modal.value.keyboard) {
                switch (evt.which) {
                    case 27:
                        {
                            evt.preventDefault();
                            // esc
                            $rootScope.$apply(function() {
                                $modalStack.dismiss(modal.key, 'escape key press');
                            });
                            break;
                        }
                    case 9:
                        {
                            $modalStack.loadFocusElementList(modal);
                            var focusChanged = false;
                            if (evt.shiftKey) {
                                if ($modalStack.isFocusInFirstItem(evt)) {
                                    focusChanged = $modalStack.focusLastFocusableElement();
                                }
                            } else {
                                if ($modalStack.isFocusInLastItem(evt)) {
                                    focusChanged = $modalStack.focusFirstFocusableElement();
                                }
                            }

                            if (focusChanged) {
                                evt.preventDefault();
                                evt.stopPropagation();
                            }
                            break;
                        }
                }
            }
        });

        $modalStack.open = function(modalInstance, modal) {
            var modalOpener = $document[0].activeElement,
                modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

            toggleTopWindowClass(false);

            openedWindows.add(modalInstance, {
                deferred: modal.deferred,
                renderDeferred: modal.renderDeferred,
                modalScope: modal.scope,
                backdrop: modal.backdrop,
                keyboard: modal.keyboard,
                openedClass: modal.openedClass,
                windowTopClass: modal.windowTopClass
            });

            openedClasses.put(modalBodyClass, modalInstance);

            var body = $document.find('body').eq(0),
                currBackdropIndex = backdropIndex();

            if (currBackdropIndex >= 0 && !backdropDomEl) {
                backdropScope = $rootScope.$new(true);
                backdropScope.index = currBackdropIndex;
                var angularBackgroundDomEl = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
                angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
                if (modal.animation) {
                    angularBackgroundDomEl.attr('modal-animation', 'true');
                }
                backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
                body.append(backdropDomEl);
            }

            var angularDomEl = angular.element('<div uib-modal-window="modal-window"></div>');
            angularDomEl.attr({
                'template-url': modal.windowTemplateUrl,
                'window-class': modal.windowClass,
                'window-top-class': modal.windowTopClass,
                'size': modal.size,
                'index': openedWindows.length() - 1,
                'animate': 'animate'
            }).html(modal.content);
            if (modal.animation) {
                angularDomEl.attr('modal-animation', 'true');
            }
            // 编译附加作用域后，添加到body
            var modalDomEl = $compile(angularDomEl)(modal.scope);
            openedWindows.top().value.modalDomEl = modalDomEl;
            openedWindows.top().value.modalOpener = modalOpener;
            body.append(modalDomEl);
            body.addClass(modalBodyClass);

            $modalStack.clearFocusListCache();
        };

        function broadcastClosing(modalWindow, resultOrReason, closing) {
            return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
        }

        $modalStack.close = function(modalInstance, result) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow && broadcastClosing(modalWindow, result, true)) {
                // 有计划的关闭
                modalWindow.value.modalScope.$$uibDestructionScheduled = true;
                modalWindow.value.deferred.resolve(result);
                removeModalWindow(modalInstance, modalWindow.value.modalOpener);
                return true;
            }
            return !modalWindow;
        };

        $modalStack.dismiss = function(modalInstance, reason) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
                modalWindow.value.modalScope.$$uibDestructionScheduled = true;
                modalWindow.value.deferred.reject(reason);
                removeModalWindow(modalInstance, modalWindow.value.modalOpener);
                return true;
            }
            return !modalWindow;
        };
        // 关闭所有打开的对话框
        $modalStack.dismissAll = function(reason) {
            var topModal = this.getTop();
            while (topModal && this.dismiss(topModal.key, reason)) {
                topModal = this.getTop();
            }
        };

        $modalStack.getTop = function() {
            return openedWindows.top();
        };
        // 渲染完成后返回 
        $modalStack.modalRendered = function(modalInstance) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow) {
                modalWindow.value.renderDeferred.resolve();
            }
        };

        $modalStack.focusFirstFocusableElement = function() {
            if (focusableElementList.length > 0) {
                focusableElementList[0].focus();
                return true;
            }
            return false;
        };
        $modalStack.focusLastFocusableElement = function() {
            if (focusableElementList.length > 0) {
                focusableElementList[focusableElementList.length - 1].focus();
                return true;
            }
            return false;
        };

        $modalStack.isFocusInFirstItem = function(evt) {
            if (focusableElementList.length > 0) {
                return (evt.target || evt.srcElement) == focusableElementList[0];
            }
            return false;
        };

        $modalStack.isFocusInLastItem = function(evt) {
            if (focusableElementList.length > 0) {
                return (evt.target || evt.srcElement) == focusableElementList[focusableElementList.length - 1];
            }
            return false;
        };

        $modalStack.clearFocusListCache = function() {
            focusableElementList = [];
            focusIndex = 0;
        };
        // 可获取焦点的元素列表
        $modalStack.loadFocusElementList = function(modalWindow) {
            if (focusableElementList === undefined || !focusableElementList.length) {
                if (modalWindow) {
                    var modalDomE1 = modalWindow.value.modalDomEl;
                    if (modalDomE1 && modalDomE1.length) {
                        focusableElementList = modalDomE1[0].querySelectorAll(tababbleSelector);
                    }
                }
            }
        };

        return $modalStack;
    }
])

.provider('$uibModal', function() {
    var $modalProvider = {
        options: {
            animation: true,
            backdrop: true, //can also be false or 'static'
            keyboard: true
        },
        $get: ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$uibModalStack', '$modalSuppressWarning', '$log',
            function($injector, $rootScope, $q, $templateRequest, $controller, $modalStack, $modalSuppressWarning, $log) {
                var $modal = {};

                function getTemplatePromise(options) {
                    return options.template ? $q.when(options.template) :
                        $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
                }

                function getResolvePromises(resolves) {
                    var promisesArr = [];
                    angular.forEach(resolves, function(value) {
                        if (angular.isFunction(value) || angular.isArray(value)) {
                            promisesArr.push($q.when($injector.invoke(value)));
                        } else if (angular.isString(value)) {
                            promisesArr.push($q.when($injector.get(value)));
                        } else {
                            promisesArr.push($q.when(value));
                        }
                    });
                    return promisesArr;
                }

                var promiseChain = null;
                $modal.getPromiseChain = function() {
                    return promiseChain;
                };

                $modal.open = function(modalOptions) {
                    var modalResultDeferred = $q.defer();
                    var modalOpenedDeferred = $q.defer();
                    var modalRenderDeferred = $q.defer();

                    //prepare an instance of a modal to be injected into controllers and returned to a caller
                    var modalInstance = {
                        result: modalResultDeferred.promise,
                        opened: modalOpenedDeferred.promise,
                        rendered: modalRenderDeferred.promise,
                        close: function(result) {
                            return $modalStack.close(modalInstance, result);
                        },
                        dismiss: function(reason) {
                            return $modalStack.dismiss(modalInstance, reason);
                        }
                    };

                    //merge and clean up options 对话框参数设置
                    modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                    modalOptions.resolve = modalOptions.resolve || {};

                    //verify options
                    if (!modalOptions.template && !modalOptions.templateUrl) {
                        throw new Error('One of template or templateUrl options is required.');
                    }

                    var templateAndResolvePromise =
                        $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

                    function resolveWithTemplate() {
                        return templateAndResolvePromise;
                    }

                    // Wait for the resolution of the existing promise chain.
                    // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
                    // Then add to $modalStack and resolve opened.
                    // Finally clean up the chain variable if no subsequent modal has overwritten it.
                    var samePromise;
                    samePromise = promiseChain = $q.all([promiseChain])
                        .then(resolveWithTemplate, resolveWithTemplate)
                        .then(function resolveSuccess(tplAndVars) {

                            var modalScope = (modalOptions.scope || $rootScope).$new();
                            modalScope.$close = modalInstance.close;
                            modalScope.$dismiss = modalInstance.dismiss;

                            modalScope.$on('$destroy', function() {
                                // 非正常结束
                                if (!modalScope.$$uibDestructionScheduled) {
                                    modalScope.$dismiss('$uibUnscheduledDestruction');
                                }
                            });

                            var ctrlInstance, ctrlLocals = {};
                            var resolveIter = 1;

                            //controllers
                            if (modalOptions.controller) {
                                // 设置控制器本地变量
                                ctrlLocals.$scope = modalScope;
                                ctrlLocals.$uibModalInstance = modalInstance;
                                Object.defineProperty(ctrlLocals, '$modalInstance', {
                                    get: function() {
                                        if (!$modalSuppressWarning) {
                                            $log.warn('$modalInstance is now deprecated. Use $uibModalInstance instead.');
                                        }

                                        return modalInstance;
                                    }
                                });
                                // 附加本地变量 resolve 
                                angular.forEach(modalOptions.resolve, function(value, key) {
                                    ctrlLocals[key] = tplAndVars[resolveIter++];
                                });
                                // 创建控制器
                                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                                if (modalOptions.controllerAs) {
                                    if (modalOptions.bindToController) {
                                        angular.extend(ctrlInstance, modalScope);
                                    }

                                    modalScope[modalOptions.controllerAs] = ctrlInstance;
                                }
                            }

                            $modalStack.open(modalInstance, {
                                scope: modalScope,
                                deferred: modalResultDeferred,
                                renderDeferred: modalRenderDeferred,
                                content: tplAndVars[0],
                                animation: modalOptions.animation,
                                backdrop: modalOptions.backdrop,
                                keyboard: modalOptions.keyboard,
                                backdropClass: modalOptions.backdropClass,
                                windowTopClass: modalOptions.windowTopClass,
                                windowClass: modalOptions.windowClass,
                                windowTemplateUrl: modalOptions.windowTemplateUrl,
                                size: modalOptions.size,
                                openedClass: modalOptions.openedClass
                            });
                            // 创建成功。
                            modalOpenedDeferred.resolve(true);

                        }, function resolveError(reason) {
                            modalOpenedDeferred.reject(reason);
                            modalResultDeferred.reject(reason);
                        })
                        .finally(function() {
                            if (promiseChain === samePromise) {
                                promiseChain = null;
                            }
                        });

                    return modalInstance;
                };

                return $modal;
            }
        ]
    };

    return $modalProvider;
});

