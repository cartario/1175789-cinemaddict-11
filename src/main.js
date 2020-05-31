import API from "./api.js";
import MoviesModel from "./models/movies.js";
import BoardController from "./controllers/boardController.js";
import Header from "./components/HeaderProfile.js";
import {render, RenderPosition} from "./utils/render.js";

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
    boardController.render();
    return movies;
  });

// api.getComments()
//   .then((comments) => {
//     // console.log(comments)
//   });

const headerComponent = new Header();
render(headerElement, headerComponent, RenderPosition.BEFOREEND);
