import Popup from "./Popup";
import {btnText, cardPopup} from "./const";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._submit = this._popup.querySelector('.popup__button-save');
  }

  _getInputValues() {
    this._inputsList = this._form.querySelectorAll('.form__input');
    this._inputsValues = {};
    this._inputsList.forEach(input => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }

  _handleFormSubmit = evt => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      this._submit.textContent = btnText.saving
    } else if (this._popup === cardPopup) {
      this._submit.textContent = btnText.create;
    } else {
      this._submit.textContent = btnText.save;
    }
  }
}