import { deleteLike, putLike } from './api';
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

  manageLikes(cardLike, likeCounter, card);
  manageBins(card, cardDelete, userId);

  cardImage.addEventListener('click', () => showFullImage(cardImage));
  cardLike.addEventListener('click', handleLikeClick, false);

  return cardElement;
}

function handleLikeClick(evt) {
  console.log(evt.target.nextElementSibling)
  if (evt.target.getAttribute('like') == "true") {
    deleteLike(evt.target.getAttribute('dataId'))
      .then(res => {
        manageLikes(evt.target, evt.target.nextElementSibling, res);
      })
  }
  else {
    putLike(evt.target.getAttribute('dataId'))
    .then(res => manageLikes(evt.target, evt.target.nextElementSibling, res))
  }
}

function manageLikes(likeElement, likeCounter, card) {
  debugger
  if (card.likes.some((like => like._id == currUser._id))) {
    likeElement.classList.add('card__like_inverted');
    likeElement.setAttribute('like', true);
  }
  else {
    likeElement.classList.remove('card__like_inverted');
    likeElement.setAttribute('like', false);
  }
  likeCounter.textContent = card.likes && card.likes.length || 0;
  likeElement.setAttribute('dataId', card._id);
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