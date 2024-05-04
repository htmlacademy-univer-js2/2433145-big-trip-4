import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';

export default class CurrentFormView extends AbstractStatefulView{
  #pointForm = null;
  #handleSubmit = null;
  #offerModel = null;
  #pointModel = null;

  constructor ({data, onSubmit, pointModel, offerModel}) {
    super();
    this._setState(CurrentFormView.parsePointToState(data));
    this.#handleSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeRouteToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.#offerModel = offerModel;
    this.#pointModel = pointModel;
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
      offers: this.#pointModel.offerModel.updateOffers(evt.target.value)
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    const tempID = this.#pointModel.townModel.getIDByTownName(evt.target.value);
    this.updateElement({
      townID: tempID,
      description: this.#pointModel.townModel.getTownDescByID(tempID),
      photos: this.#pointModel.townModel.getPhotosByID(tempID)
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeRouteToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
  }
}
