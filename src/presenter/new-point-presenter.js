import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import CurrentFormView from '../view/current-form-view.js';
import PointPresenter from './pointPresenter.js';
import DeleteBtnView from '../view/delete-btn-view.js';

export default class NewPointPresenter extends PointPresenter{
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #pointModel = null;
  #mode = null;
  #deleteButton = null;

  constructor(pointListContainer, onDataChange, onModeChange, pointModel, onDestroy) {
    super(pointListContainer, onDataChange, onModeChange, pointModel);
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointModel = pointModel;
    this.#mode = 'EDITING';
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    const data = {
      type: 'flight',
      price: 0,
      offers: {offers: []},
      pictures: [],
    };

    this.#pointEditComponent = new CurrentFormView({
      data: data,
      onSubmit: this.#handleFormSubmit,
      pointModel: this.#pointModel,
    });
    this.#deleteButton = new DeleteBtnView();

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    this.resetButtons(this.#mode, this.#pointEditComponent.element, this.#deleteButton);
    this.#deleteButton.element.addEventListener('click', this.#handleDeleteClick);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      {...task},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
