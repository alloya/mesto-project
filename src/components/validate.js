import { formElements } from "./const";

const showError = (formElement, inputElement, errorMessage, errorObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(errorObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorObject.spanErrorClass);
};
  
export const hideError = (formElement, inputElement, errorObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errorObject.inputErrorClass);
    errorElement.classList.remove(errorObject.spanErrorClass);
    errorElement.textContent = '';
  };

const checkValidity = (formElement, inputElement, errorObject) => {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, errorObject);
    }
    else {
        showError(formElement, inputElement, inputElement.validationMessage, errorObject);
    }
}

const setEventListeners = (form, formElements, errorObject) => {
    const inputList = Array.from(form.querySelectorAll(formElements.input));
    const buttonElement = form.querySelector(formElements.submitButton);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => inputElement.addEventListener('input', function () {
        checkValidity(form, inputElement, errorObject);
        toggleButtonState(inputList, buttonElement);
    }));
}

export function enableValidation(formList, fromElements, errorObject) {
    const formArray= Array.from(formList);
    formArray.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, fromElements, errorObject);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

export function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formElements.buttonInactive);
        buttonElement.setAttribute('disabled', '');
    }
    else {
        buttonElement.classList.remove(formElements.buttonInactive);
        buttonElement.removeAttribute('disabled', '');
    }
}