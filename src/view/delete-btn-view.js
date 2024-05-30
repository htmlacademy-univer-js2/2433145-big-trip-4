import AbstractView from '../framework/view/abstract-view';

function createDeleteBtn(isDeleting) {
  return `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>`;
}

export default class DeleteBtnView extends AbstractView{

  get template() {
    return createDeleteBtn();
  }
}
