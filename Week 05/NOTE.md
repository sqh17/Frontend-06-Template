学习笔记

* Proxy
Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）,用于修改某些操作的默认行为，等同于在语言层面做出修改,(在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。)
总的来说：Proxy对象就是要在目标对象上设置自定义的规则和方法，让它按照自己定义的规则去实行某些操作 

    var proxy = new Proxy(object,hander)
    console.log(proxy) // Proxy{}
    // 第一个参数：object，目标对象，是你要代理的对象.它可以是JavaScript中的任何合法对象.如: (数组, 对象, 函数等等)
    // 第二个参数：handler，配置对象，用来定制拦截行为，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作

常用的方法是set和get，一存一取

* drag
本身dragable有自身的api，虽然不满足本次学习的条件，但是也要复习一下drag的知识。
  * 设置元素可拖放 draggable="true"
  * 在拖动目标上触发事件 (源元素)（设置draggable="true"的元素）
    * ondragstart - 用户开始拖动元素时触发
    * ondrag - 元素正在拖动时触发
    * ondragend - 用户完成元素拖动后触发
  * 释放目标时触发的事件:
    * ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    * ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    * ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
    * ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
  * dataTransfer 在拖曳操作的过程中,可以用过dataTransfer对象来传输数据，以便在拖曳操作结束的时候对数据进行其他的操作。
    * 对象属性(常用)
      * items:该属性返回DataTransferItems对象，该对象代表了拖动数据。
      * types:该属性返回一个DOMStringList对象，该对象包括了存入dataTransfer中数据的所有类型。
    * 对象方法(常用)
      * setData(format,data):将指定格式的数据赋值给dataTransfer对象，参数format定义数据的格式也就是数据的类型，data为待赋值的数据
      * getData(format):从dataTransfer对象中获取指定格式的数据，format代表数据格式。

本次的学习是通过mousedown，mouseup，mousemove来模拟随着鼠标动而动
  * 将mouseup，mousemove事件放在mousedown事件中，提升性能和准确性
  * 这些事件既有生成，也要有移除
  * addEventListener即鼠标移到浏览器外也能监听到
  * 差值，鼠标点在哪里，就从哪里开始拖动，在mousedown设置x，y的变量
  * 记录量，用来存取translate之后的位置
