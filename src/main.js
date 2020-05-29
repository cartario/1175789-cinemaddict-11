import API from "./api.js";
import MoviesModel from "./models/movies.js";
import BoardController from "./controllers/boardController.js";
import Header from "./components/HeaderProfile.js";
import {render, RenderPosition} from "./utils/render.js";
import Filters from "./components/mainNavigation.js";
import Sort from "./components/sort.js";
import FilmsBox from "./components/filmsBox.js";
import ExtraList from "./components/filmsListExtra.js";


const api = new API();
const moviesModel = new MoviesModel();

// ключевые узлы
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
// const footerElement = document.querySelector(`.footer`);

const boardController = new BoardController(mainElement, moviesModel, api);


api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);


    boardController.renderFilms();
    return movies;
  });

const headerComponent = new Header();
const filtersComponent = new Filters();
const sortComponent = new Sort();
const filmsBoxComponent = new FilmsBox();
const extraListComponent = new ExtraList();

render(headerElement, headerComponent, RenderPosition.BEFOREEND);
render(mainElement, filtersComponent, RenderPosition.BEFOREEND);
render(mainElement, sortComponent, RenderPosition.BEFOREEND);
render(mainElement, filmsBoxComponent, RenderPosition.BEFOREEND);


const filmsElement = mainElement.querySelector(`.films`);
// const filmListContainer = filmsElement.querySelector(`.films-list__container`);

render(filmsElement, extraListComponent, RenderPosition.BEFOREEND);

// находит после отрисовки
// const filmListExtraTop = filmsElement.querySelector(`.films-list--extra`).querySelector(`.films-list__container`);
// const filmListExtraComment = filmsElement.querySelector(`.films-list--extra:last-child`).querySelector(`.films-list__container`);

