import { cardPopup, cardsContainer, loadingBar, deletePopup } from './const';
import { createCard, manageLikes, deleteCardFromDom, createImg } from "./card";
import { handleError, setInvisible, setVisible, setButtonBlockedState, resetButtonText } from "./common";
import { createNewCard, deleteLike, putLike, deleteCard } from './api';
import { openPopup, closePopup } from './modal';
let cardToDelete;
let cardIdToDelete;

export function handleLikeClick(evt, cardId, userId) {
  setVisible(loadingBar);
  evt.target.setAttribute('disabled', '');
  if (evt.target.getAttribute('like') == "true") {
    deleteLike(cardId)
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
    putLike(cardId)
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

export function initializeCardsList(cardList, userId) {
  if (cardList.length) {
    cardList.forEach(el => {
      cardsContainer.append(createCard(el, userId, null))
    });
  }
}

export function submitCardForm(evt, userId) {
  evt.preventDefault();
  setVisible(loadingBar);
  const text = evt.submitter.textContent;
  setButtonBlockedState(evt.submitter);
  const loadPromise = loadImage(evt.target.elements.cardLink.value)
    .then(res => {return res.target});
  const postCardPromise = loadPromise
    .then(res =>
      res && createNewCard(evt.target.elements.cardName.value, evt.target.elements.cardLink.value))
    .catch(err => {
      err.message = "Не удалось загрузить изображение. Проверьте правильность ссылки и ваше сетевое соединение.";
      handleError(err);
      return err;
    });

  Promise.all([loadPromise, postCardPromise])
    .then(([loadedImgElement, card]) => {
      cardsContainer.prepend(createCard(card, userId, loadedImgElement));
      closePopup(cardPopup);
    })
    .catch(err => handleError(err))
    .finally(res => {
      setInvisible(loadingBar);
      resetButtonText(evt.submitter, text);
    });
}

// export function removeCard(cardId) {
//   deleteCard(cardId)
//     .then(deleteCardFromDom(document.querySelector(`[dataid='${evt.target.closest('.delete_popup').getAttribute('dataid')}']`)))
//     .then(closePopup(deletePopup))
//     .catch(err => handleError(err))
// }

export function removeCard(cardId, card) {
  cardToDelete = card;
  cardIdToDelete = cardId;
  deletePopup.removeEventListener('submit', deleteCardHandler);
  openPopup(deletePopup);
  deletePopup.addEventListener('submit', deleteCardHandler);
}

function deleteCardHandler() {
  deleteCard(cardIdToDelete)
    .then(deleteCardFromDom(cardToDelete))
    .then(closePopup(deletePopup))
    .catch(err => handleError(err))
}

function loadImage(imageSrc) {
  return new Promise((resolve, reject) => {
    const image = createImg(imageSrc);
    image.onerror = reject;
    image.onload = resolve;

  })
}