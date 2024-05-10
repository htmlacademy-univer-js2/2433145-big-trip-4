import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class CurrentFormView extends AbstractStatefulView{
  #pointForm = null;
  #handleSubmit = null;
  #offerModel = null;
  #pointModel = null;
  #datepickerTo = null;
  #datepickerFrom = null;

  constructor ({data, onSubmit, pointModel, offerModel}) {
    super();
    this._setState(CurrentFormView.parsePointToState(data));
    this.#handleSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeRouteToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
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

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('.event__dateFrom'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('.event__dateTo'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

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
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerTo || this.#datepickerFrom) {
      this.#datepickerTo.destroy();
      this.#datepickerFrom.destroy();
      this.#datepickerTo = null;
      this.#datepickerFrom = null;
    }
  }
}
