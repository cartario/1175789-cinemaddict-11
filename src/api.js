import Movie from "./models/movie.js";

export default class Api {
  getMovies() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`,
        {headers: new Headers({"Authorization": `Basic kTy9gIds237rD`})})
    .then((response) => response.json())
    .then(Movie.parseMovies);
  }

  getComments() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/3`,
        {headers: new Headers({"Authorization": `Basic kTy9Ids237rD`})})
    .then((response) => response.json());

  }
}
