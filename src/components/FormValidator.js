export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._submit = this._form.querySelector(this._settings.submitButton);
  }

  _checkValidity = (form, input) => {
    input.validity.valid ? this.hideError(form, input) : this._showError(form, input);
  }

  toggleButtonState(isFormValid) {
    if (isFormValid) {
      this._submit.classList.remove(this._settings.buttonInactive);
      this._submit.disabled = false;
    } else {
      this._submit.classList.add(this._settings.buttonInactive);
      this._submit.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputsList = this._form.querySelectorAll(this._settings.input);
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(this._form, input);
        this.toggleButtonState(this._form.checkValidity(), this._submit);
      })
    })
  }

  _showError(form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._settings.spanErrorClass);
    input.classList.add(this._settings.inputErrorClass);
  }

  hideError(form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = '';
    errorSpan.classList.remove(this._settings.spanErrorClass);
    input.classList.remove(this._settings.inputErrorClass)
  }

  enableValidation = () => {
    this._setEventListeners();
    this.toggleButtonState(this._form.checkValidity());
  }
}
