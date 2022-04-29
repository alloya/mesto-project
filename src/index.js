import './index.css';
import {
  auth,
  profilePopup,
  cardPopup,
  cardAddButton,
  profileOpenButton,
  avatarEdit,
  avatarPopup,
  formList,
  formElements,
  loadingBar,
  main,
  cardsContainer,
  cardEditPopup,
  profile,
  profileNameInput, profileDescriptionInput, profileName, profileDescription
} from './components/const';
import {resetForm} from './components/modal';
import {submitProfileForm, submitNewAvatar, setUserData, fillUserData} from './components/profile';
import {setInvisible, setVisible, handleError} from './components/common';
import {submitCardForm, removeCard} from './components/cardActions';
import Card from './components/Card';
import Api from './components/Api';
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";
// let user = {};
export const currUser = {};
export const api = new Api(auth);
const userInfo = new UserInfo(profile);

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    userInfo.name = userData.name;
    userInfo.about = userData.about;
    userInfo.id = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarEdit.style.backgroundImage = `url("${userData.avatar}")`
    initializeCardsList(cardsData, userInfo.id);
  })
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

export const profileEditPopup = new PopupWithForm(profilePopup, () => {
  profileEditPopup.loading(true);
  const profileData = {
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  }
  userInfo.setUserInfo(profileData)
    .then(() => {
      profileEditPopup.loading(false)
    });
});

profileOpenButton.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.about;
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
