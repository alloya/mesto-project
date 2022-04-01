import { createNewCard, deleteLike, putLike, deleteCard } from './api';
import { cardPopup, fullImagePopup, cardsContainer, cardTemplate, fullImage, fullImageSubtitle, loadingBar } from './const';
import { openPopup, closePopup } from './modal';
import { currUser } from '../index';
import { resetButtonText, setButtonBlockedState, setInvisible, setVisible } from './common';

function createCard(card, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLike = cardElement.querySelector('.card__like');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.setAttribute('dataId', card._id);

  manageLikes(cardLike, likeCounter, card);
  manageBins(card, cardDelete, userId);
  cardLike.addEventListener('click', handleLikeClick, false);
  return loadImage(card.link)
    .then(evt => {
      cardElement.prepend(evt.target);
      evt.target.setAttribute('alt', card.name);
      evt.target.addEventListener('click', () => showFullImage(cardElement.querySelector('.card__picture')));
      return cardElement
    })
    .catch(err => {
      console.log('Image load error ', err.target.src)
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
    cardList.sort(((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })).forEach(el => {
      createCard(el, userId)
        .then(cardElement => {
          if (cardElement) {
            cardsContainer.append(cardElement)
          }
        })
        .catch(err => console.log(err))
    });
  }
}

export function submitCardForm(evt) {
  evt.preventDefault();
  setVisible(loadingBar);
  const text = evt.submitter.textContent;
  setButtonBlockedState(evt.submitter);
  createNewCard(evt.target.elements.cardName.value, evt.target.elements.cardLink.value)
    .then(res => createCard(res, currUser._id))
    .then(card => {
      cardsContainer.prepend(card);
    })
    .finally(res => {
      setInvisible(loadingBar);
      closePopup(cardPopup);
      resetButtonText(evt.submitter, text);
    });
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