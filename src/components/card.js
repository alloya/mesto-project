import { fullImagePopup, cardsContainer, cardTemplate, fullImage, fullImageSubtitle, deletePopup } from './const';
import { openPopup } from './modal';
import { handleLikeClick } from './cardActions';

export function createCard(card, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLike = cardElement.querySelector('.card__like');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.setAttribute('dataId', card._id);

  manageLikes(cardLike, likeCounter, card, userId);
  manageBins(card, cardDelete, userId);
  cardLike.addEventListener('click', (evt) => {
    handleLikeClick(evt, userId)
  }, false);
  return loadImage(card.link)
    .then(evt => {
      cardElement.prepend(evt.target);
      evt.target.setAttribute('alt', card.name);
      evt.target.addEventListener('click', () => showFullImage(cardElement.querySelector('.card__picture')));
      return cardElement
    })
    .catch(err => {
      console.log('Image load error ', err.target.src);
    })
}

function loadImage(imageSrc) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.classList.add('card__picture');
    image.src = imageSrc;
    image.onerror = reject;
    image.onload = resolve;
  })
}

export function manageLikes(likeElement, likeCounter, card, userId) {
  if (card.likes.some((like => like._id == userId))) {
    likeElement.classList.add('card__like_inverted');
    likeElement.setAttribute('like', true);
  }
  else {
    likeElement.classList.remove('card__like_inverted');
    likeElement.setAttribute('like', false);
  }
  likeCounter.textContent = card.likes && card.likes.length || 0;
}

function manageBins(card, binElement, userId) {
  if (card.owner._id != userId) {
    binElement.remove();
    return;
  }
  binElement.addEventListener('click', () => openDeletePopup(card._id));
}

function showFullImage(card) {
  fullImage.setAttribute('src', card.src);
  fullImage.setAttribute('alt', card.alt);
  fullImageSubtitle.textContent = card.alt;
  openPopup(fullImagePopup);
}

function openDeletePopup(cardId) {
  deletePopup.setAttribute('dataid', cardId);
  openPopup(deletePopup);
}

export function deleteCardFromDom(card) {
  card.remove();
  card = null;
}

