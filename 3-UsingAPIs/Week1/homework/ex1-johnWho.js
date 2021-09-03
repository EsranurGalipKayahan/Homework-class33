'use strict';
/*------------------------------------------------------------------------------
Rewrite this function, but replace the callback syntax with the Promise syntax:
- Have the `getAnonName` function return a `new Promise`.
- If the Promise `resolves`, pass the full name as an argument to resolve with.
- If the Promise `rejects`, pass an error as the argument to reject with: "You 
  didn't pass in a first name!"
------------------------------------------------------------------------------*/
// TODO see above
const getAnonName = (firstName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!firstName) {
        reject(new Error("You didn't pass in a first name!"));
        return;
      }
      const fullName = `${firstName} Doe`;

      resolve(fullName);
    }, 1000);
  });
};

getAnonName('John')
  //Actually I watched many videos about Promises to understand the concept clearly. And on the one of them, the programmer
  //explains that Promise resolves data and dispatched then function. It sounds very sense to me. Therefore writing the code
  //I follow my brain's step that it founds sense. So I used resolvedData. But it does not matter. I can change it with data.
  .then((data) => {
    //This resolved Data means, if Promise finish its working successfully, it will change its status to fulfilled.
    //So in line 19, resolve gets fullName. Dispatches it to then. Here resolvedData contains the content of the fullName coming from line 19
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });

// ! Do not change or remove the code below
module.exports = getAnonName;
//In line 24, getAnonName function is called with 'John' firstName. getAnonName return a Promise.
//So it will work asynchronously. And the promise call setTimeout function and at least 1 second later anonymous function will run.
//Inside of that function, at first, fullName is checked whether it is passed or not. Maybe programmer forgets the send any parameter.
//If the programmer forgets Promise will change its status immediately as rejected with error message. Then line 30 will run.
//In the console, error message will be displayed.
//Otherwise, line 17 will be executed. And fullName is assigned to firstName getting from programmer and Doe. In line 19 Promise will change
//it status to fulfillment by dispatching fullName. Line 25 is executed. Because Promise reached the fulfillment status. The data from resolve
//can be reached the resolvedData variable. In line 28, it is displayed on the screen.
