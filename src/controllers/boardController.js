import FilmController from "./film.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import LoadMoreComponent from "../components/showMoreBtn.js";
import NoMoviesComponent from "../components/no-movies.js";

import SortComponent, {SortType} from "../components/sort.js";
import FilmsBoxComponent from "../components/filmsBox.js";
import TopRatedComponent from "../components/topRated.js";
import MostCommentedComponent from "../components/mostCommented.js";

const SHOWING_ON_START = 5;
const SHOWIN_BY_BTN = 2;


const renderFilms = (container, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const filmController = new FilmController(container, onDataChange, onViewChange);
    filmController.render(movie);
    return filmController;
  });
};

const getSortedMovies = (moviesList, sortType, from, to) => {
  let sortedMovies = [];
  const showingMovies = moviesList.slice();
  switch (sortType) {
    case SortType.DEFAULT:

      sortedMovies = showingMovies;
      break;
    case SortType.DATE:
      sortedMovies = showingMovies.sort((a, b) => Number(a.id) - Number(b.id));
      break;
    case SortType.RATING:
      sortedMovies = showingMovies.sort((a, b) => a.film_info.total_rating - b.film_info.total_rating);
      break;
  }
  return sortedMovies.slice(from, to);
};

export default class Board {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movies = [];
    this._api = api;
    this._loadMoreComponent = new LoadMoreComponent();
    this._showingMoviesCount = SHOWING_ON_START;
    this._noMoviesComponent = new NoMoviesComponent();

    this._sortComponent = new SortComponent();
    this._filmsBoxComponent = new FilmsBoxComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

    this._showedFilmControllers = [];
  }

  _renderLoadMore(filmListContainer) {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    render(filmListContainer, this._loadMoreComponent, RenderPosition.BEFOREEND);

    this._loadMoreComponent.setLoadMoreBtnClickHandler(() => {

      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + SHOWIN_BY_BTN;

      const sortedMovies = getSortedMovies(this._movies, this._sortComponent.getSortType(), prevMoviesCount, this._showingMoviesCount);

      const newFilms = renderFilms(filmListContainer, sortedMovies, this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingMoviesCount >= this._movies.length) {
        remove(this._loadMoreComponent);
      }
    });
  }

  render() {
    // this._moviesModel.setDataChangeHandler(() => {
    //   console.log(`data changed`)
    // })

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsBoxComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._container.querySelector(`.films`);
    const filmListContainer = this._container.querySelector(`.films-list__container`);

    render(filmsElement, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(filmsElement, this._mostCommentedComponent, RenderPosition.BEFOREEND);

    const topRatedElement = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostCommentedElement = this._mostCommentedComponent.getElement().querySelector(`.films-list__container`);

    this._movies = this._moviesModel.getAllMovies();

    if (!this._movies) {
      render(filmListContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
      return;
    }

    const newFilms = renderFilms(filmListContainer, this._movies.slice(0, this._showingMoviesCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderLoadMore(filmListContainer);

    renderFilms(topRatedElement, this._movies.slice(0, 2), this._onDataChange, this._onViewChange);
    renderFilms(mostCommentedElement, this._movies.slice(2, 4), this._onDataChange, this._onViewChange);
  }

  _onSortTypeChange(sortType) {
    remove(this._loadMoreComponent);
    this._showingMoviesCount = SHOWING_ON_START;
    const sortedMovies = getSortedMovies(this._movies, sortType, 0, this._showingMoviesCount);

    const filmListContainer = this._container.querySelector(`.films-list__container`);
    filmListContainer.innerHTML = ``;

    const newFilms = renderFilms(filmListContainer, sortedMovies, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;
    this._renderLoadMore(filmListContainer);
  }

  _removeMovies() {
    console.log(this._showedFilmControllers);
    this._showedFilmControllers.forEach((it) => it.destroy());
    this._showedFilmControllers = [];
  }

  _renderMovies(movies) {
    const filmListContainer = this._container.querySelector(`.films-list__container`);
    const newFilms = renderFilms(filmListContainer, movies, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;
  }

  _updateMovies() {
    const filmListContainer = this._container.querySelector(`.films-list__container`);
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies());
    this._renderLoadMore(filmListContainer);
  }

  _onDataChange(filmController, oldData, newData) {
    // debugger;
    const Success = this._moviesModel.updateMovie(oldData.id, newData);

    if (Success) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView())
  }

  _onFilterChange() {
    this._updateMovies();
  }
}
