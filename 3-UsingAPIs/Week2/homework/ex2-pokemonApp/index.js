'use strict';
/*------------------------------------------------------------------------------
Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
function fetchData(url) {
  // TODO complete this function
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function fetchAndPopulatePokemons() {
  // TODO complete this function
  const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
  fetchData(url)
    .then((resolvedData) => {
      console.log(resolvedData);
      console.log(resolvedData.abilities[0]);
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchImage(/* TODO parameter(s) go here */) {
  // TODO complete this function
}
function createPage() {
  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'Get Pokemon!';
  buttonElement.addEventListener('click', fetchAndPopulatePokemons);
  document.body.appendChild(buttonElement);
  document.body.appendChild(document.createElement('br'));
  const listElement = document.createElement('select', { id: 'list' });
  document.body.appendChild(listElement);
}

function main() {
  // TODO complete this function

  createPage();
}

window.addEventListener('load', main);
