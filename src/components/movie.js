import AbstractComponent from "./abstract-component.js";

export const createMovieTemplate = (movie) => {
  const {comments, film_info, id, user_details} = movie; // TODO нужен адаптер (модель movie);
  const filmInfo = film_info;

  // filmInfo Структура:
  // actors: (6) ["Takeshi Kitano", "Christian Bale", "Gary Oldman", "Harrison Ford", "Cillian Murphy", "Ralph Fiennes"]
  // age_rating: 6
  // alternative_title: "A Shark Who Saw Himself"
  // description: "true masterpiece where love and death are closer to heroes than their family."
  // director: "Clint Eastwood"
  // genre: []
  // poster: "images/posters/the-great-flamarion.jpg"
  // release: {date: "2004-04-15T02:19:53.175Z", release_country: "USA"}
  // runtime: 162
  // title: "A Tale Of A Little Bird Who Sold Themselves"
  // total_rating: 4
  // writers: (3) ["Robert Zemeckis", "Robert Rodrigues", "Hayao Miazaki"]

  // user_details Структура:
  // already_watched: true
  // favorite: false
  // watching_date: "2020-02-24T13:34:21.386Z"
  // watchlist: false

  // comments: []

  // id: "0"

  return `<article class="film-card">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.total_rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmInfo.release.date}</span>
      <span class="film-card__duration">${filmInfo.runtime} min</span>
      <span class="film-card__genre">${filmInfo.genre}</span>
    </p>
    <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmInfo.description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

export default class Movie extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {

    return createMovieTemplate(this._movie);
  }

  setPosterBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
}
