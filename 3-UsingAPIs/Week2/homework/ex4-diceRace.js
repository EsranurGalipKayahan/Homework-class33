'use strict';
/*------------------------------------------------------------------------------
1. Complete the function `rollTheDices()` by using `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dices continue rolling 
   for some undetermined time after the promise returned by `Promise.race()` 
   resolves. Do you know why? Add your answer as a comment to the bottom of the 
   file.
------------------------------------------------------------------------------*/
// ! Do not remove this line
const rollDice = require('../../helpers/pokerDiceRoller');

//returns a Promise that is the winner
function rollTheDices() {
  const dices = [1, 2, 3, 4, 5];

  return Promise.race(generatePromises(dices, rollDice));
}

//returns an array consists of promises
function generatePromises(dices, executerFunction) {
  const queue = [];
  for (let i = 0; i < dices.length; i++) {
    queue.push(executerFunction(dices[i]));
  }
  return queue;
}

async function main() {
  try {
    const results = await rollTheDices();
    console.log('Resolved!', results);
  } catch (error) {
    console.log('Rejected!', error.message);
  }
}

main();

// ! Do not change or remove the code below
module.exports = rollTheDices;
/*
Each of dices run on different thread and they work asynchronously. 
Promise.race waits for only the winner. As soon as winner is resolved or rejected, 
Promise.race returns a promise and display the winner data or error message.
During that time, the other threads are going on working. Because they are independent.
ES6 promises do not support cancellation yet.
*/
