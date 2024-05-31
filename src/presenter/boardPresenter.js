import PointsListView from '../view/points-list-view.js';
import SortFormView from '../view/sort-form-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import MainTripView from '../view/main-trip-view.js';
import PointPresenter from './pointPresenter.js';
import {filter} from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import SortItemView from '../view/sort-item-view.js';
import {sortPointsByPrice, sortPointsByTime} from '../utils/utils.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
// import dayjs from 'dayjs';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #sortFormView = new SortFormView();
  #pointsListView = new PointsListView();
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #sortComponent = null;
  #noPointsComponent = null;
  #container = null;
  #pointModel = null;
  #mainTrip = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DATE;
  #filterType = FilterType.EVERYTHING;
  #tripControls = document.querySelector('.trip-main__trip-controls');
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor ({container, pointModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#newPointPresenter = new NewPointPresenter(
      this.#pointsListView.element,
      this.#handleViewAction,
      this.#handleModeChange,
      this.#pointModel,
      onNewPointDestroy,
    );
  }

  createPoint() {
    this.#currentSortType = SortType.DATE;
    this.#filterModel.setSort(UpdateType.MAJOR, this.#currentSortType);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch(this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
    }

    return filteredPoints;
  }

  init() {
    render(this.#sortFormView, this.#container);
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter(
      this.#pointsListView.element,
      this.#handleViewAction,
      this.#handleModeChange,
      this.#pointModel,
    );
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsList({resetSortType: false});
    this.#renderPointsList();
  };

  #renderSort () {
    for (const elem in SortType) {
      this.#sortComponent = new SortItemView({
        sort: SortType[elem],
        onSortTypeChange: this.#handleSortTypeChange
      });
      render(this.#sortComponent, this.#sortFormView.element);
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
  }

  #clearPointsList({resetSortType = false} = {}) {
    remove(this.#mainTrip);
    this.#mainTrip = null;
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }

    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  #renderPointsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const pointsCount = this.points.length;
    if (pointsCount > 0) {
      render(this.#pointsListView, this.#container);
      const townsArr = [];
      let totalPrice = 0;
      for (let i = 0; i < this.points.length; i++) {
        townsArr.push(this.points[i].destination);
        totalPrice += this.points[i].basePrice;
        this.#renderPoint(this.points[i]);
      }
      const uniqueTowns = Array.from(new Set(townsArr));
      const firstTown = this.#pointModel.townModel.getTownNameById(uniqueTowns[0]);
      const secondTown = pointsCount > 3 ? '...' : this.#pointModel.townModel.getTownNameById(uniqueTowns[1]);
      const thirdTown = this.#pointModel.townModel.getTownNameById(uniqueTowns[uniqueTowns.length - 1]);
      if (!this.#mainTrip) {
        this.#mainTrip = new MainTripView(firstTown, secondTown, thirdTown, totalPrice, this.points[0].dateFrom, this.points[pointsCount - 1].dateTo);
        render(this.#mainTrip, this.#tripControls, RenderPosition.BEFOREBEGIN);
      }
    }
    else {
      this.#renderNoTasks();
    }
  }

  #renderNoTasks() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#container);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MINOR:
        this.#clearPointsList({resetSortType: true});
        this.#renderPointsList();
        break;
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
    }
  };
}
