export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._submit = this._form.querySelector(this._settings.submitButton);
  }

  _checkValidity = (settings, form, input) => {
    input.validity.valid ? this.hideError(settings, form, input) : this._showError(settings, form, input);
  }

  toggleButtonState(settings, isFormValid, submit) {
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
        this.toggleButtonState(settings, form.checkValidity(), submit);
      })
    })
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      submit.classList.add(this._settings.buttonInactive);
    })
  }

  _showError(settings, form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(settings.spanErrorClass);
    input.classList.add(settings.inputErrorClass);
  }

  hideError(settings, form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = '';
    errorSpan.classList.remove(settings.spanErrorClass);
    input.classList.remove(settings.inputErrorClass)
  }

  enableValidation = () => {

    this._setEventListeners(this._settings, this._form, this._submit)
    this.toggleButtonState(this._settings, this._form.checkValidity(), this._submit);
  }
}
