import {profilePopup, profileName, profileDescription, profileNameInput, profileDescriptionInput, avatarEdit, avatarPopup} from './const';

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.focus();
    popup.addEventListener('mousedown', (evt) => {
        if (!evt.target.closest('.form') && !evt.target.closest('.card__full-container')) {
            closePopup(popup);
        }
    });
    popup.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    })
  }
  
  export function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  export function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profilePopup);
  }

  export function submitNewAvatar(evt) {
    evt.preventDefault();
    const input = avatarPopup.querySelector('input');
    avatarEdit.style.backgroundImage = `url('${input.value}')`;
    closePopup(avatarPopup);
    input.value = '';
  }
