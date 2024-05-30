import AbstractView from '../framework/view/abstract-view';

function createDeleteBtn() {
  return '<button class="event__reset-btn" type="reset">Cancel</button>';
}

export default class CancelBtnView extends AbstractView{

  get template() {
    return createDeleteBtn();
  }
}
