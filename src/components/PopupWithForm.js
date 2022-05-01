import Popup from "./Popup";
import {btnText, cardPopup, formElements} from "./const";
import FormValidator from "./FormValidator";
import { disableButton } from "./common";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._submit = this._popup.querySelector('.popup__button-save');
    this._inputsList = this._form.querySelectorAll('.form__input');
    this._validator = new FormValidator(formElements, this._form);
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
    disableButton(this._submit);
    this._submitCallback(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._resetForm();
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

  _resetForm() {
    this._form.reset();
    this._inputsList.forEach(input => this._validator.hideError(this._form, input));
    this._validator.toggleButtonState(false);
  }
}