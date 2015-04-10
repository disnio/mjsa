## uwsgi + nginx 配置##
2015-04-02 09:05:11 武绍春

**前提是各个分站要在虚拟环境里面**

**uwsgi 安装**

https://pypi.python.org/pypi/uWSGI

pip install uwsgi

在 manage.py 同级目录下建立 dtest_wsgi.py 文件：

    import os
    import sys
    
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "artmall.settings")
    
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()

建立 dtest_wsgi.ini 文件：

    [uwsgi]
    vhost= true // 虚拟机
    socket= 127.0.0.1:8078 // 通信接口与 nginx
    chdir= /var/www/dtest/dtest/ // 项目目录
    wsgi-file = /var/www/dtest/dtest/dtest_wsgi.py // wsgi 启动文件
    virtualenv = /var/www/dtest/ // 虚拟环境目录

在运行前需要 manage.py runserver 能够正常启动

uwsgi dtest_wsgi.ini 启动站点。其它站点同上。

**安装 nginx**

rpm 包下载后安装，nginx 配置文件( )中加入：

    location /en/ {
         include        uwsgi_params;
         uwsgi_pass     127.0.0.1:8078;
         root /var/www/dtest/dtest;
    }

启动 nginx 

可参考下面：
http://www.cnblogs.com/xiongpq/p/3381069.html