import { createElement } from '../render.js';
import { createMainTripTemplate } from '../templates/main-trip-template.js';

export default class PointsListView {
  getTemplate() {
    return createMainTripTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
