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
