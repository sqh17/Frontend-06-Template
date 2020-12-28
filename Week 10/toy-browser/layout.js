


function layout(element){
  if(!element.computedStyle)
    return
  let elementStyle = getStyle(element);
  // 目前只处理flex布局
  if(elementStyle.display !== 'flex')
    return
  
  // 收集只有element的元素
  var items = element.children.filter(e => e.type === 'element');
  
  items.sort((a,b)=>{
    return (a.order || 0) - (b.order || 0)
  })

  var style = elementStyle; 


  ['width','height'].forEach(i=>{
    if(style[i] === 'auto' || style[i] === ''){
      style[i] = null
    }
  })
  // 设置默认值 
  if(!style.flexDirection || style.flexDirection === 'auto'){
    style.flexDirection = 'row'
  }
  if(!style.alignItem || style.alignItem === 'auto'){
    style.alignItem = 'stretch'
  }
  if(!style.justifyContent || style.justifyContent === 'auto'){
    style.justifyContent = 'flex-start'
  }
  if(!style.flexWrap || style.flexWrap === 'auto'){
    style.flexWrap = 'nowrap'
  }
  if(!style.alignContent || style.alignContent === 'auto'){
    style.alignContent = 'stretch'
  }

  var mainSize, mainStart, mainEnd, mainSign, mainBase, // 主轴
      crossSize, crossStart, crossEnd, crossSign, crossBase; // 交叉轴 

  if(style.flexDirection === 'row'){
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1; 
    mainBase = 0; //从左开始

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';

  }

  if(style.flexDirection === 'row-reverse'){
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width; // 从右开始

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';

  }

  if(style.flexDirection === 'column'){
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';

  }

  if(style.flexDirection === 'column-reverse'){
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';

  }
  // 交叉轴只收wrap-reverse的影响
  if(style.flexWrap === 'wrap-reverse'){
    [crossStart, crossEnd] = [crossEnd, crossStart]
    crossSign = -1
  }else{
    crossBase = 0;
    crossSign = 1
  }
}


function getStyle(element){
  if(!element.style)
    element.style = {};

  for(let prop in element.computedStyle){
    var p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    if(element.style[prop].toString().match(/px$/)){
      element.style[prop] = parseInt(element.style[prop])
    }

    if(element.style[prop].toString().match(/^[0-9\.]+$/)){
      element.style[prop] = parseInt(element.style[prop])
    }

  }
  return element.style;
}

module.exports = layout