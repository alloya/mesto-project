import {profilePopup, profileName, profileDescription, profileNameInput, profileDescriptionInput, avatarEdit, avatarPopup, profileSaveButton, loadingBar} from './const';
import { toggleButtonState } from './validate';
import { closePopup } from './modal';
import { getCurrentUser, updateCurrentUser, updateCurrentUserAvatar } from './api';
import { setInvisible, setVisible } from './common';



export function fillUserData(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  avatarEdit.style.backgroundImage = `url('${data.avatar}')`;
}

export function submitProfileForm(evt) {
  setVisible(loadingBar);
  evt.preventDefault();
  updateCurrentUser(profileNameInput.value, profileDescriptionInput.value)
  .then(res => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    setInvisible(loadingBar);
    closePopup(profilePopup);
  })
}

export function submitNewAvatar(evt) {
  setVisible(loadingBar);
  evt.preventDefault();
  updateCurrentUserAvatar(evt.target.elements.avatarUrl.value)
  .then(res => {
    setInvisible(loadingBar);
    avatarEdit.style.backgroundImage = `url('${res.avatar}')`;
    closePopup(avatarPopup);
  }) 
}

export function setUserData() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleButtonState([profileNameInput, profileDescriptionInput], profileSaveButton);
}