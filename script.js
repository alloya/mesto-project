let cardsArray = [{'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg'},  {'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png'}, {'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png'}, {'name': 'Гора Эльбрус', 'image': './images/kirill-pershin-1404681-unsplash.png'}, {'name': 'Карачаевск', 'image': './images/kirill-pershin-1088404-unsplash.jpg'}, {'name': 'Домбай', 'image': './images/kirill-pershin-1556355-unsplash.png'}];

let cardsContainer = document.querySelector(".cards");
let cardName = document.querySelector(".card__title");
let cardImage = document.querySelector(".card__picture");
let popUp = document.querySelector(".popup__overlay");
let profileOpenButton = document.querySelector(".profile__edit-button");
let profileCloseButton = document.querySelector(".popup__close");
let profileSaveButton = document.querySelector(".popup__button-save");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__subtitle");

function renderCards(cards) {
  if (cards.length !== 0) {
    cards .forEach(element => {
      cardsContainer.insertAdjacentHTML('beforeend', 
        `<div class="card">
          <img src=${element.image} alt=${element.name} class="card__picture">
          <div class="card__title-wrapper">
            <h2 class="card__title">${element.name}
            </h2>
            <button class="card__heart" type="button"></button>
          </div>
        </div>`
      );}
    )
  }
}

function submitProfileForm(evt) {
  evt.preventDefault(); 
  let profileNameInput = document.querySelector(".profile__input-name");
  let profileDescriptionInput = document.querySelector(".profile__input-description");

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  togglePopup();
}

function togglePopup() {
  popUp.classList.toggle("popup_opened");
}

renderCards(cardsArray);
profileOpenButton.addEventListener('click', togglePopup);
profileCloseButton.addEventListener('click', togglePopup);
profileSaveButton.addEventListener('click', submitProfileForm);