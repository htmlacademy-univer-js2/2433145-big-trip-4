import { createFilterFormTemplate } from '../templates/filter-form-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class FilterFormView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

  get template() {
    return createFilterFormTemplate(this.#filters, this.#currentFilter);
  }
}
