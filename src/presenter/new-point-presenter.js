import {remove, render, RenderPosition} from '../framework/render.js';
import {USER_ACTION, UPDATE_TYPE, DEFAULT_FORM_VALUES} from '../const.js';
import CurrentFormView from '../view/current-form-view.js';
import PointPresenter from './point-presenter.js';

export default class NewPointPresenter extends PointPresenter{
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #pointModel = null;

  constructor(pointListContainer, onDataChange, onModeChange, pointModel, onDestroy) {
    super(pointListContainer, onDataChange, onModeChange, pointModel);
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointModel = pointModel;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    const data = DEFAULT_FORM_VALUES;

    this.#pointEditComponent = new CurrentFormView({
      data: data,
      onSubmit: this.#handleFormSubmit,
      onClose: this.#handleCloseClick,
      onDelete: this.#handleDeleteClick,
      pointModel: this.#pointModel,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.querySelector('.event__reset-btn').innerText = 'Cancel';
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

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      {...point},
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleCloseClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
