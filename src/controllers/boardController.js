import Movie from "../components/movie.js";
import MovieEdit from "../components/movieEdit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import LoadMore from "../components/showMoreBtn.js";
import NoMoviesComponent from "../components/no-movies.js";

export default class Board {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movies = [];
    this._api = api;
    this._noMoviesComponent = new NoMoviesComponent();
    this._movieComponent = null;
    this._movieEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  renderFilms() {
    const filmListContainer = this._container.querySelector(`.films-list__container`);// дубль
    this._movies = this._moviesModel.getMovies();

    if (!this._movies) {
      render(filmListContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
      return;
    }

    const SHOWING_ON_START = 5;
    const SHOWIN_BY_BTN = 3;

    let showingMoviesCount = SHOWING_ON_START;

    this._movies.slice(0, SHOWING_ON_START).forEach(() => {
      this.render();
    });

    const loadMoreComponent = new LoadMore();
    loadMoreComponent.setLoadMoreBtnClickHandler(() => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount = showingMoviesCount + SHOWIN_BY_BTN;

      if (showingMoviesCount >= this._movies.length) {
        remove(loadMoreComponent);
      }
      this._movies.slice(prevMoviesCount, showingMoviesCount).forEach(() => {
        this.render();
      });
    });
    render(filmListContainer, loadMoreComponent, RenderPosition.BEFOREEND);
  }

  render() {

    const filmListContainer = this._container.querySelector(`.films-list__container`);
    this._movieEditComponent = new MovieEdit();
    this._movieComponent = new Movie();


    render(filmListContainer, this._movieComponent, RenderPosition.AFTERBEGIN);

    this._movieComponent.setPosterBtnClickHandler(() => {
      this._replaceMovieToEdit();
    });

    this._movieEditComponent.setPopupBtnClickHandler(() => {
      this._replaceEditToMovie();
    });
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditToMovie();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceEditToMovie() {
    replace(this._movieComponent, this._movieEditComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceMovieToEdit() {
    replace(this._movieEditComponent, this._movieComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
}
