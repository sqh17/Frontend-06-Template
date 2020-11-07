学习笔记

* event.which
  针对键盘和鼠标事件，这个属性能确定你到底按的是哪个键。
  event.which也将正常化的按钮按下(mousedown 和 mouseupevents)，左键报告1（是数字，不是字符串），中间键报告2，右键报告3。使用event.which代替event.button。

* 栈
  LIFO（Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部，js中的方法：push()和pop()，不推荐shift()和unshift(); 
* 队列
  FIFO(Fist-In-First-Out,先进先出)。队列在列表的末端添加项，从列表的前端移除项。js中方法：push()和shift() 或者 pop()和unshift()；