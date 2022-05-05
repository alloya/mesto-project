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
  profileNameInput,
  profileDescriptionInput,
  profileName,
  profileDescription,
  deleteConfirmPopup,
  fullImagePopup,
  btnText
} from './components/const';
import {setInvisible, setVisible, handleError, disableButton, enableButton} from './components/common';
import Card from './components/Card';
import Api from './components/Api';
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";
import PopupWithDelete from "./components/PopupWithDelete";
import Section from './components/Section';
import Popup from "./components/Popup";
import PopupWithImage from "./components/PopupWithImage";

export const api = new Api(auth);
const userInfo = new UserInfo(profile);
export const errorPopup = new Popup(document.querySelector('.error-popup'));
export const popupWithFullImage = new PopupWithImage(fullImagePopup);
const cardList = new Section({
  renderer: (item) => {
    createCard(item)
  }
}, cardsContainer)

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([userData, cardsList]) => {
    userInfo.name = userData.name;
    userInfo.about = userData.about;
    userInfo.id = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarEdit.style.backgroundImage = `url("${userData.avatar}")`;
    cardList.render(cardsList.reverse());
  })
  .then(() => {
    setInvisible(loadingBar);
    setVisible(main);
  })
  .catch(err => console.log('Error: ' + err))

function handleLikeClick(card, putLike) {
  putLike ? addLike(card) : removeLike(card);
}

function addLike(card) {
  api.putLike(card.getCardId())
    .then(response => card.manageLikes(response))
    .catch(err => handleError(err))
}

function removeLike(card) {
  api.deleteLike(card.getCardId())
    .then(response => card.manageLikes(response))
    .catch(err => handleError(err))
}

function handleCardClick(title, link) {
  const card = {
    url: link,
    name: title
  }
  popupWithFullImage.open(card);
  popupWithFullImage.setEventListeners();
}

function createCard(data, imageElement) {
  const card = new Card(data, userInfo.id, '#card-template', handleCardClick, handleLikeClick, deleteCard, imageElement);
  cardList.addItem(card.createCard());
}

function loadImage(src) {
  const image = document.createElement('img');
  image.src = src;

  return new Promise((resolve, reject) => {
    image.onerror = reject;
    image.onload = resolve;
  })
}

const cardEditPopup = new PopupWithForm(cardPopup, data => {
  cardEditPopup.loading(true, btnText.saving);
  const loadImagePromise = loadImage(data.cardLink)
    .then((res) => { return res.target })

  const postCard = loadImagePromise
    .then(res => res && api.createNewCard(data))
    .catch(err => {
      err.message = "Не удалось загрузить изображение. Проверьте правильность ссылки и ваше сетевое соединение.";
      return err;
    });

  Promise.all([postCard, loadImagePromise])
    .then(([card, loadedImgElement ]) => createCard(card, loadedImgElement))
    .then(() => {
      cardEditPopup.close();
      cardEditPopup.loading(false)
    })
    .catch(err => handleError(err))
});

const profileEditPopup = new PopupWithForm(profilePopup, () => {
  profileEditPopup.loading(true, btnText.saving);
  const profileData = {
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  }
  api.updateCurrentUser(profileData)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .then(() => {
      profileEditPopup.close();
      profileEditPopup.loading(false);
    })
    .catch(err => handleError(err))
});

const avatarEditPopup = new PopupWithForm(avatarPopup, data => {
  avatarEditPopup.loading(true, btnText.saving);
  const checkUrl = loadImage(data.avatarUrl);
  const loadAvatar = checkUrl
    .then(res => { return api.updateCurrentUserAvatar(data) })
    .catch(err => {
      err.message = "Не удалось загрузить изображение. Проверьте правильность ссылки и ваше сетевое соединение.";
      return err;
    })

    Promise.all([checkUrl, loadAvatar])
      .then(([check, res]) => avatarEdit.style.backgroundImage = `url('${res.avatar}')`)
      .then(() => {
        avatarEditPopup.close();
        avatarEditPopup.loading(false);
      })
      .catch(err => handleError(err))
});

const deletePopup = new PopupWithDelete(deleteConfirmPopup, card => {
  disableButton(deletePopup.submitButton);
  api.deleteCard(card.getCardId())
    .then(() => card.deleteCard())
    .then(() => deletePopup.close())
    .catch(err => handleError(err))
    .finally(() => enableButton(deletePopup.submitButton));
});

function deleteCard(card) {
  deletePopup.open(card);
}

profileOpenButton.addEventListener('click', () => {
  formValidators['profile-form'].resetForm();
  const profile = userInfo.getUserInfo();
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.about;

  profileEditPopup.open();
  profileEditPopup.setEventListeners();
});

cardAddButton.addEventListener('click', () => {
  formValidators['newCard-form'].resetForm();
  cardEditPopup.open();
  cardEditPopup.setEventListeners();
});

avatarEdit.addEventListener('click', () => {
  formValidators['avatar-form'].resetForm();
  avatarEditPopup.open();
  avatarEditPopup.setEventListeners();
});

const formValidators = {};
const enableValidation = (config) => { 
  formList.forEach((form) => { 
    const validator = new FormValidator(config, form); 
    const formName = form.getAttribute('name'); 
    formValidators[formName] = validator; 
    validator.enableValidation(); 
  }); 
}; 

enableValidation(formElements);


