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
  profileNameInput, profileDescriptionInput, profileName, profileDescription, popupWithFullImage, deleteConfirmPopup
} from './components/const';
import {setInvisible, setVisible, handleError} from './components/common';
import Card from './components/Card';
import Api from './components/Api';
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";
import PopupWithDelete from "./components/PopupWithDelete";
import Section from './components/Section';


export const api = new Api(auth);
const userInfo = new UserInfo(profile);

const cardList = new Section({
  renderer: (item) => {
    const card = new Card(item, userInfo.id, '#card-template', handleCardClick, handleLikeClick.bind(this), deleteCard);
    const newCard = card.createCard();
    //card.manageLikes(item);
    cardList.addItem(newCard);
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

function handleLikeClick(cardId, manageLikesFunction, putLike) {
  !putLike ? addLike(cardId, manageLikesFunction) : removeLike(cardId, manageLikesFunction);
  // putLike ? api.putLike(cardId) : api.deleteLike(cardId).then(response => {
  //     console.log(response)
  //     // debugger
  //     manageLikesFunction(response, userInfo.id)
  //   })
  //   .catch(err => handleError(err))
}

function addLike(cardId, manageLikesFunction) {
  console.log('like Added')
  api.putLike(cardId)
    .then(response => {
      console.log(response)
      // debugger;
      manageLikesFunction(response, userInfo.id)
    })
    .catch(err => handleError(err))
}

function removeLike(cardId, manageLikesFunction) {
  console.log('like removed')
  api.deleteLike(cardId)
    .then(response => {
      console.log(response)
      // debugger;
      manageLikesFunction(response, userInfo.id)
    })
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

function createCard(data) {
  const card = new Card(data, userInfo.id, '#card-template', handleCardClick, handleLikeClick, deleteCard);
  cardList.addItem(card.createCard());
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
  api.updateCurrentUser(profileData)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .catch(err => handleError(err))
    .finally(profileEditPopup.loading(false));
});

const avatarEditPopup = new PopupWithForm(avatarPopup, data => {
  avatarEditPopup.loading(true);
  api.updateCurrentUserAvatar(data)
    .then(res => avatarEdit.style.backgroundImage = `url('${res.avatar}')`)
    .catch(err => handleError(err))
    .finally(() => avatarEditPopup.loading(false))
});

const deletePopup = new PopupWithDelete(deleteConfirmPopup, card => {
  api.deleteCard(card.getCardId())
    .then(card.deleteCard())
    .catch(err => handleError(err))
    .finally(deletePopup.close())
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


