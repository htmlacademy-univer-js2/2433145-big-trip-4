import AbstractView from '../framework/view/abstract-view.js';
import { createSortItemTemplate } from '../templates/sort-item-template.js';

export default class SortItemView extends AbstractView{
  get template() {
    return createSortItemTemplate();
  }
}
