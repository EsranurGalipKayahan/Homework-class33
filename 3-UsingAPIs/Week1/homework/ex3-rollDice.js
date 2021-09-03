'use strict';
/*------------------------------------------------------------------------------
- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDice()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDice()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

function rollDice() {
  return new Promise((resolve, reject) => {
    // Compute a random number of rolls (3-10) that the dice MUST complete
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Dice scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      // Compute a random dice value for the current roll
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Dice value is now: ${value}`);

      // Use callback to notify that the dice rolled off the table after 6 rolls
      if (roll > 6) {
        reject(new Error('Oops... Dice rolled off the table.'));
        return;
      }

      // Use callback to communicate the final dice value once finished rolling
      if (roll === randomRollsToDo) {
        resolve(value);
        return;
      }

      // Schedule the next roll todo until no more rolls to do
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
        return;
      }
    };

    // Start the initial roll
    rollOnce(1);
  });
}

rollDice() //I have already explained the resolved data in ex1. I can change it with data.
  .then((data) => {
    console.log(`Success! Dice settled on ${data}.`);
  })
  .catch((error) => {
    console.log(error.message);
  });

// ! Do not change or remove the code below
module.exports = rollDice;

/*
The problem is that the rolling of the dice is going on until reaching to randomRollsToDo
So, both Error message and Success message are displayed because of calling callback function each time separately.
But in promise when the rolling number is greater than 6, resolve function is called and immediately catch handles
error message and displays. So, even the rolling is going on, success message will not be displayed. Because promise
is in the rejected state.If we do not want the continue of rolling after reaching 6 roll number, we can change if statements
with if else or at the end of the each if you should put return keyword...otherwise setTimeout function will be called until reaching to randomRollsToDo
*/
/* My prefer is that it should finish the program */
