import { createElement } from '../render.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';

export default class CurrentFormView {
  getTemplate() {
    return createCurrentFormTemplate();
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
