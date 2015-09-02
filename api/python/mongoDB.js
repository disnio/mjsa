yum install -y mongodb-org
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/
启动服务：
c:\mongo\bin\mongod.exe --dbpath=c:\mongo\data

设置为随机启动服务：
c:\Program Files\MongoDB 2.6 Standard\bin>mongod.exe --dbpath=d:\mongo\data --logpath d:\mongo\mongodb.log --install

service mongod start