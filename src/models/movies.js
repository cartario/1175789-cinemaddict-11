export default class MoviesModel {
  constructor() {
    this._movies = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = movies;
  }
}
