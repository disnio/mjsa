// <script src="https://cdn.bootcss.com/angular-sanitize/1.5.8/angular-sanitize.js"></script>
// 'ngSanitize'
app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
