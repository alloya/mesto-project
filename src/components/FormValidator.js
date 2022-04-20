export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _checkValidity = (settings, form, input) => {
    input.validity.valid ? this._hideError(settings, form, input) : this._showError(settings, form, input);
  }

  _toggleButtonState(settings, isFormValid, submit) {
    if (isFormValid) {
      submit.classList.remove(settings.buttonInactive);
      submit.disabled = false;
    } else {
      submit.classList.add(settings.buttonInactive);
      submit.disabled = true;
    }
  }

  _setEventListeners(settings, form, submit) {
    this._inputsList = this._form.querySelectorAll(this._settings.input);
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(settings, form, input);
        this._toggleButtonState(settings, form.checkValidity(), submit);
      })
    })
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    })
  }

  _showError(settings, form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(settings.spanErrorClass);
    input.classList.add(settings.inputErrorClass);
  }

  _hideError(settings, form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = '';
    errorSpan.classList.remove(settings.spanErrorClass);
    input.classList.remove(settings.inputErrorClass)
  }

  enableValidation = () => {
    this._submit = this._form.querySelector(this._settings.submitButton);
    this._setEventListeners(this._settings, this._form, this._submit)
    this._toggleButtonState(this._settings, this._form.checkValidity(), this._submit);
  }
}