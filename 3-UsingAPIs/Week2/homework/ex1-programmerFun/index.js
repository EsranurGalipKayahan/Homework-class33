'use strict';

/*------------------------------------------------------------------------------
1. Complete the function `requestData()` using `fetch()` to make a request to 
   the url passed to it as an argument. The function should return a promise. 
   Make sure that the promise is rejected in case of HTTP or network errors.
2. Notice that the function `main()` calls `requestData()`, passing it the url 
   `https://xkcd.now.sh/?comic=latest`. Try and run the code in the browser and 
   open the browser's console to inspect the data returned from the request.
3. Next, complete the function `renderImage()` to render an image as an `<img>` 
   element appended to the document's body, using the data returned from the API.
4. Complete the function `renderError()` to render any errors as an `<h1>` 
   element appended to the document's body.
5. Refactor the `main()` function to use `async/await`.
6. Test error handling, for instance, by temporarily changing the `.sh` in the 
   url with `.shx`. There is no server at the modified url, therefore this 
   should result in a network (DNS) error.
------------------------------------------------------------------------------*/
//requesting data from given url
async function requestData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  } catch (error) {
    renderError(error);
  }
}

function renderImage(data) {
  // Creating img element to display image on the website
  const imageElement = document.createElement('img');
  imageElement.src = data;
  document.body.appendChild(imageElement);
}

function renderError(error) {
  /* If any error happens, this function is called.
  This function creates h1 element to display it on the website */
  const errorHeaderElement = document.createElement('h1');
  errorHeaderElement.textContent = error;
  document.body.appendChild(errorHeaderElement);
}

/* This function is executed when the browser is opened */
async function main() {
  const url = 'https://xkcd.now.sh/?comic=latest';
  /* Asynchronously fetching image from given url */
  try {
    const data = await requestData(url);
    renderImage(data.img);
  } catch (error) {
    renderError(error);
  }
}
window.addEventListener('load', main);
