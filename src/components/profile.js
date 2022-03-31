import {profilePopup, profileName, profileDescription, profileNameInput, profileDescriptionInput, avatarEdit, avatarPopup, profileSaveButton} from './const';
import { toggleButtonState } from './validate';
import { closePopup } from './modal';
import { getCurrentUser, updateCurrentUser, updateCurrentUserAvatar } from './api';



export function fillUserData(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  avatarEdit.style.backgroundImage = `url('${data.avatar}')`;
}

export function submitProfileForm(evt) {
  evt.preventDefault();
  updateCurrentUser(profileNameInput.value, profileDescriptionInput.value)
  .then(res => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    closePopup(profilePopup)
  })
}

export function submitNewAvatar(evt) {
  console.log(evt.target.elements.avatarUrl.value)
  const input = avatarPopup.querySelector('input');
  evt.preventDefault();
  updateCurrentUserAvatar(evt.target.elements.avatarUrl.value)
  .then(res => {
    console.log(res)
    avatarEdit.style.backgroundImage = `url('${input.value}')`;
  })
  
  
  closePopup(avatarPopup);
}

export function setUserData() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleButtonState([profileNameInput, profileDescriptionInput], profileSaveButton);
}