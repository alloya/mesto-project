let cardsArray = [ {'name': 'test', 'image': 'https://new-widget.kiwitaxi.com/static/images/Economy.png', 'like': true }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }, { 'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png', 'like': false }, { 'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg', 'like': true }, { 'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png', 'like': false }];

let cardsContainer = document.querySelector(".cards");
let profilePopup = document.querySelector(".popup__overlay");
let profileOpenButton = document.querySelector(".profile__edit-button");
let profileCloseButton = document.querySelector(".popup__close");
let profileSaveButton = document.querySelector(".popup__button-save");
let cardPopup = document.querySelector(".popup__overlay.cards-popup");
let cardAddButton = document.querySelector(".profile__plus-button");
let cardSaveButton = document.querySelector(".cards-popup .popup__button-save");
let cardsCloseButton = document.querySelector(".cards-popup .popup__close");
let cardTrashBins = document.querySelectorAll(".card__trash");
let cardLikes = document.querySelectorAll(".card__heart");

function initializeCardsList() {
  if (cardsArray.length) {
    cardsArray.forEach(element => {
      renderCards(element);
    })
  }
}

function renderCards(card, type = 'beforeend') {
  let likeClass;
  if (card.like) {
    likeClass = 'card__heart_inverted';
  }
  cardsContainer.insertAdjacentHTML(type,
    `<div class="card">
      <img src=${card.image} alt=${card.name} class="card__picture">
      <button class="card__trash" type="button"></button>
      <div class="card__title-wrapper">
        <h2 class="card__title">${card.name}
        </h2>
        <button class="card__heart ${likeClass}" type="button"></button>
      </div>
    </div>`
  )
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
    renderCards(cardsArray[0], 'afterbegin');
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

initializeCardsList();
profileOpenButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);
profileSaveButton.addEventListener('click', submitProfileForm);
cardAddButton.addEventListener('click', toggleCardPopup);
cardSaveButton.addEventListener('click', submitCardForm);
cardsCloseButton.addEventListener('click', toggleCardPopup);
