import {profilePopup, profileName, profileDescription, profileSaveButton, profileNameInput, profileDescriptionInput, avatarEdit, avatarPopup, avatarInput, formElementClass, formElements, errorObject} from './const';
import { hideError } from './validate';
import { toggleButtonState } from './validate';


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('.popup_opened'));
  }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.focus();
    popup.addEventListener('mousedown', closeByOverlayClick);
    popup.addEventListener('keydown', closeByEscape);
  }
  
  export function closePopup(popup) {
    popup.removeEventListener('keydown', closeByEscape);
    popup.removeEventListener('mousedown', closeByOverlayClick);
    popup.classList.remove('popup_opened');
  }

  export function resetForm(popup) {
    const form = popup.querySelector(formElementClass);
    form.reset();
    const inputList = Array.from(form.querySelectorAll(formElements.input));
    inputList.forEach(input => hideError(form, input, errorObject));
    toggleButtonState(inputList, form.querySelector(formElements.submitButton));
  }



