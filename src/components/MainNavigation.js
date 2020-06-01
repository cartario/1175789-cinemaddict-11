import AbstractComponent from "./abstract-component.js";

  const createFilterMarkup = (filter) => {
    const {name, count, checked} = filter;
    return `<a href="#${name}" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}" data-filter-type="${name}">${name}<span class="main-navigation__item-count ">${count}</span></a>`
  }

export const createMainNavigation = (filters) => {

  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter)).join(`\n`);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  `;
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigation(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      Array.from(this.getElement().querySelectorAll(`.main-navigation__item`))
        .forEach((item) => item.classList.remove(`main-navigation__item--active`));
      evt.target.classList.add(`main-navigation__item--active`);

      const filterType = evt.target.dataset.filterType;
      handler(filterType);
    })
  }
}
