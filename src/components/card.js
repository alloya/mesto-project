import { cardsArray, cardPopup, fullImagePopup, cardsContainer, cardNameInput, cardUrlInput, cardTemplate, fullImage, fullImageSubtitle } from './const';
import { openPopup, closePopup } from './modal';
import { toggleButtonState } from './validate';

function createCard(card, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__picture');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLike = cardElement.querySelector('.card__like');
  const likeCounter = cardElement.querySelector('.card__like-counter');


  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);

  manageLikes(cardLike, likeCounter, card.likes, userId);
  manageBins(card, cardDelete, userId);

  cardImage.addEventListener('click', () => showFullImage(cardImage));

  return cardElement;
}

function manageLikes(likeElement, likeCounter, likeArray, userId) {
  if (likeArray.some((like => like._id == userId))) {
    likeElement.classList.add('card__like_inverted');
  }
  likeCounter.textContent = likeArray && likeArray.length || 0;
  likeElement.addEventListener('click', () => {
    likeElement.classList.toggle('card__like_inverted');
  });
}

function manageBins(card, binElement, userId) {
  if (card.owner._id != userId) {
    binElement.remove();
  }
  binElement.addEventListener('click', () => {
    binElement.closest('.card').remove();
  });
}

export function initializeCardsList(cardList, userId) {
  if (cardList.length) {
    cardList.slice().reverse().forEach(el => {
      let cardElement = createCard(el, userId);
      cardsContainer.prepend(cardElement);
    });
  }
}

export function submitCardForm(evt) {
  evt.preventDefault();
  if (cardNameInput.value && cardUrlInput.value) {
    const newCard = { "name": cardNameInput.value, "link": cardUrlInput.value, "likes": [], "owner": { "_id": "b8c445deb7a8e01ab99666a2" } };
    cardsContainer.prepend(createCard(newCard, "b8c445deb7a8e01ab99666a2"));
    cardNameInput.value = '';
    cardUrlInput.value = '';
  }
  closePopup(cardPopup);
}

function showFullImage(card) {
  fullImage.setAttribute('src', card.src);
  fullImage.setAttribute('alt', card.alt);
  fullImageSubtitle.textContent = card.alt;

  openPopup(fullImagePopup);
}