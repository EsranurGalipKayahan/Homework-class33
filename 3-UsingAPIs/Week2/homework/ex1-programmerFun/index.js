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
function requestData(url) {
  // TODO return a promise using `fetch()`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function renderImage(data) {
  // TODO render the image to the DOM
  const imageElement = document.createElement('img');
  imageElement.src = data;
  document.body.appendChild(imageElement);
}

function renderError(error) {
  // TODO render the error to the DOM
  const errorHeaderElement = document.createElement('h1');
  errorHeaderElement.textContent = error;
  document.body.appendChild(errorHeaderElement);
}

// TODO refactor with async/await and try/catch
async function main() {
  const url = 'https://xkcd.now.sh/?comic=latest';

  try {
    const data = await requestData(url);
    renderImage(data.img);
  } catch (error) {
    renderError(error);
  }
}

window.addEventListener('load', main);
