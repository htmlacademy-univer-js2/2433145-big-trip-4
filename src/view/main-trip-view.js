import AbstractView from '../framework/view/abstract-view.js';
import { createMainTripTemplate } from '../templates/main-trip-template.js';

export default class MainTripView extends AbstractView{
  #firstTown = null;
  #secondTown = null;
  #thirdTown = null;

  constructor(firstTown, secondTown, thirdTown) {
    super();
    this.#firstTown = firstTown;
    this.#secondTown = secondTown;
    this.#thirdTown = thirdTown;
  }

  get template() {
    return createMainTripTemplate(this.#firstTown, this.#secondTown, this.#thirdTown);
  }
}
