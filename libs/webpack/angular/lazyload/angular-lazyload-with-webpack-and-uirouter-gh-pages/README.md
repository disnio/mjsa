# angular-lazyload-with-webpack-and-uirouter
angular lazyload with webpack and ui-router

> 集成了angular webpack ui-router oclazyload H+ 等实现的一个页面懒加载的angular项目脚手架。

## 在线预览
[预览地址](http://wandergis.com/angular-lazyload-with-webpack-and-uirouter/dist/#/login)

    用户名：admin
    密码：admin

## 相关功能
- 懒加载
- 实时预览调试
- 自动插入css、js,增加版本号
- 打包压缩
- cdn资源替换
- 代理转发
- 简单auth验证逻辑

## 源码目录结构
    .
    ├── 404.html
    ├── app
    │   ├── app.js
    │   ├── controllers
    │   ├── directives
    │   ├── services
    │   ├── utils
    │   └── views
    │       ├── login
    │       │   ├── login.html
    │       │   └── login.js
    │       └── main
    │           ├── main.css
    │           ├── main.html
    │           └── main.js
    ├── css
    │   ├── animate.css
    │   ├── bootstrap.css
    │   ├── font-awesome.css
    │   ├── ...
    ├── favicon.ico
    ├── fonts
    │   ├── ...
    ├── images
    ├── index.html
    └── vendors
        ├── bootstrap.min.js
        └── ...

## Usage

    1. git clone 克隆仓库
    2. npm install 安装依赖
    3. npm run dev 然后打开http://localhost:8090实时调试
    4. npm run build 生成dist目录

