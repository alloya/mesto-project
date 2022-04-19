import { fullImagePopup, cardTemplate, fullImage, fullImageSubtitle, auth } from './const';
import { openPopup } from './modal';
import { handleLikeClick, removeCard } from './cardActions';
import Api from './Api';
const api = new Api(auth);

export default class Card {
  constructor(card, currentUserId, selector, loadedImgElement) {
    this._userId = currentUserId;
    this._selector = selector;
    this._imgElement = loadedImgElement;
    this._card = card;
    this._link = card.link;
    this._likeCounter;
    this._cardLike;
    this._cardTitle;

  }

  getCardId() {
    return this._card._id;
  }

  _getTemplate() {
    const card = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    return card;
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardDelete = this._cardElement.querySelector('.card__delete');
    this._cardLike = this._cardElement.querySelector('.card__like');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
    this._cardElement.querySelector('.card__title').textContent = this._card.name;
    this._cardImg = this._createImg(this._link);
    this._cardElement.prepend(this._cardImg);
    this._manageLikes(this._cardLike, this._card);
    this._manageBins(this._card);
    this._setEventListeners();

    return this._cardElement;
  }

  isLiked() {

  }

  deleteCardFromDom() {

  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', (evt) => this._handleLikeClick(evt, this.getCardId()));
    this._cardImg.addEventListener('click', () => this._showFullImage(this._cardElement.querySelector('.card__picture')));
  }

  _createImg(imageSrc) {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.classList.add('card__picture');
    return image;
  }

  _manageLikes(likeElement, card) {
    card.likes.some((like => like._id == this._userId))
      ? likeElement.classList.add('card__like_inverted')
      : likeElement.classList.remove('card__like_inverted');
      this._likeCounter.textContent = card.likes && card.likes.length || 0;
  }

  _handleLikeClick(evt, cardId) {
    evt.target.setAttribute('disabled', '');
    if (evt.target.classList.contains('card__like_inverted')) {
      api.deleteLike(cardId)
        .then(cardResponse => {
          this._manageLikes(evt.target, cardResponse);
        })
        .catch(err => handleError(err))
        .finally(() => {
          evt.target.removeAttribute('disabled', '');
        });
    }
    else {
      api.putLike(cardId)
        .then(cardResponse => {
          this._manageLikes(evt.target, cardResponse)
        })
        .catch(err => handleError(err))
        .finally(() => {
          evt.target.removeAttribute('disabled', '');
        });
    }
  }

  _manageBins() {
    if (this._card.owner._id != this._userId) {
      this._cardDelete.remove();
      return;
    }
    this._cardDelete.addEventListener('click', () => removeCard(this._card._id, this._cardElement));
  }

  _showFullImage(card) {
    fullImage.setAttribute('src', card.src);
    fullImage.setAttribute('alt', card.alt);
    fullImageSubtitle.textContent = card.alt;
    openPopup(fullImagePopup);
  }


}

// export function createCard(card, userId, loadedImgElement) {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardDelete = cardElement.querySelector('.card__delete');
//   const cardLike = cardElement.querySelector('.card__like');
//   const likeCounter = cardElement.querySelector('.card__like-counter');
//   const cardImg = loadedImgElement || createImg(card.link);
//   cardImg.addEventListener('click', () => showFullImage(cardElement.querySelector('.card__picture')));
//   cardImg.setAttribute('alt', card.name);

//   cardElement.prepend(cardImg);
//   cardElement.querySelector('.card__title').textContent = card.name;

//   manageLikes(cardLike, likeCounter, card, userId);
//   manageBins(card, cardDelete, userId, cardElement);
//   cardLike.addEventListener('click', (evt) => {
//     handleLikeClick(evt, card._id, userId)
//   }, false);
//   return cardElement;
// }

export function createImg(imageSrc) {
  const image = document.createElement('img');
  image.src = imageSrc;
  image.classList.add('card__picture');
  return image;
}

// export function manageLikes(likeElement, likeCounter, card, userId) {
//   card.likes.some((like => like._id == userId))
//     ? likeElement.classList.add('card__like_inverted')
//     : likeElement.classList.remove('card__like_inverted');

//   // if (card.likes.some((like => like._id == userId))) {
//   //   likeElement.classList.add('card__like_inverted');
//   //   likeElement.setAttribute('like', true);
//   // }
//   // else {
//   //   likeElement.classList.remove('card__like_inverted');
//   //   likeElement.setAttribute('like', false);
//   // }
//   likeCounter.textContent = card.likes && card.likes.length || 0;
// }

// function manageBins(card, binElement, userId, cardElement) {
//   if (card.owner._id != userId) {
//     binElement.remove();
//     return;
//   }
//   binElement.addEventListener('click', () => removeCard(card._id, cardElement));
// }

// function showFullImage(card) {
//   fullImage.setAttribute('src', card.src);
//   fullImage.setAttribute('alt', card.alt);
//   fullImageSubtitle.textContent = card.alt;
//   openPopup(fullImagePopup);
// }

export function deleteCardFromDom(card) {
  card.remove();
  card = null;
}