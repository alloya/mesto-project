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

  openPopup(fullImagePopup);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
}

function submitCardForm(evt) {
  evt.preventDefault();
  if (cardNameInput.value && cardUrlInput.value) {
    const newCard = { "name": cardNameInput.value, "image": cardUrlInput.value, "like": false }
    renderCards(newCard);
    cardNameInput.value = '';
    cardUrlInput.value = '';
  }
  closePopup(cardPopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

initializeCardsList();
closeFullImageButton.addEventListener('click', () => closePopup(fullImagePopup));
profileOpenButton.addEventListener('click', () => openPopup(profilePopup));
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
profilePopup.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', () => openPopup(cardPopup));
cardPopup.addEventListener('submit', submitCardForm);
cardsCloseButton.addEventListener('click', () => closePopup(cardPopup));

