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

// TODO Remove callback and return a promise
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
        // TODO replace "error" callback

        reject(new Error('Oops... Dice rolled off the table.'));
      }

      // Use callback to communicate the final dice value once finished rolling
      if (roll === randomRollsToDo) {
        // TODO replace "success" callback

        resolve(value);
      }

      // Schedule the next roll todo until no more rolls to do
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };

    // Start the initial roll
    rollOnce(1);
  });
}

// TODO Refactor to use promise
rollDice()
  .then((resolvedData) => {
    console.log(`Success! Dice settled on ${resolvedData}.`);
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
