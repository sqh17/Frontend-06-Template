学习笔记

* 语言分为形式语言和非形式语言。

  * 非形式语言，包括中文、英文等，语法格式没有严格限制。

  * 形式语言，计算机中的编程语言都是形式语言，较严谨严格，可以分为许多种，这里介绍乔姆斯基谱系，分为 4 种类型，
    * 0 型为无限制文法，
    * 1 型为上下文相关文法，
    * 2 型为上下文无关文法，
    * 3 型为正则文法。
  这之间是包含关系，1型肯定是0型，但反过来不一定；3型一定隶属2型，也隶属1型，也隶属与0型，反过来不成立 

* 产生式

  * 定义：在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
  * 常用：BNF 一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言
  * 情况：
    * 用尖括号括起来的名称来表示语法结构名
    * 语法结构分为两种
      * 基础结构 === 终结符
      * 复合结构 === 非终结符
    * 引号和中间字符表示终结符
    __终结符不是语法终结的意思，在语言里面，他一定有很多终结符，这些终结符通过一定关系合成非终结符__
    * 可以有括号
    * '*' 表示 多次
    * '|' 表示 或者
    * '+' 表示 至少一次
  * 常用例子：四则运算

        1 + 2 * 3

        <MultiplicativeExpression>::=<Number>|<MultiplicativeExpression>"*"<Number>|<MultiplicativeExpression>"/"<Number>|
                               
        <AddtiveExpression>::=<MultiplicativeExpression>|<AddtiveExpression>"+"<MultiplicativeExpression>| <AddtiveExpression>"-"<MultiplicativeExpression>|
                        
        <BracketsExpression>::='('<AddtiveExpression>')'|<Number>

        1. 终结符：
          Number + / - *
        2. 非终结符 
          MultiplicativeExpression  AddtiveExpression  BracketsExpression

* javascript是上下文无关文法


* 语言分类
  * 形式语言 -- 分类
    * 数据描述语言：有一定数据描述的形式，本身无法进行编程
      JSON，HTML，CSS，XAML，SQL
    * 编程语言：可以进行编程
      C，C++，JAVA，JavaScript，Python，Lisp，T-SQL，Clojure,Haskell
  * 形式语言 -- 表达方式
    * 声明式语言 ： 直接告诉结果
      JSON，HTML，CSS，XAML，SQL,Lisp，Clojure,Haskell
    * 命令式语言 ： 想得到结果需要进行那些步骤
      C，C++，JAVA，JavaScript，Python

* 编程语言的性质
  * 图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

  * 动态与静态
    * 动态
      1. 在用户的设备/在线服务器上
      2. 产品实际运行时
      3. runtime  JavaScript
    * 静态
      1. 在程序员设备上
      2. 产品开发时
      3. compiletime Java

  * 类型系统
    * 动态类型系统与静态类型系统
      参考动态与静态，能够在用户的机器上，用户的内存找到的类型就是动态类型， 程序员在编码的时候能够保存的类型，但这个类型compile后找不到的，就是静态类型，Java是一种半动态半静态类型的语言
    * 强类型与弱类型
      强类型没有隐式转换，弱类型有隐式转换
      * 强类型：一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了
      * 弱类型：数据类型可以被忽略的语言。它与强类型定义语言相反, 一个变量可以赋不同数据类型的值
    * 复合类型
      * 结构体
        引用，指针，数组
      * 函数签名
        函数参数 (T1,T2)=>T3
    * 子类型
      子类型是一种类型多态的形式。这种形式下，子类型可以替换另一种相关的数据类型（超类型，英语：supertype）(也就是说，针对超类型元素进行操作的子程序、函数等程序元素，也可以操作相应的子类型。如果 S 是 T 的子类型，这种子类型关系通常写作 S <: T，意思是在任何需要使用 T 类型对象的环境中，都可以安全地使用 S 类型的对象。)
    * 泛型
      描述不出来,不怎么懂，看资料[协变与逆变](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html)
      * 协变
      * 逆变

* 一般命令式编程语言
  * Atom
    原子，直接量，比如字符串，数字等
  * Expression
    表达式，通过原子和运算符结合，加上辅助性符号，形成可级联的表达式，四则运算，按位与
  * Statement
    语句，表达式+关键字+特定符号形成一种语句，if语句，while语句
  * Structure
    结构化，会有Function，Class，namespace的设计，把代码分成不同的块，同时进行复用
  * Program
    程序，借用第三方，辅助性设施管理代码，program，module，package等等更好管理语言的模块和安装，常见的有npm


* 数据类型
  Number，String，Boolean，Undefined，Null，Object，Symbol，BigInt

* Number
  * 表示
    IEEE754 Double Float 双精度浮点数
    * Sign 1 符号位（1代表负，0代表正），不参与任何数字的表示
    * Exponent 11 指数位
    * Franction  52 精度位

  * 0.1 + 0.2 !== 0.3 三次转换，一次运算导致精度损失

  * 语法
    * 十进制
      0-9
      允许有小数
      1e3 代表1 * 10的3次方
    * 二进制
      0-1
      Ob开头
    * 八进制
      0-7
      0o开头
    * 十六进制
      0-9 A-F
      0x开头
    
          0.toString() // 报错 因为0.代表是合法的十进制，没法直接以取属性来表示
          0 .toString() // ‘0’ 0空格代表的是数字，后面的点代表的是取属性

* String
  * 定义
    * character 字符  a
    * code pointer 码点 97
    * Encoding 编码 01100001
  * 分类
    * ASCII 127个字符 A-Z+a-z+0-9+各种制表符
    * Unicode
    * UCS
    * GB 国内
      * GB2312
      * GBK
      * GB18030
    * ISO-8859 国外
    * BIG5 台湾 
  * Encoding 
    * utf-8
    * utf-16
  * 语法
    * 单引号 双引号
      转义字符加\ 
    * 反撇号
      在第一个反撇号前面可以加函数名的，代表作为一个语言，让这个函数去做一些解析和处理 
  
* Boolean

* undefined
  不是关键字
  因为undefined可以作为一个变量的存在，不是很安全，可以是用 void 0，void true等等来表示undefined
* Null
  是关键字

* Object
  * 任意对象都是唯一，哪怕一模一样的，也是唯一的，他与本身的状态无关
  * 面向对象的三要素：特性，状态，行为
  * 类是一种常见的描述对象的方式
    * 归类 
      多继承
    * 分类
      分治，单继承结构

  * 对象一般都只有属性和原型，函数方法也归为属性中 
  * 对象的属性是kv的形式结构，属性名=>属性值,
    * k有两种形式
      * string 任何方式都可以获取到 
      * Symbol 独一无二的特性，只能通过变量去引用
    * 属性有两种
      * Data Property 数据属性 一般来说描述状态
        \[[value]] writable enumerable configurable
      * Accessor Property 访问器 描述行为
        get,set,enumerable
  * 原型链
    若当前对象没有想要的属性时，会沿着原型对象去找该属性，层层往上找，若没有则返回null
  * API
    * {},[],Object.defineProperty() 定义属性
    * Object.create()/Object.setPropertyOf()/Object.getPropertyOf() 指定原型的对象的方法
    * new/class/extends 新语法，基于分类的方式
    * new /function/proptype  弃用
  * JavaScript 标准里面所有具有特殊行为的对象
    1. Array：Array 的 length 属性根据最大的下标自动发生变化。
    2. Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
    3. String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
    4. Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
    5. 模块的 namespace对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
    6. 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
    7. bind 后的 function：跟原来的函数相关联。
