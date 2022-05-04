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
  fullImagePopup
} from './components/const';
import {setInvisible, setVisible, handleError, disableButton} from './components/common';
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
    const card = new Card(item, userInfo.id, '#card-template', handleCardClick, handleLikeClick, deleteCard);
    cardList.addItem(card.createCard());
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

function createCard(imageElement, data) {
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
  cardEditPopup.loading(true);
  const loadImagePromise = loadImage(data.cardLink)
    .then((res) => { return res.target })

  const postCard = loadImagePromise
    .then(res => res && api.createNewCard(data))
    .catch(err => {
      err.message = "Не удалось загрузить изображение. Проверьте правильность ссылки и ваше сетевое соединение.";
      return err;
    });

  Promise.all([loadImagePromise, postCard])
    .then(([loadedImgElement, card]) => createCard(loadedImgElement, card))
    .catch(err => handleError(err))
    .finally(() => {
      cardEditPopup.close();
      cardEditPopup.loading(false)
    });
});

const profileEditPopup = new PopupWithForm(profilePopup, () => {
  profileEditPopup.loading(true);
  const profileData = {
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  }
  api.updateCurrentUser(profileData)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .catch(err => handleError(err))
    .finally(() => {
      profileEditPopup.close();
      profileEditPopup.loading(false);
    });
});

const avatarEditPopup = new PopupWithForm(avatarPopup, data => {
  avatarEditPopup.loading(true);
  const checkUrl = loadImage(data.avatarUrl);
  const loadAvatar = checkUrl
    .then(res => { return api.updateCurrentUserAvatar(data) })
    .catch(err => {
      err.message = "Не удалось загрузить изображение. Проверьте правильность ссылки и ваше сетевое соединение.";
      return err;
    })

    Promise.all([checkUrl, loadAvatar])
      .then(([check, res]) => avatarEdit.style.backgroundImage = `url('${res.avatar}')`)
      .catch(err => handleError(err))
      .finally(() => {
        avatarEditPopup.close();
        avatarEditPopup.loading(false);
      })
});

const deletePopup = new PopupWithDelete(deleteConfirmPopup, card => {
  api.deleteCard(card.getCardId())
    .then(() => card.deleteCard())
    .catch(err => handleError(err))
    .finally(() => deletePopup.close())
});

function deleteCard(card) {
  deletePopup.open(card);
}

profileOpenButton.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  profileNameInput.value = profile.name;
  profileDescriptionInput.value = profile.about;

  profileEditPopup.open();
  profileEditPopup.setEventListeners();
});

cardAddButton.addEventListener('click', () => {
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


