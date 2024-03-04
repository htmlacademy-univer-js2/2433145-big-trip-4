import PointsListView from '../view/points-list-view.js';
import CurrentFormView from '../view/current-form-view.js';
import SortFormView from '../view/sort-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortFormView = new SortFormView();
  pointsListView = new PointsListView();

  constructor ({container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoint = [...this.pointModel.getPoints()];
    this.currentPoint = this.pointModel.getPoint();

    render(this.sortFormView, this.container);
    render(this.pointsListView, this.container);

    render(new CurrentFormView({point: this.currentPoint}), this.pointsListView.getElement());

    for (let i = 0; i < this.boardPoint.length; i++) {
      render(new RoutePointView({data: this.boardPoint[i]}), this.pointsListView.getElement());
    }
  }
}
