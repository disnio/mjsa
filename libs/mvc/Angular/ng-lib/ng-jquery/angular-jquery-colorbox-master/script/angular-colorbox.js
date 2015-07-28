angular.module('colorbox', [])
        .directive('colorbox', function($compile, $rootScope) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs, $compile) {
                    $(element).click('bind', function() {
                        $.colorbox({
                            // data sources
                            html: attrs.html || false,
                            photo: attrs.photo || false,
                            iframe: attrs.iframe || false,
                            inline: attrs.inline || false,
                            // behavior and appearance
                            transition: attrs.transition || "elastic",
                            speed: attrs.speed || 300,
                            fadeOut: attrs.fadeOut || 300,
                            width: attrs.width || false,
                            initialWidth: attrs.initialWidth || "600",
                            innerWidth: attrs.innerWidth || false,
                            maxWidth: attrs.maxWidth || false,
                            height: attrs.height || false,
                            initialHeight: attrs.initialHeight || "450",
                            innerHeight: attrs.innerHeight || false,
                            maxHeight: attrs.maxHeight || false,
                            scalePhotos: attrs.scalePhotos || true,
                            scrolling: attrs.scrolling || true,
                            href: attrs.href || false,
                            title: attrs.title || false,
                            rel: attrs.rel || false,
                            opacity: attrs.opacity || 0.9,
                            preloading: attrs.preloading || true,
                            className: attrs.className || false,
                            overlayClose: attrs.overlayClose || true,
                            escKey: attrs.escKey || true,
                            arrowKey: attrs.arrowKey || true,
                            top: attrs.top || false,
                            bottom: attrs.bottom || false,
                            left: attrs.left || false,
                            right: attrs.right || false,
                            fixed: attrs.fixed || false,
                            data: attrs.data || undefined,
                            closeButton: attrs.closeButton || true,
                            fastIframe: attrs.fastIframe || true,
                            open: attrs.open || false,
                            reposition: attrs.reposition || true,
                            loop: attrs.loop || true,
                            slideshow: attrs.slideshow || false,
                            slideshowAuto: attrs.slideshowAuto || true,
                            slideshowSpeed: attrs.slideshowSpeed || 2500,
                            slideshowStart: attrs.slideshowStart || "start slideshow",
                            slideshowStop: attrs.slideshowStop || "stop slideshow",
                            photoRegex: attrs.photoRegex || /\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,
                            // alternate image paths for high-res displays
                            retinaImage: attrs.retinaImage || false,
                            retinaUrl: attrs.retinaUrl || false,
                            retinaSuffix: attrs.retinaSuffix || '@2x.$1',
                            // internationalization
                            current: attrs.current || "image {current} of {total}",
                            previous: attrs.previous || "previous",
                            next: attrs.next || "next",
                            close: attrs.close || "close",
                            xhrError: attrs.xhrError || "This content failed to load.",
                            imgError: attrs.imgError || "This image failed to load.",
                            // accessbility
                            returnFocus: attrs.returnFocus || true,
                            trapFocus: attrs.trapFocus || true,
                            // callbacks
                            onOpen: (attrs.onOpen ? (scope.registeredCallbacks && scope.registeredCallbacks.hasOwnProperty(attrs.onOpen) ? scope.registeredCallbacks[attrs.onOpen]() : false) : false),
                            onLoad: (attrs.onLoad ? (scope.registeredCallbacks && scope.registeredCallbacks.hasOwnProperty(attrs.onLoad) ? scope.registeredCallbacks[attrs.onLoad]() : false) : false),
                            onComplete: (attrs.onComplete ? (scope.registeredCallbacks && scope.registeredCallbacks.hasOwnProperty(attrs.onComplete) ? scope.registeredCallbacks[attrs.onComplete]() : false) : false),
                            onCleanup: (attrs.onCleanup ? (scope.registeredCallbacks && scope.registeredCallbacks.hasOwnProperty(attrs.onCleanup) ? scope.registeredCallbacks[attrs.onCleanup]() : false) : false),
                            onClosed: (attrs.onClosed ? (scope.registeredCallbacks && scope.registeredCallbacks.hasOwnProperty(attrs.onClosed) ? scope.registeredCallbacks[attrs.onClosed]() : false) : false)
                        });

                    });
                }
            };
        });
