学习笔记

###### 手势
* 手势是基于屏幕上的触摸事件定义出来的，对于Web来说,需要区分鼠标事件和手机触屏事件是2套事件。因此可以抽离出他们共同的定义模型来实现出一套统一的手势系统。
* 手势也可以看成是有生命周期的，他的生命周期主要由触摸事件组成。
* 统一手势 gestrue

  * Mouse Event: mousedown, mousemove, mouseup
  * Touch Event: touchstart, touchmove, touchup
  * 自定义手势：
    * press-start
    * press-end
    * tap
    * pan-start
    * pan-move
    * pan-end
    * flick
  * 自定义事件
    * new Event
    * start
    * end

###### 动画
自定义的动画其实就是定义组件在连续时间内，每个时间点的组件状态。因此动画的定义有两部分：

* 统一的时间线或者说是动画时钟的定义。
* 每个动画对象的定义，动画对象就是描述在指定时间点的状态。
* 管理动画和时间线 animation&timeline
  * Timeline
    * add
    * start
    * pause
    * resume
    * reset
  * Animation
    * new Animation(object, property, startValue, endValue, delay, timingFunction, template)
    * receiveTime
      * progress = time / duration

###### 组件的children
* 内容型 （所见即所得，所有内容往里面塞，都显示出来）
```javascript
let btn = <Button>btn</Button>;
```
* 模板型 （所见即所不得）,常见用于列表渲染
```javascript
let list = (
  <List data={list}>
    {(record) => (
      <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
      </div>
    )}
  </List>
);
```
###### 理解

组件化不仅是指对UI组件的可复用封装，还包含对通用逻辑的可复用封装，如动画，手势等。 通过对业务需求的分析和拆解，可以将一个复杂的功能拆分若干个相对简单和可复用的功能，分别实现后再进行组合。这样既保持了组件的健壮性又让更多的重复概念具有复用性。