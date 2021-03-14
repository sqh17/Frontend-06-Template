学习笔记

### Linux
- 分类
  * CentOS
  * Ubuntu
  * red hat
- wget
  1. wget 是一个下载文件的工具，它用在命令行下。对于 Linux 用户是必不可少的工具，我们经常要下载一些软件或从远程服务器恢复备份到本地服务器。
  2. wget 支持 HTTP，HTTPS 和 FTP 协议，可以使用 HTTP 代理。所谓的自动下载是指，wget 可以在用户退出系统的之后在后台执行。这意味这你可以登录系统，启动一个 wget 下载任务，然后退出系统，wget 将在后台执行直到任务完成
  3. wget 可以跟踪 HTML 页面上的链接依次下载来创建远程服务器的本地版本，完全重建原始站点的目录结构。这又常被称作”递归下载”。
  4. wget 非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性.如果是由于网络的原因下载失败，wget 会不断的尝试，直到整个文件下载完毕。如果是服务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。这对从那些限定了链接时间的服务器上下载大文件非常有用。
  5. curl和wget相似
- node 环境搭建(可以用yum来搭建....,已通过yum install docker，相比node也是如此吧)
  [参考资料](https://www.jianshu.com/p/9e648a1effb8)
  1. wget https://nodejs.org/dist/v14.15.1/node-v14.15.1-linux-x64.tar.xz  
     //下载最新的稳定版 node-v14.15.1 到本地
  2. tar xvJf node-v14.15.1-linux-x64.tar.xz
     // 下载完成后, 将其解压
  3. mv node-v14.15.1-linux-x64 /usr/local/node 
     //将解压的 Node.js 目录移动到 /usr/local 目录下
  4. ln -s /usr/local/node/bin/node /bin/node
     //配置 node 软链接到 /bin 目录
  5. ln -s /usr/local/node/bin/npm /bin/npm
     //下载 node 的压缩包中已经包含了 npm , 我们只需要将其软链接到 bin 目录下即可
  6. echo 'export PATH=/usr/local/node/bin:$PATH' >> /etc/profile 
     //将/usr/local/node/bin 目录添加到 PATH 环境变量中可以方便地使用通过 npm 全局安装的第三方工具
  7. source /etc/profile
     // 执行 source 使修改生效
  8. node --version
     // 查看版本
- 安装 n 来切换 node 的版本
  - npm install -g n
  - 常用命令
    - n //会列出所有安装的版本供你切换
    - n latest //安装最新版本
    - n stable //安装最新稳定版
    - n lts //安装最新长期支持版本
    - n rm \[版本号] //删除某一版本
    - n -h //帮助命令
  - 版本切换无效解决方法
    来源：node 的安装目录和 n 默认的路径不一样
    1. 查看 node 当前安装路径
       `which node`
       `// /usr/local/node/bin/node`
    2. 而 n 默认安装路径是 /usr/local，若你的 node 不是在此路径下，n 切换版本就不能把 bin、lib、include、share 复制该路径中，所以我们必须通过 N_PREFIX 变量来修改 n 的默认 node 安装路径,编辑.bash_profile,将下面两行代码插入到文件末尾
       `vim ~/.bash_profile`
       `export N_PREFIX=/usr/local/node #node实际安装位置`
       `export PATH=$N_PREFIX/bin:$PATH`
    3. 保存退出
       `:wq`
    4. 执行 source 使修改生效
       `source ~/.bash_profile`
    5. 确认一下环境变量是否生效
       `echo $N_PREFIX`
       `// /usr/local/bin/node`
    6. 重新实行命令
       `n latest`


### node

- http的请求和响应都是流式结构，可以管道
- 文件fs，一般常用的读写事件是data和end
- [具体文档](https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable)
- 多文件上传采用压缩([archiver](https://www.npmjs.com/package/archiver))，解压([unzipper](https://www.npmjs.com/package/unzipper))的方式

### github oAuth

[具体文档](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)