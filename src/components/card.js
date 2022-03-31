import { createNewCard, deleteLike, putLike, deleteCard } from './api';
import { cardsArray, cardPopup, fullImagePopup, cardsContainer, cardNameInput, cardUrlInput, cardTemplate, fullImage, fullImageSubtitle } from './const';
import { openPopup, closePopup } from './modal';
import { toggleButtonState } from './validate';
import { currUser } from '../index';


function createCard(card, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__picture');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLike = cardElement.querySelector('.card__like');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardElement.setAttribute('dataId', card._id);

  manageLikes(cardLike, likeCounter, card);
  manageBins(card, cardDelete, userId);

  cardImage.addEventListener('click', () => showFullImage(cardImage));
  cardLike.addEventListener('click', handleLikeClick, false);

  return cardElement;
}

function handleLikeClick(evt) {
  evt.target.setAttribute('disabled', '');
  if (evt.target.getAttribute('like') == "true") {
    deleteLike(evt.target.closest('.card').getAttribute('dataId'))
      .then(res => {
        manageLikes(evt.target, evt.target.nextElementSibling, res);
        evt.target.removeAttribute('disabled', '');
      })
  }
  else {
    putLike(evt.target.closest('.card').getAttribute('dataId'))
      .then(res => manageLikes(evt.target, evt.target.nextElementSibling, res));
    evt.target.removeAttribute('disabled', '');
  }
}

function manageLikes(likeElement, likeCounter, card) {
  if (card.likes.some((like => like._id == currUser._id))) {
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
  binElement.addEventListener('click', removeCard);
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
  createNewCard(evt.target.elements.cardName.value, evt.target.elements.cardLink.value)
    .then(res => {
      cardsContainer.prepend(createCard(res, currUser._id));
      closePopup(cardPopup);
    })
}

function showFullImage(card) {
  fullImage.setAttribute('src', card.src);
  fullImage.setAttribute('alt', card.alt);
  fullImageSubtitle.textContent = card.alt;

  openPopup(fullImagePopup);
}

function removeCard(evt) {
  deleteCard(evt.target.closest('.card').getAttribute('dataId'))
    .then(evt.target.closest('.card').remove())
}