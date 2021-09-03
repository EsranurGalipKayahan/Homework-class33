'use strict';
/*------------------------------------------------------------------------------
1. Run the unmodified exercise and observe that it works as advertised. Observe 
   that the dice must be thrown an indeterminate number of times until we get an 
   ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDiceUntil()` function using async/await and 
   without using recursion. Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.
------------------------------------------------------------------------------*/
// ! Do not change or remove the next two lines
const rollDice = require('../../helpers/pokerDiceRoller');

async function rollDiceUntil(wantedValue) {
  // TODO: rewrite this function using async/await

  try {
    let resultValue = '';
    do {
      resultValue = await rollDice();
    } while (resultValue !== wantedValue);
    return resultValue;
  } catch (error) {
    console.log('Error function');
    throw new Error(error);
  }
}

// TODO refactor this function to use try/catch
async function main() {
  try {
    const result = await rollDiceUntil('ACE');
    console.log('Resolved!', result);
  } catch (error) {
    console.log('Error main');
    console.log('Rejected!', error.message);
  }
}

main();

// ! Do not change or remove the code below
module.exports = rollDiceUntil;
