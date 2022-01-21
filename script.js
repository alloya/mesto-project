const cardsArray = [ {'name': 'test', 'image': 'https://new-widget.kiwitaxi.com/static/images/Economy.png', 'like': true }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': true }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }];

const cardsContainer = document.querySelector(".cards");
const profilePopup = document.querySelector(".popup");
const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close");
const profileSaveButton = document.querySelector(".popup__button-save");
const cardPopup = document.querySelector(".popup.cards_popup");
const cardAddButton = document.querySelector(".profile__plus-button");
const cardSaveButton = document.querySelector(".cards_popup .popup__button-save");
const cardsCloseButton = document.querySelector(".cards_popup .popup__close");
const fullImageContainer = document.querySelector(".image_popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
const profileNameInput = document.querySelector(".profile__input-name");
const profileDescriptionInput = document.querySelector(".profile__input-description");
const cardNameInput = document.querySelector(".card__input-name");
const cardUrlInput = document.querySelector(".card__input-url");
const cardTemplate = document.querySelector('#card-template').content;
const fullImage = fullImageContainer.querySelector('.card__full-picture');
const fullImageSubtitle = fullImageContainer.querySelector('.card__full-subtitle');
const closeFullImageButton = fullImageContainer.querySelector('.popup__close');

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__picture');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLike = cardElement.querySelector('.card__like');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.setAttribute('src', card.image);
  cardImage.setAttribute('alt', card.name);
  
  if (card.like) {
    cardElement.querySelector('.card__like').classList.add('card__like_inverted');
  }
  cardImage.addEventListener('click', () => showFullImage(cardImage));
  cardDelete.addEventListener('click', () => {
    cardDelete.closest('.card').remove();
  });
  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like_inverted');
  });

  return cardElement;
}

function renderCards(card) {
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
}

function initializeCardsList() {
  if (cardsArray.length) {
    cardsArray.slice().reverse().forEach(el => renderCards(el));
  }
}

function showFullImage(card) {
  fullImage.setAttribute('src', card.src);
  fullImage.setAttribute('alt', card.alt);
  fullImageSubtitle.textContent = card.alt;

  openPopup(fullImageContainer);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(evt.target.parentElement.parentElement);
}

function submitCardForm(evt) {
  evt.preventDefault();
  if (cardNameInput.value && cardUrlInput.value) {
    cardsArray.push({ "name": cardNameInput.value, "image": cardUrlInput.value, "like": false });
    renderCards(cardsArray[cardsArray.length-1]);
    cardNameInput.value = '';
    cardUrlInput.value = '';
  }
  closePopup(evt.target.parentElement.parentElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function toggleProfilePopup() {
  profilePopup.classList.toggle("popup_opened");
}

function toggleCardPopup() {
  cardPopup.classList.toggle("popup_opened");
}

function toggleFullImagePopup() {
  fullImageContainer.classList.toggle("popup_opened");
}

initializeCardsList();
closeFullImageButton.addEventListener('click', () => closePopup(fullImageContainer));
profileOpenButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);
profileSaveButton.addEventListener('click', submitProfileForm);
cardAddButton.addEventListener('click', toggleCardPopup);
cardSaveButton.addEventListener('click', submitCardForm);
cardsCloseButton.addEventListener('click', toggleCardPopup);

