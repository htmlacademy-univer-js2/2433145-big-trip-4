import { createElement } from '../render.js';
import { createFilterItemTemplate } from '../templates/filter-item-template.js';

export default class FilterItemView {
  getTemplate() {
    return createFilterItemTemplate();
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
