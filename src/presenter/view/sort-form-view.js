import AbstractView from '../framework/view/abstract-view.js';
import { createSortFormTemplate } from '../templates/sort-form-template.js';

export default class SortFormView extends AbstractView{
  get template() {
    return createSortFormTemplate();
  }
}
