学习笔记

* 运算符优先级
  1. Member运算
    * a.b , a\[b]
    * foo\`string` (这代表着string为参数)
    * super.b,super\[b]
    * new.target
    * new Foo()
    * new Foo (这个比new Foo()的优先级低)
  2. Call Expressions
    * foo()
    * super()
    * foo()\['b'],foo().b
    * foo()\`abc`
  3. Left Handside & Right Handside
    * Left Handside
      * 构造函数 :new F(),supper()
      * 函数调用:a.f(), f(),f(1,2)
      * 属性访问:a.i a.j
      * 普通：i,j,1,"122",this等变量，字面量，this等
    * Right Handside
      从Update自增自减开始的
  4. 单目运算符 Unary
    * delete a.b
    * void foo()
    * typeof a
    * \+ a,\- a,~ a（位运算，按位取反，如果不是整数，强制转换为整数）,!a(双非强制转换为布尔类型)
    * await a

  5. Exponental
    * \**右结合运算

        3 ** 2 ** 3 // 3 ** 8
        // 大部分表达式都是左结合运算，唯独\**是右结合运算，该例子是先计算2\**3，再计算3**8

  6. Multiplicative
    * \* / %
  7. Additive
    * \+ -
  8. Shift 移位运算
    <<, >>, >>>
  9. Relationship 关系表达式
    <, >, <=, >=, instanceof,in
  10. Equality
    == != === !==
  11. Bitwise 位
    &(按位与),^(异或),|(按位或)
  12. Logic
    * &&（短路操作，若前者为false，则不会进行后者）
    * ||（短路操作，若前者为true，则不会进行后者）
  13. Conditional 三目运算
    ? : 

* 类型转换
  ![类型转换](https://github.com/sqh17/Frontend-06-Template/tree/main/Week%2007/type.jpg)

  * 拆箱转换
    在 JavaScript 标准中，规定了 ToPrimitive 函数，它是对象类型到基本类型的转换
    对象到 String 和 Number 的转换都遵循“先拆箱再转换”的规则。通过拆箱转换，把对象变成基本类型，再从基本类型转换为对应的 String 或者 Number。
    * toString()
    * valueOf()
    * symbol.toPrimitive
    如果定义了symbol.toPrimitive，就会忽略toString和valueOf，
  * 装箱转换
    每一种基本类型 Number、String、Boolean、Symbol 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象.

    Number => new NUmber(1) => 1
    String => new String('a') => 'a'
    Boolean => new Boolean(true) => true
    Symbol => new Object(Symbol('a')) => Symbol('a') 
    Symbol => (function(){ return this; }).call(Symbol("a")) => Symbol('a')

* 语句
  * 简单语句
    *  ExpressionStatement 表达式语句
    * EmptyStatement 空语句
    * DebuggerStatement debugger语句
    * ThrowStatement 抛出异常语句
    * ContinueStatement 跳出满足条件的继续循环
    * BreakStatement 跳出整个循环
    * ReturnStatement
  * 复合语句
    * BlockStatement
    * IfStatement
    * SwitchStatement
    * IterationStatement
      * while(){}
      * do()while{}
      * for(){}
      * for(x in j)
      * for(x of j)
      * for await( of )
    * WithStatement
      用with打开一个对象，把对象的全部属性全放进去，虽然能节省空间，但是不确定性太大，不建议
    * LabelledStatement
      就是break/continue与label的关系(知识在week01的NOTE.md中)

    * TryStatement
      
          try{
            // 一定得有花括号
          }
          catch(){
            // catch的圆括号的变量为try里面泡出来的错误
            // 可以添加label的
          }
          finally{
            // 虽然catch中添加了return，finally也会实行
          }

  * 声明
    所有的声明都有预处理机制的。
    * 老的声明
      * FunctionDeclaration ( function(){})
      * GeneratorDeclaration ( function *(){})
      * AsyncFunctionDeclaration ( async function (){} )
      * AsyncGeneratorDeclaration ( async function *(){} )
      * VariableStatement ( var )
    * 新的声明
      * ClassDeclaration ( class )
      * LexicalDeclaration ( let/const)

    * 作用域
      * var 的作用域在于函数体内的顶部，不管有没有用花括号括起来
      * let/const的作用域在于花括号内，

* 结构化
  * 宏任务和微任务
  * 事件循环
    类似于node的eventloop，总体上三步走：获取代码=》实行代码，销毁=》继续等待的循环过程。  
    是单独开辟的独立线程
  * 函数调用
    类似与一个栈式stack结构
    每个函数会生成一个闭包，根据闭包的经典定义：闭包会包含两部分，一个是代码部分一个是环境部分
      * 代码部分
        code

            var y = 2;
            function foo2(){
              console.log(y)
            }
            export foo2

        所谓的code部分就是指的那个y=2；console.log(y)
      * 环境部分
        由一个object和一个变量的序列来组成的

            var y = 2;
            function foo2(){
              var z = 3;
              return ()=>{
                console.log(y,z)
              }
            }
            var foo3 = foo2()
            export foo3

          Environment Record (环境部分):
            * z:3
            * this:global
            * y:2
          Code (代码部分)：
            * console.log(y,z)
  * Realm
    在JS中，函数表达式和对象直接量会创建对象，这些对象都是有原型的，而每个原型都不是一样的，这样通过Realm去联系起来