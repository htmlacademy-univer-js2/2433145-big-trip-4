import RoutePointView from '../view/route-point-view.js';
import CurrentFormView from '../view/current-form-view.js';
import { RenderPosition, remove, render, replace } from '../framework/render.js';
import OpenFormBtnView from '../view/open-form-button-view.js';
import CloseFormBtnView from '../view/close-form-button-view.js';
import SaveFormBtnView from '../view/save-form-btn-view.js';
import {isEscapeButton} from '../utils/utils.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';
import DeleteBtnView from '../view/delete-btn-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointsListView = null;
  #handlePointChange = null;
  #handleModeChange = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #deleteButton = null;
  #pointComponent = null;
  #pointFormComponent = null;
  #totalPrice = null;
  #pointModel = null;

  constructor (pointListContainer, onDataChange, onModeChange, pointModel, totalPrice) {
    this.#pointsListView = pointListContainer;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#pointModel = pointModel;
    this.#totalPrice = totalPrice;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#pointFormComponent;
    this.#addInfo(this.#point);
    this.#pointComponent = new RoutePointView({
      data: this.#point,
      onFavouriteClick: this.#handleFavouriteClick,
      pointModel: this.#pointModel
    });

    this.#pointFormComponent = new CurrentFormView({
      data: this.#point,
      onSubmit: this.#handleFormSubmit,
      pointModel: this.#pointModel,
      resetButtons: this.resetButtons,
      totalPrice: this.#totalPrice
    });
    this.#deleteButton = new DeleteBtnView();

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#pointComponent, this.#pointsListView);
      this.#deleteButton.element.addEventListener('click', () => this.#handleDeleteClick(CurrentFormView.parseStateToPoint(this.#pointFormComponent._state)));
      this.resetButtons();
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevFormComponent);
    remove(prevPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {

      this.#replacePointToForm();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointFormComponent.shake(resetFormState);
  }

  resetButtons = (mode = this.#mode, place = this.#pointFormComponent.element, deleteButton = this.#deleteButton) => {
    const openButton = new OpenFormBtnView({
      onClick: () => {
        this.#replaceFormToPoint();
        this.resetButtons();
        document.addEventListener('keydown', this.#escKeyDownButtonHandler);
      }});
    const closeButton = new CloseFormBtnView({
      onClick: () => {
        this.#replacePointToForm();
        document.removeEventListener('keydown', this.#escKeyDownButtonHandler);
      }});
    const saveButton = new SaveFormBtnView();
    if (mode === Mode.EDITING) {
      render(saveButton, place.querySelector('.event__field-group--price'), RenderPosition.AFTEREND);
      render(closeButton, saveButton.element, RenderPosition.AFTEREND);
      render(deleteButton, saveButton.element, RenderPosition.AFTEREND);
    }
    else {
      render(openButton, this.#pointComponent.element, RenderPosition.BEFOREEND);
    }
  };

  #addInfo(point) {
    const checkedOffers = point.offers;
    this.#point = {
      ...point,
      pictures: this.#pointModel.townModel.getPhotosByID(point.destination),
      destination: point.destination,
      offers: this.#pointModel.offerModel.getOfferByType(this.#pointModel.offerModel.offers, point.type),
    };
    checkedOffers.map((offerID) => {
      this.#point.offers.offers.forEach((offer) => {
        if(offer.id === offerID) {
          offer.isChecked = true;
        }
      });
    });
  }

  #replacePointToForm() {
    const saveButton = this.#pointFormComponent.element.querySelector('.event__save-btn');
    const closeButton = this.#pointFormComponent.element.querySelector('.close-form-btn');
    replace(this.#pointComponent, this.#pointFormComponent);
    saveButton.remove();
    closeButton.remove();
    this.#mode = Mode.DEFAULT;
  }

  #replaceFormToPoint() {
    replace(this.#pointFormComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #handleFavouriteClick = () => {
    this.#handlePointChange(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (update) => {
    this.#handlePointChange(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      update
    );
  };

  #handleDeleteClick = (point) => {
    this.#handlePointChange(
      USER_ACTION.DELETE_POINT,
      UPDATE_TYPE.MINOR,
      point
    );
  };

  #escKeyDownButtonHandler = (evt) => {
    if (isEscapeButton(evt)) {
      this.#replacePointToForm();
      document.removeEventListener('keydown', this.#escKeyDownButtonHandler);
    }
  };
}
