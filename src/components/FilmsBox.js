import AbstractComponent from "./abstract-component.js";

export const createFilmsBoxTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>`;
};

export default class FilmsBox extends AbstractComponent {
  getTemplate() {
    return createFilmsBoxTemplate();
  }
}
