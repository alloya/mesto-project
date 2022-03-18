const cardsArray = [ {'name': 'test', 'image': 'https://new-widget.kiwitaxi.com/static/images/Economy.png', 'like': true }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': true }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }];

const profilePopup = document.querySelector(".profile_popup");
const cardPopup = document.querySelector(".cards_popup");
const fullImagePopup = document.querySelector(".image_popup");

const cardsContainer = document.querySelector(".cards");
const cardAddButton = document.querySelector(".profile__plus-button");
const cardSaveButton = document.querySelector(".cards_popup .popup__button-save");
const cardsCloseButton = document.querySelector(".cards_popup .popup__close");
const cardNameInput = document.querySelector(".card__input-name");
const cardUrlInput = document.querySelector(".card__input-url");
const cardTemplate = document.querySelector('#card-template').content;

const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close");
const profileSaveButton = document.querySelector(".popup__button-save");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
const profileNameInput = document.querySelector(".profile__input-name");
const profileDescriptionInput = document.querySelector(".profile__input-description");

const fullImage = fullImagePopup.querySelector('.card__full-picture');
const fullImageSubtitle = fullImagePopup.querySelector('.card__full-subtitle');
const closeFullImageButton = fullImagePopup.querySelector('.popup__close');
const avatarEdit = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.avatar-popup');
const closeAvatarButton = avatarPopup.querySelector('.popup__close');
