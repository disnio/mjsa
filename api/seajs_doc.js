seajs doc：
示例目录结构
examples/
    --app/
        --hello.html
    --sea-modules/
        --jquery/
        --angular/
        --seajs/
        --gallery/
        --examples/
            --hello/
                --1.0.0
                    --main-debug.js, main.js, style-debug.css, style.css
    --static
        --hello/
            --dist/
            --src/
            --Makefile
            --package.json

路径是相对于html页面当前位置的。
alias 则是相对于 base 的。
seajs.config({
    base: "../sea-modules/",
    alias: {
      "jquery": "jquery/jquery/1.10.1/jquery.js"
    }
});

seajs.use 也是根据 base 来使用的。
 // For development
if (location.href.indexOf("?dev") > 0) {
    seajs.use("../static/hello/src/main");
}
// For production
else {
    seajs.use("examples/hello/1.0.0/main");
}
