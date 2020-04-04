const TOTAL_CARDS = 5;
const TOTAL_CARDS_TOP = 2;
const TOTAL_CARDS_COMMENT = 2;


// шаблоны
import {createHeaderProfile} from "./components/HeaderProfile.js";
import {createMainNavigation} from "./components/MainNavigation.js";
import {createSort} from "./components/Sort.js";
import {createFilmsBox} from "./components/FilmsBox.js";
import {createFilmCard} from "./components/FilmCard.js";
import {createFilmsListExtra} from "./components/FilmsListExtra.js";
import {createShowMoreBtn} from "./components/ShowMoreBtn.js";
import {createFilmDetails} from "./components/FilmDetails.js";

// ключевые узлы
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

// ф-я отрисовки
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// отрисовки
render(headerElement, createHeaderProfile());
render(mainElement, createMainNavigation());
render(mainElement, createSort());
render(mainElement, createFilmsBox());
render(footerElement, createFilmDetails(), `afterend`);


// находит после отрисовки
const filmsElement = mainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);

// ф-я отрисовки необходимого кол-ва карточек фильма
const renderCardsAmmount = (container, ammount = 2) => {
  for (let i = 0; i < ammount; i++) {
    render(container, createFilmCard());
  }
};

renderCardsAmmount(filmListContainer, TOTAL_CARDS);

// отрисовка кнопки
render(filmListContainer, createShowMoreBtn(), `afterend`);

// отрисовка экстра-блока
render(filmsElement, createFilmsListExtra());

// находит после отрисовки
const filmListExtraTop = filmsElement.querySelector(`.films-list--extra`).querySelector(`.films-list__container`);
const filmListExtraComment = filmsElement.querySelector(`.films-list--extra:last-child`).querySelector(`.films-list__container`);

// отрисовка карточек экстра-блока
renderCardsAmmount(filmListExtraTop, TOTAL_CARDS_TOP);
renderCardsAmmount(filmListExtraComment, TOTAL_CARDS_COMMENT);
