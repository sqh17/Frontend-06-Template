学习笔记

##### HTML 语义

* 正确的标签做正确的事情。
* 看见该标签，就知道其中所包含的内容的类型。

##### 字符引用

* \&#161; 代表 ascii 码的第 161 个字符
* 这三个代表着实体，表示特定的字符。
  * \&amp; 代表 &amp;
  * \&lt; 代表 &lt;
  * \&quot; 代表 &quot;

##### DOM API
###### 节点API
  * Element 元素型节点
    * HTML
    * SVG
  * Document 文档根节点
  * CharacterData 字符型节点
    * Text 文本
    * Comment 注释
    * ProcessingInstruction 处理信息
  * DocumentFragment 文档片段 无法挂在dom树上
  * DocumentType 文档类型

###### 导航类操作
  * parentNode
  * childrenNode
  * firstChild
  * lastChild
  * nextSibling
  * previousSibling

###### 修改类操作
  * appendChild
  * removeChild
  * insertBefore
  * replaceChild

###### 进阶操作（函数）
  * compareDocumentPosition 用于比较两个节点关系

    `compareValue = node.compareDocumentPosition(otherNode) // 返回的是otherNode相对于node的位置`

    * 
      二进制  | 返回值 | 释义 | 对应常量 |
      --------- | --------| --------| --------|
      000000  | 0 | 节点一致 | -|
      000001  | 1 | 节点在不同的文档（或者一个在文档之外） | Node.DOCUMENT_POSITION_DISCONNECTED|
      000010  | 2 | 节点 otherNode 在节点 node 之前 | Node.DOCUMENT_POSITION_PRECEDING|
      000100  | 4 | 节点 otherNode 在节点 node 之后 | Node.DOCUMENT_POSITION_FOLLOWING|
      001000  | 8 | 节点 otherNode 包含节点 node | Node.DOCUMENT_POSITION_CONTAINS|
      010000  | 16 | 节点 otherNode 被节点 node 包含 | Node.DOCUMENT_POSITION_CONTAINED_BY|
      100000  | 32 | 特定的节点位置，依赖于DOM实现 | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC|
      -  | 组合值 | 复合节点关系 | -|
    

        // 返回值是 0
        document.body.compareDocumentPosition(document.body);
        // 返回值是 4，<body>在<head>后面
        document.head.compareDocumentPosition(document.body);
        // 返回值是 10，8 + 2,10是8+2的组合值，8表示documentElement包含body，2表示documentElement在body前面。
        document.body.compareDocumentPosition(document.documentElement);
        // 返回值是 20，16 + 4,20是16+4的组合值，16表示body被documentElement包含，4表示body在documentElement后面。
        document.documentElement.compareDocumentPosition(document.body)

    * compareDocumentPosition还可以用来比对HTML属性节点的前后位置关系

          <img id="compareImg" \src="xxx" alt="示意图">
          var altNode = compareImg.getAttributeNode('alt');
          var srcNode = compareImg.getAttributeNode('src');
          
          console.log(altNode.compareDocumentPosition(srcNode)); // 结果是34 = 32 + 2
          
          
          // 如果HTML代码中的'src'和'alt'属性位置调换下，如下：
          <img id="compareImg" alt="示意图" \src="xxx">
          console.log(altNode.compareDocumentPosition(srcNode));// 结果是36 = 32 + 4
    * 返回1的结果可以用iframe里元素和父元素比较或者创建新的元素

          document.createElement('div').compareDocumentPosition(document.body)// 结果是35 = 32 + 2 + 1

    * 由于compareDocumentPosition返回值都是标准的只有1位是1的二进制值，因此，要判断前后或者内外节点位置关系直接按位与，结果不是0就可以了 
    `实际开发的时候，不能直接等于==某个常量值判断位置关系，而需要借助其他运算符，例如位运算符&。在JS中，一个&表示运算符按位与，就是把两个二进制数按每一位比较，同时为1才得1，只要一个为0就为0，最终的二进制值就是运算值`

          2 & 4 => 0010 & 0100 => 0000 => 0
          2 & 8 => 0010 & 1000 => 0000 => 0
          2 & 10 => 0010 & 0110 => 0010 => 2

          if (document.body.compareDocumentPosition(document.documentElement) & Node.DOCUMENT_POSITION_PRECEDING) {
            // document.documentElement在document.body前面
            // ...
          }
  * contain 检查一个节点是否包含另一个节点  boolean
    `node.contains( otherNode )`
  * isEqualNode 检查两个节点是否完全相同 boolean
    `node.contains( otherNode )`
  * isSameNode 检查两个节点是否是同一个节点 boolean 丢弃，采用===

  * cloneNode 复制节点，若传入参数true，代表完全复制(子元素也跟着拷贝)

###### 事件API

  `target.addEventListener(type, listener[, options]) `
  `target.addEventListener(type, listener[, useCapture]);`
  * type: 事件名称（click，mousedown）
  * listener: 监听函数方法
  * options/useCapture:
    * useCapture boolean 默认值是false 代表是冒泡状态，true代表捕获状态
    * options
      * capture: 默认值为false（即 使用事件冒泡）. 是否使用事件捕获；
      * once: 默认值为false. 是否只调用一次，完了会消除
      * passive: 默认值为false 如果是true的状态下意味着listener永远不远调用preventDefault方法

            根据规范，passive 选项的默认值始终为false。但是，这引入了处理某些触摸事件（以及其他）的事件监听器在尝试处理滚动时阻止浏览器的主线程的可能性，从而导致滚动处理期间性能可能大大降低。

            为防止出现此问题，某些浏览器（特别是Chrome和Firefox）已将文档级节点 Window，Document和Document.body的touchstart和touchmove事件的passive选项的默认值更改为true。这可以防止调用事件监听器，因此在用户滚动时无法阻止页面呈现。

            var elem = document.getElementById('elem');
            elem.addEventListener('touchmove', function listener() { /* do something */ }, { passive: true });

            添加passive参数后，touchmove事件不会阻塞页面的滚动（同样适用于鼠标的滚轮事件）

###### Range API

  * 具体也可参考week05的NOTE.md
  * 获取方式

        // 方式1
        var range = new Range();
        range.setStart(element, 9);
        range.setEnd(element, 3);
        // 通过selection，鼠标划一圈高亮的那部分
        var range1 = document.getSelection().getRangeAt(0);
  * 设置range的位置的方式

        // 设置range的起始位置，可以指定在某个元素的前后
        range.setStartBefore(ele);
        range.setEndBefore();
        range.setStartAfter();
        range.setEndAfter();
        // 选中一个元素
        range.selectNode();
        // 选中一个元素的全部内容
        range.selectNodeContents(); 
    
  * 增删操作
    这两步不会影响dom

        // 删除range的内容，并记录在fragment变量上
        var fragment = range.extractContents(); 
        // 在删除的位置上添加内容
        range.insertNode(document.creatTextNode('11111'));

###### CSSOM
  * document.styleSheets 获取css的style属性，包括外链的，style的都能获取到，是一个对象
  * Rules
    * document.styleSheets[0].cssRules 类数组，里面存放着css规则
    * document.styleSheets[0].insertRules("p {color:'red'}",0) 添加css规则，第一个参数是个字符串，第二个参数是添加的位置
    * document.styleSheets[0].removeRules(0) 移除规则，参数代表着是删除的位置
  * 获取一个元素的css属性
    `window.getComputedStyle(elt,preudoElt)`
      elt:想要获取的元素，
      preudoElt:可选，伪元素
  
        getComputedStyle(document.querySelector('#a')).color // rgb(0,0,0)

###### CSSOM view
  * window
    * window.innerHeight/window.innerWidth 浏览器窗口的宽高，可视区域
    * window.outerHeight/window.outerWidth 浏览器窗口包括工具栏的宽高（获取加上工具条与滚动条窗口的宽度与高度）
    * window.devicePixelRatio 浏览器的物理像素比，平常来说是1:1的，当DPR大于1时，显示出来的不一定是css写出来的数值。
      * 当前显示设备的物理像素分辨率与CSS像素分辨率之比。 此值也可以解释为像素大小的比率：一个CSS像素的大小与一个物理像素的大小。 简单来说，它告诉浏览器应使用多少屏幕实际像素来绘制单个CSS像素

      * \<canvas>可能在视网膜屏幕上显得太模糊。 使用window.devicePixelRatio确定应添加多少额外的像素密度以使图像更清晰。(例子可见canvas.html)

    * window.screen
      * window.screen.height/width
      * window.screen.availWidth/availHeight

    * window 方法
      * window.w = window.open("about blank", "_blank", "width=100,height=100,left=100,top=100")
      * w.moveTo(x,y) 绝对
      * w.moveBy(x,y) 相对 在之前的基础上移动差值
      * w.resizeTo(x,y) 绝对
      * w.resizeBy(x,y) 相对
    * scroll 保证有滚动条的情况下
      * element
        * scrollTop/scrollLeft
        * scrollHeight/scrollWidth
        * scroll(x,y) 绝对
        * scrollBy(x,y) 相对 在之前的基础上滚动差值
        * scrollIntoView() 强制滚动
          * element.scrollIntoView(); // 等同于element.scrollIntoView(true)
          * element.scrollIntoView(alignToTop); // Boolean型参数
            * 为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。相应的 scrollIntoViewOptions: {block: "start", inline: "nearest"}。这是这个参数的默认值。
            * 为false，元素的底端将和其所在滚动区的可视区域的底端对齐。相应的scrollIntoViewOptions: {block: "end", inline: "nearest"}。
          * element.scrollIntoView(scrollIntoViewOptions); // Object型参数
            * behavior 可选 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"。
            * block 可选 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"。
            * inline 可选 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"。
      * window
        * scrollX
        * scrollY
        * scroll(x,y)/ scrollTo(x,y)  绝对
        * scrollBy(x,y) 相对

    * layout
      * getClientRects() 获取元素的内部的全部盒，包括伪元素
      * getBoundingClientRect() 获取一个元素本身的数据值

    * 伪元素的content无法在浏览器中选中，无法copy