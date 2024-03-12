import AbstractView from '../framework/view/abstract-view.js';
import { createRoutePointTemplate } from '../templates/route-point-template.js';

export default class RoutePointView extends AbstractView{
  #point = null;
  constructor ({data}) {
    this.#point = data;
  }

  get template() {
    return createRoutePointTemplate(this.point);
  }
}
