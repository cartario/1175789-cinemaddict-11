export default class Api {
  getMovies() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`,
        {headers: new Headers({"Authorization": `Basic kTy9gIds237rD`})})
    .then((response) => response.json());
  }
}
