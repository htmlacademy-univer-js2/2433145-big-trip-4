import AbstractView from '../framework/view/abstract-view.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';

export default class CurrentFormView extends AbstractView{
  #point = null;

  constructor ({point}) {
	super();
    this.#point = point;
  }

  get template() {
    return createCurrentFormTemplate(this.point);
  }
}
