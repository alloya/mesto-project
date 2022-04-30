import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  open(card) {
    super.open();
    this._card = card;
    this.setEventListeners();
  }

  _handleDelete = evt => {
    evt.preventDefault();
    debugger
    this._submitCallback(this._card);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleDelete);
  }

  close() {
    super.close();
    this._popup.removeEventListener('submit', this._handleDelete);
  }
}