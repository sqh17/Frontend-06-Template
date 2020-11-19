function kmp(source,pattern){
  let table = new Array(pattern.length).fill(0);

  {
    let i = 1,j = 0; // 因为第一个肯定是0，所以从第二个开始
    while(i < pattern.length){
      if(pattern[i] === pattern[j]){ // 匹配上了自重复
        ++i,++j;
        table[i] = j // 设置值
      }else{
        if(j > 0){  // 当j>0时，j取得
          j = table[j]
        }else{
          ++i; // 当不匹配时，i 自增
        }
      }
    }
  }
  {
    let i = 0,j = 0;
    while(i<source.length){
      if(pattern[j] === source[i]){
        ++i, ++j
      }else{
        if(j > 0){ 
          j = table[j]
        }else{
          ++i;
        }
      }
      if(j === pattern.length){
        console.log('11',j,i);
        return true
      }
    }
    return false
  }
}
console.log(kmp('hello world','llo'))