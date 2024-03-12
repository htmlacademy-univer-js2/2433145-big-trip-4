import AbstractView from '../framework/view/abstract-view.js';
import { createPointsListTemplate } from '../templates/points-list-template.js';

export default class PointsListView extends AbstractView{
  get template() {
    return createPointsListTemplate();
  }
}
