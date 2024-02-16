import PointsListView from '../view/points-list-view.js';
import CurrentFormView from '../view/current-form-view.js';
import SortFormView from '../view/sort-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  POINTS_COUNT = 3;
  sortFormView = new SortFormView();
  pointsListView = new PointsListView();

  constructor ({container}) {
    this.container = container;
  }

  init() {
    render(this.sortFormView, this.container);
    render(this.pointsListView, this.container);

    render(new CurrentFormView(), this.pointsListView.getElement());
    for (let i = 0; i < this.POINTS_COUNT; i++) {
      render(new RoutePointView(), this.pointsListView.getElement());
    }
  }
}
