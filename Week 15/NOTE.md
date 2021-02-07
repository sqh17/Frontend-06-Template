学习笔记


###### 形成动画的方式
  * setTimeout

      let tick = () =>{
        setTimeout(tick,16)
      }
      
  * setInterval
  * requestAnimationFrame/cancelAnimationFrame
    * window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。(会根据浏览器的频率更新)
      `注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()`
    * 取消一个先前通过调用window.requestAnimationFrame()方法添加到计划中的动画帧请求(参数：先前调用window.requestAnimationFrame()方法时返回的ID.)

    ```html
      <div id="el" style="height: 100px;width: 100px;background-color: red;"></div>
      <button id="pause_btn">pause</button>
    ```
    ```javascript
      const element = document.getElementById('el');
      let start;
      let frame = null;
      function step(timestamp) {
        if (start === undefined)
          start = timestamp;
        const elapsed = timestamp - start;

        //这里使用`Math.min()`确保元素刚好停在200px的位置。
        element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

        if (elapsed < 2000) { // 在两秒后停止动画
          frame = window.requestAnimationFrame(step);
        }
      }
      frame = window.requestAnimationFrame(step);

      document.querySelector("#pause_btn").addEventListener("click",()=>{
        window.cancelAnimationFrame(frame)
      })
    ```

###### Event()
  创建一个新的事件对象 Event
  `event = new Event(typeArg, eventInit);`
    * typeArg 创建的事件名称
    * eventInit EventInit 类型的字典
      * bubbles 是否冒泡
      * cancelable 能否被取消
      * composed 指示事件是否会在影子DOM根节点之外触发侦听器

  ```javascript
  /* 创建一个事件对象，名字为newEvent，类型为build */
  var newEvent = new CustomEvent('build', { bubbles:true,cancelable:true,composed:true });

  /* 给这个事件对象创建一个属性并赋值，这里绑定的事件要和我们创建的事件类型相同，不然无法触发 */
  newEvent.name = "新的事件！";

  /* 将自定义事件绑定在document对象上 */
  document.addEventListener("build",function(){
      alert("你触发了使用CustomEvent创建的自定义事件！" + newEvent.name);
  },false)

  /* 触发自定义事件 */
  document.dispatchEvent(newEvent);
  ```

###### CustomEvent()
  也是自定义事件，要向事件对象添加更多数据，可以使用 CustomEvent 接口,参数方式和Event一样，detail作为额外参数，detail 属性可用于传递自定义数据。

  ```javascript
  /* 创建一个事件对象，名字为newEvent，类型为build */
  var newEvent = new CustomEvent('build',{
      detail: {
          dog:"peter",cat:"tom"
      }
  });

  /* 将自定义事件绑定在document对象上 */
  document.addEventListener("build", function(){
      console.log(event.detail.dog,event.detail.cat ); //  petre tom
  },false)

  /* 触发自定义事件 */
  document.dispatchEvent(newEvent);
  ```

###### 二进制运算符
  凡位运算符都是把值先转换成二进制再进行后续的处理
  * | 按位或
    |按位或和&按位与计算方式都是转换二进制再计算，不同的是运算规则(一个为真即为真)
    `1|0 = 1 , 1|1 = 1 , 0|0 = 0 , 0|1 = 1`

      * 6 | 2
      6的二进制位0000 0110 , 2的二进制位0000 0010 , 110|010为110，最终值0000 0110，故6|2等于6

  * || 逻辑或
    逻辑或||的运算规则是一个为真即为真，后续不再计算，一个为假再计算右边的表达式。
  * & 按位与
    &按位与的运算规则是将两边的数转换为二进制位，然后运算最终值，运算规则即(两个为真才为真)
    `1&1=1 , 1&0=0 , 0&1=0 , 0&0=0`

      * 3&5
      3的二进制位是0000 0011 ， 5的二进制位是0000 0101 ， 那么就是011 & 101，由按位与运算规则得知，001 & 101等于0000 0001，最终值为1

      * 7&5
      7的二进制位是0000 0111，那就是111 & 101等于101，也就是0000 0101，故值为5

  * && 逻辑与
    &&逻辑与也称为短路逻辑与，先运算&&左边的表达式，一旦为假，后续不管多少表达式，均不再计算，一个为真，再计算右边的表达式，两个为真才为真。
  * ～ 取反运算符
    取反就是`1为0,0为1`,

      * ~5
      5的二进制位是0000 0101，取反后为1111 1010，值为-6

  * ^ 异或运算符
    ^异或运算符顾名思义，异就是不同，其运算规则为
    `1^0 = 1 , 1^1 = 0 , 0^1 = 1 , 0^0 = 0`

      * 5^9
      5的二进制位是0000 0101 ， 9的二进制位是0000 1001，也就是0101 ^ 1001,结果为1100 , 00001100的十进制位是12
  * \>> 右移运算符
    * 5<<2
    5的二进制位是0000 0101，右移两位就是把0000 0101右移后为0000 0001，正数左边第一位补0，负数补1，等于除于2的n次方，结果为1
  * << 左移运算符
    * 5 << 2
    5的二进制位往左挪两位，右边补0，5的二进制位是0000 0101 ， 就是把有效值101往左挪两位就是0001 0100 ，正数左边第一位补0，负数补1，等于乘于2的n次方
