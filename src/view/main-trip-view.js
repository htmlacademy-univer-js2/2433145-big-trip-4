import AbstractView from '../framework/view/abstract-view.js';
import { createMainTripTemplate } from '../templates/main-trip-template.js';

export default class MainTripView extends AbstractView{
  #firstTown = null;
  #secondTown = null;
  #thirdTown = null;
  #totalPrice = null;
  #firstDate = null;
  #secondDate = null;

  constructor(firstTown, secondTown, thirdTown, totalPrice, firstDate, secondDate) {
    super();
    this.#firstTown = firstTown;
    this.#secondTown = secondTown;
    this.#thirdTown = thirdTown;
    this.#totalPrice = totalPrice;
    this.#firstDate = firstDate;
    this.#secondDate = secondDate;
  }

  get template() {
    return createMainTripTemplate(this.#firstTown, this.#secondTown, this.#thirdTown, this.#totalPrice, this.#firstDate, this.#secondDate);
  }
}
