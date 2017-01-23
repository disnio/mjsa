创建镜像：
sudo docker commit -m "add a new file" -a "Allen" a925 test
基于本地模板导入：
sudo cat ubuntu.tar.gz | docker import - ubuntu:;14.04

存储镜像：
sudo docker save -o ubuntu.tar ubuntu:14:04

载入镜像：
sudo docker load --input ubuntu.tar
sudo docker load < ubuntu.tar

上传镜像：
sudo docker tag test:latest user/test:latest
sudo docker push user/test:latest

容器的守护状态运行： -d
sudo docker run -d ubuntu /bin/sh -c "..."
sudo docker logs ced5

终止运行的容器：
sudo docker stop ce5
sudo docker ps -a -q

启动终止的容器：
sudo docker start ce5

进入容器：
docker attach conainer-name

docker exec -ti ce5 /bin/bash

until-linux 2.23后包含 nsenter
需要找到容器进程的 pid 使用 nsenter
PID=$(docker inspect --format "{{.State.Pid"}} container)
nsenter --target $PID --mount --uts --ipc --net --pid 

删除容器：
docker rm 
-f, --force=false 强制终止并删除运行的容器
-l, --link=false 删除容器的链接，但保留容器
-v, --volums=false 删除容器挂载的数据卷

导出导入容器到文件：
sudo docker export ce5 > test.tar
cat test.tar | docker import - test/ubuntu:v1.0
-------
创建和使用私有仓库：
sudo docker run -d -p 5000:5000 -v /opt/data/registry:/tmp/registry registry
根据官方镜像搭建私有仓库

标记：
sudo docker tag ubuntu:14.04 10.0.2.2:5000/test
上传标记的镜像到： sudo docker push 10.0.2.2:5000/test
查看仓库中镜像：
curl http://10.0.2.2:5000/v1/search
其他机器就可以下载此镜像：
sudo docker pull 10.0.2.2:5000/test
下载后更改标签：
sudo docker tag 10.0.2.2:5000/test ubuntu

------------
挂载主机目录作为数据卷：
sudo docker run -d -P --name web -v $(pwd):/opt/pytest -w /opt/pytest centos python hello.py

sudo docker run --rm -it -v /.bash_history:/.bash_history ubuntu /bin/bash
记录在容器输入过的历史记录

如果需要在容器间共享一些持续更新的数据，数据卷容器。挂载数据卷的容器自身不需要保持在运行状态
sudo docker run -it -v /dbdata --name dbdata centos
然后在其他容器中使用 
sudo docker run --it --volumes-from dbdata --name db1 centos
docker rm -v 显式删除最后一个挂载的数据卷

备份：
sudo docker run --volumes-from dbdata -v $(pwd):/backup --name worker centos tar cvf /backup/backup.tar /dbdata
恢复：
sudo docker run -v /dbdata --name dbdata2 centos /bin/bash
sudo docker fun --volumes-from dbdata2 -v $(pwd):/backup busybox tar xvf /backup/backup.tar

查看端口映射配置:
sudo docker port centos 5000

sudo docker inspect +容器id 

查看容器的名字：
sudo docker inspect -f "{{ .Name }}" aed4

容器互联：--link name:alias
sudo docker run -d -P --name web --link db:db centos python app.py

通过环境变量和 /etc/host 来公开链接信息
sudo docker run --rm --name web --link db:db centos env

apt-get install -yqq inetutils-ping 通过 ping 容器名 测试联通
---------------------------------------

RUN <command>   即：/bin/sh -c
RUN ["executable", "param1", "param2"] 使用 exec 执行， RUN ['/bin/bash', "-c", "echo hello"]

CMD 支持3种格式：

CMD ["executable", "param1", "param2"]， exec 执行，推荐
CMD coommand param1 param2 在 /bin/sh 中执行
CMD ["param1", "param2"] 提供给 entrypoint 的默认参数

每个 Dockerfile 只能有指定启动容器时执行的命令，一条 cmd 命令

EXPOSE <port>... 暴露的端口
启动容器时， -P, Docker 主机会自动分配一个端口转发到指定的端口。
-p 指定那个本地端口映射过来

ENV <key> <value> 指定一个环境变量被后续 RUN 命令使用，运行时保持。

ADD <src> <dest> 复制指定的 src（Dockerfile所在目录的一个相对路径，url, tar等） 到容器的 dest .

COPY <src> <dest> 复制本地主机为容器中的dest

ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2
容器启动后执行的命令

VOLUME ["/data"] 创建一个从本地主机或其他容器的挂载点，用来存放数据库或数据

USER daemon 容器运行时的用户名和 UID，临时获取管理员权限用 gosu

WORKDIR /path/to/workdir 为 RUN、COM/ENTRYPOINT 配置工作目录

ONBUILD 指令。 镜像作为其他新建镜像的基础镜像时，所执行的操作指令。

编写完 Dockerfile 通过 docker build 来创建镜像

.dockerignore 来忽略

指定镜像的标签信息 -t选项

-----------------------
sudo docker search -s 10 ubuntu

sudo docker commit fc1 sshd:ubuntu 修改后的镜像保存为本地镜像

