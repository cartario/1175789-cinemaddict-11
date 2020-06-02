import {FilterType} from "../utils/const.js";
import {getMoviesByFilter} from "../utils/common.js";

export default class MoviesModel {
  constructor() {

    this._movies = [];
    this._activeFilterType = FilterType.ALL;
    // слушатели
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getAllMovies() {
    return this._movies;
  }

  getMovies() {

    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);

    // уведомление
    this._callHandlers(this._dataChangeHandlers);
  }

  // метод подписки
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeMovie(id) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addMovie(movie) {
    this._movies = [].concat(movie, this._movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterType(filterType) {
    this.getMovies();
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }
}
