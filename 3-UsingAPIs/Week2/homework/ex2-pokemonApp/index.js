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

//Request data from the give url asynchronously
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed : ', response.status);
  } catch (error) {
    console.log(error.message);
  }
}
//When user get the pokemons, the request is sent, after getting data list fill with the names of the pokemons
async function fetchAndPopulatePokemons() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=125';
  try {
    const data = await fetchData(url);
    if (data) {
      populateList(data.results);
    } else throw new Error('Request failed : ', data.status);
  } catch (error) {
    console.log(error);
  }
}
//fills the select menu with the names of pokemons
function populateList(results) {
  const selectList = getDOMElement('pokemon-list');

  /*if user selects a pokemon, to find the image of the pokemon, second request is sent to the other api which contains 
  information about the selected pokemon */

  selectList.addEventListener('change', () => {
    const indexOfPokemon = results.findIndex(
      (x) => x.name === selectList.value
    );
    try {
      fetchPokemon(results[indexOfPokemon].url);
    } catch (error) {
      console.log(error);
    }
  });
  createOptions(results, selectList);
}
//creates options with the pokemon names
function createOptions(data, pokemonList) {
  data.forEach((element) => {
    const optionElement = createDOMElement('option');
    optionElement.value = element.name;
    optionElement.textContent = element.name;
    pokemonList.appendChild(optionElement);
  });
}
//request is sent to get the information about the selected pokemon
async function fetchPokemon(url) {
  try {
    const data = await fetchData(url);
    if (data) {
      //selected pokemons image is displayed on the web page
      fetchImage(data.sprites.front_default);
    } else throw new Error('Request failed : ', data.status);
  } catch (error) {
    console.log(error);
  }
}
//The image displayed on the web page
function fetchImage(address, name) {
  const imageElement = getDOMElement('image-place');
  if (imageElement.style.visibility === 'hidden') {
    imageElement.style.visibility = 'visible';
  }
  imageElement.src = address;
  imageElement.alt = name;
}
//creates components of the web page (button, select list, image container, img)
function createPage() {
  const buttonContainer = createDOMElement('div', { id: 'button-container' });
  buttonContainer.classList.add('container');
  buttonContainer.appendChild(createGetButton());

  const listContainer = createDOMElement('div', { id: 'list-container' });
  listContainer.classList.add('container');
  listContainer.appendChild(createList());

  const imageContainer = createDOMElement('div', { id: 'image-container' });
  imageContainer.classList.add('container');

  const imageElement = createDOMElement('img', { id: 'image-place' });
  imageElement.src = 'default';
  imageElement.alt = 'default';
  imageElement.style.visibility = 'hidden';
  imageContainer.appendChild(imageElement);

  appendToBody(buttonContainer);
  appendToBody(listContainer);
  appendToBody(imageContainer);
}
//creates select list
function createList() {
  const listElement = createDOMElement('select', { id: 'pokemon-list' });
  return listElement;
}
//creates get button
function createGetButton() {
  const buttonElement = createDOMElement('button', { id: 'get-button' });
  buttonElement.textContent = 'Get Pokemon!';
  buttonElement.type = 'submit';
  buttonElement.addEventListener('click', fetchAndPopulatePokemons);
  return buttonElement;
}
//to avoid using global variables, this function does creating element job
function createDOMElement(type, options) {
  const { id } = options || {};
  const element = document.createElement(type);
  if (id !== null) {
    element.id = id;
  }
  return element;
}
//to avoid using global variables, this function gets specific element
function getDOMElement(id) {
  return document.getElementById(id);
}
//to avoid using global variables, this function appends the desired element to body
function appendToBody(child) {
  document.body.appendChild(child);
}
function main() {
  createPage();
}

window.addEventListener('load', main);
