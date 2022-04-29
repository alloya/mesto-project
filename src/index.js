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
  profile,
  profileNameInput, profileDescriptionInput, profileName, profileDescription, popupWithFullImage
} from './components/const';
import {resetForm} from './components/modal';
import {setInvisible, setVisible, handleError} from './components/common';
import Card from './components/Card';
import Api from './components/Api';
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";

export const api = new Api(auth);
const userInfo = new UserInfo(profile);

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([userData, cardsList]) => {
    userInfo.name = userData.name;
    userInfo.about = userData.about;
    userInfo.id = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarEdit.style.backgroundImage = `url("${userData.avatar}")`
    initializeCardsList(cardsList, userInfo.id);
  })
  .then(() => {
    setInvisible(loadingBar);
    setVisible(main);
  })
  .catch(err => console.log('Error: ' + err))

function initializeCardsList(cardsList, userId) {
  if (cardsList.length) {
    cardsList.forEach(el => {
      createCard(el);
    });
  }
}

function handleCardClick(title, link) {
  const card = {
    url: link,
    name: title
  }
  popupWithFullImage.open(card);
  popupWithFullImage.setEventListeners();
}

function createCard(data) {
  const card = new Card(data, userInfo.id, '#card-template', handleCardClick);
  cardsContainer.append(card.createCard());
}

const cardEditPopup = new PopupWithForm(cardPopup, data => {
  cardEditPopup.loading(true);
  api.createNewCard(data)
    .then(res => {
      return createCard(res)
    })
    .catch(err => console.log(err))
    .finally(cardEditPopup.loading(false));
});

const profileEditPopup = new PopupWithForm(profilePopup, () => {
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

cardAddButton.addEventListener('click', () => {
  resetForm(cardPopup);
  cardEditPopup.open();
  cardEditPopup.setEventListeners();
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
