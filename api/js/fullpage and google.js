afterSlideLoad: function(anchorLink, index, slideIndex, direction){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-97041476-1', 'bluesmartmia.com');
    ga('send', 'pageview', { 'page': anchorLink, 'title': anchorLink });

}


afterLoad: function(orgin, destination){
    if(destination.index === 7){
        // 清除样式
    }

    if(destination.index === 8){
        // 开始动画
    }

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-YOURANALYTICSID', 'domain.nl');
    ga('send', 'pageview', { 'page': anchorLink, 'title': anchorLink });

    // 重复动画要重置 anime.js 实例的 children duration
    noOffset11.pause();
    noOffset11.seek(0);
    noOffset11.children = [];
    noOffset11.duration = 0;

    activateMouseflow();
}

MouseFlow
https://us.mouseflow.com/websites/a7d10357-5576-48ae-a821-b1c24e612fa3
user: peter@bluesmartmia.com
pass: Sleeve.1451

<!-- Mouseflow add-on -->
<script type="text/javascript">
var mouseflowCrossDomainSupport = true;
window._mfq = window._mfq || [];
var activateMouseflow = function() {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.async = true;
    mf.src = "//cdn.mouseflow.com/projects/a7d10357-5576-48ae-a821-b1c24e612fa3.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
  };
    activateMouseflow();

    _mfq.push(["tag", "m"+destination.index]);
    // _mfq.push(["config", "path", "/#m"+destination.index]);
    _mfq.push(["newPageView", "/m"]);
    _mfq.push(["start"]);
</script>
<!-- end of Mouseflow add-on -->