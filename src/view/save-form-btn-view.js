import AbstractView from '../framework/view/abstract-view';

function createSaveFormBtn(isSaving) {
  return `<button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>`;
}

export default class SaveFormBtnView extends AbstractView{
  get template() {
    return createSaveFormBtn();
  }
}
