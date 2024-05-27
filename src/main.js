import BoardPresenter from './presenter/boardPresenter.js';
import PointModel from './model/point-model.js';
import FilterPresenter from './presenter/filterPresenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { RenderPosition, render } from './framework/render.js';
import PointsApiService from '../src/points-api-service.js';

const AUTHORIZATION = 'Basic dxcf8yivof4b9v3';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const tripInfoContainer = document.querySelector('.trip-events');
const addPointContainer = document.querySelector('.trip-main');
const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
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
pointModel.init();

