import BoardPresenter from './presenter/boardPresenter.js';
import PointModel from './model/point-model.js';

const tripInfoContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();

const boardPresenter = new BoardPresenter({
  container: tripInfoContainer,
  pointModel
});
boardPresenter.init();

