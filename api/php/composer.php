项目的引导文件中：
require 'vendor/autoload.php';


在安装依赖后，Composer 将把安装时确切的版本号列表写入 composer.lock 文件。这将锁定项目的特定版本。
请提交你应用程序的 composer.lock （包括 composer.json）到你的版本库中

这是非常重要的，因为 install 命令将会检查锁文件是否存在，如果存在，它将下载指定的版本（忽略 composer.json 文件中的定义）。

这意味着，任何人建立项目都将下载与指定版本完全相同的依赖。
----
在 composer.json 的 autoload 字段中增加自己的 autoloader。
Composer 将注册一个 PSR-4 autoloader 到 App 命名空间。
"autoload": {
    "classmap": [
        "database"
    ],
    "psr-4": {
    // "项目的命名空间\\":"vendor 的兄弟目录 app/下的所有文件"
        "App\\": "app/"
    }
},

添加 autoload 字段后，你应该再次运行 install 命令来生成 vendor/autoload.php 文件。
除了 PSR-4 自动加载，classmap 也是支持的。这允许类被自动加载，即使不符合 PSR-0 规范。

虽然包名不区分大小写，但惯例是使用小写字母，并用连字符作为单词的分隔。

php 表示用户的 PHP 版本要求
hhvm 代表的是 HHVM（也就是 HipHop Virtual Machine） 运行环境的版本，并且允许你设置一个版本限制，例如，'>=2.3.3'。
ext-<name> 可以帮你指定需要的 PHP 扩展（包括核心扩展）
lib-<name> 允许对 PHP 库的版本进行限制。
可以使用 composer show --platform 命令来获取可用的平台软件包的列表。
-----
如果你愿意，可以在你的项目中提交 composer.lock 文件。他将帮助你的团队始终针对同一个依赖版本进行测试。任何时候，这个锁文件都只对于你的项目产生影响。

如果你不想提交锁文件，并且你正在使用 Git，那么请将它添加到 .gitignore 文件中。
----- 命令行
http://docs.phpcomposer.com/03-cli.html

进程退出代码

    0: 正常
    1: 通用/未知错误
    2: 依赖关系处理错误
-----------
install -- 运行 
--dry-run 命令，它将模拟安装并显示将会发生什么。
--dev: 安装 require-dev 字段中列出的包（这是一个默认值）。
--no-scripts: 跳过 composer.json 文件中定义的脚本。
--no-progress: 移除进度信息，这可以避免一些不处理换行的终端或脚本出现混乱的显示。
--optimize-autoloader (-o): 转换 PSR-0/4 autoloading 到 classmap 可以获得更快的加载支持。
特别是在生产环境下建议这么做，但由于运行需要一些时间，因此并没有作为默认值。

----
update -- 更新
只是想更新几个包，你可以像这样分别列出它们：
php composer.phar update vendor/package vendor/package2

其他参数同上 install
--lock: 仅更新 lock 文件的 hash，取消有关 lock 文件过时的警告。
--with-dependencies 同时更新白名单内包的依赖关系，这将进行递归更新。

----
require -- 命令增加新的依赖包到当前目录的 composer.json 文件中。
在添加或改变依赖时， 修改后的依赖关系将被安装或者更新。

--no-update: 禁用依赖关系的自动更新。
--update-with-dependencies 一并更新新装包的依赖。

----
全局执行 global
如果你将 $COMPOSER_HOME/vendor/bin 加入到了 $PATH 环境变量中，你就可以用它在命令行中安装全局应用
php composer.phar global require fabpot/php-cs-fixer:dev-master

现在 php-cs-fixer 就可以在全局范围使用了
如果稍后你想更新它，你只需要运行 global update：

php composer.phar global update

----
搜索 search
为当前项目搜索依赖包，通常它只搜索 packagist.org 上的包
php composer.phar search monolog
--only-name (-N): 仅针对指定的名称搜索（完全匹配）。

----
展示 show 列出所有可用的软件包

    --installed (-i): 列出已安装的依赖包。
    --platform (-p): 仅列出平台软件包（PHP 与它的扩展）。
    --self (-s): 仅列出当前项目信息。

composer show intervention/image

----
依赖性检测 depends

depends 命令可以查出已安装在你项目中的某个包，是否正在被其它的包所依赖，并列出他们。

--link-type: 检测的类型，默认为 require 也可以是 require-dev。

-----
有效性检测 validate

检测 composer.json 文件是否是有效的
php composer.phar validate

-----
依赖包状态检测 status

如果你经常修改依赖包里的代码，并且它们是从 source（自定义源）进行安装的，那么 status 命令允许你进行检查，如果你有任何本地的更改它将会给予提示。

php composer.phar status

----
自我更新 self-update

将 Composer 自身升级到最新版本，只需要运行 self-update 命令。

    --rollback (-r): 回滚到你已经安装的最后一个版本。
    --clean-backups: 在更新过程中删除旧的备份，这使得更新过后的当前版本是唯一可用的备份。
----
更改配置 config
php composer.phar config --list

更改配置-参数

    --global (-g): 操作位于 $COMPOSER_HOME/config.json 的全局配置文件。如果不指定该参数，此命令将影响当前项目的 composer.json 文件，或 --file 参数所指向的文件。
    --editor (-e): 使用文本编辑器打开 composer.json 文件。默认情况下始终是打开当前项目的文件。当存在 --global 参数时，将会打开全局 composer.json 文件。
    --unset: 移除由 setting-key 指定名称的配置选项。
    --list (-l): 显示当前配置选项的列表。当存在 --global 参数时，将会显示全局配置选项的列表。
    --file="..." (-f): 在一个指定的文件上操作，而不是 composer.json。注意：不能与 --global 参数一起使用。

修改包来源

除了修改配置选项， config 命令还支持通过以下方法修改来源信息：

php composer.phar config repositories.foo vcs http://github.com/foo/bar

----
创建项目 create-project
你可以使用 Composer 从现有的包中创建一个新的项目。这相当于执行了一个 git clone 或 svn checkout 命令后将这个包的依赖安装到它自己的 vendor 目录。

创建项目-参数

    --repository-url: 提供一个自定义的储存库来搜索包，这将被用来代替 packagist.org。可以是一个指向 composer 资源库的 HTTP URL，或者是指向某个 packages.json 文件的本地路径。
    --stability (-s): 资源包的最低稳定版本，默认为 stable。
    --prefer-source: 当有可用的包时，从 source 安装。
    --prefer-dist: 当有可用的包时，从 dist 安装。
    --dev: 安装 require-dev 字段中列出的包。
    --no-install: 禁止安装包的依赖。
    --no-plugins: 禁用 plugins。
    --no-scripts: 禁止在根资源包中定义的脚本执行。
    --no-progress: 移除进度信息，这可以避免一些不处理换行的终端或脚本出现混乱的显示。
    --keep-vcs: 创建时跳过缺失的 VCS 。如果你在非交互模式下运行创建命令，这将是非常有用的。

----
打印自动加载索引 dump-autoload

某些情况下你需要更新 autoloader，例如在你的包中加入了一个新的类。你可以使用 dump-autoload 来完成，而不必执行 install 或 update 命令。

打印自动加载索引-参数

    --optimize (-o): 转换 PSR-0/4 autoloading 到 classmap 获得更快的载入速度。这特别适用于生产环境，但可能需要一些时间来运行，因此它目前不是默认设置。
    --no-dev: 禁用 autoload-dev 规则。

----
执行脚本 run-script

你可以运行此命令来手动执行 脚本，只需要指定脚本的名称，可选的 --no-dev 参数允许你禁用开发者模式。

诊断 diagnose

归档 archive

此命令用来对指定包的指定版本进行 zip/tar 归档。它也可以用来归档你的整个项目，不包括 excluded/ignored（排除/忽略）的文件。

php composer.phar archive vendor/package 2.0.21 --format=zip


COMPOSER_HOME

它在各个系统上的默认值分别为：

    *nix /home/<user>/.composer。
    OSX /Users/<user>/.composer。
    Windows C:\Users\<user>\AppData\Roaming\Composer。
----------------------------------

http://docs.phpcomposer.com/04-schema.html

安装类型 type

包的安装类型，默认为 library。

composer 原生支持以下4种类型：

    library: 这是默认类型，它会简单的将文件复制到 vendor 目录。
    project: 这表示当前包是一个项目，而不是一个库。例：框架应用程序 Symfony standard edition，内容管理系统 SilverStripe installer 或者完全成熟的分布式应用程序。使用 IDE 创建一个新的工作区时，这可以为其提供项目列表的初始化。
    metapackage: 当一个空的包，包含依赖并且需要触发依赖的安装，这将不会对系统写入额外的文件。因此这种安装类型并不需要一个 dist 或 source。
    composer-plugin: 一个安装类型为 composer-plugin 的包，它有一个自定义安装类型，可以为其它包提供一个 installler。详细请查看 自定义安装类型。


require

必须的软件包列表，除非这些依赖被满足，否则不会完成安装。

require-dev (root-only)

这个列表是为开发或测试等目的，额外列出的依赖。“root 包”的 require-dev 默认是会被安装的。然而 install 或 update 支持使用 --no-dev 参数来跳过 require-dev 字段中列出的包。

replace

这个列表中的包将被当前包取代。这使你可以 fork 一个包，以不同的名称和版本号发布，同时要求依赖于原包的其它包，在这之后依赖于你 fork 的这个包，因为它取代了原来的包。

suggest

建议安装的包，它们增强或能够与当前包良好的工作。
------------------------------------------------
http://docs.phpcomposer.com/05-repositories.html

Package

如果你想使用一个项目，它无法通过上述任何一种方式支持 composer，你仍然可以使用 package 类型定义资源库。
这是一个 smarty 模板引擎的例子：

{
    "repositories": [
        {
            "type": "package",
            "package": {
                "name": "smarty/smarty",
                "version": "3.1.7",
                "dist": {
                    "url": "http://www.smarty.net/files/Smarty-3.1.7.zip",
                    "type": "zip"
                },
                "source": {
                    "url": "http://smarty-php.googlecode.com/svn/",
                    "type": "svn",
                    "reference": "tags/Smarty_3_1_7/distribution/"
                },
                "autoload": {
                    "classmap": ["libs/"]
                }
            }
        }
    ],
    "require": {
        "smarty/smarty": "3.1.*"
    }
}

资源库
https://github.com/composer/satis