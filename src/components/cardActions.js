import { cardPopup, cardsContainer, loadingBar, deletePopup, auth } from './const';
import { createCard, manageLikes, deleteCardFromDom, createImg } from "./Card";
import { handleError, setInvisible, setVisible, setButtonBlockedState, resetButtonText } from "./common";
import Api from './Api';
// import Api, { createNewCard, deleteLike, putLike, deleteCard } from './Api';
import { openPopup, closePopup } from './modal';
import Card from './Card';
const api = new Api(auth);

let cardToDelete;
let cardIdToDelete;


// export function handleLikeClick(evt, cardId, userId) {
//   setVisible(loadingBar);
//   evt.target.setAttribute('disabled', '');
//   if (evt.target.classList.contains('card__like_inverted')) {
//     deleteLike(cardId)
//       .then(res => {
//         manageLikes(evt.target, evt.target.nextElementSibling, res, userId);
//       })
//       .catch(err => handleError(err))
//       .finally(() => {
//         evt.target.removeAttribute('disabled', '');
//         setInvisible(loadingBar);
//       });
//   }
//   else {
//     putLike(cardId)
//       .then(res => {
//         manageLikes(evt.target, evt.target.nextElementSibling, res, userId)
//       })
//       .catch(err => handleError(err))
//       .finally(() => {
//         evt.target.removeAttribute('disabled', '');
//         setInvisible(loadingBar);
//       });
//   }
// }

// export function initializeCardsList(cardList, userId) {
//   if (cardList.length) {
//     cardList.forEach(el => {
//       cardsContainer.append(card.createCard(el, userId, null))
//     });
//   }
// }

export function submitCardForm(evt, userId) {
  debugger
  evt.preventDefault();
  setVisible(loadingBar);
  const text = evt.submitter.textContent;
  setButtonBlockedState(evt.submitter);
  const loadPromise = loadImage(evt.target.elements.cardLink.value)
    .then(res => { return res.target });
  const postCardPromise = loadPromise
    .then(res =>
      res && api.createNewCard(evt.target.elements.cardName.value, evt.target.elements.cardLink.value))
    .catch(err => {
      err.message = "Не удалось загрузить изображение. Проверьте правильность ссылки и ваше сетевое соединение.";
      handleError(err);
      return err;
    });

  Promise.all([loadPromise, postCardPromise])
    .then(([loadedImgElement, card]) => {
      const newCard = new Card(card, userId, '#card-template', loadedImgElement)
      cardsContainer.prepend(newCard.createCard());
      closePopup(cardPopup);
    })
    .catch(err => handleError(err))
    .finally(res => {
      setInvisible(loadingBar);
      resetButtonText(evt.submitter, text);
    });
}

export function removeCard(cardId, card) {
  cardToDelete = card;
  cardIdToDelete = cardId;
  deletePopup.removeEventListener('submit', deleteCardHandler);
  openPopup(deletePopup);
  deletePopup.addEventListener('submit', deleteCardHandler);
}

function deleteCardHandler() {
  api.deleteCard(cardIdToDelete)
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