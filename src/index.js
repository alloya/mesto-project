import './index.css';
import {profilePopup, cardPopup, fullImagePopup, cardAddButton, cardsCloseButton, profileOpenButton, profileCloseButton, closeFullImageButton, avatarEdit, avatarPopup, closeAvatarButton, avatarForm, errorObject, formList, formElements, popupList} from './components/const';
import {enableValidation} from './components/validate';
import {openPopup, closePopup, submitProfileForm, submitNewAvatar, closePopup2} from './components/modal';
import {initializeCardsList, submitCardForm} from './components/card';

initializeCardsList();
//closeFullImageButton.addEventListener('click', () => closePopup(fullImagePopup));
profileOpenButton.addEventListener('click', () => openPopup(profilePopup));
//profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
profilePopup.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', () => openPopup(cardPopup));
cardPopup.addEventListener('submit', submitCardForm);
//cardsCloseButton.addEventListener('click', () => closePopup(cardPopup));
avatarEdit.addEventListener('click', () => openPopup(avatarPopup));
//closeAvatarButton.addEventListener('click', () => closePopup(avatarPopup));
avatarForm.addEventListener('submit', submitNewAvatar)

enableValidation(formList, formElements, errorObject);
closePopup2(popupList);