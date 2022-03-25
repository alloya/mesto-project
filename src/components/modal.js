import {profilePopup, profileName, profileDescription, profileNameInput, profileDescriptionInput, profileSaveButton, avatarEdit, avatarPopup, avatarInput, avatarForm, submitAvatarButton, formElementClass, formElements, errorObject, closePopupList} from './const';
import { hideError } from './validate';
import { toggleButtonState } from './validate';


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByOverlayClick(evt) {
  if (!evt.target.closest(formElementClass) && !evt.target.closest('.card__full-container')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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
    const form = popup.querySelector(formElementClass);
    if (form) {
      resetForm(form);
    }
  }

  function resetForm(form) {
    form.reset();
    const inputList = Array.from(form.querySelectorAll(formElements.input));
    inputList.forEach(input => hideError(form, input, errorObject));
    toggleButtonState(inputList, form.querySelector(formElements.submitButton));
  }

  export function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profilePopup);
    toggleButtonState([profileNameInput, profileDescriptionInput], profileSaveButton);
  }

  export function submitNewAvatar(evt) {
    evt.preventDefault();
    avatarEdit.style.backgroundImage = `url('${avatarInput.value}')`;
    avatarForm.reset();
    closePopup(avatarPopup);
    toggleButtonState([avatarInput], submitAvatarButton);
  }

  export function closePopup2(popupList) {
    popupList.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        console.log(evt.target.classList)
          if (evt.target.classList.contains('popup_opened')) {
            debugger
              closePopup(popup)
          }
          if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
          }
      })
  })

  }