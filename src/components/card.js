import {cardsArray, cardPopup, fullImagePopup, cardsContainer, cardNameInput, cardUrlInput, cardTemplate, fullImage, fullImageSubtitle} from './const';
import {openPopup, closePopup} from './modal';

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__picture');
    const cardDelete = cardElement.querySelector('.card__delete');
    const cardLike = cardElement.querySelector('.card__like');
  
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.setAttribute('src', card.image);
    cardImage.setAttribute('alt', card.name);
    
    if (card.like) {
      cardElement.querySelector('.card__like').classList.add('card__like_inverted');
    }
    cardImage.addEventListener('click', () => showFullImage(cardImage));
    cardDelete.addEventListener('click', () => {
      cardDelete.closest('.card').remove();
    });
    cardLike.addEventListener('click', () => {
      cardLike.classList.toggle('card__like_inverted');
    });
  
    return cardElement;
  }
  
  function renderCards(card) {
    const cardElement = createCard(card);
    cardsContainer.prepend(cardElement);
  }
  
  export function initializeCardsList() {
    if (cardsArray.length) {
      cardsArray.slice().reverse().forEach(el => renderCards(el));
    }
  }

  export function submitCardForm(evt) {
    evt.preventDefault();
    if (cardNameInput.value && cardUrlInput.value) {
      const newCard = { "name": cardNameInput.value, "image": cardUrlInput.value, "like": false }
      renderCards(newCard);
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