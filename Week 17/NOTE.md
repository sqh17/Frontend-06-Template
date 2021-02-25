学习笔记

#### Yeoman
  创建脚手架
  [文档地址](https://yeoman.io/learning/)
#### npm link
  用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试
  把一个本地的模块link到一个npm标准的模块中。
  首先创建一个全局链接，然后将全局安装目标链接到项目的 node_modules 文件夹中

#### npx
  主要解决全局安装依赖和版本问题
  * 当在执行npx <\command>的时候，npx会做什么事情？

    1. 帮你在本地（可以是当前项目中的也可以是本机全局）寻找这个 command
    2. 找到了： 就用本地的版本
    3. 没找到： 直接下载最新版本，完成命令要求
    4. 使用完之后不会在你的本机或者项目留下任何东西
  * npx 优势也就很明显了：

    * 不会污染本机
    * 永远使用最新版本的依赖
  * 全局安装劣势：
    * 占用本机空间
      npm会在机器上创建一个目录（/usr/local/lib/node_modules）存放所有global安装的包, 其实node_module占用的空间比较大的
    * 版本问题：
      假如一个项目中的某一个依赖是全局安装的，也就意味着不同的开发人员使用的这个依赖版本完全基于本地的版本，也就会导致不同的开发人员使用不同的版本.

#### webpack
 * 作用：将入口js引用的全部资源打包到一个js文件中，供浏览器环境使用
 * 配置文件：webpack.config.js
 * entry：执行打包的入口文件，webpack会查找其所有依赖进行打包
 * output：打包结果输出位置
 * module.rules：定义文件处理规则，用test匹配成功的文件会进入use中定义的loader流水线处理。loader也可能会有自己的配置项
 * plugins：插件，打包流程中有的loader会依赖特定plugins，也可用于执行打包流程之外的其他操作
#### babel 作为一个独立的工具
* 作用：将高版本js翻译为低版本js
* 安装：@babel/core
* 命令行使用：@babel/cli
* 预制配置集：@babel/preset-env
* webpack插件：babel-loader
* 配置文件：.babelrc（babel-loader使用时不生效）
