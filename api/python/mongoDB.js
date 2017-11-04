https://mlab.com/ wuaim
wu1605test

To connect using the mongo shell:
mongo ds034279.mlab.com:34279/wu1605test -u <dbuser> -p <dbpassword>
To connect using a driver via the standard MongoDB URI
mongodb://<dbuser>:<dbpassword>@ds034279.mlab.com:34279/wu1605test
dbuser:cat:cat123

API key  nZSxvmIqUMZQiJzv7y7Mnhax3n5Kotxg
------------------------------------
yum install -y mongodb-org
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/
启动服务：win10 要以管理员身份启动 cmd
c:\mongo\bin\mongod.exe --dbpath=c:\mongo\data
mongod.exe --dbpath=d:\MongoDB\data --logpath d:\MongoDB\mongodb.log --install
设置为随机启动服务：
c:\Program Files\MongoDB 2.6 Standard\bin>mongod.exe --dbpath=d:\mongo\data --logpath d:\mongo\mongodb.log --install
mongod.exe --install --logpath=d:\mongodb\log\mongodb.log --logappend --dbpath=d:\mongodb\data --directoryperdb --serviceName MongoDB
service mongod start

mongod.exe --remove --serviceName "MongoDB"
----------------------------------------
mongod.exe --config "e:\mongo\mongod.cfg" --install
mongod.cfg
systemLog:
    destination: file
    path: e:\mongo\log\mongo.log
storage:
    dbPath: e:\mongo\db

sc.exe create MongoDB binPath="C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe --service --config=\"e:\mongo\mongod.cfg\"" DisplayName="MongoDB" start="auto"

PS：删除MongoDB Windows服务的命令是：sc delete MongoDB
-------------------------------------------
mongod 启动数据库进程
--dbpath 指定数据库的目录
--port 指定数据库的端口,默认是 27017
--bind_ip 绑定 IP
--directoryperdb 为每个 db 创建一个独立子目录
--logpath 指定日志存放目录
--logappend 指定日志生成方式(追加/覆盖)
--pidfilepath 指定进程文件路径，如果不指定，那么将不产生进程文件
--keyFile 集群模式的关键标识
--cpu 周期性的显示 CPU 和 IO 的利用率
--journal 启用日志
--ipv6 启用 IPV6 支持
--nssize 指定.ns 文件的大小，单位 MB，默认是 16M，最大是 2GB
--maxConns 最大的并发连接数
--notablescan 不允许进行表扫描
--quota 限制每个数据库的文件个数，默认是 8 个
--quotaFiles 每个数据库的文件个数，配合—quota 参数
--noprealloc 关闭数据文件的预分配功能

关闭：
> use admin;
> db.shutdownServer();

MongoDB 包含 string, integer, boolean, double, null, array, and object 基本的数据类型外，
还包含： date, object id, binary data, regular expression, and code 这些附加的数据类型。
timestamp 类型的字段必须是位于文档的前两位

关联有两种，一种是简单的手动关联，一种是用 DBRef。
//查找
> db.post.save({title:'MongoDB Manual',author:'sam'});
> p = db.post.findOne();
{
    "_id" : ObjectId("4de36b33282677bdc555a83a"),
    "title" : "MongoDB Manual",
    "author" : "sam"
}
//关联
> db.authors.findOne({name:p.author});
{
    "_id" : ObjectId("4de36c14282677bdc555a83b"),
    "name" : "sam",
    "age" : 24,
    "email" : "sanlai_lee@lisanlai.cn"
}

DBRef 关联语法：
{ $ref : <collname>, $id : <idvalue>[, $db : <dbname>] }

> x = { name : 'Biology' }
> db.courses.save(x)
> stu = { name : 'Joe', classes : [ new DBRef('courses', x._id) ] }
// or we could write:
// stu = { name : 'Joe', classes : [ {$ref:'courses',$id:x._id} ] }
> db.students.save(stu)
> stu
{
    "name" : "Joe",
    "classes" : [
        {
            "$ref" : "courses",
            "$id" :  ObjectId("4b0552b0f0da7d1eb6f126a1")
        }
    ],
    "_id" : ObjectId("4b0552e4f0da7d1eb6f126a2")
}
> stu.classes[0]
{ "$ref" : "courses", "$id" : ObjectId("4b0552b0f0da7d1eb6f126a1") }
> stu.classes[0].fetch()
{ "_id" : ObjectId("4b0552b0f0da7d1eb6f126a1"), "name" :"Biology" }

--------------------------------------
建立索引的函数： ensureIndex()
db.persons.getIndexes();
db.collection.dropIndexes();
db.myCollection.reIndex()
// same as:
db.runCommand( { reIndex : 'myCollection' } )

--------------------------------------
Type Name Type Number
Double 1
String 2
Object 3
Array 4
Binary data 5
Object id 7
Boolean 8
Date 9
Null 10
Regular expression 11
JavaScript code 13
Symbol 14
JavaScript code with scope 15
32-bit integer 16
Timestamp 17
64-bit integer 18
Min key 255
Max key 127

语法：
db.coll.group(
{
    cond: {filed： conditions}
    , key: {filed: true}
    , initial: {count: 0, total_time:0}
    , reduce: function(doc, out){ }
    , finalize: function(out){}
    }
);
参数说明：
Key： 对那个字段进行 Group
Cond： 查询条件
Initial： 初始化 group 计数器
Reduce： 通常做统计操作
Finalize： 通常都统计结果进行进一步操作，例如求平均值
Keyf： 用一个函数来返回一个替代 KEY 的值