import {deletePopup} from './const';
import {handleError} from "./common";
import {api} from "../index";

export default class Card {
  constructor(card, currentUserId, selector, handleCardClick) {
    this._userId = currentUserId;
    this._selector = selector;
    this._title = card.name;
    this._card = card;
    this._link = card.link;
    this._likeCounter = card.likes.length;
    // this._cardLike;
    this._handleCardClick = handleCardClick;
  }

  getCardId() {
    return this._card._id;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardDelete = this._cardElement.querySelector('.card__delete');
    this._cardLike = this._cardElement.querySelector('.card__like');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
    this._cardElement.querySelector('.card__title').textContent = this._title;
    this._cardImg = this._createImg(this._link);
    this._cardElement.prepend(this._cardImg);
    this._manageLikes(this._cardLike, this._card);
    this._manageBins(this._card);
    this._setEventListeners();
    return this._cardElement;
  }

  isLiked() {
    this._card.likes.forEach(item => {
        item._id === this._userId ? true : false
      }
    )
  }

  _deleteCard(id, element) {
    // deletePopup.open();
    // deletePopup.setEventListeners();
    api.deleteCard(this.getCardId())
      .then(() => {
        element.remove();
      })
      .catch(error => console.error(error))
      // .finally(deletePopup.close())
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', (evt) => this._handleLikeClick(evt, this.getCardId()));
    this._cardImg.addEventListener('click', () => this._handleCardClick(this._title, this._link));
  }

  _createImg(imageSrc) {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.classList.add('card__picture');
    return image;
  }

  _manageLikes(likeElement, card) {
    card.likes.some((like => like._id === this._userId))
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
    } else {
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
    if (this._card.owner._id !== this._userId) {
      this._cardDelete.remove();
      return;
    }
    this._cardDelete.addEventListener('click', () => this._deleteCard(this._card._id, this._cardElement));
  }
}
