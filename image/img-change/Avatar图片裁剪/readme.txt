UCenter中上传头像功能的剥离

2010-10-15

本文的内容仅供技术交流学习之用，相关的代码并未考虑实际应用系统中所必需的用户身份验证等功能，同时由于 UCenter 发行许可的限制，请勿将本文附带的代码直接用于实际的产品或项目中。

Discuz! 和 UCHome 中的头像上传功能很好用，大概有不少人和我一样想弄清楚它是怎么实现的，甚至希望移植到自己的应用系统中。

这个功能其实是在 UCenter 中实现的（这是 Discuz! 和 UCHome 等其它相关产品都依赖的公共模块），通过一个 Flash 文件（camera.swf），跟服务端的 PHP 程序配合完成的。

UCenter/UCHome 本身是开源的，但那个 camera.swf 并没有提供源代码。我们可以通过对 PHP 程序进行分析研究，进而基本摸清这个功能操作的细节，并最终将其剥离出来，独立于 UCenter 而独立运行。本文内容依据的是 UCenter1.5.0/UCHome2.0 。

首先我们来看一下 UCenter/UCHome 中这个功能是怎么工作的。

■ 基本步骤

0. 浏览器访问 UCHome 中的一个 web 页面，其中包含 camera.swf。为保证 camera.swf 能正常工作，在其相同的路径下需要有 locale.xml 文件。

    装载 camera.swf 的 HTML 代码可以由下面的程序生成：

        home\uc_client\client.php : uc_avatar()

    生成的内容大致如下：

        <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="447" height="477" id="mycamera" align="middle">
            <param name="allowScriptAccess" value="always" />
            <param name="scale" value="exactfit" />
            <param name="wmode" value="transparent" />
            <param name="quality" value="high" />
            <param name="bgcolor" value="#ffffff" />
            <param name="movie" value="http://localhost/center/images/camera.swf?inajax=1&appid=1&input=6b49vKhr%2FC4VpMIMCAt07Kr2eQk8jjY%2F6vtvDonod47dU7JK%2BxVFJPIVY%2FJGMQoSpzHylapBa8FbsEWFGorPwZDJRM10wGjxvbHKTVmVgrng%2BpoSTTsk%2BE3U&agent=a523e70c80e13e4eaee37c7f4bde4f2c&ucapi=http%3A%2F%2Flocalhost%2Fcenter&avatartype=virtual" />
            <param name="menu" value="false" />
            <embed src="http://localhost/center/images/camera.swf?inajax=1&appid=1&input=6b49vKhr%2FC4VpMIMCAt07Kr2eQk8jjY%2F6vtvDonod47dU7JK%2BxVFJPIVY%2FJGMQoSpzHylapBa8FbsEWFGorPwZDJRM10wGjxvbHKTVmVgrng%2BpoSTTsk%2BE3U&agent=a523e70c80e13e4eaee37c7f4bde4f2c&ucapi=http%3A%2F%2Flocalhost%2Fcenter&avatartype=virtual"
                quality="high"
                bgcolor="#ffffff"
                width="447"
                height="477"
                name="mycamera"
                align="middle"
                allowScriptAccess="always"
                allowFullScreen="false"
                scale="exactfit"
                wmode="transparent"
                type="application/x-shockwave-flash"
                pluginspage="http://www.macromedia.com/go/getflashplayer" />
        </object>

    参数分解如下：

        inajax      1
        appid       1
        input       6b49vKhr%2FC4VpMIMCAt07Kr2eQk8jjY%2F6vtvDonod47dU7JK%2BxVFJPIVY%2FJGMQoSpzHylapBa8FbsEWFGorPwZDJRM10wGjxvbHKTVmVgrng%2BpoSTTsk%2BE3U
        agent       a523e70c80e13e4eaee37c7f4bde4f2c
        ucapi       http://localhost/center
        avatartype  virtual

    其中的关键参数为 ucapi，后面两步 POST 的 URL 为 <ucapi>/index.php

    这里的 "/index.php" 似乎是 hardcode 在 camera.swf 里的，不过在最后的程序代码中会看到，如果我们指定的 ucapi 明确给定了一个 php 文件的话，可以绕开 index.php 这个文件名。换句话说，如果服务端不是采用 PHP，而是另外一种编程语言的话（比如 Java/.NET 等），也是可以实现的。

1. 用户在 camera.swf 中“选择图片”后，camera.swf 会立刻把选中的图片上传到服务器。

    $_SERVER

        REQUEST_URI /center/index.php?m=user&inajax=1&a=uploadavatar&appid=1&input=ca68o1L41a1HkbmhMJVGHu0oFjxYXwadnUT9HnFpnyz5AgiZcsVGecPP38w%2BwM7XtT79zC5WMWlH8T7LvluCSXS3YUsrcJDoD1ySILNO2xo63hmBAvXVX24f&agent=a523e70c80e13e4eaee37c7f4bde4f2c&avatartype=virtual
        METHOD      POST

    $_GET

        m           user
        inajax      1
        a           uploadavatar
        appid       1
        input       ca68o1L41a1HkbmhMJVGHu0oFjxYXwadnUT9HnFpnyz5AgiZcsVGecPP38w+wM7XtT79zC5WMWlH8T7LvluCSXS3YUsrcJDoD1ySILNO2xo63hmBAvXVX24f
        agent       a523e70c80e13e4eaee37c7f4bde4f2c
        avatartype  virtual

    $_POST

        Filename    something.jpg
        Upload      Submit Query

    $_FILES

        图片文件内容

    处理程序为：

        center\control\user.php : onuploadavatar()

    程序返回的内容为保存该文件的临时位置，比如：

        http://localhost/center/data/tmp/upload5.jpg

    camera.swf 会通过上面这个网址来读取图片，显示供操作。还可以有以下返回值作为错误代码：

        -1 : Invalid identity!
        -2 : Invalid photograph!
        -3 : No photograph be upload!
        -4 : Can not write to the data/tmp folder!
        -5 : Server can not upload!

2. 用户在 camera.swf 中“确定”后，camera.swf 会向服务器上传 3 个图片数据，作为大、中、小尺寸的头像图片。

    $_SERVER

        REQUEST_URI /center/index.php?m=user&inajax=1&a=rectavatar&appid=1&input=ca68o1L41a1HkbmhMJVGHu0oFjxYXwadnUT9HnFpnyz5AgiZcsVGecPP38w%2BwM7XtT79zC5WMWlH8T7LvluCSXS3YUsrcJDoD1ySILNO2xo63hmBAvXVX24f&agent=a523e70c80e13e4eaee37c7f4bde4f2c&avatartype=virtual&randomnumber=5478
        METHOD      POST

    $_GET

        m               user
        inajax          1
        a               rectavatar
        appid           1
        input           ca68o1L41a1HkbmhMJVGHu0oFjxYXwadnUT9HnFpnyz5AgiZcsVGecPP38w+wM7XtT79zC5WMWlH8T7LvluCSXS3YUsrcJDoD1ySILNO2xo63hmBAvXVX24f
        agent           a523e70c80e13e4eaee37c7f4bde4f2c
        avatartype      virtual
        randomnumber    5478

    $_POST

        avatar1     ...<big>
        avatar3     ...<middle>
        avatar2     ...<small>

    处理程序为：

        center\control\user.php : onrectavatar()

    程序的返回内容为：

        成功时: <?xml version="1.0" ?><root><face success="1"/></root>

        失败时: <root><message type="error" value="-1" /></root>

3. 上传完成后，如果 camera.swf 能找到名为 updateavatar() 的 Javascript function，就会调用它。


■ 参数分析

在上面第 0 步生成的 HTML 中，指向 camera.swf 的 URL 携带了一些参数，其中最关键的是 ucapi，它决定了第 1 步和第 2 步的 HTTP Request 发往哪里。

其它几个都是 UCenter 应用系统所需要的参数。camera.swf 是专为 UCenter 设计的，所以它特别支持这几个参数值，也就是说，在访问 camera.swf 的 URL 里包含了什么值，在后续访问 ucapi 的时候就会原样传回来。

camera.swf 没有提供源代码，没办法改造，但并不妨碍我们使用它。比如，我们可以借用 input 这个参数，把自己应用程序所需要的自定义参数（比如 user id）统一编码装在这个值里。


■ 剥离实现

搞清楚了功能操作的细节和参数含义，重新实现这个功能就很容易了。

所谓重新剥离实现，就是在直接借用 camera.swf/locale.xml 这两个文件的前提下，重新编写服务器端的处理程序，实现头像上传功能，脱离 UCenter 独立运行。

理论上任何服务端编程语言都可以，我这里只给出 PHP 的代码。

包含了三个程序文件：

    avatar.php  -- 实现了上面“基本步骤”中提到的全部功能
    camera.swf  -- 提取自 UCenter
    locale.xml  -- 提取自 UCenter

将这三个文件部署到 web server 上，然后访问 http://localhost/avatar.php 即可。还可以在 URL 上指定一个 uid 作为“用户标识”，比如 http://localhost/avatar.php?uid=5

程序下载地址: http://maquan.download.csdn.net/
