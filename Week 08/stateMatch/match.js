// 实现在字符串中找到字符a
// function match(string){
//   // return string.includes('a')
//   for(let c of string){
//     if(c === 'a'){
//       return true
//     }
//   }
//   return false
// }
// console.log(match('bc'))


// 实现在字符串中找到字符ab
// function match(string){
//   let status = false
//   for(let c of string){
//     if(c === 'a'){
//       status = true
//     }else if( status && c === 'b'){
//       return true
//     }else{
//       status = false
//     }
//   }
//   return false
// }
// console.log(match('avbc'))


// 实现在字符串中找到字符abcdef
function match(string){
  let statusA = false;
  let statusB = false;
  let statusC = false;
  let statusD = false;
  let statusE = false;

  for(let c of string){
    if(c === 'a'){
      statusA = true
    }else if( statusA && c === 'b'){
      statusB = true
    }else if( statusB && c === 'c'){
      statusC = true
    }else if( statusC && c === 'd'){
      statusD = true
    }else if( statusD && c === 'e'){
      statusE = true
    }else if( statusE && c === 'f'){
      return true
    }else{
      statusA = false;
      statusB = false;
      statusC = false;
      statusD = false;
      statusE = false;
    }
  }
  return false
}
console.log(match('a2bcdefg'))