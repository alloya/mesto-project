import { fullImagePopup, cardTemplate, fullImage, fullImageSubtitle } from './const';
import { openPopup } from './modal';
import { handleLikeClick, removeCard } from './cardActions';



export function createCard(card, userId, loadedImgElement) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLike = cardElement.querySelector('.card__like');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardImg = loadedImgElement || createImg(card.link);
  cardImg.addEventListener('click', () => showFullImage(cardElement.querySelector('.card__picture')));
  cardImg.setAttribute('alt', card.name);

  cardElement.prepend(cardImg);
  cardElement.querySelector('.card__title').textContent = card.name;

  manageLikes(cardLike, likeCounter, card, userId);
  manageBins(card, cardDelete, userId, cardElement);
  cardLike.addEventListener('click', (evt) => {
    handleLikeClick(evt, card._id, userId)
  }, false);
  return cardElement;
}

export function createImg(imageSrc) {
  const image = document.createElement('img');
  image.src = imageSrc;
  image.classList.add('card__picture');
  return image;
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

function manageBins(card, binElement, userId, cardElement) {
  if (card.owner._id != userId) {
    binElement.remove();
    return;
  }
  binElement.addEventListener('click', () => removeCard(card._id, cardElement));
}

function showFullImage(card) {
  fullImage.setAttribute('src', card.src);
  fullImage.setAttribute('alt', card.alt);
  fullImageSubtitle.textContent = card.alt;
  openPopup(fullImagePopup);
}

export function deleteCardFromDom(card) {
  card.remove();
  card = null;
}