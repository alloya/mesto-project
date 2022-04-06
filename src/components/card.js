import { createNewCard, deleteLike, putLike, deleteCard } from './api';
import { cardPopup, fullImagePopup, cardsContainer, cardTemplate, fullImage, fullImageSubtitle, loadingBar, deletePopup } from './const';
import { openPopup, closePopup } from './modal';
import { resetButtonText, setButtonBlockedState, setInvisible, setVisible, handleError } from './common';

function createCard(card, userId) {
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

function handleLikeClick(evt, userId) {
  setVisible(loadingBar);
  evt.target.setAttribute('disabled', '');
  if (evt.target.getAttribute('like') == "true") {
    deleteLike(evt.target.closest('.card').getAttribute('dataId'))
      .then(res => {
        manageLikes(evt.target, evt.target.nextElementSibling, res, userId);
      })
      .catch(err => handleError(err))
      .finally(() => {
        evt.target.removeAttribute('disabled', '');
        setInvisible(loadingBar);
      });
  }
  else {
    putLike(evt.target.closest('.card').getAttribute('dataId'))
      .then(res => {
        manageLikes(evt.target, evt.target.nextElementSibling, res, userId)
      })
      .catch(err => handleError(err))
      .finally(() => {
        evt.target.removeAttribute('disabled', '');
        setInvisible(loadingBar);
      });
  }
}

function manageLikes(likeElement, likeCounter, card, userId) {
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

export function initializeCardsList(cardList, userId) {
  if (cardList.length) {
    cardList.forEach(el => {
      createCard(el, userId)
        .then(cardElement => {
          if (cardElement) {
            cardsContainer.append(cardElement)
          }
        })
        .catch(err => handleError(err))
    });
  }
}

export function submitCardForm(evt, userId) {
  evt.preventDefault();
  setVisible(loadingBar);
  const text = evt.submitter.textContent;
  setButtonBlockedState(evt.submitter);
  createNewCard(evt.target.elements.cardName.value, evt.target.elements.cardLink.value)
    .then(res => createCard(res, userId))
    .then(card => {
      cardsContainer.prepend(card);
      closePopup(cardPopup);
    })
    .catch(err => handleError(err))
    .finally(res => {
      setInvisible(loadingBar);
      resetButtonText(evt.submitter, text);
    });
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

function deleteCardFromDom(card) {
  card.remove();
  card = null;
} 

export function removeCard(evt) {
  deleteCard(evt.target.closest('.delete_popup').getAttribute('dataid'))
    .then(deleteCardFromDom(document.querySelector(`[dataid='${evt.target.closest('.delete_popup').getAttribute('dataid')}']`)))
    .then(closePopup(deletePopup))
    .catch(err => handleError(err))
  }