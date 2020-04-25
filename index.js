'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


let start;
let end;

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = () => {
  // Your code here
  if(isLegal()){
      //get last piece from startStack
      let pieceToMove = start.pop();
      //push last piece from startStack to the ending stack
      end.push(pieceToMove);
      //check for a win
      return checkForWin();
  }

  return false;


}

const isLegal = () => {
  // Your code here

  //holds last value in startStack, if any
  let peekStart; 
  //holds last value in endStack, if any
  let peekEnd; 

  //if there are items in startStack, get the last one
  //else return false
  if(start.length > 0){
    peekStart = start[start.length-1];
  }
  else{
      return false;
  }
  
  //if there are items in endStack, get the last one
  if(end.length > 0){
    peekEnd = end[end.length-1];
  }

   //if there are no items in endStack or startStack peek value is bigger than endStack peek value, 
   //we can move the piece
  if(!peekEnd || peekStart < peekEnd){
    return true;
  }

  //if all fails, this is an illegal move
  return false;

}

const checkForWin = () => {
  // Your code here

  //if stacks b or c have a length of 4, we have a winner
  if(stacks["b"].length == 4 || stacks["c"].length == 4 ){
      console.log("Congratulations, you have won!");
      return true;
  }

  return false;

}

const towersOfHanoi = (startStack, endStack) => {
  // Your code here

    //regex to check if its only has lowercase letters a through c, and has only 1 character
    let regex = "^[a-c]{1}$";

    //if startStack and endStack are not empty and match regex criteria, try to move the piece
    //else do nothing and return
    if( startStack && endStack && startStack.match(regex) && endStack.match(regex)){
        //save start stack
        start = stacks[startStack];
        //save end stack
        end = stacks[endStack];
        movePiece();
    }
    else{
        return;
    }
    

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test index.js
// to close them ctrl + C
if (typeof describe === 'function') {
    describe('#towersOfHanoi()', () => {
        it('should detect invalid move', () => {
            towersOfHanoi("b","a");
            assert.equal(isLegal(), false);
        });
        it('should pop off 1 from a stack to b stack', () => {
            towersOfHanoi("a","b");
            assert.deepEqual(stacks, { a: [4,3,2], b:[1], c:[] });
        });
        it('check for a win', () => {
            towersOfHanoi("a","b");
            towersOfHanoi("a","c");
            towersOfHanoi("b","c");
            towersOfHanoi("a","b");
            towersOfHanoi("c","a");
            towersOfHanoi("c","b");
            towersOfHanoi("a","b");
            towersOfHanoi("a","c");
            towersOfHanoi("b","a");
            towersOfHanoi("b","c");
            towersOfHanoi("a","b");
            towersOfHanoi("c","b");
            towersOfHanoi("c","a");
            towersOfHanoi("b","a");
            towersOfHanoi("b","c");
            towersOfHanoi("a","b");
            towersOfHanoi("a","c");
            towersOfHanoi("b","c");
            assert.equal(checkForWin(), true);
        });
     
    });
  }
  else{
    getPrompt();
  }

