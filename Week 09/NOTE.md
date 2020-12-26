学习笔记

* 第一步 文件拆分
  1. 为了方便管理，把parser单独拆到文件中
  2. parser接受html文本作为参数，返回一个DOM树

* 第二步 用FSM实现HTML的分析
  1. 使用FSM（有限状态机）实现html的分析
  2. 在html标准中，已经规定了html的状态（80种），省去了设计状态机的方式
  3. 简化toy-browser

* 第三步 解析标签
  1. 主要的标签有三种，开始标签，自封闭标签，结束标签
  2. 暂时忽略属性

* 第四步 
  1. 加入业务逻辑
  2. 在标签结束状态时提交标签token


* module exports 与 exports
  require导出的内容是module.exports的指向的内存块内容，并不是exports的。
  简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的

  exports 返回的是模块函数
  module.exports 返回的是模块对象本身，返回的是一个类 需要new出来这个类

  exports.[function name] = [function name]
  moudle.exports = [function name]

  exports和moudle.exports同时用，会优先调用moudle.exports

  CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

      //  a.js
      var x = 5;
      var addX = function (value) {
        return value + x;
      };
      module.exports.x = x;
      module.exports.addX = addX;

      // b.js
      var example = require('./a.js');

      console.log(example.x); // 5
      console.log(example.addX(1)); // 6

* export与export default
  * export与export default均可用于导出常量、函数、文件、模块等
  * 在一个文件或模块中，export、import可以有多个，export default仅有一个
  * 通过export方式导出，在导入时要加{ }，export default则不需要
  * export能直接导出变量表达式，export default不行。
