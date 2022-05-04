// import { disableButton, enableButton } from "./common";
import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('.popup__button-save');
  }

  open(card) {
    super.open();
    this._card = card;
    this.setEventListeners();
    // enableButton(this._submitButton);
  }

  _handleDelete = evt => {
    evt.preventDefault();
    // disableButton(this._submitButton);
    this._submitCallback(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleDelete);
  }

  // close() {
  //   super.close();
  //   // this._form.removeEventListener('submit', this._handleDelete);
  // }
}