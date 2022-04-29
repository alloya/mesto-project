import Popup from "./Popup";
import PopupWithImage from "./PopupWithImage";

export const auth = {
  token: '100a0a32-f941-4db8-a158-a769d9d537de',
  apiUrl: 'https://nomoreparties.co/v1/plus-cohort-8'
};
export const profilePopup = document.querySelector(".profile_popup");
export const cardPopup = document.querySelector(".cards_popup");
export const fullImagePopup = document.querySelector(".image_popup");

export const cardsContainer = document.querySelector(".cards");
export const cardAddButton = document.querySelector(".profile__plus-button");
export const cardSaveButton = document.querySelector(".cards_popup .popup__button-save");
// export const cardsCloseButton = document.querySelector(".cards_popup .popup__close");
export const cardNameInput = document.querySelector(".card__input-name");
export const cardUrlInput = document.querySelector(".card__input-url");
export const cardTemplate = document.querySelector('#card-template').content;
export const cardForm = document.querySelector('.form-addCard');

export const profileOpenButton = document.querySelector(".profile__edit-button");
// export const profileCloseButton = document.querySelector(".popup__close");
export const profileSaveButton = profilePopup.querySelector(".popup__button-save");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__subtitle");

export const profileNameInput = document.querySelector(".profile__input-name");
export const profileDescriptionInput = document.querySelector(".profile__input-description");

export const fullImage = fullImagePopup.querySelector('.card__full-picture');
export const fullImageSubtitle = fullImagePopup.querySelector('.card__full-subtitle');
// export const closeFullImageButton = fullImagePopup.querySelector('.popup__close');
export const avatarEdit = document.querySelector('.profile__avatar');
export const avatarPopup = document.querySelector('.avatar-popup');
// export const closeAvatarButton = avatarPopup.querySelector('.popup__close');
// export const submitAvatarButton = avatarPopup.querySelector('.popup__button-save');
export const avatarForm = avatarPopup.querySelector('.form-avatar');
export const avatarInput = avatarPopup.querySelector('input');
// export const errorObject = {inputErrorClass: 'form__input_type_error', spanErrorClass: 'form__input-error_active'};
export const formList = document.querySelectorAll('.form');
export const formElements = {
  input: '.form__input',
  submitButton: '.popup__button-save',
  buttonInactive: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  spanErrorSelector: '.form__input-error',
  spanErrorClass: 'form__input-error_active'
};
export const formElementClass = '.form';
export const popupList = document.querySelectorAll('.popup');
export const loadingBar = document.querySelector('.loading-bar');
export const main = document.querySelector('.main');
export const btnText = {save: 'Сохранить', saving: 'Сохраняю...', create: 'Создать'}
export const errorText = document.querySelector('.error-text');

export const profile = {
  name: profileName,
  about: profileDescription,
  avatar: avatarEdit
}

export const deletePopup = new Popup(document.querySelector('.delete_popup'));
export const errorPopup = new Popup(document.querySelector('.error-popup'));


export const popupWithFullImage = new PopupWithImage(fullImagePopup);