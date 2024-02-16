import { createElement } from '../render.js';
import { createSortItemTemplate } from '../templates/sort-item-template.js';

export default class SortItemView {
  getTemplate() {
    return createSortItemTemplate();
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
