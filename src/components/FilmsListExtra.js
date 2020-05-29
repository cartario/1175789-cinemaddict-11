import AbstractComponent from "./abstract-component.js";

export const createFilmsListExtraTemplate = () => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">

      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">

      </div>
    </section>`;
};

export default class ExtraList extends AbstractComponent {
  getTemplate() {
    return createFilmsListExtraTemplate();
  }
}
