import { UPDATE_TYPE } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createCurrentFormTemplate } from '../templates/current-form-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class CurrentFormView extends AbstractStatefulView{
  #handleSubmit = null;
  #resetButtonsHandler = null;
  #pointModel = null;
  #datepickerTo = null;
  #datepickerFrom = null;
  #deleteButton = null;
  #totalPrice = null;

  constructor ({data, onSubmit, pointModel, resetButtons, deleteComponent, totalPrice}) {
    super();
    this.#pointModel = pointModel;
    this._setState(CurrentFormView.parsePointToState(data));
    this.#handleSubmit = onSubmit;
    this.#totalPrice = totalPrice;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeRouteToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceToggleHandler);
    const offersArr = this.element.querySelectorAll('.event__offer-selector');
    for (let i = 0; i < offersArr.length; i++) {
      offersArr[i].addEventListener('change', this.#offersToggleHandler);
    }
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.#resetButtonsHandler = resetButtons;
    this.#deleteButton = deleteComponent;
  }

  get template() {
    return createCurrentFormTemplate(this._state, this.#pointModel.townModel);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    const tempID = this._state.destination;
    const tempOffersIDs = [];
    this._state.offers.offers.forEach((offer) => {
      if (offer.isChecked === true) {
        tempOffersIDs.push(offer.id);
      }
    });
    const newData = { ...this._state,
      destination: tempID,
      offers: tempOffersIDs
    };
    this.#handleSubmit(CurrentFormView.parseStateToPoint(newData));
    if ('id' in newData) {
      this.#resetButtonsHandler();
    }
  };

  #offersToggleHandler = (evt) => {
    evt.preventDefault();
    const name = evt.target.name.replace('event-offer-','');
    const result = name.charAt(0).toUpperCase() + name.slice(1);
    const newOffers = [...this._state.offers.offers];
    newOffers.map((offer) => {
      if (offer.title === result) {
        offer.isChecked = !offer.isChecked;
        if (offer.isChecked) {
          this.#totalPrice += offer.price;
        }
        else {
          this.#totalPrice -= offer.price;
        }
      }
    });
    const newData = { ...this._state,
      offers: {
        type: this._state.type,
        offers: newOffers
      }
    };
    this.updateElement(newData);
    this.#resetButtonsHandler('EDITING', this.element, this.#deleteButton);
  };

  #typeRouteToggleHandler = (evt) => {
    evt.preventDefault();
    const newData = {
      ...this._state,
      type: evt.target.value,
      offers: this.#pointModel.offerModel.getOfferByType(this.#pointModel.offerModel.offers, evt.target.value),
      destination: this._state.destination};
    this.updateElement(newData);
    this.#resetButtonsHandler('EDITING', this.element, this.#deleteButton);
  };

  #priceToggleHandler = (evt) => {
    evt.preventDefault();
    const newData = {... this._state, basePrice: Number(evt.target.value)};
    this.updateElement(newData);
    this.#resetButtonsHandler('EDITING', this.element, this.#deleteButton);
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    const tempID = this.#pointModel.townModel.getIDByTownName(evt.target.value);
    const newData = {...this._state, destination: tempID,
      description: this.#pointModel.townModel.getTownDescByID(tempID),
      pictures: this.#pointModel.townModel.getPhotosByID(tempID)};
    this.updateElement(newData);
    this.#resetButtonsHandler('EDITING', this.element, this.#deleteButton);
  };

  #dateFromChangeHandler = ([userDate]) => {
    const newData = { ...this._state, dateFrom: userDate, destination: this.#pointModel.townModel.getIDByTownName(this._state.destination)
    };
    if ('id' in this._state) {
      this.#pointModel.updatePoint(UPDATE_TYPE.PATCH, newData);
    }
    this.updateElement(newData);
    this.#resetButtonsHandler('EDITING', this.element, this.#deleteButton);
  };

  #dateToChangeHandler = ([userDate]) => {
    const newData = { ...this._state, dateTo: userDate, destination: this.#pointModel.townModel.getIDByTownName(this._state.destination)
    };
    if ('id' in this._state) {
      this.#pointModel.updatePoint(UPDATE_TYPE.PATCH, newData);
    }
    this.updateElement(newData);
    this.#resetButtonsHandler('EDITING', this.element, this.#deleteButton);
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
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDeleting;
    delete point.isSaving;
    delete point.isDisabled;
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
