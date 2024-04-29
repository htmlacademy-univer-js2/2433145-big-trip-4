import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';

export default class CurrentFormView extends AbstractStatefulView{
  #pointForm = null;
  #handleSubmit = null;

  constructor ({data, onSubmit}) {
    super();
    this._setState(CurrentFormView.parsePointToState(data));
    this.#handleSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeRouteToggleHandler);
  }

  get template() {
    return createCurrentFormTemplate(this._state);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(CurrentFormView.parseStateToPoint(this._state));
  };

  #typeRouteToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: evt.target.value
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
