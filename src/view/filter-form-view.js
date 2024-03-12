import { createFilterFormTemplate } from '../templates/filter-form-template.js';

export default class FilterFormView {
  getTemplate() {
    return createFilterFormTemplate();
  }
}
