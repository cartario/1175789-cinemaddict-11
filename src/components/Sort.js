import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DEFAULT: `sort-default`,
  DATE: `sort-date`,
  RATING: `sort-rating`,
};

export const createSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type = ${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.RATING}>Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `A`) {
        return;
      }

      // применяет к цели стиль active
      Array.from(this.getElement().querySelectorAll(`.sort__button`))
        .forEach((item) => item.classList.remove(`sort__button--active`));
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
