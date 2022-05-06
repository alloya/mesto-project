import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;
    this._image = this._popup.querySelector('.card__full-picture');
    this._title = this._popup.querySelector('.card__full-subtitle');
  }

  open = (card) => {
    this._image.setAttribute('src', card.url);
    this._image.setAttribute('alt', card.name);
    this._title.textContent = card.name;
    super.open();
  }
}