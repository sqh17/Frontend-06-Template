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
