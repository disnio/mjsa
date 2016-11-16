var baseJs = ucConfig.ServerReferenceJavaScript;

requirejs.config({
    baseUrl: baseJs + "/Scripts",
    urlArgs: "bust=" + (new Date()).getTime(),
    shim: {
        // 'jquery.ui.widget': ['jquery'],
        // 'jquery.iframe-transport': ['jquery'],,'jquery.fileupload-process'
        'jquery.fileupload': {
            deps: ['jquery.ui.widget', 'jquery.iframe-transport']            
        },
        'jquery.fileupload-validate':{
            deps:['jquery.fileupload-process']
        },
        'bdeditor': {
            deps: ['UMEditor/umeditor.config']
        },
        'bdlang': {
            deps: ['bdeditor']
        }
    },
    paths: {
        // jquery: ['jquery-1.11.3'],
        'jquery.migrate'            : ['//cdn.bootcss.com/jquery-migrate/1.3.0/jquery-migrate.min', 'js/jquery-migrate-1.3.0'],
        text                        : "text",
        purl                        : 'js/lib/purl',
        loading                     : 'js/lib/loading',
        moment                      : ['//cdn.bootcss.com/moment.js/2.7.0/moment.min', 'moment.min'],
        smartpaginator              : 'js/lib/smartpaginator',
        jPages                      : 'js/lib/jPages',
        maxlength                   : 'js/lib/maxlength',
        validate                    : ['//cdn.bootcss.com/jquery-validate/1.11.1/jquery.validate.min', 'jquery.validate.min'],
        'jquery.ui.widget'          : ['js/lib/jquery.ui.widget'],
        'jquery.fileupload'         : ['jQuery.FileUpload/jquery.fileupload'],
        'jquery.iframe-transport'   : ['jQuery.FileUpload/jquery.iframe-transport'],
        'jquery.fileupload-process' : ['jQuery.FileUpload/jquery.fileupload-process'],
        'jquery.fileupload-validate': ['jQuery.FileUpload/jquery.fileupload-validate'],
        'bdeditor'                  : 'UMEditor/umey',
        'bdlang'                    : 'UMEditor/lang/zh-cn/zh-cn',
        // 'zeroclipboard': 'UMEditor/third-party/zeroclipboard/ZeroClipboard'
        // 'webuploader.flashonly':['webuploader/webuploader.flashonly']
        'ut': 'js/uc.ut',
        'ui':'js/uc.ui',
        'imgLiquid': 'js/lib/imgLiquid-min'
    }
    // enforceDefine: true
});