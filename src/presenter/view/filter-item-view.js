import AbstractView from '../framework/view/abstract-view.js';
import { createFilterItemTemplate } from '../templates/filter-item-template.js';

export default class FilterItemView extends AbstractView{
  get template() {
    return createFilterItemTemplate();
  }
}
