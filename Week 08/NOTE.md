学习笔记

* url=>渲染的步骤
  * 输入url，进行http请求，拿到数据
  * 拿到html，进行解析
  * 形成dom树，cssom树
  * layout布局，将dom树和cssom树进行整合
  * 渲染成一个bitmap
  我们看到的页面都是一个图片形式，专业点的说法叫做位图（Bitmap），然后经过显卡转换为我们可以识别的光信号
* 有限状态机
  * 每一个状态都是一个机器
    * 在每一个机器里，我们可以做计算，存储，输出
    * 所有的这些机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，他应该是纯函数（无副作用）
  * 每一个机器知道下一个状态（分类）
    * 每一个机器都有确定的下一个状态（Moore）
    * 每一个机器根据输入决定下一个状态（Mealy）

      // 每个函数是一个状态
      function state(input)// 函数参数就是输入
      {
        // 在函数中，可以自由的编写代码，处理每个状态的逻辑
        return next; // 返回你作为下一个状态
      }
      ////////以下是调用////////
      while(input){
        // 获取输入
        state = state(input); // 把状态机的返回值作为下一个状态
      }
* ISO-OSI七层网络模型
  物理层=>数据链路层=>网络层=>传输层=>会话层=>表示层=>应用层
  4g/5g/Wifi ==== >Internet=>TCP=>HTTP
* 在使用立即执行的函数表达式时，可以利用 void 运算符让 JavaScript 引擎把一个function关键字识别成函数表达式而不是函数声明（语句）。
