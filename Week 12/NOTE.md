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

* 正常流的块级排布
  * float与clear
    * 同一个盒中多个元素都设置了float，一行放不下会换行。
    * 若有一个元素设置了浮动，那么会被挤到左边或者右边，剩余的就不占据浮动元素的位置,若浮动元素又碰到浮动元素，那么会停下继续换行
    * clear是找一个干净的空间来放浮动元素，值可有right/left/both，可以用来强制换行。
* BFC/IFC
  * 设立BFC
    浮动元素和绝对定位素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。
  * BFC触发条件
    * 根元素
    * 浮动元素：float 不为none的属性值
    * 绝对定位元素：position (absolute、fixed)
    * display为： inline-block、table-cells、flex
    * overflow 除了visible以外的值 (hidden、auto、scroll)
  * IFC 行级上下文
* margin折叠
  * 在BFC中，盒子从顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。在一个BFC中，两个相邻的块级盒子的垂直外边距会产生折叠。
  * 情况
    * 边距折叠只会发生在上下边距，左右边距是不会发生折叠的
    * 边距折叠只发生邻接的上下边距中，也即兄弟节点或者父子节点
    * 发生边距折叠的两个节点必须同处于一个bfc布局中
    * 发生边距折叠的两个父子节点没有border或者padding隔开
  * 解决
    * 可以给其中一个盒子设立BFC

* 动画
  * animation
    * 分类
      * animation-name 指定要绑定到选择器的关键帧的名称
      * animation-duration 动画指定需要多少秒或毫秒完成
      * animation-timing-function 设置时间曲线
        * ease 默认。动画以低速开始，然后加快，在结束前变慢。
        * linear 动画从头到尾的速度是相同的。
        * ease-in 动画以低速开始。
        * ease-out 动画以低速结束。
        * ease-in-out 动画以低速开始和结束。
        * cubic-bezier(n,n,n,n) 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。
      * animation-delay 设置动画在启动前的延迟间隔。
      * animation-iteration-count 定义动画的播放次数。
        * n 一个数字，定义应该播放多少次动画
        * infinite 指定动画应该播放无限次（永远）
      * animation-direction 指定是否应该轮流反向播放动画。
        * normal 默认值。动画按正常播放。
        * reverse 动画反向播放。
        * alternate 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
        * alternate-reverse 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。
      * animation-fill-mode 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
        * none 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。
        * forwards 在动画结束后（由 animation-iteration-count 决定），动画将应用该属性值。
        * backwards 动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。
        * both 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。
      * animation-play-state 指定动画是否正在运行或已暂停。
        * paused 指定暂停动画
        * running 指定正在运行的动画
    * 连起来
      `animation: name duration timing-function delay iteration-count direction fill-mode play-state`
    * @keyframes
      * 可以使用%， 从0%-100%

            @keyframes mymove
            {
              0%   {top:0px;}
              25%  {top:200px;}
              50%  {top:100px;}
              75%  {top:200px;}
              100% {top:0px;}
            }

      * 也可以使用from/to

            @keyframes mymove
            {
              from   {top:0px;}
              to  {top:200px;}
            }

  * transition 设置元素当过渡效果
    * 分类
      * transition-property 指定CSS属性的name，transition效果
        * all 所有属性都将获得过渡效果。
        * property 定义应用过渡效果的 CSS 属性名称列表(比如height，margintop……)，列表以逗号分隔。
      * transition-duration 指定多少秒或毫秒才能完成
      * transition-timing-function 设置时间曲线
      * transition-delay 设置在启动前的延迟间隔
    * 连起来
      `transition: property duration timing-function delay`

* 颜色
  * HSV/HSL
    * H hue 色相 6个色 使用色彩圆柱坐标表示，在色轮上的程度（从0到360）-0（或360）是红色的，120是绿色的，240是蓝色的
    * S 纯度 s越高，越鲜艳越亮 百分比 0是灰色
    * V/L value/lightness 色值（明度）/亮度 百分比 0是黑的，100%是白的

      var h = 25
      background = `hsl(${h}, 50%, 50%)`

* 绘制
  * 几何图形
    * border
    * box-shadow
    * border-radius
  * 文字
    * font
    * text-decoration
    * text-shadow
    * text-indent
  * 位图
    * background-image
    * border-image