import './index.css';
import {profilePopup, cardPopup, cardAddButton, profileOpenButton, avatarEdit, avatarPopup, avatarForm, errorObject, formList, formElements} from './components/const';
import {enableValidation} from './components/validate';
import {openPopup, submitProfileForm, submitNewAvatar} from './components/modal';
import {initializeCardsList, submitCardForm} from './components/card';

initializeCardsList();
profileOpenButton.addEventListener('click', () => openPopup(profilePopup));
profilePopup.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', () => openPopup(cardPopup));
cardPopup.addEventListener('submit', submitCardForm);
avatarEdit.addEventListener('click', () => openPopup(avatarPopup));
avatarForm.addEventListener('submit', submitNewAvatar)

enableValidation(formList, formElements, errorObject);