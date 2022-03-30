import {profilePopup, profileName, profileDescription, profileNameInput, profileDescriptionInput, avatarEdit, avatarPopup, profileSaveButton} from './const';
import { toggleButtonState } from './validate';
import { closePopup } from './modal';
import { getCurrentUser } from './api';



export function fillUserData(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  avatarEdit.style.backgroundImage = `url('${data.avatar}')`;
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

export function setUserData() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleButtonState([profileNameInput, profileDescriptionInput], profileSaveButton);
}