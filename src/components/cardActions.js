import { cardPopup, cardsContainer, loadingBar, deletePopup } from './const';
import { createCard, manageLikes, deleteCardFromDom } from "./card";
import { handleError, setInvisible, setVisible, setButtonBlockedState, resetButtonText } from "./common";
import { createNewCard, deleteLike, putLike, deleteCard } from './api';
import { closePopup } from './modal';

export function handleLikeClick(evt, userId) {
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

export function removeCard(evt) {
  deleteCard(evt.target.closest('.delete_popup').getAttribute('dataid'))
    .then(deleteCardFromDom(document.querySelector(`[dataid='${evt.target.closest('.delete_popup').getAttribute('dataid')}']`)))
    .then(closePopup(deletePopup))
    .catch(err => handleError(err))
}