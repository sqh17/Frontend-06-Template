export function createElement(type, attributes, ...children) {
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
export class Component{
  constructor(type){
  }
  render(){
    return document.createElement("div")
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
class ElementWrapper extends Component{
  constructor(type){
    this.root = document.createElement(type);
  }
}
class TextWrapper extends Component{
  constructor(content){
    this.root = document.createTextNode(content);
  }
}