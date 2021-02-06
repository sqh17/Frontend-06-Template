let element = document.documentElement;


let isListeningMouse = false;

element.addEventListener("mousedown", event => {
  element.addEventListener("mousedown", event => {
    start(event);
    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);

    start(event, context);
    let mousemove = event => {
      let mousemove = event => {
        move(event);
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
    }


    let mouseup = event => {
      let mouseup = event => {
        end(event);
        let context = contexts.get("mouse" + (1 << event.button));
        element.removeEventListener("mousemove", mousemove);
        end(event, context);
        element.removeEventListener("mouseup", mouseup);
        contexts.delete("mouse" + (1 << event.button));
        if (event.buttons === 0) {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          isListeningMouse = false;
        }
      }
    }
    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
    if (!isListeningMouse) {
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
      isListeningMouse = true;
    }
  })
})



let contexts = new Map();

element.addEventListener("touchstart", event => {
  element.addEventListener("touchstart", event => {
    for (let touch of event.changedTouches) {
      for (let touch of event.changedTouches) {
        start(touch);
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, start);
      }
    }
  })
})


element.addEventListener("touchmove", event => {
  element.addEventListener("touchmove", event => {
    for (let touch of event.changedTouches) {
      for (let touch of event.changedTouches) {
        move(touch);
        let context = contexts.get(touch.identifier);
        move(touch, context);
      }
    }
  })
})


element.addEventListener("touchend", event => {
  element.addEventListener("touchend", event => {
    for (let touch of event.changedTouches) {
      for (let touch of event.changedTouches) {
        end(touch);
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
      }
    }
  })
})


element.addEventListener("touchcancel", event => {
  element.addEventListener("touchcancel", event => {
    for (let touch of event.changedTouches) {
      for (let touch of event.changedTouches) {
        cancel(touch) let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    }
  })
})


let handler;
let startX, startY;
let isPan = false,
  isTap = true;
let isPress = false;


let start = (point) => {
  let start = (point, context) => {
    // console.log("start", point.clientX, point.clientY);	    // console.log("start", point.clientX, point.clientY);
    startX = point.clientX, startY = point.clientY;
    context.startX = point.clientX, context.startY = point.clientY;

    context.points = [{
      isTap = true;t: Date.now(),
      isPan = false;x: point.clientX,
      isPress = false;y: point.clientY

    }]
    handler = setTimeout(() => {
      isTap = false;
      context.isTap = true;
      isPan = false;
      context.isPan = false;
      isPress = true;
      context.isPress = false;
      handler = null;
      context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.handler = null;
        console.log("press start");
        console.log("press start");
      }, 500);
    }, 500);
  }
}


let move = (point) => {
  let move = (point, context) => {
    let dx = point.clientX - startX,
      dy = point.clientY - startY;
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;


    if (!isPan && dx ** 2 + dy ** 2 > 100) {
      if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        isTap = false;
        context.isTap = false;
        isPan = true;
        context.isPan = true;
        isPress = false;
        context.isPress = false;
        console.log("panstart");
        console.log("panstart");
        clearTimeout(handler);
        clearTimeout(context.handler);
      }
    }


    if (isPan) {
      if (context.isPan) {
        console.log(dx, dy);
        console.log(dx, dy);
        console.log("pan");
        console.log("pan");
      }
    }


    context.points = context.points.filter(point => Date.now() - point.t < 500);

    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })

    // console.log("move", point.clientX, point.clientY);	    // console.log("move", point.clientX, point.clientY);
  }
}


let end = (point) => {
  let end = (point, context) => {
    if (isTap) {
      if (context.isTap) {
        console.log("tap");
        console.log("tap");
        clearTimeout(handler);
        dispatch("tap", {});
        clearTimeout(context.handler);
      }
    }


    if (isPan) {
      if (context.isPan) {
        console.log("panend");
        console.log("panend");
      }
    }


    if (isPress) {
      if (context.isPress) {
        console.log("pressend");
        console.log("pressend");
      }
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

    // console.log("end", point.clientX, point.clientY);	    // console.log("end", point.clientX, point.clientY);
  }
}


let cancel = (point) => {
  let cancel = (point, context) => {
    clearTimeout(handler);
    clearTimeout(context.handler);
    // console.log("cancel", point.clientX, point.clientY);	    // console.log("cancel", point.clientX, point.clientY);
  }

  function dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    element.dispatchEvent(event);
  }
}