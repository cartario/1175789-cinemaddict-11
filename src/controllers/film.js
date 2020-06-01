import Movie from "../components/movie.js";
import MovieEdit from "../components/movieEdit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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
        user_details: Object.assign({}, movie.user_details, {watchlist: !movie.user_details.watchlist}),
      }))
    })

    this._movieComponent.setMarkAsWatchedClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        user_details: Object.assign({}, movie.user_details, {already_watched: !movie.user_details.already_watched}),
      }))
    })

    this._movieComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        user_details: Object.assign({}, movie.user_details, {favorite: !movie.user_details.favorite}),
      }))
    })
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
}
