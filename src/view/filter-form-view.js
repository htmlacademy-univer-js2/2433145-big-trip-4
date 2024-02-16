import { createElement } from '../render.js';
import { createFilterFormTemplate } from '../templates/filter-form-template.js';

export default class FilterFormView {
  getTemplate() {
    return createFilterFormTemplate();
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
