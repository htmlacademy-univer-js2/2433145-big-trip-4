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
import { SortType } from '../const.js';
import SortItemView from '../view/sort-item-view.js';
import {sortPointsByPrice, sortPointsByTime} from '../mock/point.js';

export default class BoardPresenter {
  #sortFormView = new SortFormView();
  #pointsListView = new PointsListView();
  #sortComponent = null;
  #noPointsView = new NoPointsView();
  #mainTrip = new MainTripView();
  #filterFormView = new FilterFormView();
  #container = null;
  #pointModel = null;
  #boardPoint = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DATE;
  #sourcedBoardPoints = [];
  #tripControls = document.querySelector('.trip-main__trip-controls');

  constructor ({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.getPoints()];
    this.#sourcedBoardPoints = [...this.#pointModel.getPoints()];
    const filterFormContainer = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.#boardPoint);
    render(this.#filterFormView, filterFormContainer);
    render(this.#sortFormView, this.#container);
    for (const elem in SortType) {
      this.#renderSort(SortType[elem]);
    }
    const daySort = this.#sortFormView.element.querySelector('.trip-sort__item--day');
    const priceSort = this.#sortFormView.element.querySelector('.trip-sort__item--price');
    render(new SortItemView({
      sort: 'event',
      onSortTypeChange: this.#handleSortTypeChange
    }), daySort, RenderPosition.AFTEREND);
    render(new SortItemView({
      sort: 'offer',
      onSortTypeChange: this.#handleSortTypeChange
    }), priceSort, RenderPosition.AFTEREND);
    for (let i = 0; i < filters.length; i++) {
      render(new FilterItemView(filters[i]), this.#filterFormView.element);
    }

    this.#renderPointsList();
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
    this.#sourcedBoardPoints = updateItem(this.#boardPoint, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort (sort) {
    this.#sortComponent = new SortItemView({
      sort: sort,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#sortFormView.element);
  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.PRICE:
        this.#boardPoint.sort(sortPointsByPrice);
        break;
      case SortType.TIME:
        this.#boardPoint.sort(sortPointsByTime);
        break;
      default:
        this.#boardPoint = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    if (this.#boardPoint.length > 0) {
      render(this.#mainTrip, this.#tripControls, RenderPosition.BEFOREBEGIN);
      render(this.#pointsListView, this.#container);
      for (let i = 0; i < this.#boardPoint.length; i++) {
        this.#renderPoint(this.#boardPoint[i]);
      }
    }
    else {
      render(this.#noPointsView, this.#container);
    }
  }
}
