import AbstractSmartComponent from "./abstract-smart-component.js";
import {generateComments} from "../utils/const.js";

export const createMovieEditTemplate = (movie, options = {}) => {
  const {comments, filmInfo} = movie;

  const {isFavorite, isWatchlist, isAlreadyWatched, emoji} = options;
  const getCommentMarkup = () => {
    const commentsFilm = generateComments(comments.length);

    return `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">

            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${commentsFilm[0].comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${commentsFilm[0].author}</span>
                  <span class="film-details__comment-day">${commentsFilm[0].date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>

          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            ${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ``}

            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>

            </div>
          </div>
        </section>
      </div>`;
  };

  const createCommentMarkup = getCommentMarkup();

  return `<section class="film-details ">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="">

            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tbody><tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmInfo.release.releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmInfo.runtime} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${filmInfo.genre}</span>
                </td>
              </tr>
            </tbody></table>

            <p class="film-details__film-description">
            ${filmInfo.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      ${createCommentMarkup}

    </form>
  </section>`;
};

export default class MovieEdit extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._emoji = null;
    this._isWatchlist = this._movie.userDetails.watchlist;
    this._isAlreadyWatched = this._movie.userDetails.alreadyWatched;
    this._isFavorite = this._movie.userDetails.favorite;
    this._subscribeOnEvents();
  }

  getTemplate() {

    return createMovieEditTemplate(this._movie, {
      isFavorite: this._isFavorite,
      isWatchlist: this._isWatchlist,
      isAlreadyWatched: this._isAlreadyWatched,
      emoji: this._emoji,
    });
  }

  setPopupBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        this.rerender();
      });

    element.querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, () => {
      this._isAlreadyWatched = !this._isAlreadyWatched;
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, () => {
      this._isWatchlist = !this._isWatchlist;
      this.rerender();
    });

    Array.from(element.querySelectorAll(`.film-details__emoji-item`)).forEach((emoji) => {
      emoji.addEventListener(`click`, (evt) => {
        this._emoji = evt.target.value;

        this.rerender();
      });
    });

  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reset() {
    const movie = this._movie;
    this._isWatchlist = movie.userDetails.watchlist;
    this._isAlreadyWatched = movie.userDetails.alreadyWatched;
    this._isFavorite = movie.userDetails.favorite;

    this.rerender();
  }
}
