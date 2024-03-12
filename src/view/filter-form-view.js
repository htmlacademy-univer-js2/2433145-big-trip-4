import AbstractView from '../framework/view/abstract-view.js';
import { createFilterFormTemplate } from '../templates/filter-form-template.js';

export default class FilterFormView extends AbstractView{
  get template() {
    return createFilterFormTemplate();
  }
}
