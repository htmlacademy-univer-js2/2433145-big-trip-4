import {remove, render, RenderPosition} from '../framework/render.js';
import {USER_ACTION, UPDATE_TYPE, DEFAULT_FORM_VALUES} from '../const.js';
import CurrentFormView from '../view/current-form-view.js';
import PointPresenter from './point-presenter.js';
import CancelBtnView from '../view/cancel-form-button-view.js';

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

    const data = DEFAULT_FORM_VALUES;

    this.#deleteButton = new CancelBtnView();
    this.#pointEditComponent = new CurrentFormView({
      data: data,
      onSubmit: this.#handleFormSubmit,
      pointModel: this.#pointModel,
      resetButtons: this.resetButtons,
      deleteComponent: this.#deleteButton,
    });

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
    this.resetButtons(this.#mode, this.#pointEditComponent.element, this.#deleteButton);
    this.#handleDataChange(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      {...point},
    );
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
