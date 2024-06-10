import AbstractView from '../framework/view/abstract-view.js';
import { createRoutePointTemplate } from '../templates/route-point-template.js';

export default class RoutePointView extends AbstractView{
  #point = null;
  #favButtonClick = null;
  #openClick = null;
  #pointModel = null;

  constructor ({data, onFavouriteClick, onOpenClick, pointModel}) {
    super();
    this.#point = data;
    this.#favButtonClick = onFavouriteClick;
    this.#openClick = onOpenClick;
    this.#pointModel = pointModel;
    this.element.querySelector('.event__favorite-icon').addEventListener('click', this.#clickFavBtnHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openClickHandler);
  }

  get template() {
    return createRoutePointTemplate(this.#point, this.#pointModel.townModel);
  }

  #clickFavBtnHandler = (evt) => {
    evt.preventDefault();
    const newData = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
      offers: this.#point.offers.offers
    };
    this.#favButtonClick(newData);
  };

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this.#openClick();
  };
}
