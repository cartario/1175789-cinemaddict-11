import Movie from "../components/movie.js";
import MovieEdit from "../components/movieEdit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyMovie = {

};

export default class Film {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._movieComponent = null;
    this._movieEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

  }

  render(movie) {
    const oldMovieComponent = this._movieComponent;
    const oldMovieEditComponent = this._movieEditComponent;

    this._movieEditComponent = new MovieEdit(movie);
    this._movieComponent = new Movie(movie);

    if (oldMovieEditComponent && oldMovieComponent) {
      replace(this._movieComponent, oldMovieComponent);
      replace(this._movieEditComponent, oldMovieEditComponent);
    } else {
      render(this._container, this._movieComponent, RenderPosition.AFTERBEGIN);
    }

    this._movieComponent.setPosterBtnClickHandler(() => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._replaceMovieToEdit();
    });

    this._movieEditComponent.setPopupBtnClickHandler(() => {
      this._replaceEditToMovie();
    });

    this._movieComponent.setAddToWatchListClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        userDetails: Object.assign({}, movie.userDetails, {watchlist: !movie.userDetails.watchlist}),
      }));
    });

    this._movieComponent.setMarkAsWatchedClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        userDetails: Object.assign({}, movie.userDetails, {alreadyWatched: !movie.userDetails.alreadyWatched}),
      }));
    });

    this._movieComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        userDetails: Object.assign({}, movie.userDetails, {favorite: !movie.userDetails.favorite}),
      }));
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
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    // this._movieEditComponent.reset();
    replace(this._movieComponent, this._movieEditComponent);

    this._mode = Mode.DEFAULT;
  }

  _replaceMovieToEdit() {
    this._onViewChange();
    replace(this._movieEditComponent, this._movieComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToMovie();
    }

  }

  destroy() {
    remove(this._movieEditComponent);
    remove(this._movieComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
