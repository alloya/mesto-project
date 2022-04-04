import {profilePopup, profileName, profileDescription, profileNameInput, profileDescriptionInput, avatarEdit, avatarPopup, profileSaveButton, loadingBar} from './const';
import { toggleButtonState } from './validate';
import { closePopup } from './modal';
import { getCurrentUser, updateCurrentUser, updateCurrentUserAvatar } from './api';
import { setInvisible, setVisible, resetButtonText, setButtonBlockedState, handleError } from './common';


export function fillUserData(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  avatarEdit.style.backgroundImage = `url('${data.avatar}')`;
}

export function submitProfileForm(evt) {
  setVisible(loadingBar);
  const text = evt.submitter.textContent;
  setButtonBlockedState(evt.submitter);
  evt.preventDefault();
  updateCurrentUser(profileNameInput.value, profileDescriptionInput.value)
  .then(res => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
  })
  .catch(err => handleError(err))
  .finally(res => {
    setInvisible(loadingBar);
    closePopup(profilePopup);
    resetButtonText(evt.submitter, text);
  });
}

export function submitNewAvatar(evt) {
  setVisible(loadingBar);
  const text = evt.submitter.textContent;
  setButtonBlockedState(evt.submitter);
  evt.preventDefault();
  updateCurrentUserAvatar(evt.target.elements.avatarUrl.value)
  .then(res => {
    avatarEdit.style.backgroundImage = `url('${res.avatar}')`;
  }) 
  .catch(err => handleError(err))
  .finally(res => {
    setInvisible(loadingBar);
    closePopup(avatarPopup);
    resetButtonText(evt.submitter, text);
  });
}

export function setUserData() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleButtonState([profileNameInput, profileDescriptionInput], profileSaveButton);
}