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
  /* This function is used to call rollDice desired times */
  try {
    //If the returned data from rollDice is not same as the wanted value, do while block will go on running
    let resultValue = '';
    do {
      resultValue = await rollDice();
    } while (resultValue !== wantedValue);
    //If any error does not occur, and also if the rollDice returns the desired value
    return resultValue;
  } catch (error) {
    //Otherwise throw an error that comes from reject
    throw new Error(error);
  }
}

async function main() {
  try {
    const result = await rollDiceUntil('ACE');
    console.log('Resolved!', result);
  } catch (error) {
    console.log('Rejected!', error.message);
  }
}

main();

// ! Do not change or remove the code below
module.exports = rollDiceUntil;
