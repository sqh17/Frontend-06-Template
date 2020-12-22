


// // exports
// var sayHello = function(){   
//    console.log('hello')
// }
// exports.sayHello = sayHello
// console.log('exports',exports); 
// console.log('module.exports',module.exports);

// console.log('exports === module.exports',exports === module.exports);

// module.exports


var sayHello = function(){  
  console.log('hello')
}
var sayHi = function(){
  console.log('Hi')
}
// module.exports =  '123'
exports.sayHi = sayHi
console.log('module.exports',module.exports); 
console.log('exports',exports); 
console.log('exports === module.exports',exports === module.exports);