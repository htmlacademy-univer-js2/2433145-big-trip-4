import PointsListView from '../view/points-list-view.js';
import CurrentFormView from '../view/current-form-view.js';
import SortFormView from '../view/sort-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import OpenFormBtnView from '../view/open-form-button-view.js';
import { RenderPosition, render, replace } from '../framework/render.js';
import CloseFormBtnView from '../view/close-form-button-view.js';
import SaveFormBtnView from '../view/save-form-btn-view.js';
import NoPointsView from '../view/no-points-view.js';
import FilterFormView from '../view/filter-form-view.js';
import MainTripView from '../view/main-trip-view.js';
import { generateFilter } from '../mock/filters.js';
import FilterItemView from '../view/filter-item-view.js';

export default class BoardPresenter {
  #sortFormView = new SortFormView();
  #pointsListView = new PointsListView();
  #noPointsView = new NoPointsView();
  #mainTrip = new MainTripView();
  #filterFormView = new FilterFormView();
  #container = null;
  #pointModel = null;
  #boardPoint = [];

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
    const escKeyDownBtnHandler = (evt) => {
      if (evt.key === 'Escape') {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownBtnHandler);
      }
    };
    const pointComponent = new RoutePointView({data: point});
    const formComponent = new CurrentFormView({
      data: point,
      onSubmit: () => {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownBtnHandler);
      }});
    const deleteBtn = formComponent.element.querySelector('.event__reset-btn');
    const openBtn = new OpenFormBtnView({
      onClick: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownBtnHandler);
      }});
    const closeBtn = new CloseFormBtnView({
      onClick: () => {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownBtnHandler);
      }});
    const saveBtn = new SaveFormBtnView();

    render(pointComponent, this.#pointsListView.element);
    render(openBtn, pointComponent.element, RenderPosition.BEFOREEND);
    render(saveBtn, deleteBtn, RenderPosition.BEFOREBEGIN);
    render(closeBtn, deleteBtn, RenderPosition.AFTEREND);

    function replacePointToForm() {
      replace(pointComponent, formComponent);
    }

    function replaceFormToPoint() {
      replace(formComponent, pointComponent);
    }
  }
}

