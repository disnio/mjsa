/* 
 * @Author: Allen
 * @Date:   2016-03-21 10:52:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-09-13 14:21:10
 */
yob.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('cate', {
            url: '/',
            templateUrl: ucConfig.ServerReferenceJavaScript + '/Scripts/tpl/category.html',
            controller: 'CategoryController',
            controllerAs: 'vm',
            resolve: {
                loadCategory: ["$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load([ucConfig.ServerReferenceJavaScript + "/Scripts/js/app/category.controller.js"])
                }]
            }
        })
        .state('pub', {
            url: '/pub',
            templateUrl: ucConfig.ServerReferenceJavaScript + '/Scripts/tpl/publishProduct.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                loadPublishProduct: ["$ocLazyLoad", "$injector", function($ocLazyLoad, $injector) {
                    return $ocLazyLoad.load([
                        ucConfig.ServerReferenceJavaScript + "/Scripts/jQuery.FileUpload/cors/jquery.xdr-transport.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/js/lib/jquery.ui.widget.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/jQuery.FileUpload/jquery.iframe-transport.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/jQuery.FileUpload/jquery.fileupload.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/js/lib/imgLiquid-min.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/My97DatePicker/WdatePicker.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/moment.min.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/UMEditor/themes/default/css/umeditor.css",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/UMEditor/umeditor.config.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/UMEditor/umeditor.js",
                        ucConfig.ServerReferenceJavaScript + "/Scripts/js/lib/ngueditor.js",
                        ucConfig.ServerReferenceJavaScript+"/Scripts/js/app/publishProduct.controller.js",
                        ucConfig.ServerReferenceJavaScript+"/Scripts/js/app/product.directive.js",
                        ucConfig.ServerReferenceJavaScript+"/Scripts/js/app/product.filter.js"
                    ]).then(function(){
                        $ocLazyLoad.load([ ucConfig.ServerReferenceJavaScript + "/Scripts/UMEditor/lang/zh-cn/zh-cn.js" ]);
                    })
                }]
            }
        });

    $urlRouterProvider.otherwise('/');

})
