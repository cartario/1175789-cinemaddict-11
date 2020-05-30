import FilmController from "./film.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import LoadMoreComponent from "../components/showMoreBtn.js";
import NoMoviesComponent from "../components/no-movies.js";
import FiltersComponent from "../components/mainNavigation.js";
import SortComponent from "../components/sort.js";
import FilmsBoxComponent from "../components/filmsBox.js";
import TopRatedComponent from "../components/topRated.js";
import MostCommentedComponent from "../components/mostCommented.js";

const SHOWING_ON_START = 5;
const SHOWIN_BY_BTN = 3;

const renderFilms = (container, movies) => {
  return movies.map((movie) => {
    const filmController = new FilmController(container, movie);
    filmController.render();
    return filmController;
  });
};

export default class Board {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movies = [];
    this._api = api;
    this._loadMoreComponent = new LoadMoreComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._filtersComponent = new FiltersComponent();
    this._sortComponent = new SortComponent();
    this._filmsBoxComponent = new FilmsBoxComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
  }

  render() {
    render(this._container, this._filtersComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsBoxComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._container.querySelector(`.films`);
    const filmListContainer = this._container.querySelector(`.films-list__container`);

    render(filmsElement, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(filmsElement, this._mostCommentedComponent, RenderPosition.BEFOREEND);

    const topRatedElement = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostCommentedElement = this._mostCommentedComponent.getElement().querySelector(`.films-list__container`);

    this._movies = this._moviesModel.getMovies();
    if (!this._movies) {
      render(filmListContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
      return;
    }

    let showingMoviesCount = SHOWING_ON_START;

    renderFilms(filmListContainer, this._movies.slice(0, SHOWING_ON_START));


    this._loadMoreComponent.setLoadMoreBtnClickHandler(() => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount = showingMoviesCount + SHOWIN_BY_BTN;

      if (showingMoviesCount >= this._movies.length) {
        remove(this._loadMoreComponent);
      }

      renderFilms(filmListContainer, this._movies.slice(prevMoviesCount, showingMoviesCount));
    });

    render(filmListContainer, this._loadMoreComponent, RenderPosition.BEFOREEND);

    renderFilms(topRatedElement, this._movies.slice(0, 2));
    renderFilms(mostCommentedElement, this._movies.slice(2, 4));
  }
}
