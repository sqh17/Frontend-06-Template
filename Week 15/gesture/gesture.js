let element = document.documentElement;

let isListeningMouse = false;

element.addEventListener("mousedown", event => {

  let context = Object.create(null);
  contexts.set("mouse" + (1 << event.button), context);

  start(event, context);
  let mousemove = event => {
    console.log('1111111',event.buttons) // 用掩码记录按键位置1 2 4 8 16
    let button = 1;

    while (button <= event.buttons) {
      if (button & event.buttons) {
        ///order of buttons & button property is not same
        let key;
        if (button === 2) {
          key = 4;
        } else if (button === 4) {
          key = 2;
        } else {
          key = button;
        }
        let context = contexts.get("mouse" + key);
        move(event, context);
      }
      button = button << 1;
    }
  }

  let mouseup = event => {
    let context = contexts.get("mouse" + (1 << event.button));
    end(event, context);
    contexts.delete("mouse" + (1 << event.button));
    if (event.buttons === 0) { // 当监听鼠标未按下时
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      isListeningMouse = false;
    }
  }
  if (!isListeningMouse) {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    isListeningMouse = true;
  }
})


let contexts = new Map(); // 由于会有很多touch，所以用Map存取对应的touch

element.addEventListener("touchstart", event => {
  for (let touch of event.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context);// identifier独一无二，类似于id
    start(touch, start);
  }
})

element.addEventListener("touchmove", event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    move(touch, context);
  }
})

element.addEventListener("touchend", event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    end(touch, context);
    contexts.delete(touch.identifier);
  }
})

element.addEventListener("touchcancel", event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    cancel(touch, context);
    contexts.delete(touch.identifier);
  }
})


let start = (point, context) => {

  context.startX = point.clientX, context.startY = point.clientY;
  context.points = [{
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  }]

  context.isTap = true;
  context.isPan = false;
  context.isPress = false;

  context.handler = setTimeout(() => {
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    context.handler = null;
    console.log("press start");
  }, 500);
}

let move = (point, context) => {
  let dx = point.clientX - context.startX,
    dy = point.clientY - context.startY;


  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log("panstart");
    clearTimeout(context.handler);
  }

  if (context.isPan) {
    console.log(dx, dy);
    console.log("pan");
  }

  context.points = context.points.filter(point => Date.now() - point.t < 500);

  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  })

  // console.log("move", point.clientX, point.clientY);
}

let end = (point, context) => {
  if (context.isTap) {
    console.log("tap");
    dispatch("tap", {});
    clearTimeout(context.handler);
  }

  if (context.isPan) {
    console.log("panend");
  }

  if (context.isPress) {
    console.log("pressend");
  }

  context.points = context.points.filter(point => Date.now() - point.t < 500);

  let v;
  if (!context.points.length) {
    v = 0;
  } else {
    let d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
    v = d / (Date.now() - context.points[0].t);
  }

  if (v > 1.5) {
    console.log("flick");
    context.isFlick = true;
  } else {
    context.isFlick = false;
  }

  // console.log("end", point.clientX, point.clientY);
}

let cancel = (point, context) => {
  clearTimeout(context.handler);
  // console.log("cancel", point.clientX, point.clientY);
}

function dispatch(type, properties) {
  let event = new Event(type);
  for (let name in properties) {
    event[name] = properties[name];
  }
  element.dispatchEvent(event);
}