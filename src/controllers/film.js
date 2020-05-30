import Movie from "../components/movie.js";
import MovieEdit from "../components/movieEdit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class Film {
  constructor(container, movie) {
    this._container = container;
    this._movie = movie;
    this._movieComponent = null;
    this._movieEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render() {
    this._movieEditComponent = new MovieEdit(this._movie);
    this._movieComponent = new Movie(this._movie);
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
