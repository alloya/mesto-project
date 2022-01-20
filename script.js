const cardsArray = [ {'name': 'test', 'image': 'https://new-widget.kiwitaxi.com/static/images/Economy.png', 'like': true }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': true }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }];

const cardsContainer = document.querySelector(".cards");
const profilePopup = document.querySelector(".popup__overlay");
const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close");
const profileSaveButton = document.querySelector(".popup__button-save");
const cardPopup = document.querySelector(".popup__overlay.cards-popup");
const cardAddButton = document.querySelector(".profile__plus-button");
const cardSaveButton = document.querySelector(".cards-popup .popup__button-save");
const cardsCloseButton = document.querySelector(".cards-popup .popup__close");
const cardTrashBins = document.querySelectorAll(".card__trash");
const cardLikes = document.querySelectorAll(".card__heart");
const fullImageContainer = document.querySelector(".image-popup");
const fullImageContainerCloseButton = fullImageContainer.querySelector(".popup__close");

function initializeCardsList() {
  if (cardsArray.length) {
    cardsArray.slice().reverse().forEach(el => renderCards(el));
  }
}

function renderCards(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__picture').setAttribute('src', card.image);
  if (card.like) {
    cardElement.querySelector('.card__heart').classList.add('card__heart_inverted');
  }
  cardsContainer.prepend(cardElement);
}

function showFullImage(card) {
  fullImageContainer.innerHTML="";
  const fullImageTemplate = document.querySelector('#fullImage-template').content;
  const fullImageElement = fullImageTemplate.querySelector('.card__full-container').cloneNode(true);

  fullImageElement.querySelector('.card__full-picture').setAttribute('src', card.src);
  fullImageElement.querySelector('.card__full-subtitle').textContent = card.parentElement.innerText;

  fullImageContainer.append(fullImageElement);
  toggleFullImagePopup();
}

function submitProfileForm(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__subtitle");
  let profileNameInput = document.querySelector(".profile__input-name");
  let profileDescriptionInput = document.querySelector(".profile__input-description");

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  toggleProfilePopup();
}

function submitCardForm(evt) {
  evt.preventDefault();
  let cardNameInput = document.querySelector(".card__input-name");
  let cardUrlInput = document.querySelector(".card__input-url");

  if (cardNameInput.value && cardUrlInput.value) {
    cardsArray.unshift({ "name": cardNameInput.value, "image": cardUrlInput.value, "like": false });
    renderCards(cardsArray[0]);
    cardNameInput.value = '';
    cardUrlInput.value = '';
  }
  toggleCardPopup();
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

function toggleLike(target) {
  target.classList.toggle("card__heart_inverted");
}

initializeCardsList();
profileOpenButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);
profileSaveButton.addEventListener('click', submitProfileForm);
cardAddButton.addEventListener('click', toggleCardPopup);
cardSaveButton.addEventListener('click', submitCardForm);
cardsCloseButton.addEventListener('click', toggleCardPopup);

