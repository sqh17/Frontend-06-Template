学习笔记

* CSS总体结构(2.1)
  * @charset
  * @import
  * rules
    * @media
    * @page
    * rule

* CSS 知识图
  * at-rule
    * @charset 字符集 utf-8
    * @import 级联样式表
    * @media 类似于预知好的函数，通过media去查询机型（有条件下生效）
    * @page 分页，打印
    * @fontface 字体
    * @counter-style 列表前边的圈，数字或者黑点
    * @supports 用来检查某些功能是否存在
    * @namespace 像svg，MathML
    * @keyframes 动画
    * documnet 丢弃
    * color-profile 丢弃
    * font-feature 丢弃或者太新
  * rule
    * Selector
      * selector_group
      * selector
        * >
        * 空格
        * \+
        * ~
      * simple_selector
        * type 类型选择器
        * \* 通配符
        * . 类名
        * \# id名
        * : 伪类
        * :: 伪元素
        * :not() 
        * \[attr=value] 属性选择器
    * Declaration
      * Key
        * variables
        * properties
      * Value
        * calc
        * number
        * length（长度单位）
        * ……


* 选择器语法
  * 简单选择器
    * \*
    * div svg|a 
      * 命名空间，如果需要访问svg或者MathMl里的特定元素需要用｜空间命名分隔符
      * 需要用@namespace声明
      * HTML和SVG中重叠的元素a，所以用到｜
    * .cls
    * #id
    * \[attr=value]
    * :hover 伪类
    * ::before 伪元素
  * 复合选择器
    * <简单选择器> <简单选择器> <简单选择器>
    * \* 或者 div 必须写在最前面
    * 伪类，伪元素必须卸载最后面
  * 复杂选择器(针对于一个元素)
    * <复合选择器> <sp> <复合选择器> 子孙选择器,最前面的复合选择器既是父级节点也是祖父节点
    * <复合选择器> ">" <复合选择器> 父子选择器,最前面的复合选择器必须是的后面的复合选择器直接上级元素
    * <复合选择器> "~" <复合选择器> 领接
    * <复合选择器> "+" <复合选择器> 领接
    * <复合选择器> "||" <复合选择器> table中表示某一列

* 选择器的优先级
  [0,    0,     0,      0]
  行内    id     类名    元素
  看选择器里有几个，就对应的加几个，采取进位制

* case

      div#a.b .c[id=x] 0 1 3 1 
      #a:not(#b) 0 2 0 0 
      *.a 0 0 1 0 
      div.a 0 0 1 1

* 伪类
  * 链接/行为
    * :any-link 表示一个作为超链接源锚点的元素（无论它是否已被访问）匹配所有满足:link或的元素:visited的元素,兼容性，需要添加私有前缀
    * :link 未匹配的
    * :visited 已访问过的
    * :hover 悬浮
    * :active 激活状态
    * :focus 焦点
    * :target 只针对a标签的锚点，指向该锚点指向的元素

          <style>
            p:target {
              background-color: gold;
            }

            /* Add a pseudo-element inside the target element */
            p:target::before {
              font: 70% sans-serif;
              content: "►";
              color: limegreen;
              margin-right: .25em;
            }

            /* Style italic elements within the target element */
            p:target i {
              color: red;
            }
          </style>
          <ol>
            <li><a href="#p1">Jump to the first paragraph!</a></li>
            <li><a href="#p2">Jump to the second paragraph!</a></li>
            <li><a href="#nowhere">This link goes nowhere,
                because the target doesn't exist.</a></li>
          </ol>

          <h3>My Fun Article</h3>
          <p id="p1">You can target <i>this paragraph</i> using a
            URL fragment. Click on the link above to try out!
          </p>
          <p id="p2">This is <i>another paragraph</i>, also accessible
            from the links above. Isn't that delightful?
          </p>

  * 树形结构
    * :empty() 伪类代表没有子节点的所有元素。空格，注释，换行都以为有内容，empty()不识别
    * :nth-child() 
    * :nth-last-child() 从最后的往前数
    * :first-child
    * :last-child 会破坏css computed
    * :only-child CSS伪类表示没有任何同胞元素的元素，表示同级中没有兄弟元素
  * 逻辑型
    * :not(x) 排除选择器，匹配不包含x选择器的元素
      * 能作为:not()参数的: id,class,tagName,*，\[attr=value],伪类（:first-child,:last-of-type）
      * 传递给:not()的参数不能是伪元素选择器（例如::before和::after等）或另一个否定伪类选择器
      * 虽然:not()函数不能嵌套，但是可以并列使用
    * :where() level4
    * :has() level4

* 伪元素
  * ::before / ::after 无中生有，在dom中添加元素
  * first-letter 第一个元素，可以参与样式修改
    * font
    * color
    * background
    * text-decoration
    * text-transform
    * letter-spacing
    * word-spacing
    * line-height
    * float
    * vertical-align
    * 盒模型系列：margin, padding, border
  * first-line 第一行的元素
    * font
    * color
    * background
    * word-spacing
    * letter-spacing
    * text-decoration
    * text-transform
    * line-height

* 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
  float会触发重绘和重排 因为first-letter是针对字的样式不用关心变化布局所带来的影响，而first-line时必须是布局计算完成才能确定首行。
  如果first-line支持改变大小或display，那么布局又需要重新计算首行很影响性能。first-line 无法一开始就确定第一行所包含的内容，第一行的内容会在渲染最后才确定。