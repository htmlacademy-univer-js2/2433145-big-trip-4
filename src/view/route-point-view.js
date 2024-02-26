import { createElement } from '../render.js';
import { createRoutePointTemplate } from '../templates/route-point-template.js';

export default class RoutePointView {
  getTemplate() {
    return createRoutePointTemplate();
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
