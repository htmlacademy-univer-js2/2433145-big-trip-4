import AbstractView from '../framework/view/abstract-view';

function createDeleteBtn() {
  return '<button class="event__reset-btn" type="reset">Delete</button>';
}

export default class DeleteBtnView extends AbstractView{

  get template() {
    return createDeleteBtn();
  }
}
