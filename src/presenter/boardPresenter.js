import PointsListView from '../view/points-list-view.js';
import SortFormView from '../view/sort-form-view.js';
import { RenderPosition, render } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import FilterFormView from '../view/filter-form-view.js';
import MainTripView from '../view/main-trip-view.js';
import { generateFilter } from '../mock/filters.js';
import FilterItemView from '../view/filter-item-view.js';
import PointPresenter from './pointPresenter.js';
import { updateItem } from '../utils/utils.js';

export default class BoardPresenter {
  #sortFormView = new SortFormView();
  #pointsListView = new PointsListView();
  #noPointsView = new NoPointsView();
  #mainTrip = new MainTripView();
  #filterFormView = new FilterFormView();
  #container = null;
  #pointModel = null;
  #boardPoint = [];
  #pointPresenters = new Map();

  constructor ({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.getPoints()];
    const tripControls = document.querySelector('.trip-main__trip-controls');
    const filterFormContainer = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.#boardPoint);
    render(this.#filterFormView, filterFormContainer);
    for (let i = 0; i < filters.length; i++) {
      render(new FilterItemView(filters[i]), this.#filterFormView.element);
    }

    if (this.#boardPoint.length > 0) {
      render(this.#mainTrip, tripControls, RenderPosition.BEFOREBEGIN);
      render(this.#sortFormView, this.#container);
      render(this.#pointsListView, this.#container);
      for (let i = 0; i < this.#boardPoint.length; i++) {
        this.#renderPoint(this.#boardPoint[i]);
      }
    }
    else {
      render(this.#noPointsView, this.#container);
    }
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListView.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoint = updateItem(this.#boardPoint, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}

