import API from "./api.js";
import MoviesModel from "./models/movies.js";
import Header from "./components/HeaderProfile.js";
import {render, RenderPosition} from "./utils/render.js";
import Filters from "./components/mainNavigation.js";
import Sort from "./components/sort.js";
import FilmsBox from "./components/filmsBox.js";
import LoadMore from "./components/showMoreBtn.js";
import ExtraList from "./components/filmsListExtra.js";
import Movie from "./components/movie.js";
import MovieEdit from "./components/movieEdit.js";

const api = new API();
const moviesModel = new MoviesModel();


api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    return movies;
  });

// console.log(moviesModel)

const headerComponent = new Header();
const filtersComponent = new Filters();
const sortComponent = new Sort();
const filmsBoxComponent = new FilmsBox();
const movieEditComponent = new MovieEdit(moviesModel);
const movieComponent = new Movie();
const loadMoreComponent = new LoadMore();
const extraListComponent = new ExtraList();

// const TOTAL_CARDS = 5;
// const TOTAL_CARDS_TOP = 2;
// const TOTAL_CARDS_COMMENT = 2;

// ключевые узлы
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
// const footerElement = document.querySelector(`.footer`);


render(headerElement, headerComponent, RenderPosition.BEFOREEND);
render(mainElement, filtersComponent, RenderPosition.BEFOREEND);
render(mainElement, sortComponent, RenderPosition.BEFOREEND);
render(mainElement, filmsBoxComponent, RenderPosition.BEFOREEND);
render(mainElement, movieEditComponent, RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);

render(filmListContainer, movieComponent, RenderPosition.BEFOREEND);
render(filmListContainer, loadMoreComponent, RenderPosition.BEFOREEND);

render(filmsElement, extraListComponent, RenderPosition.BEFOREEND);

// находит после отрисовки
// const filmListExtraTop = filmsElement.querySelector(`.films-list--extra`).querySelector(`.films-list__container`);
// const filmListExtraComment = filmsElement.querySelector(`.films-list--extra:last-child`).querySelector(`.films-list__container`);

