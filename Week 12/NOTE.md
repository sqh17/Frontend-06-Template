学习笔记


* test
  * HTML代码中可以书写开始标签，结束标签 ，和自封闭标签 。
  * 一对起止标签 ，表示一个元素 。
  * DOM树中存储的是元素和其它类型的节点（Node）。
  * CSS选择器选中的是元素或伪元素 。
  * CSS选择器选中的元素 ，在排版时可能产生多个盒 。
  * 排版和渲染的基本单位是盒 。
* box-sizing 盒模型
  * box-sizing:border-box 指的是内容区域的宽高+padding+border
  * box-sizing:content-box 指的是内容的区域的宽高，不带有padding和border

* 正常流排版
  * 收集盒进行
  * 计算盒在行中的排布
  * 计算行的排布

* 正常流的行级排布
  * baseline 一般情况下的都是英文字母底部为准
  * text-top/text-bottom 中文等方块字大小往上往下偏移一些
  * line-top/line-bottom 会受元素撑开的情况
  * inline-block元素的基线会随着元素字体变化而变化，所以我们通常用vertical-algin:top/middle/bottom来给他与父元素上或下或中对齐
