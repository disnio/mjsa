http://lugir.com/book

节点是 Drupal 中的一个通用术语，表示网站中的各种内容（content）。通俗来讲，节点就是网站中的各种文章页面
区块（Blocks）是一些用于放置到区域（region）中的内容块，因此被称为区块。

主题：
http://www.ibm.com/developerworks/cn/opensource/os-new-drupal-theme/
http://blog.csdn.net/wjc19911118/article/details/7752479
主题 tpl 可用变量：
https://www.drupal.org/node/190815

在 Drupal 7 中创建自定义 Web 服务项目
http://www.ibm.com/developerworks/cn/opensource/os-drupal-web-service-project/index.html

http://lugir.com/story/303.html
Panels 模块允许站点管理员（有时可以是用户）维护更改页面、边栏及内容中某个部分的布局，
并且就像控制让哪些内容在页面布局中被显示一样容易。

Drupal 用户熟悉 Drupal 默认的布局机制，即定义区域(Regions)和区块(Blocks)，然后将区块分配到主题中不同的区域即可。
Panels 模块将这个机制又向前进了一步。通过 Panels 接口，你可以通过创建一个布局(layout)
作为开始，然后可以在这个布局中添加任意数量地列(columns)、页头(headers)和页脚(footer)，并对它们的宽度进行控制。

Panel pages 是最主要的 Panels 模块，可以通过它创建页面的布局。

Panel nodes 是创建页面中仅内容区域的布局的实用工具。有时你可能会希望能够在节点布局中添加一些区域，比如为新闻或者照片添加一个评分区域，但又不想添加到所有节点中。Panel Nodes 让你可以对单个节点的布局进行控制，并向其中添加博客、图片。

Mini panels 是一个区块布局的控制机制。使用 mini panels 可以创建一个小的面板(panel)，并通过向其中添加内容及其它元素，使它们就像一个区块中的内容，然后只需要将这个 mini panels 放置到 panels-page 或 panels-node 中即可。就像将区块(block)放置到区域(region)中一样简单。
-------------------
search（搜索）、filter（过滤）、faceted（分面搜索）、Solr（Apache Solr）。因为 filter 在 Drupal 里是“输入格式”的专有名词，进行这个搜索得到的结果往往并非是我们所需要的。

将节点的字段作为过滤条件显示（暴露）出来，即可实现通过多条件/多形式进行过滤的功能，然后因为 Views 使用过滤条件时使用 GET 方式将参数追加到 URL 后，因此只要边栏的另外两个视图同样能够接收 URL 中的参数，就可以实现一处过滤，多处过滤的条件导航了。

计算字段图片数量：
echo count($content['field_pics']['#items']); 