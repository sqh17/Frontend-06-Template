学习笔记

* AST 抽象语法树
  核心思想：LL算法和LR算法

* LL语法分析
  
      <AdditiveExpression> ::=
        <Number> 
        | <MultiplicativeExpression> <*> <Number>
        | <MultiplicativeExpression> </> <Number>
        | <AdditiveExpression> <+> <MultiplicativeExpression>
        | <AdditiveExpression> <-> <MultiplicativeExpression>
  
* 正则
  * 小括号代表的是捕获，匹配里面的字符并获取这一匹配
  * 中括号是包含关系，匹配所包含的任意一个字符

  * reg.exec(str) 接受一个字符串，返回一个数组，否则返回null
    1. 如果有多个匹配的话
      1. 此数组的第0个元素是与正则表达式相匹配的文本。
      2. 第一个元素是与reg的第一个子表达式相匹配的文本，（如果有的话）
      3. 第二个元素是reg的第二个子表达式相匹配的文本，（如果有的话）
      4. ……
    2. index 匹配文本的第一个字符的索引
    3. input 是被检索的字符串str

  * 每个RegExp对象都包含5个属性，source、global、ignoreCase、multiline、lastIndex。
    1. source：是一个只读的字符串，包含正则表达式的文本。

            var reg = /JavaScript/;
            reg.source; //返回 JavaScript

    2. global：是一个只读的布尔值，看这个正则表达式是否带有修饰符g。
      修饰符g，是全局匹配的意思，检索字符串中所有的匹配。

            var str = "JavaScript";
            str.match(/JavaScript/); //只能匹配一个JavaScript  ["JavaScript", index: 0, input: "JavaScript", groups: undefined]
            var str = "JavaScript JavaScript";
            str.match(/JavaScript/g); //能匹配两个JavaScript 
            var reg = /JavaScript/;
            reg.global; //返回 false
            var reg = /JavaScript/g;
            reg.global; //返回 true

    3. ignoreCase：是一个只读的布尔值，看这个正则表达式是否带有修饰符i。
      修饰符i，说明模式匹配是不区分大小写的。

            var reg = /JavaScript/;
            reg.ignoreCase; //返回 false
            var reg = /JavaScript/i;
            reg.ignoreCase; //返回 true
            var reg = /JavaScript/;
            reg.test("javascript"); //返回 false
            var reg = /JavaScript/i;
            reg.test("javascript"); //返回 true

    4. multiline：是一个只读的布尔值，看这个正则表达式是否带有修饰符m。
      修饰符m，用以在多行模式中执行匹配，需要配合^ 和 \$</\code> 使用，使用<\code>^</\code> 和 <\code>$ 除了匹配整个字符串的开始和结尾之外，还能匹配每行的开始和结尾。

            var str="java\nJavaScript";
            str.match(/^JavaScript/); //返回null
            var str="java\nJavaScript";
            str.match(/^JavaScript/m); //匹配到一个JavaScript
            var reg=/JavaScript/;
            reg.multiline; //返回false
            var reg=/JavaScript/m;
            reg.multiline; //返回true

    5. lastIndex：是一个可读/写的整数，如果匹配模式中带有g修饰符，这个属性存储在整个字符串中下一次检索的开始位置，这个属性会被exec()和 test()方法用到.

            var reg = /Javascript/g;
            var str = 'Javascript Javascript';
            
            reg.exec(str); // ["Javascript", index: 0, input: "Javascript Javascript", groups: undefined]
            reg.lastIndex; // 10

            reg.exec(str); // ["Javascript", index: 11, input: "Javascript Javascript", groups: undefined]
            reg.lastIndex; // 21

* shift()与unshift()
  * shift() 代表删除数组的第一个，并返回删除的值
  * unshift(val) 代表在数组的最前面添加一个val,返回新的数组长度

* arr.filter()
  过滤数组，返回满足条件的数组

      [1,2,3,4,5].filter(i=>i<=3) //  [1, 2, 3]

* switch (value) { case val:} 
  在语法分析时， MultiplicativeExpression函数可以采用这个方式，所谓的if就是对应的不同的情况
  __case的满足情况时切记要break__

      switch (val) {
        case '1':
          console.log('1')
          break
        case '2':
          console.log('2')
          break
        default :
          console.log('err')
      }