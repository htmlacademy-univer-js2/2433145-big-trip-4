import AbstractView from '../framework/view/abstract-view.js';
import { createRoutePointTemplate } from '../templates/route-point-template.js';

export default class RoutePointView extends AbstractView{
  #point = null;
  #favBtnClick = null;

  constructor ({data, onFavouriteClick}) {
    super();
    this.#point = data;
    this.#favBtnClick = onFavouriteClick;
    this.element.querySelector('.event__favorite-icon').addEventListener('click', this.#clickFavBtnHandler);
  }

  get template() {
    return createRoutePointTemplate(this.#point);
  }

  #clickFavBtnHandler = (evt) => {
    evt.preventDefault();
    this.#favBtnClick();
  };
}
