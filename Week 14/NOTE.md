学习笔记

##### 组件的基本知识
###### 组成
  * 组件在对象的基础上再新添加几个特点组成的组件，最终目的就是完成复用。
  * 包含：
    * properties
    * methods
    * inherit 继承
    * attribute
    * config&state 配置&状态
    * event
    * lifecycle 生命周期
      * created
      * mounted/unmount
      * render/update
      * destroyed
    * children
###### attribute和property的区别
    <a abc='abc' class="c1 c3" style="color:'red'" href="//m.taobao.com"></a>
  * attribute
    * 强调描述性，比如说特性
    * a.getAttribute('abc') === a.setAttribute('abc','abc)
    * 一般来说弄出来的都是字符串（比如说获取类名，a.className // c1 c3）
    * a.getAttribute('href') // 和html代码完全一致//m.taobao.com
  * property
    * 强调从属关系，比如说父子
    * a.value = 'abc'
    * 一般弄出来的都是对象 (比如说获取style，a.style // {color:'red'})
    * a.href //是resolve的结果：http://m.taobao.com

  * 两者同时存在时，property优先级高，attribute类似于默认值，拿input取例，input.value = 'cute',若value的属性已经设置，则attribute不变，property变化，value取的是cute，而getAttribute取的是原值