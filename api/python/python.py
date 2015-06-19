# 使用 ``*`` 来标记元组, ``**`` 来标记字典. 
# 下面两个语句是等价的:
result = function(*args, **kwargs)
result = apply(function, args, kwargs)
------
# ``import`` 其实是靠调用内建函数 ``_ _import_ _`` 来工作的. 
glob.glob("*.py")
os.path.splitext(os.path.basename(module_file))
__import__(module_name)
------
hyphens 连字符
module = __import__(module_name)
return getattr(module, function_name)
repr() 字符串化
-------
``dir`` 返回由给定模块, 类, 实例, 或其他类型的所有成员组成的列表
``getmember`` 函数返回给定类定义的所有类级别的属性和方法.
字典是无序的, 而列表和元组是有序的
``vars`` 函数与此相似, 它返回的是包含每个成员当前值的字典
-------
def load(file):
    if isinstance(file, type("")):
        file = open(file, "rb")
    return file.read()

``callable`` 函数, 检查一个对象是否是可调用的 (无论是直接调用或是通过 ``apply``). 
对于函数, 方法, ``lambda`` 函式, 类, 以及实现了 ``__call__`` 方法的类实例, 它都返回 True. 

 ``isinstance`` 函数,它会检查一个对象是不是给定类(或其子类)的实例.
 ``issubclass`` 函数与此相似, 它用于检查一个类对象是否与给定类相同,或者是给定类的子类.
 --------
``eval`` 函数将一个字符串作为 Python 表达式求值.
``eval`` 函数传递第 2个参数, 一个定义了该表达式求值时名称空间的字典. 
处理大块的代码使用 ``compile`` 和 ``exec`` 函数 
 ``execfile`` 函数, 一个从文件加载代码, 编译代码, 执行代码的快捷方式

BODY = """
print 'the ant, an introduction'
"""
code = compile(BODY, "<script>", "exec")
print code
exec code
---------
``listdir`` 函数返回给定目录中所有文件名(包括目录名)组成的列表
``getcwd`` 和 ``chdir`` 函数分别用于获得和改变当前工作目录
``makedirs`` 和 ``removedirs`` 函数用于创建或删除目录层
``removedirs`` 函数会删除所给路径中最后一个目录下所有的空目录. 
 ``mkdir`` 和 ``rmdir`` 函数只能处理单个目录级. 
删除非空目录, 用 ``shutil`` 模块中的 ``rmtree`` 函数. 
``stat`` 函数可以用来获取一个存在文件的信息
mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime = os.stat(file)
---------
``system`` 函数在当前进程下执行一个新命令, 并等待它完成
如果不确定参数的安全性, 那么最好使用     ``exec`` 或 ``spawn``
Unix 下, 通过组合使用 ``exec`` , ``fork`` 以及 ``wait`` 函数来从当前程序调用另一个程序,

=== 处理守护进程(Daemon Processes)===
Unix 系统中, 你可以使用 ``fork`` 函数把当前进程转入后台(一个"守护者/daemon"). 
一般来说, 你需要派生(fork off)一个当前进程的副本, 然后终止原进程。 

import os
import string

if os.name in ("nt", "dos"):
    exefile = ".exe"
else:
    exefile = ""

def spawn(program, *args):
    try:
        # possible 2.0 shortcut!
        return os.spawnvp(program, (program,) + args)
    except AttributeError:
        pass
    try:
        spawnv = os.spawnv
    except AttributeError:
        # assume it's unix
        pid = os.fork()
        if not pid:
            os.execvp(program, (program,) + args)
        return os.wait()[0]
    else:
        # got spawnv but no spawnp: go look for an executable
        for path in string.split(os.environ["PATH"], os.pathsep):
            file = os.path.join(path, program) + exefile
            try:
                return spawnv(os.P_WAIT, file, (file,) + args)
            except os.error:
                pass
        raise IOError, "cannot find executable"

spawn("python", "hello.py")
print "goodbye"
---------

``expandvars`` 函数将文件名中的环境变量替换为对应值
os.environ["USER"] = "user"
print os.path.expandvars("/home/$USER/config")

``walk`` 函数会帮你找出一个目录树下的所有文件。它的参数依次是目录名, 回调函数, 以及传递给回调函数的数据对象

----------
解释器启动后, ``argv`` 列表包含了传递给脚本的所有参数
def dump(module):
    print module, "=>",
    if module in sys.builtin_module_names:
        print "<BUILTIN>"
    else:
        module = __import__(module)
        print module.__file__

dump("os")
dump("sys")
dump("string")
---------
``modules`` 字典包含所有加载的模块. ``import`` 语句在从磁盘导入内容之前会先检查这个字典.
``getrefcount`` 函数 返回给定对象的引用记数
``platform`` 变量, 它包含主机平台的名称.
``setprofiler`` 函数允许你配置一个分析函数

要重定向输出只要创建一个对象, 并实现它的 ``write`` 方法.
执行至主程序的末尾时,解释器会自动退出. 但是如果需要中途退出程序, 你可以调用 ``sys.exit`` 函数
 你可以配置一个 "退出处理函数"(exit handler), 它将在程序退出的时候自动被调用.
----------
now = time.time()
time.localtime(now)[:6]

now = time.localtime(time.time())
print time.strftime("%Y-%m-%d %H:%M:%S %Z", now)
----------
``fileinput`` 模块允许你循环一个或多个文本文件的内容 chpt02-sect01
``shutil`` 实用模块包含了一些用于复制文件和文件夹的函数 chpt02-sect03
 ``tempfile`` 模块允许你快速地创建名称唯一的临时文件供使用. chpt02-sect04
---------
``StringIO`` 模块的使用. 它实现了一个工作在内存的文件对象(内存文件).  chpt02-sect05
在大多需要标准文件对象的地方都可以使用它来替换.
``StringIO`` 类实现了内建文件对象的所有方法, 此外还有 ``getvalue`` 方法用来返回它内部的字符串值. 
``StringIO`` 可以用于重新定向 Python 解释器的输出

``cStringIO`` 是一个可选的模块, 是 ``StringIO`` 的更快速实现. 它的工作方式和 ``StringIO`` 基本相同, 
但是它不可以被继承.
---------
``mmap`` 模块提供了操作系统内存映射函数的接口, 映射区域的行为和字符串对象类似, 但数据是直接从文件读取的. chpt02-sect07
``UserDict`` 模块包含了一个可继承的字典类 (事实上是对内建字典类型的 Python 封装). chpt02-sect08
``UserList`` 模块包含了一个可继承的列表类 (事实上是对内建列表类型的 Python 封装). chpt02-sect09

``UserString`` 模块包含两个类, //UserString// 和 //MutableString// .  chpt02-sect10
前者是对标准字符串类型的封装, 后者是一个变种, 允许你修改特定位置的字符(联想下列表就知道了).
注意 //MutableString// 并不是效率很好, 许多操作是通过切片和字符串连接实现的. 
如果性能很对你的脚本来说重要的话, 你最好使用字符串片断的列表或者 ``array`` 模块. 
---------
``traceback`` 模块允许你在程序里打印异常的跟踪返回(Traceback)信息, 类似未捕获异常时解释器所做的. chpt02-sect11
注意! 导入 traceback 会清理掉异常状态, 所以最好别在异常处理代码中导入该模块
``errno`` 模块定义了许多的符号错误码, 比如 ``ENOENT`` ("没有该目录入口") 以及 ``EPERM`` 
("权限被拒绝"). 它还提供了一个映射到对应平台数字错误代码的字典.  chpt02-sect12
----------
``getopt`` 模块包含用于抽出命令行选项和参数的函数.  chpt02-sect13
``getpass`` 模块提供了平台无关的在命令行下输入密码的方法.  chpt02-sect14

``glob`` 根据给定模式生成满足该模式的文件名列表, 和 Unix shell 相同. chpt02-sect15
``glob`` 返回完整路径名, 这点和 ``os.listdir`` 函数不同.
``glob`` 事实上使用了 ``fnmatch`` 模块来完成模式匹配.

``fnmatch`` 模块使用模式来匹配文件名.  chpt02-sect16

``random`` 模块包含许多随机数生成器.  chpt02-sect17
 ``randint`` 函数可以返回上界, 而其他函数总是返回小于上界的值. 所有函数都有可能返回下界值.

 