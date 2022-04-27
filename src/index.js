import './index.css';
import {
  auth,
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
  cardEditPopup, profile
} from './components/const';
// import {enableValidation} from './components/validate';
import {resetForm} from './components/modal';
import {submitProfileForm, submitNewAvatar, setUserData, fillUserData} from './components/profile';
// import {createCard} from './components/Card';
// import { getCurrentUser, getCards } from './components/Api';
import {setInvisible, setVisible, handleError} from './components/common';
import {submitCardForm, removeCard} from './components/cardActions';
import Card from './components/Card';
import Api from './components/Api';
import FormValidator from "./components/FormValidator";
import Popup from "./components/Popup";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";
const user = {};
export const currUser = {};
const api = new Api(auth);
const userInfo = new UserInfo(profile);

api.getCurrentUser()
  .then(res => {
    user.id = res._id;
    userInfo.setUserInfo(res)
  })
  .catch(err => console.log('Error: ' + err));

api.getCards()
  .then(res => initializeCardsList(res, user.id))
  .then(() => {
    setInvisible(loadingBar);
    setVisible(main);
  })
  .catch(err => console.log('Error: ' + err))

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
  avatarEditPopup.open();
  avatarEditPopup.setEventListeners();
});

// avatarForm.addEventListener('submit', submitNewAvatar);
// enableValidation(formList, formElements, errorObject);

formList.forEach(form => {
  const formValidator = new FormValidator(formElements, form);
  formValidator.enableValidation();
})

export const avatarEditPopup = new PopupWithForm(avatarPopup, data => {
  avatarEditPopup.loading(true);
  api.updateCurrentUserAvatar(data)
    .then(res => avatarEdit.style.backgroundImage = `url('${res.avatar}')`)
    .catch(err => handleError(err))
    .finally(() => avatarEditPopup.loading(false))
});