


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
  // 保存交叉轴的剩余空间
  if(style.flexWrap === 'nowrap' || isAutoMainSize){
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace
  }else{
    flexLine.crossSpace = crossSpace;
  }

  if(mainSpace < 0){ // 对所有元素进行等比压缩 // 单行的情况下
    var scale = style[mainSize] / (style[mainSize] - mainSpace); // 主轴的尺寸 / 主轴的尺寸加上剩余空间的尺寸
    var currentMain = mainBase; // 当前的位置
    for(var i = 0;i<items.length;i++){
      var item = items[i];
      var itemStyle = getStyle(item);

      if(itemStyle.flex){ // 若是flex，这设置宽为0
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mianSize] * scale; // 设置该元素的宽度

      itemStyle[mainStart] = currentMain; // 设置该元素的left位置
      itemStyle[mianEnd] = itemStyle[mainStart] + mainSign * itemStyle[mianSize]; // 设置该元素的right位置，mainSign为了考虑反向
      currentMain = itemStyle[mainEnd] // 方便下一个元素的位置
    }
  }else{ // 多行的情况下
    flexLines.forEach(items=>{
      var mainSpace = items.mainSpace;
      var flexTotal = 0; // 记录所有元素的flex值之和
      for(var i = 0;i < items.length;i++){
        var item = items[i];
        var itemStyle = getStyle(item);
        if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))){
          flexTotal += itemStyle.flex;
          continue
        }
      }
      if(flexTotal > 0){ // 有flex，会永远占满一行
        var currentMain = mainBase;
        for(var i = 0;i<items.length;i++){
          var item = items[i];
          var itemStyle = getStyle(item);

          if(itemStyle.flex){
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex; // 等比划分
          }

          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      }else { // 如果没有flex，那么就按照justify-content情况去划分
        if(style.justifyContent === 'flex-start'){ 
          var currentMain = mainBase;// 从左开始
          var step = 0 // 等比的几块
        }
        if(style.justifyContent === 'flex-end'){
          var currentMain = mainSpace * mainSign +  mainBase; // 从右开始
          var step = 0
        }
        if(style.justifyContent === 'center'){
          var currentMain = mainSpace / 2 * mainSign + mainBase;
          var step = 0
        }
        if(style.justifyContent === 'space-between'){
          var step = mainSpace / (item.length - 1) * mainSign;
          var currentMain = mainBase;
        }
        if(style.justifyContent === 'space-around'){
          var step = mainSpace / item.length * mainSign;
          var currentMain = step / 2 + mainBase;
        }

        for(var i = 0;i<item.length;i++){
          var item = items[i];
          var itemStyle = getStyle(item);
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    })
  }

  var crossSpace; // 判断是否把父容器剩余空间
  if(!style[crossSize]){ // 若父元素没有高度
    crossSpace = 0; // 代表已经被子元素撑满
    elementStyle[crossSize] = 0;
    for(var i = 0;i<flexLines.length;i++){
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace // 则由子容器撑开
    }
  }else{
    crossSpace = style[crossSize] 
    for(var i = 0;i<flexLines.length;i++){
      crossSpace -= flexLines[i].crossSpace; // 获取剩余的父容器高度
    }
  }

  // 根据flexWrap去设置从哪头指向哪头
  if(style.flexWrap === 'wrap-reverse'){
    crossBase = style[crossSize]
  }else{
    crossBase = 0;
  }

  var lineSize = style[crossSize] / flexLines.length; // 计算一行的高度

  var step;

  if(style.alignContent === 'flex-start'){
    crossBase += 0;
    step = 0;
  }
  if(style.alignContent === 'flex-end'){
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if(style.alignContent === 'center'){
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }
  if(style.alignContent === 'space-between'){
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if(style.alignContent === 'space-around'){
    step = crossSpace / (flexLines.length);
    crossBase += crossSign * step / 2
  }
  if(style.alignContent === 'stretch'){
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach(items=>{
    var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;// 真实交叉轴的尺寸
    for(var i = 0;i<items.length;i++){
      var item = items[i];
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || item.alignItems;
      if(item === null){
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
      }
      if(align === 'flex-start'){
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if(align === 'flex-end'){
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      } 
      if(align === 'center'){
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      } 
      if(align === 'stretch'){
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)));

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      } 
    }
    crossBase += crossSign * (lineCrossSize + step)
  })
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