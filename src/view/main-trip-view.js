import AbstractView from '../framework/view/abstract-view.js';
import { createMainTripTemplate } from '../templates/main-trip-template.js';

export default class MainTripView extends AbstractView{
  get template() {
    return createMainTripTemplate();
  }
}
