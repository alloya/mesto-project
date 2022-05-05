import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._submit = this._popup.querySelector('.popup__button-save');
    this._inputsList = this._form.querySelectorAll('.form__input');
    this._submitInitialText = this._submit.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputsList.forEach(input => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }

  _handleFormSubmit = evt => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
  }

  loading(isLoading, text) {
    isLoading ? this._submit.textContent = text :  this._submit.textContent = this._submitInitialText;
  }
}