
const EOF = Symbol('EOF')

let currentToken = null;

function emit(token){
  console.log(token)
}

function data(c){
  if(c === '<'){
    return tagOpen
  }else if(c === EOF){
    emit({
      type:'EOF'
    })
    return
  }else{
    emit({
      type:'text',
      content:c
    })
    return data
  }
}

function tagOpen(c){
  if(c === '/'){ 
    return endTagOpen
  }else if(c.match(/^[a-zA-Z]$/)){  // 自封闭，开始标签
    // 设置状态
    currentToken = {
      type:'startTag',
      tagName:""
    }
    return tagName(c)
  }else {
    return
  }
}

function endTagOpen(c){
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type:'endTag',
      tagName:""
    }
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
  // 不能注释掉这段，因为只能判断有标签才能做下一步操作，比如currentToken.tagName
  else if(c.match(/^[a-zA-Z]$/)){
    currentToken.tagName += c
    return tagName
  }
  else if(c === '>'){
    emit(currentToken)
    return data
  }else{
    return tagName
  }
}

// 暂时不解析属性,死等>
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

// 自封闭标签
function selfCloseStarting(c){
  if(c === '>'){ // 遇到>直接结束
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
