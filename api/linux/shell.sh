# @Author: Allen
# @Date:   2017-09-01 11:17:03
# @Last Modified by:   Allen
# @Last Modified time: 2017-09-06 11:00:23

$0 在shell 中是命令行的第一个单词即命令名，在 awk 来说包含当前记录。
#包含转义序列的字符串
echo -e "1\t1\t2"
#打印彩色输出
echo -e "\e[1;31m This is red test \e[0m"

#获取进程ID 14183
pgrep gedit
#获取此进程相关的环境变量
cat /proc/14183/environ | tr '0' '\n'

#变量赋值 var1=value
#变量判相等 var1 = value

#打印变量 echo $var1;  echo ${var1}
#为当前shell 设置环境变量 export HTTP_P
#$PATH 定义在 /etc/environment /etc/profile ~/.bashrc 中
#增加PATH 路径
export PATH="$PATH:/home/user/bin"

#变量长度 ${#var}
#设置小数精度
echo "scale=2;3/8" | bc
#进制转换
no=100; echo "obase=2;$no" | bc

#stderr 转换为 stdin， 清除输出 /dev/null
cmd 2>&1 output.txt

#标准输入作为命令的文件名参数 cmd -
#内容转储同时保持管道流出
cat a* | tee -a out.txt | cat -n

#声明关联数组
declare -A ass_array
ass_array=([index1]=val1 [index2]=val2)
ass_array[index1]=val1

#列出索引
echo ${!array_var[*]}
echo ${!array_var[@]}

#别名只对当前终端有效 alias new_com='command sequence'
#长久作用需要 echo 'alias..' >> ~/.bashrc
#删除用unalias
#\command 命令转义忽略定义的别名
#星期几%A 月%b 日 %d %s 秒
date --date "2017-09-01" +%A

#终端设置命令 tput
#存储光标位置 tput sc
#清除光标位置 tput rc
#清除光标位置到行尾的所有内容 tput ed
#
#调试 sh -x script.sh
#set -x 执行时显示参数或命令
#set +x 关闭调试
#set -v 命令进入读取时显示输入
#set +v 禁止打印输入
#导出函数 export -f funcname
#读取命令返回值
cmd; echo $?;

#命令输出
cout=$(ls | cat -n)
cout=`ls | cat -n`

#子 shell 通过 () 开启， 可以把它放入""中保留输出中的空格和换行
pwd; (cd /bin; ls); pwd;
out="$(cat tex.txt)"

#读取 2 个字符后结束输入
read -n 2 var
#不回显读
read -s var
#提示信息
read -p "Enter:" var
#特定时限内输入, 2 秒
read -t 2 var
#用定界符结束输入
read -d ":" var

#内部字段分隔符 (Internal Field Separator, IFS) 存储定界符的环境变量
#判 str 是否为空
[[ -z $str ]]
#判 str 不为空
[[ -n $str ]]
#移除空行
cat -s dd.txt
cat dd.txt | tr -s 'n'
#显示制表符
cat -T file.py
#显示行号
cat -n lines.txt

#xargs 将标准输入数据转换成命令行参数
xargs -n 3 划分为多行 xargs -d X 指定分隔符
# -I 指定了替换字符
cat args.txt | xargs -I {} ./cecho.sh -p {} -l
# -print0 以字符 null 来分割输出, 已  \0 做输入定界符
find . -type f -name "*.txt" -print0 | xargs -0 rm -f | xargs -0 wc -l
# -d 删除 -c 集合的补集， out: 1 2 4
echo hello 1 char 2 next 4 | tr -d -c '0-9 \n'
# -s 压缩重复的字符
echo "gun is    not   unix" | tr -s " "
cat sum.txt | echo $[ $(tr 'n' '+') 0 ]

#校验 md5sum sha1sum -c
#-k 指定按那个键来排序
sort -nrk 1 data.txt
# 忽律前两个字符，指定排序的最大字符数
sort data.txt | uniq -s 2 -w 2

#生成包含 \0 字节终止符的输出
uniq -z file.txt | xargs -0 rm
uniq -c 重复计数
input='ahebhaaa'
output=` echo $input | sed 's/[^\n]/&\n/g' | sed '/^$d' | sort | uniq -c | tr -d ' \n'`
echo $output "4a1b1e2h"

temp_file="tmp/var.$$"
temp_file="tmp/file-$RANDOM"
#$$ 当前脚本的pid

csplit server.log /SERVER/ -n 2 -s {*} -f server -b "$02d.log"

# ${var%.*} 从 var 中删除位于 % 右侧所匹配的字符，从右向左匹配。
# %% 是贪婪匹配 greedy
# ${var#*.} 从 var 中删除位于 # 右侧所匹配的字符，从左向右匹配。
# ## 是贪婪匹配 greedy
# 文件重命名
count=1;
for img in *.jpg *.png; do
    new=image-$count.${img##*.}
    mv "$img" "$new" 2>/dev/null
    if [ $? -eq 0 ];then
        echo "renameing $img to $new"
        let count++
    fi
done

find path -type f -name "*.mp3" -exec mv {} target_dir \;
find path -type f -exec rename 's/ /_/g' {} \;

# 创建特定大小的文件 c 1b w 2b b 512b k 1024b /dev/zero 不断返回0值字节 \0
dd if=/dev/zero of=junk.data bs=1M count=1

# 内容相同的文件会生成相同的校验和

# chattr +i file -i file 文件设置不可修改、去除
# touch -a 更改文件访问时间 -m 更改内容修改时间 -d 日期
# 打印当前目录下的符号链接
ls -l | grep "^l" | awk '{ print $8 }'
find . -type l -print
readlink linkname

# loopback 环回文件系统是指那些在文件中而非设备中创建的文件系统。
# 多个目录操作切换用 push pop 两个目录用 cd -

#cut 切分列
cut -f2,3 filename

zenity 创建信息框

#文件占用磁盘情况
du filename
du -ak source_dir | sort -nrk 1 | head

#计算命令执行时间 time cmd

#当前登录用户相关信息 who w users uptime last lastb
#
#~/.bash_history 用户输入过的命令 history
#top 10 command
printf "command\tcount\n"
cat ~/.bash_history | awk '{ list[$1]++; } \
END{
    for (i in list)
    {
        printf("%s\t%d\n", i, list[i]);
    }
}' | sort -nrk 2 | head

# 监视命令的输出 watch command
watch -nd 5 'ls -l'

SECS=10
UNIT_TIME=2

# 将SECS更改成需要进行监视的总秒数
# UNIT_TIME是取样的时间间隔，单位是秒

STEPS=$(( $SECS / $UNIT_TIME ))

echo Watching CPU usage... ;

for ((i=0;i<STEPS;i++))
do
  ps -eo comm,pcpu | tail -n +2 >> /tmp/cpu_usage.$$
  sleep $UNIT_TIME
done

cat /tmp/cpu_usage.$$ | \
awk '
{ process[$1]+=$2 }
END{
   for(i in process)
   {
     printf("%-20s %s\n",i, process[i]);
   }

}' | sort -nrk 2 | head
rm /tmp/cpu_usage.$$

# logrotate 将日志文件大小限制在给定的 size 内
#