function createElement(type, attributes, ...children) {
  let element;
  if(typeof type === 'string'){
    element = new ElementWrapper(type)
  }else{
    element = new type
  }
  for (let i in attributes) {
    element.setAttribute(i, attributes[i]);
  }
  for (let i of children) {
    if(typeof i === 'string'){
      i = new TextWrapper(i)
    }
    element.appendChild(i);
  }
  return element;
}
// 处理已知标签
class ElementWrapper{
  constructor(type){
    this.root = document.createElement(type);
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value)
  }
  appendChild(child){
    child.mountTo(this.root)
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}
class TextWrapper{
  constructor(content){
    this.root = document.createTextNode(content);
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value)
  }
  appendChild(child){
    child.mountTo(this.root)
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}
// 处理未知标签
class Div {
  constructor(){
    this.root = document.createElement('div');
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value)
  }
  appendChild(child){
    child.mountTo(this.root)
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}
let a = 
  <Div id="a">
    Hello World
    <div>
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
  </Div>
;
// document.body.appendChild(a);

a.mountTo(document.body)
