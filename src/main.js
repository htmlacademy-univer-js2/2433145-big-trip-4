import BoardPresenter from './presenter/boardPresenter.js';
import PointModel from './model/point-model.js';
import FilterPresenter from './presenter/filterPresenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { RenderPosition, render } from './framework/render.js';

const tripInfoContainer = document.querySelector('.trip-events');
const addPointContainer = document.querySelector('.trip-main');
const pointModel = new PointModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  container: tripInfoContainer,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

const filterPresenter = new FilterPresenter({
  filterContainer: document.querySelector('.trip-controls__filters'),
  filterModel,
  pointModel
});

render(newPointButtonComponent, addPointContainer, RenderPosition.BEFOREEND);
boardPresenter.init();
filterPresenter.init();

