import './index.css';
import {
  profilePopup,
  cardPopup,
  cardAddButton,
  profileOpenButton,
  avatarEdit,
  avatarPopup,
  avatarForm,
  formList,
  formElements,
  loadingBar,
  main,
  cardsContainer,
  profileEditPopup,
  cardEditPopup
} from './components/const';
// import {enableValidation} from './components/validate';
import {resetForm} from './components/modal';
import {submitProfileForm, submitNewAvatar, setUserData, fillUserData} from './components/profile';
// import {createCard} from './components/Card';
// import { getCurrentUser, getCards } from './components/Api';
import { setInvisible, setVisible, handleError } from './components/common';
import { submitCardForm, removeCard } from './components/cardActions';
import Card from './components/Card';
import Api from './components/Api';
import FormValidator from "./components/FormValidator";
import Popup from "./components/Popup";
import PopupWithForm from "./components/PopupWithForm";
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
  profileEditPopup.open();
  profileEditPopup.setEventListeners();
});

profilePopup.addEventListener('submit', submitProfileForm);

cardAddButton.addEventListener('click', () => {
  resetForm(cardPopup);
  cardEditPopup.open();
  cardEditPopup.setEventListeners();
});

cardPopup.addEventListener('submit', (evt) => {
  submitCardForm(evt, currUser._id)
});

avatarEdit.addEventListener('click', () => {
  // resetForm(avatarPopup);
  avatarEditPopup.open();
  avatarEditPopup.setEventListeners();
});

// avatarForm.addEventListener('submit', submitNewAvatar);

formList.forEach(form => {
  const formValidator = new FormValidator(formElements, form);
  formValidator.enableValidation();
})
// enableValidation(formList, formElements, errorObject);

export const avatarEditPopup = new PopupWithForm(avatarPopup, data => {
  avatarEditPopup.loading(true);
  api.updateCurrentUserAvatar(data)
    .then(res => avatarEdit.style.backgroundImage = `url('${res.avatar}')`)
    .catch(err => handleError(err))
    .finally(avatarEditPopup.loading(false))
});