import './index.css';
import {profilePopup, cardPopup, cardAddButton, profileOpenButton, avatarEdit, avatarPopup, avatarForm, errorObject, formList, formElements, loadingBar, main} from './components/const';
import {enableValidation} from './components/validate';
import {openPopup, resetForm} from './components/modal';
import {submitProfileForm, submitNewAvatar, setUserData, fillUserData} from './components/profile';
import {initializeCardsList, submitCardForm} from './components/card';
import {getCurrentUser, getCards} from './components/api';
import { setInvisible, setVisible } from './components/common';
export let currUser = {};

const userPromise = getCurrentUser();

const cardsPromise = userPromise.then(res => getCards());

Promise.all([userPromise, cardsPromise]).then(([user, cards]) => { 
  currUser = user;
  fillUserData(user);
  initializeCardsList(cards, user._id);
  setInvisible(loadingBar);
  setVisible(main);
});

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
