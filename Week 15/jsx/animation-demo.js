import { Timeline, Animation } from './animation.js'
import { easeIn } from './ease.js';
let tl = new Timeline();
// window.animation = new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null);
// tl.add(new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null))
tl.start();
tl.add(new Animation( document.querySelector("#el").style, "transform", 0, 800, 2000, 0, easeIn, (v=> `translateX(${v}px)`)))

document.querySelector("#el2").style.transition = '2s ease-in';
document.querySelector("#el2").style.transform = 'translateX(800px)';
document.querySelector("#pause_btn").addEventListener("click",()=>{
  tl.pause()
})
document.querySelector("#resume_btn").addEventListener("click",()=>{
  tl.resume()
})
// document.querySelector("#reset_btn").addEventListener("click",()=>{
//   tl.reset()
// })