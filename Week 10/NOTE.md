学习笔记

* 第一步 预处理器准备工作
  1. 拆分
  2. 将有数值的字符串转化为对应的数字
  3. 由于toy-broswer只通过flex去设置排版
  4. 收集dom树中的element的元素
  5. 设置flex相关的默认值(mainSign,mainBase 标记，和距离，便于相加相减)

* 第二步 收集元素进行
  1. 当父元素没有设置宽度时，需要由子元素给撑开
  2. 当设置可伸缩或者nowrap时，都放到一行上
  3. 当剩余空间不足容纳一个元素时，需要换行，flexLines，记录行高

* 第三步 计算主轴
  1. 找出所有的Flex元素
  2. 把主轴方向的剩余尺寸按比例分配给这些元素
  3. 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

  `步骤`
  1. 记录保存交叉轴的剩余空间
  2. 当剩余空间小于0时，等比压缩，单行的情况下
  3. 大于0时，多行的情况下，用flexTotal记录之和
    1. flexTotal>0时，代表有flex，等比划分
    2. flexTotal<0时，用justify-content去设置

* 第四步 计算交叉轴
	1. 根据每一行中最大元素尺寸计算杭高
	2. 根据杭高flex-align和align-items，确定元素的具体位置
	`步骤`
	1. 计算交叉轴剩余的空间crossSpace
	2. 根据wrap-reserve决定crossBase的初始值
	3. 根据alignContent的值，决定crossBase的值（选alignContent而不选alignItems的理由是align-content 只适用多行的flex容器（也就是flex容器中的子项不止一行时该属性才有效果），它的作用是当flex容器在交叉轴上有多余的空间时，将子项作为一个整体（属性值为：flex-start、flex-end、center时）进行对齐）
	4. 循环每一行的交叉轴，计算出每一行上的高度，位置

* 第五步 绘制 单个元素
  * 绘制需要依赖一个图形环境
  * 我们这里采用了 npm 包 images
  * 绘制在一个 viewport 上进行
  * 与绘制相关的属性： background-color等

* 第六步 绘制
  * 递归调用子元素的绘制方法完成 DOM 树的绘制
  * 忽略一些不需要绘制的节点(实际的浏览器中，文字绘制是难点，需要依赖字体库，我们这里忽略,实际的浏览器中，还会对一些图层左 compositing， 我们这里也忽略了)

