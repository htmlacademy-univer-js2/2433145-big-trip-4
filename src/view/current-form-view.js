import { createElement } from '../render.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';

export default class CurrentFormView {
  constructor ({point}) {
    this.point = point;
  }

  getTemplate() {
    return createCurrentFormTemplate(this.point);
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
