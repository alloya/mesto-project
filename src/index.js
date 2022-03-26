import './index.css';
import {profilePopup, cardPopup, cardAddButton, profileOpenButton, avatarEdit, avatarPopup, avatarForm, errorObject, formList, formElements} from './components/const';
import {enableValidation} from './components/validate';
import {openPopup, submitProfileForm, submitNewAvatar, resetForm, setUserData} from './components/modal';
import {initializeCardsList, submitCardForm} from './components/card';

initializeCardsList();
profileOpenButton.addEventListener('click', () => {
  resetForm(profilePopup);
  setUserData();
  openPopup(profilePopup);
});
profilePopup.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', () => {
  resetForm(cardPopup);
  openPopup(cardPopup);
});
cardPopup.addEventListener('submit', submitCardForm);
avatarEdit.addEventListener('click', () => {
  resetForm(avatarPopup);
  openPopup(avatarPopup);
});
avatarForm.addEventListener('submit', submitNewAvatar)

enableValidation(formList, formElements, errorObject);