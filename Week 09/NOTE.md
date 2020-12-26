学习笔记

* 第一步 文件拆分
  1. 为了方便管理，把parser单独拆到文件中
  2. parser接受html文本作为参数，返回一个DOM树

* 第二步 用FSM实现HTML的分析
  1. 使用FSM（有限状态机）实现html的分析
  2. 在html标准中，已经规定了html的状态（80种），省去了设计状态机的方式
  3. 简化toy-browser

* 第三步 解析标签
  1. 主要的标签有三种，开始标签，自封闭标签，结束标签
  2. 暂时忽略属性

* 第四步 创建元素
  1. 加入业务逻辑 (创建 token，把字符添加倒 token 上，emit token)
  2. 在标签结束状态时提交标签token

* 第五步 处理属性
  1. 属性值分为单引号，双引号，无引号三种写法，需要多种状态处理
  2. 处理属性的方式和标签类似
  3. 属性结束时，我们爸属性加到标签Token上

* 第六步 用token构建dom树
  1. 使用栈完成dom树构建
  2. 遇到开始标签就入栈，结束标签就出栈
  3. 自封闭表视为入栈再出栈
  4. 任何元素的父元素既是它入栈前的栈顶

* 第七步 文本节点添加到dom树中
  1. 文本节点于自封闭标签方式一致
  2. 多个文本节点需要合并

* 第八步 css计算 - 收集规则
  1. 遇到 style 标签时，把 CSS 规则保存起来
  2. 调用 CSS Parser 来分析 CSS 规则
  3. 必须自己研究词库分析 CSS 规则的格式

          // AST
          {
            "type": "stylesheet",
            "stylesheet": {
              "rules": [
                {
                  "type": "rule",
                  "selectors": [
                    "body div #myid"
                  ],
                  "declarations": [
                    {
                        "type": "declaration",
                        "property": "width",
                        "value": "100px",
                        "position": {
                            "start": {
                                "line": 3,
                                "column": 3
                            },
                            "end": {
                                "line": 3,
                                "column": 14
                            }
                        }
                    },
                    {
                        "type": "declaration",
                        "property": "background-color",
                        "value": "#ff5000",
                        "position": {
                            "start": {
                                "line": 4,
                                "column": 3
                            },
                            "end": {
                                "line": 4,
                                "column": 28
                            }
                        }
                    }
                ],
                "position": {
                    "start": {
                        "line": 2,
                        "column": 1
                    },
                    "end": {
                        "line": 5,
                        "column": 2
                    }
                }
            },
            {
                "type": "rule",
                "selectors": [
                    "body div img"
                ],
                "declarations": [
                    {
                        "type": "declaration",
                        "property": "width",
                        "value": "30px",
                        "position": {
                            "start": {
                                "line": 7,
                                "column": 3
                            },
                            "end": {
                                "line": 7,
                                "column": 13
                            }
                        }
                    },
                    {
                        "type": "declaration",
                        "property": "background-color",
                        "value": "#ff1111",
                        "position": {
                            "start": {
                                "line": 8,
                                "column": 3
                            },
                            "end": {
                                "line": 8,
                                "column": 28
                            }
                        }
                    }
                ],
                "position": {
                    "start": {
                        "line": 6,
                        "column": 1
                    },
                    "end": {
                        "line": 9,
                        "column": 2
                    }
                  }
                }
              ],
              "parsingErrors": []
            }
          }

* 第九步 css计算 - css调用


* module exports 与 exports
  require导出的内容是module.exports的指向的内存块内容，并不是exports的。
  简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的

  exports 返回的是模块函数
  module.exports 返回的是模块对象本身，返回的是一个类 需要new出来这个类

  exports.[function name] = [function name]
  moudle.exports = [function name]

  exports和moudle.exports同时用，会优先调用moudle.exports

  CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

      //  a.js
      var x = 5;
      var addX = function (value) {
        return value + x;
      };
      module.exports.x = x;
      module.exports.addX = addX;

      // b.js
      var example = require('./a.js');

      console.log(example.x); // 5
      console.log(example.addX(1)); // 6

* export与export default
  * export与export default均可用于导出常量、函数、文件、模块等
  * 在一个文件或模块中，export、import可以有多个，export default仅有一个
  * 通过export方式导出，在导入时要加{ }，export default则不需要
  * export能直接导出变量表达式，export default不行。
