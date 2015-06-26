

>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print i, v
0 tic
1 tac

在字典中循环时，关键字和对应的值可以使用 iteritems()方法同时解读出来。 
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.iteritems():
...     print k, v

同时循环两个或更多的序列，可以使用 zip() 整体解读。 
in 和 not in 比较操作符审核值是否在一个区间之内。操作符 is is not 和比较两个对象是否相同；
在表达式内部不能赋值。

import fibo
这样做不会直接把 fibo中的函数导入当前的语义表；它只是引入了模块名 fibo。

import 语句的一个变体直接从被导入的模块中导入命名到本模块的语义表中。例如： 
>>> from fibo import fib, fib2
>>> fib(500)

from fibo import *
导入所有除了以下划线(_)开头的命名。

变量 sys.path 是解释器模块搜索路径的字符串列表。它由环境变量 PYTHONPATH 初始化，
用标准的字符串操作修改它： 
>>> import sys
>>> sys.path.append('/ufs/guido/lib/python')

dir() 用于按模块名搜索模块定义，
----------------

必须要有一个 __init__.py 文件的存在，才能使Python视该目录为一个包；
最简单的情况下，__init__.py 可以只是一个空文件，不过它也可能包含了包的初始化代码，或者设置了 __all__ 变量

还有另一种变体用于直接导入函数或变量： 
from Sound.Effects.echo import echofilter
使用 from package import item 方式导入包时，这个子项（item）既可以是包中的一个子模块（或一个子包）

使用类似import item.subitem.subsubitem 这样的语法时，这些子项必须是包，
最后的子项可以是包或模块也可以是包中定义的其它命名，像函数、类或变量。

执行 from package import * 时，如果包中的 __init__.py 代码定义了一个名为 __all__ 的链表，
就会按照链表中给出的模块名进行导入。

习惯上不主张从一个包或模块中用 import * 导入所有模块，因为这样的通常意味着可读性会很差。

包支持一个更为特殊的变量， __path__ 。 在包的 __init__.py 文件代码执行之前，
该变量初始化一个目录名列表。该变量可以修改，它作用于包中的子包和模块的搜索功能。

---------------
了解了迭代器协议的后台机制，就可以很容易的给自己的类添加迭代器行为。
定义一个 __iter__() 方法，使其返回一个带有 next() 方法的对象。
如果这个类已经定义了 next()，那么 __iter__() 只需要返回self：

class Reverse:
    "Iterator for looping over a sequence backwards"
    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self):
        return self

    def next(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]

>>> for char in Reverse('spam'):
    print char

生成器是创建迭代器的简单而强大的工具。写起来就像是正则函数，需要返回数据的时候使用 yield 语句。
每次 next() 被调用时，生成器回复它脱离的位置（它记忆语句最后一次执行的位置和所有的数据值）。
以下示例演示了生成器可以很简单的创建出来： 

>>> def reverse(data):
        for index in range(len(data)-1, -1, -1):
            yield data[index]

>>> for char in reverse('golf'):
        print char

自动创建了 __iter__() 和 next() 方法，生成器显得如此简洁。 
两次调用之间的局部变量和执行情况都自动保存了下来。


---------------
rjust() 函数把字符串输出到一列，并通过向左侧填充空格来使其右对齐。

zfill() 它用于向数值的字符串表达左侧填充0。该函数可以正确理解正负号

如果到了文件末尾，f.read()会返回一个空字符串（""）。 
f.tell()返回一个整数，代表文件对象在文件中的指针位置，该数值计量了自文件开头到指针处的比特数。
需要改变文件对象指针话话，使用"f.seek(offset,from_what)" 。
 from_what值为0表示自文件起初处开始，1表示自当前文件指针位置开始，2表示自文件末尾开始。 

pickle的标准模块。这是一个令人赞叹的模块，几乎可以把任何 Python对象 
（甚至是一些 Python 代码段！）表达为为字符串，这一过程称之为封装 （ pickling）。
从字符串表达出重新构造对象称之为拆封（ unpickling）。


---------------
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
---------- 检索， 随机， 加密
``getopt`` 模块包含用于抽出命令行选项和参数的函数.  chpt02-sect13
``getpass`` 模块提供了平台无关的在命令行下输入密码的方法.  chpt02-sect14

``glob`` 根据给定模式生成满足该模式的文件名列表, 和 Unix shell 相同. chpt02-sect15
``glob`` 返回完整路径名, 这点和 ``os.listdir`` 函数不同.
``glob`` 事实上使用了 ``fnmatch`` 模块来完成模式匹配.

``fnmatch`` 模块使用模式来匹配文件名.  chpt02-sect16

``random`` 模块包含许多随机数生成器.  chpt02-sect17
``randint`` 函数可以返回上界, 而其他函数总是返回小于上界的值. 所有函数都有可能返回下界值.

``md5`` (Message-Digest Algorithm 5)模块用于计算信息密文(信息摘要). chpt02-sect19
``sha`` 模块提供了计算信息摘要(密文)的另种方法, 生成的是 160 位签名
``crypt`` 模块实现了单向的 DES 加密, Unix 系统使用这个加密算法来储存密码, 这个模块真正也就只在检查这样的密码时有用.

``code`` 模块提供了一些用于模拟标准交互解释器行为的函数. chpt02-sect24
``compile_command`` 与内建 ``compile`` 函数行为相似, 但它会通过测试来保证你传递的是一个完成的 Python 语句.
//InteractiveConsole// 类实现了一个交互控制台, 类似你启动的 Python 解释器交互模式.

-------------- 线程
``threading`` 模块为线程提供了一个高级接口. chpt03-sect02
``Queue`` 模块提供了一个线程安全的队列 (queue) 实现. 你可以通过它在多个线程里安全访问同个对象.
``thread`` 模块提为线程提供了一个低级 (low_level) 的接口

``commands`` 模块包含一些用于执行外部命令的函数.  chpt03-sect05
 ``pipes`` 模块提供了 "转换管道 (conversion pipelines)" 的支持. 
 你可以创建包含许多外部工具调用的管道来处理多个文件. 
``popen2`` 模块允许你执行外部命令, 并通过流来分别访问它的 ``stdin`` 和 ``stdout`` ( 可能还有 ``stderr`` ). 
``signal`` 模块配置你自己的信号处理器 (signal handler), 当解释器收到某个信号时, 信号处理器会立即执行. 

-------------- 格式转换
``struct`` 模块用于转换二进制字符串和 Python 元组.  chpt04-sect03
``pack`` 函数接受格式字符串以及额外参数, 根据指定格式将额外参数转换为二进制字符串.
``upack`` 函数接受一个字符串作为参数, 返回一个元组.

``marshal`` 模块可以把不连续的数据组合起来 - 与字符串相互转化, 这样它们就可以写入文件或是在网络中传输.

``pickle`` 模块同 ``marshal`` 模块相同, 将数据连续化, 便于保存传输. 它比 ``marshal`` 要慢一些, 
但它可以处理类实例, 共享的元素, 以及递归数据结构等. chpt04-sect06
``copy_reg`` 模块注册你自己的扩展类型. 这样 ``pickle`` 和 ``copy`` 模块就会知道如何处理非标准类型.

``pprint`` 模块( pretty printer )用于打印 Python 数据结构.  chpt04-sect09
当你在命令行下打印特定数据结构时你会发现它很有用(输出格式比较整齐, 便于阅读).

``base64`` 编码体系用于将任意二进制数据转换为纯文本. 
它将一个 3 字节的二进制字节组转换为 4 个文本字符组储存, 而且规定只允许以下集合中的字符出现:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789+/
```

另外, ``=`` 用于填充数据流的末尾.
``binascii`` 提供了多个编码的支持函数, 包括 ``base64`` ,  ``binhex`` , 以及 ``uu`` .  chpt04-sect15
----------------

