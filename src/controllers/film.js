import Movie from "../components/movie.js";
import MovieEdit from "../components/movieEdit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class Film {
  constructor(container, onDataChange) {
    this._container = container;

    this._movieComponent = null;
    this._movieEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;

  }

  render(movie) {
    this._movieEditComponent = new MovieEdit(movie);
    this._movieComponent = new Movie(movie);

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

    // this._movieEditComponent.setAddToWatchListClickHandler(() => {
    //   this._onDataChange(this, movie, Object.assign({}, movie, {
    //     user_details: Object.assign({}, movie.user_details, {watchlist: !movie.user_details.watchlist}),
    //   }))
    // })

    // this._movieEditComponent.setMarkAsWatchedClickHandler(() => {
    //   this._onDataChange(this, movie, Object.assign({}, movie, {
    //     user_details: Object.assign({}, movie.user_details, {already_watched: !movie.user_details.already_watched}),
    //   }))
    // })

    // this._movieEditComponent.setFavoriteClickHandler(() => {
    //   this._onDataChange(this, movie, Object.assign({}, movie, {
    //     user_details: Object.assign({}, movie.user_details, {favorite: !movie.user_details.favorite}),
    //   }))
    // })

    render(this._container, this._movieComponent, RenderPosition.AFTERBEGIN);

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
