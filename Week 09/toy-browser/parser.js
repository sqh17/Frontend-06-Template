
const EOF = Symbol('EOF')

let currentToken = null; // 标签
let currentAttribute = null; // 属性

let stack = [{type: 'document', children: []}];
let currentTextNode = null;
function emit(token){
  // 栈顶
  let top = stack[stack.length - 1];
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }

    }

    // 入栈前添加 parent & children 关系，对偶操作
    top.children.push(element);
    // element.parent = top;

    // 自封闭元素被添加对偶关系后不需要入栈，因为没有封闭标签给它出栈
    if(!token.isSelfClosing)
      // 非自封闭元素需要入栈
      stack.push(element);
    
    currentTextNode = null;
      
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end dosen't match");
    } else {
      // 找到了对应的关闭标签，就从栈顶取出
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: '',
      };
      // 在遇到新的文本时，创捷文本节点，并作为 children 添加给栈顶
      top.children.push(currentTextNode);
    }
    // 如果是连续的文本节点，就连接在一起
    currentTextNode.content += token.content;
  }
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


// 解析 < 后的字符
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


// </
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

// 该步骤完成属性解析 // // 暂时不解析属性,死等>
function beforeAttributeName(c){
  if(c === /^[\n\t\f ]$/){ // 遇到tab，换行，禁止，空白
    return beforeAttributeName
  }else if(c === '/' || c === '>' || c === EOF){
    return afterAttributeName(c)
  }else if(c === '='){
    // return beforeAttributeName
  }else{
    // return beforeAttributeName
    currentAttribute = {
      name:"",
      value:''
    }
    return attributeName(c)
  }
}

// 属性名解析
function attributeName(c){
  // <div class="abc"></div>   <img class="name" />
  if(c.match(/^[\n\t\f ]$/) || c === '/' || c === '>' || c === EOF){
    return afterAttributeName(c)
  }else if(c === '='){
    return beforeAttributeValue;
  }else if(c === '\u0000'){

  }else if(c === '\"' || c === "'" || c === '<'){

  }else {
    currentAttribute.name += c;
    return attributeName
  }
}

function afterAttributeName(c) {
  if (c.match(/^\t\n\f ]$/)) {
      return afterAttributeName;
  } else if (c === '/') {
      return selfClosingStartTag;
  }  else if (c === '=') {
      return beforeAttributeValue;
  } else if (c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
  } else if (c === EOF) {

  } else {
      currentToken[currentAttribute.name] = currentAttribute.value;
      currentAttribute = {
          name: '',
          value: '',
      };
      return attributeName(c);
  }
} 
// 属性值解析
function beforeAttributeValue(c){
  if(c.match(/^[\n\t\f ]$/) || c === '/' || c === '>' || c === EOF){
    return beforeAttributeValue
  }else if(c === "\""){
    return doubleQuotedAttributeValue
  }else if(c === "\'"){
    return singleQuotedAttributeValue
  }else if(c === ">"){

  }else {
    return UnquotedAttributeValue(c)
  }
}


// 处理 \"
function doubleQuotedAttributeValue(c){
  if(c === "\""){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  }else if(c === "\u0000"){

  }else if(c === EOF){

  }else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

// 处理 \'
function singleQuotedAttributeValue(c){
  if(c === "\'"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  }else if(c === "\u0000"){

  }else if(c === EOF){

  }else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(c){
  if(c.match(/^[\n\t\f ]$/)){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  }else if(c === "/"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfCloseStartingTag;
  }else if(c === ">"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data
  }else if(c === "\u0000"){

  }
  else if(c === "\"" || c === "'" || c === "<" || c === '=' || c == "`"){

  }
  else if(c === EOF){

  }else {
    currentAttribute.value += c;
    return UnquotedAttributeValue
  }
}

function afterQuotedAttributeValue(c){
  if(c.match(/^[\n\t\f ]$/)){
    return beforeAttributeName;
  }else if(c === "/"){
    return selfCloseStartingTag;
  }else if(c === ">"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data
  }else if(c === EOF){

  }else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

// 自封闭标签
function selfCloseStartingTag(c){
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === 'EOF') {

  } else {

  }
}

module.exports.parserHTML = function parserHTML(html){
  let state = data;
  for(let i of html){
    state = state(i)
  }
  state = state(EOF)
} 
