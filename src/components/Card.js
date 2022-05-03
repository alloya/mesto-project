export default class Card {
  constructor(card, currentUserId, selector, handleCardClick, handleLikeClick, handleDelete) {
    this._userId = currentUserId;
    this._selector = selector;
    this._title = card.name;
    this._card = card;
    this._link = card.link;
    this._likeCounter = card.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelete = handleDelete;
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
    this.manageLikes(this._card);
    this._manageBins(this._card);
    this._setEventListeners();
    return this._cardElement;
  }

  isLiked() {
    return this._card.likes.some(like => like._id === this._userId)
  }

  deleteCard(){
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._handleLikeClick(this, !this.isLiked()));
    this._cardImg.addEventListener('click', () => this._handleCardClick(this._title, this._link));
  }

  _createImg(imageSrc) {
    const image = document.createElement('img');
    image.src = imageSrc;
    image.classList.add('card__picture');
    return image;
  }

  _setLike(likeElement) {
    likeElement.classList.add('card__like_inverted');
  }

  _removeLike(likeElement) {
    likeElement.classList.remove('card__like_inverted');
  }

  manageLikes(card) {
    card.likes.some(like => like._id === this._userId)
      ? this._setLike(this._cardLike) : this._removeLike(this._cardLike);
    this._likeCounter.textContent = card.likes && card.likes.length || 0;
    this._card = card;
  }

  _manageBins() {
    if (this._card.owner._id !== this._userId) {
      this._cardDelete.remove();
      return;
    }
    this._cardDelete.addEventListener('click', () => this._handleDelete(this));
  }
}
