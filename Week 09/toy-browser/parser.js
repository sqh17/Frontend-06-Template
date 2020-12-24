
const EOF = Symbol('EOF')


function data(c){

}

module.exports.parserHTML = function parserHTML(html){
  let state = data;
  for(let i of html){
    state = state(i)
  }
  state = state(EOF)
} 
