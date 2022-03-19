const showError = (formElement, inputElement,       errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};
  
const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };

const checkValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement);
    }
    else {
        showError(formElement, inputElement, inputElement.validationMessage);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.popup__button-save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => inputElement.addEventListener('input', function () {
        checkValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
    }));
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive');
    }
    else {
        buttonElement.classList.remove('button_inactive');
    }
}

enableValidation();