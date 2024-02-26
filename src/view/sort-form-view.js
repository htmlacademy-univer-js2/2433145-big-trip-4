import { createElement } from '../render.js';
import { createSortFormTemplate } from '../templates/sort-form-template.js';

export default class SortFormView {
  getTemplate() {
    return createSortFormTemplate();
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
