
const EOF = Symbol('EOF')

function data(c){
  if(c === '<'){
    return tagOpen
  }else if(c === EOF){
    return
  }else{
    return data
  }
}

function tagOpen(c){
  if(c === '/'){ 
    return endTagOpen
  }else if(c.match(/^[a-zA-Z]$/)){  // 自封闭，开始标签
    return tagName(c)
  }else {
    return
  }
}

function endTagOpen(c){
  if(c.match(/^[a-zA-Z]$/)){
    return tagName(c)
  }else if(c === EOF){
    
  }else{

  }
}

function tagName(c){
  if(c === /^[\n\t\f ]$/){ // 遇到tab，换行，禁止，空白
    return beforeAttributeName
  }else if(c === '/'){
    return selfCloseStarting
  }
  // else if(c.match(/^[a-zA-Z]$/)){
  //   return tagName
  // }
  else if(c === '>'){
    return data
  }else{
    return tagName
  }
}

function beforeAttributeName(c){
  if(c === /^[\n\t\f ]$/){ // 遇到tab，换行，禁止，空白
    return beforeAttributeName
  }else if(c === '>'){
    return data
  }else if(c === '='){
    return beforeAttributeName
  }else{
    return beforeAttributeName
  }
}

function selfCloseStarting(c){
  if(c === '>'){
    currentToken.isSelfCosing = true
  }else if(c === EOF){

  }else{

  }
}

module.exports.parserHTML = function parserHTML(html){
  let state = data;
  for(let i of html){
    state = state(i)
  }
  state = state(EOF)
} 
