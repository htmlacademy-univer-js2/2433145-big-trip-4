import AbstractView from '../framework/view/abstract-view.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';

export default class CurrentFormView extends AbstractView{
  #pointForm = null;
  #handleSubmit = null;

  constructor ({data, onSubmit}) {
    super();
    this.#pointForm = data;
    this.#handleSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  get template() {
    return createCurrentFormTemplate(this.#pointForm);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };
}
