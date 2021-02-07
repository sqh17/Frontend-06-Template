const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start"); // 开始暂停的时间
const PAUSE_TIME = Symbol("pause-time"); // 暂停持续的时间

export class Timeline {
  constructor() {
    this.state = "Inited";
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
  }

  start() {
    if (this.state !== "Inited") { // 设置状态，避免多次点击
        return;
    }
    this.state = "started";
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
        let t;
        if (this[START_TIME].get(animation) < startTime) { // 如果this[START_TIME].get(animation)特别小，可以认为是0 
          t = now - startTime - this[PAUSE_TIME] - animation.delay; // delay会在已有的时间中进行扣除来达到延迟的效果
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        }
        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation);
          t = animation.duration;
        }
        if (t > 0) { // 若t是负的，代表动画没开始
          animation.receive(t);
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }

  pause() {
    if (this.state !== "started") {
        return;
    }
    this.state = "paused";
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }

  resume() {
    if (this.state !== "paused") {
        return;
    }
    
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  reset() {
    this.pause();
    this.state = "Inited";
    this[PAUSE_TIME] = 0;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[TICK_HANDLER] = null;
    this[PAUSE_START] = 0;
  }

  add(animation, startTime = Date.now()) {
    // if (arguments.length < 2) {
    //   startTime = Date.now();
    // }
    this[ANIMATIONS].add(animation);
    // 在add的时候时间线已经开始了，所以在tick运行时时间就不一致了
    this[START_TIME].set(animation, startTime);
  }
  remove() {}
}

export class Animation {
  constructor(object,property,startValue,endValue,duration,delay,timeFunction,template) {
    timeFunction = timeFunction || ((v) => v);
    template = template || ((v) => v);

    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timeFunction = timeFunction;
    this.template = template;
  }

  receive(time) {
    let range = this.endValue - this.startValue;
    // this.startValue + range * time / this.duration 均匀变化
    let progress = this.timeFunction(time / this.duration);
    this.object[this.property] = this.template(
      this.startValue + range * progress
    );
  }
}