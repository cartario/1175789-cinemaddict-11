import AbstractComponent from "./abstract-component.js";

export const createShowMoreBtnTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  setLoadMoreBtnClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
