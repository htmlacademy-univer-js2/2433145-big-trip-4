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
      basePrice: 0,
      offers: {offers: [
        {id: '60f8e796-c719-4bba-a845-507fc2c20e6d', title: 'Choose meal', price: 140},
        {id: '98dfafcf-5613-45f1-867a-7045c4292e8e', title: 'Choose seats', price: 173},
        {id: 'c0a49d06-b873-4847-b170-7c2a002dc668', title: 'Upgrade to comfort class', price: 159},
        {id: 'a850395c-a7d6-4f9c-8cb2-7ef48b5a5fef', title: 'Upgrade to business class', price: 179},
        {id: 'b837a4c4-5559-4751-a18d-2bb09f8c6ec9', title: 'Add luggage', price: 52},
        {id: 'b57ad935-0c5b-45d4-b76a-4870b6ac208c', title: 'Business lounge', price: 166}]},
      pictures: [],
    };

    this.#deleteButton = new DeleteBtnView();
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
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
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
