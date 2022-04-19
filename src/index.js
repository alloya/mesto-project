import './index.css';
import {profilePopup, cardPopup, cardAddButton, profileOpenButton, avatarEdit, avatarPopup, avatarForm, errorObject, formList, formElements, loadingBar, main, deletePopup, cardsContainer} from './components/const';
import {enableValidation} from './components/validate';
import {openPopup, resetForm} from './components/modal';
import {submitProfileForm, submitNewAvatar, setUserData, fillUserData} from './components/profile';
import {createCard} from './components/Card';
// import { getCurrentUser, getCards } from './components/Api';
import { setInvisible, setVisible, handleError } from './components/common';
import { submitCardForm, removeCard } from './components/cardActions';
import Card from './components/Card';
import Api from './components/Api';
export let currUser = {};
export const auth = { token: '100a0a32-f941-4db8-a158-a769d9d537de', apiUrl: 'https://nomoreparties.co/v1/plus-cohort-8' };
const api = new Api(auth);

const userPromise = api.getCurrentUser();

const cardsPromise = userPromise.then(res => api.getCards());

Promise.all([userPromise, cardsPromise]).then(([user, cards]) => { 
  currUser = user;
  fillUserData(user);
  initializeCardsList(cards, user._id);
  setInvisible(loadingBar);
  setVisible(main);
});

function initializeCardsList(cardList, userId) {
  if (cardList.length) {
    cardList.forEach(el => {
      const card = new Card(el, userId, '#card-template', null)
      cardsContainer.append(card.createCard())
    });
  }
}

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
cardPopup.addEventListener('submit', (evt) => {
  submitCardForm(evt, currUser._id)
});
avatarEdit.addEventListener('click', () => {
  resetForm(avatarPopup);
  openPopup(avatarPopup);
});
avatarForm.addEventListener('submit', submitNewAvatar);


enableValidation(formList, formElements, errorObject);