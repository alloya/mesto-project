import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._submitCallback = submitCallback;
    this.submitButton = this._popup.querySelector('.popup__button-save');
  }

  open(card) {
    super.open();
    this._card = card;
    this.setEventListeners();
  }

  _handleDelete = evt => {
    evt.preventDefault();
    this._submitCallback(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this.submitButton.addEventListener('click', this._handleDelete);
  }
}