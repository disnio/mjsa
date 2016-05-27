requirejs.config({
    baseUrl: ucConfig.ServerReferenceJavaScript + "/Scripts",
    urlArgs: "bust=" + (new Date()).getTime(),
    shim: {
        'jquery.migrate': ['jquery'],
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bs'
        },
        loading: {
            deps: ['jquery'],
            exports: 'loading',
        },
        smartpaginator: {
            deps: ['jquery'],
            exports: "smartpaginator",
        },
        jPages: {
            deps: ['jquery'],
            exports: 'jPages',
        },
        maxlength: {
            deps: ['jquery'],
            exports: "maxlength",
        },
        validate: ['jquery'],
        'jquery.ui.widget': ['jquery'],
        'jquery.iframe-transport': ['jquery'],
        'jquery.fileupload': {
            deps: ['jquery.ui.widget', 'jquery.iframe-transport'],
            exports: 'jqfileupload'
        },
        'bdeditor': {
            deps: ['UMEditor/umeditor.config']
        },
        'bdlang': {
            deps: ['bdeditor']
        }
        // 'webuploader.flashonly': ['jquery']
    },
    // '//cdn.bootcss.com/jquery/1.11.3/jquery.min', 
    paths: {
        jquery: ['jquery-1.11.3'],
        'jquery.migrate': ['//cdn.bootcss.com/jquery-migrate/1.3.0/jquery-migrate.min', 'js/jquery-migrate-1.3.0'],
        _: ['//cdn.bootcss.com/lodash.js/3.6.0/lodash.min', 'lodash.min'],
        text: "text",
        bootstrap: ['bootstrap.min'],
        purl: 'js/lib/purl',
        loading: 'js/lib/loading',
        moment: ['//cdn.bootcss.com/moment.js/2.7.0/moment.min', 'moment.min'],
        smartpaginator: 'js/lib/smartpaginator',
        jPages: 'js/lib/jPages',
        maxlength: 'js/lib/maxlength',
        validate: ['//cdn.bootcss.com/jquery-validate/1.11.1/jquery.validate.min', 'jquery.validate.min'],
        'jquery.ui.widget': ['//cdn.bootcss.com/blueimp-file-upload/9.10.4/vendor/jquery.ui.widget', 'js/lib/jquery.ui.widget'],
        'jquery.fileupload': ['//cdn.bootcss.com/blueimp-file-upload/9.10.4/jquery.fileupload', 'jQuery.FileUpload/jquery.fileupload'],
        'jquery.iframe-transport': ['//cdn.bootcss.com/blueimp-file-upload/9.10.4/jquery.iframe-transport', 'jQuery.FileUpload/jquery.iframe-transport'],
        'bdeditor': 'UMEditor/umey',
        'bdlang': 'UMEditor/lang/zh-cn/zh-cn'
        // 'zeroclipboard': 'UMEditor/third-party/zeroclipboard/ZeroClipboard'
        // 'webuploader.flashonly':['webuploader/webuploader.flashonly']
    }
    // enforceDefine: true
});
