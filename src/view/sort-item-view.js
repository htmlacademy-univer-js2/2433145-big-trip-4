import { createSortItemTemplate } from '../templates/sort-item-template.js';
import AbstractView from '../framework.js';

export default class SortItemView extends AbstractView {
  get template() {
    return createSortItemTemplate();
  }
}
