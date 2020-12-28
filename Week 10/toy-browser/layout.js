


function layout(element){
  if(!element.computedStyle)
    return
  let elementStyle = getStyle(element);
  // 目前只用flex布局
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

  var isAutoMainSize = false; // 代表一行不会超过
  if(!style[mainSize]){
    elementStyle[mainSize] = 0;
    for(var i = 0;i < items.length; i++){
      var item = items[i];
      elementStyle[mainSize] = elementStyle[mainSize] + item[mainSize] // 父元素的空间由子元素撑开
    }
    isAutoMainSize = true;
  }


  var flexLine = []; // 当前一行
  var flexLines = [flexLine]; 

  var mainSpace = elementStyle[mainSize]; // 主轴的空间
  var crossSpace = 0; // 交叉轴的空间

  for(var i = 0; i<items.length; i++){
    var item = items[i];
    var itemStyle = getStyle(item);

    if(itemStyle[mainSize] === null){ // 没设主轴尺寸
      itemStyle[mainSize] = 0;
    }

    if(itemStyle.flex){ // 若有flex属性，代表是可伸缩的，说明可放一行上
      flexLine.push(item);
    }else if(style.flexWrap === 'nowrap' && isAutoMainSize){ // 若是nowrap并且是不会超过
      mainSpace -= itemStyle[mainSize];
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
        crossSpace = Math.max(crossSpace,itemStyle[crossSize]); // 记录循环每次的最大行高,交叉轴
      }
      flexLine.push(item)
    } else { // 换行
      if(itemStyle[mainSize] > style[mainSize]){ // 若子元素比父元素大
        itemStyle[mainSize] = style[mainSize]
      }
      if(mainSpace < itemStyle[mainSize]){  // 主轴上的空间不足以容纳一个元素时，换行
        flexLine.mainSpace = mainSpace; // ??? 实际剩余的尺寸和实际占的尺寸算出来??
        flexLine.crossSpace = crossSpace;// ?????不懂，都覆盖了还有什么用
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize]; // 重置
        crossSpace = 0;
      }else{
        flexLine.push(item)
      }
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
        crossSpace = Math.max(crossSpace,itemStyle[crossSize]); // 记录循环每次的最大行高,交叉轴
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;

  console.log(items)
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